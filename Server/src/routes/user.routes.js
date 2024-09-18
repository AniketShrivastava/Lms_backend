import {Router} from "express"
import isLoggedIn from "../middleware/auth.middleware.js"
const router = Router();

import {
    resgister,
    login,
    logout,
    getProfile,
    forgetPassword,
    resetPassword,
    changePassword

} from "../controller/user.controller.js"
import upload from "../middleware/multer.middleware.js";

router.post("/resgister",upload.single("avatar"),resgister)
router.post("/login",login)
router.post("/logout", logout)
router.get("/me",isLoggedIn, getProfile)
router.post("/reset",forgetPassword)
router.post("/reset/:resetToken",resetPassword)
router.post("/change-password", isLoggedIn, changePassword);


export default router;
