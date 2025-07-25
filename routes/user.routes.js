import express from "express";
import { refreshToken, userDetails, userLoginController, userLogoutController, userProfileController, userRegisterController } from "../controller/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.post("/register", userRegisterController);
userRouter.post("/login", userLoginController);
userRouter.get('/logout', auth, userLogoutController);
userRouter.put("/upload-profile", auth, upload.single('profile'), userProfileController);
userRouter.post('/refresh-token',refreshToken);
userRouter.get('/user-details',auth,userDetails)

export default userRouter