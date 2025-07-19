import express from "express";
import { userLoginController, userLogoutController, userProfileController, userRegisterController } from "../controller/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", userRegisterController);
userRouter.post("/login", userLoginController);
userRouter.get('/logout', auth, userLogoutController);
userRouter.put("/upload-profile", auth, upload.single('profile'), userProfileController);

export default userRouter