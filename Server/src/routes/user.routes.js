import {Router} from "express"
const router = Router();
import {
    resgister,
    login,
    logout,
    getProfile

} from "../controller/user.controller.js"

router.post("/register",resgister)
router.post("/login",login)
router.get("/logout", logout)
router.get("/me", getProfile)

export default router;
