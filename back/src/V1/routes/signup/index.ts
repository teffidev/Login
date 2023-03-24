import { Router } from "express";
import { signUpController } from "../../controllers";

const signUpRouter = Router()

signUpRouter.post("/", signUpController)

export default signUpRouter;