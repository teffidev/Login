import { Router } from "express";
import { login } from "../../controllers";

const loginRouter = Router()

loginRouter.post("/", login)

export default loginRouter;