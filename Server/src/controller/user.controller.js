import AppError from "../utils/appError.js";
import User from "../model/user.model.js"
import asyncHandler from "../middleware/asyncHandler.middleware.js";
import cloudinary from 'cloudinary';
import fs from "fs"
import path from "path"
import crypto from "crypto"
import sendEmail from "../utils/sendEmail.js";

const cookieOption = {
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
}

export const resgister = asyncHandler(async (req, res, next) => {
    const { FullName, email, password } = req.body;
    const filepath = req.file.path

    console.log(FullName,email,password,filepath)

    if (!FullName || !email || !password) {
        return next(new AppError('All fields are required', 400));
    }

    const userExits = await User.findOne({ email });

    if (userExits) {
        return next(new AppError("Email already Exists", 409));
    }

    // Define avatar as an empty object
    const avatar = {}; 

    const user = await User.create({
        FullName,
        email,
        password,
        avatar:{
            public_id:email,
            secure_url:''
        }
    });


  // If user not created send message response
  if (!user) {
    return next(
      new AppError('User registration failed, please try again later', 400)
    );
  }


   if(req.file){
        try {
         const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:"lms",
                width:250,
                height:250,
                gravity:'faces',
                crop:"fill"
            })

            if(result){
                user.avatar.public_id= result.public_id;
                user.avatar.secure_url = result.secure_url
               


                fs.unlinkSync(`uploads/${req.file.filename}`)
            }
        } catch (error) {
            return next(
                new AppError(error || 'File not uploaded, please try again', 500)
              );
        }
   }

     // Save the user object
  await user.save();


    // Generating a JWT token
  const token = await user.generateJWTToken();

  // Setting the password to undefined so it does not get sent in the response

  user.password = undefined;

  // Setting the token in the cookie with name token along with cookieOptions
  res.cookie('token', token, cookieOption);


    res.status(201).json({
        sucess: true,
        message: "User Registered successfully",
        user
    });

});
export const login = asyncHandler(async (req, res,next) => {
    const { email, password } = req.body
    console.log(email,password)

    if (!email || !password) {
        return next(new AppError('All fields are required', 400))
    }

    const user = await User.findOne({ email }).select('+password')

    if (!(user || user.comparePassword(password))) {
        return next(new AppError('Email or Password do not match or user does not exist', 401));
    }

    const token = await user.generateJWTToken()

    user.password = undefined;

    res.cookie('token', token, cookieOption)


    res.status(201).json({
        success: true,
        message: 'User logged in successfully',
        user,
    });
});
export const logout = asyncHandler( (req, res) => {
 res.cookie('token',null,{
    scrure:true,
    maxAge:0,
    httpOnly:true
 });

 res.status(200).json({
    success:true,
    message:"User logged out successfully"
 })
});
export const getProfile = asyncHandler( async(req, res) => {
const user = await User.findById(req.body._id)

res.status(200).json({
    success:true,
    message:"User details",
    user
})
});

export const forgetPassword = asyncHandler(async(req,res,next)=>{
    const {email}= req.body;

    if(!email){
        return next(new AppError('Email is required',400))
    }

    const user = await User.findOne({email});

    console.log(user)

    if(!user){
        return next(new AppError('Email is not registered',400))
    }

    const resetToken = await user.generatePasswordResetTokens();

    // console.log(resetPassword)
    await user.save();

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // We here need to send an email to the user with the token
    const subject = 'Reset Password';
    const message = `You can reset your password by clicking
     <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf 
     the above link does not work for some reason 
    then copy paste this link in new tab ${resetPasswordUrl}.\n 
    If you have not requested this, kindly ignore.`;

    console.log(resetPasswordUrl)

   try {
    await sendEmail(email,subject,message);

    res.status(200).json({
        success:true,
        message: `Reset password token has been sent to ${email} successfully`,

    });
   } catch (error) {
    user.forgetPasswordToken = undefined;
    user.forgetPasswordExpiry = undefined;

     await user.save();
     return next(
        new AppError(
          error.message || 'Something went wrong, please try again.',
          500
        )
      );
   }
   

})

export const resetPassword = asyncHandler(async(req,res,next)=>{
   const {resetToken} = req.params;
   const {password} = req.body;

   const forgetPasswordToken =  crypto
   .createHash('sha256')
   .update(resetToken)
   .digest('hex')

   if(!password){
    return next(new AppError('Password is required',400))
   }

  const user = await User.findOne({
    forgetPasswordToken,
    forgetPasswordExpiry:{$gt:Date.now()},
   })

   if(!user){
    return next(new AppError('Token is invalid or expired, please try again',400))
   }
   user.password = password;

   user.forgetPasswordToken= undefined;
   user.forgetPasswordExpiry = undefined;

   await user.save();

   res.status(200).json({
    success:true,
    message:"Password change successfully"
   });

});

export const changePassword = asyncHandler(async(req,res,next)=>{
    const {oldPassword,newPassword}= req.body;
    const {id}= req.user;

    // Check if the values are there or not
  if (!oldPassword || !newPassword) {
    return next(
      new AppError('Old password and new password are required', 400)
    );
  }
 const user = await User.findById(id).select('+password');

 if(!user){
    return next(new AppError('Invalid user id or user does not exist', 400))
 }

 const isPasswordValid = await user.comparePassword(oldPassword);

 if (!isPasswordValid) {
    return next(new AppError('Invalid old password', 400));
  }

  user.password = newPassword;

  await user.save();

  user.password = undefined;

  res.status(200).json({
    success:true,
    message:'Password change successfully'
  });
});

export const updateUser = asyncHandler(async(req,res,next)=>{
    const {FullName}= req.body;
    const {id}= req.params;

  const user = await  User.findById(id)

  if (!user) {
    return next(new AppError('Invalid user id or user does not exist'));
  }

  if (FullName) {
    user.FullName = FullName;
  }
  // Run only if user sends a file
  if (req.file) {
    // Deletes the old image uploaded by the user
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: 'lms', // Save files in a folder named lms
        width: 250,
        height: 250,
        gravity: 'faces', // This option tells cloudinary to center the image around detected faces (if any) after cropping or resizing the original image
        crop: 'fill',
      });

      // If success
      if (result) {
        // Set the public_id and secure_url in DB
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;

        // After successful upload remove the file from local storage
        fs.rm(`uploads/${req.file.filename}`);
      }
    } catch (error) {
      return next(
        new AppError(error || 'File not uploaded, please try again', 400)
      );
    }
  }

  // Save the user object
  await user.save();

  res.status(200).json({
    success: true,
    message: 'User details updated successfully',
  });
})

