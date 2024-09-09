import {Router} from "express"
import isLoggedIn from "../middleware/auth.middleware.js"
const router = Router();
import {
    resgister,
    login,
    logout,
    getProfile

} from "../controller/user.controller.js"
import upload from "../middleware/multer.middleware.js";

router.post("/register",upload.single("avatar"),resgister)
router.post("/login",login)
router.get("/logout", logout)
router.get("/me",isLoggedIn, getProfile)

export default router;
