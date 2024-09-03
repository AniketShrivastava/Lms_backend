import AppError from "../utils/appError.js";
import User from "../model/user.model.js"
import asyncHandler from "../middleware/asyncHandler.middleware.js";


const cookieOption = {
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
}

const resgister = asyncHandler(async (req, res, next) => {
    const { FullName, email, password } = req.body;

    if (!FullName || !email || !password) {
        return next(new AppError('All fields are required', 400));
    }

    const userExits = await User.findOne({ email });

    if (!userExits) {
        return next(new AppError("Email already Exists", 400));
    }

    const user = await User.create({
        FullName,
        email,
        password
    })

    if (!user) {
        return next(new AppError("User registration failed, pleasetry again later", 400));
    }

    await user.save();

    user.password = undefined;

    res.status(201).json({
        sucess: true,
        message: "User Registered successfully",
        user
    });

});
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

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
const logout = (req, res) => {

}
const getProfile = (req, res) => {

}

module.exports = {
    resgister,
    login,
    logout,
    getProfile
}