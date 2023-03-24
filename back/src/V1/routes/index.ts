import { Router } from "express";
import signUpRouter from "./signup";
import loginRouter from './login'

const router = Router()

router.use("/signup", signUpRouter)
router.use("/signin", loginRouter)

export default router;