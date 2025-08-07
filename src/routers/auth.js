import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { loginUserSchema, registerUserSchema } from "../vallidation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { loginUserController, logoutUserController, refreshUsersSessionController, registerUserController } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

authRouter.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUsersSessionController));

authRouter.post('/logout', ctrlWrapper(logoutUserController));

export default authRouter;