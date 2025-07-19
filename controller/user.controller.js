import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import { uploadImageCloudinary } from "../utils/uploadCloudinary.js"

//register controller
export async function userRegisterController(req, res) {
    try {
        const { name, email, password } = req.body || {};
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "provide name, email, password",
                error: true,
                success: false
            });
        }
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "Email already registered!",
                error: true,
                success: false,
                data: user
            });
        }
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name,
            email,
            password: encryptedPassword
        });
        const savedUser = await newUser.save();
        return res.status(200).json({
            message: "user registered successfully",
            error: false,
            success: true,
            data: savedUser
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//login controller
export async function userLoginController(req, res) {
    try {

        const { email, password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({
                message: "provide email and password",
                error: true,
                success: false
            })
        }

        const existingUser = await userModel.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                message: "user not found",
                error: true,
                success: false
            })
        }

        const matchPassword = bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({
                message: "incorrect password",
                error: true,
                success: false
            })
        }
        const accesstoken = await generateAccessToken(existingUser._id);
        const refreshtoken = await generateRefreshToken(existingUser._id);

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        res.cookie('accessToken', accesstoken, cookieOption);
        res.cookie('refreshToken', refreshtoken, cookieOption);



        return res.status(200).json({
            message: "Login Successfully",
            error: false,
            success: true,
            data: {
                accesstoken,
                refreshtoken
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//logout controller
export async function userLogoutController(req, res) {
    try {
        const userid = req.userId;

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }
        res.clearCookie('accessToken', cookieOption);
        res.clearCookie('refreshToken', cookieOption);

        await userModel.findByIdAndUpdate(userid, {
            refresh_token: ""
        });
        return res.json({
            message: "logout successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//user profile picture upload controller
export async function userProfileController(req, res) {
    try {
        const userId = req.userId;
        const image = req.file;
        if(!image){
            return res.status(401).json({
                message:"provide image",
                error:true,
                success:false
            })
        }

        const upload = await uploadImageCloudinary(image)
        await userModel.findByIdAndUpdate(userId, {
            profile_picture: upload.secure_url
        });
        return res.json({
            message: "profile picture uploaded  successfully!",
            error: false,
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

