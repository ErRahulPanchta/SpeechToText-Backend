import express from "express";
import { userLoginController, userLogoutController, userRegisterController } from "../controller/user.controller.js";
import auth from "../middleware/auth.js";

const userRouter=express.Router();

userRouter.post("/register",userRegisterController);
userRouter.post("/login",userLoginController);
userRouter.get('/logout',auth,userLogoutController);

export default userRouter