import { Router } from "express";
import { formValidation,loginValidation } from "../middlewares/formValidation.js";
import { validateCurrentUser } from "../middlewares/uservalidation.js";

import { login, register } from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/login", loginValidation, login);
userRouter.get("/validate-current-user", validateCurrentUser);
userRouter.post("/register", formValidation, register);

export default userRouter;
