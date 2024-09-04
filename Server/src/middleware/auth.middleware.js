import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken"

const isLoggedIn = function(req,res,next){
    const {token} = req.cookies;
    if(!token){
        return next(new AppError("Unauthorized, please login", 400));
    }
    const tokenDetails = jwt.verify(token,process.env.JWT_SECRET);
    if(tokenDetails){
        return next(new AppError("Unauthorized, please login", 400));
    }
    req.user = tokenDetails;

    next()
}

export default isLoggedIn;