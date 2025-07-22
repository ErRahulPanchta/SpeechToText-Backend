import express from "express";
import upload from "../middleware/multer.js";
import { uploadAudioController } from "../controller/audio.controller.js"
import auth from "../middleware/auth.js";


const audioRouter = express.Router();

audioRouter.post("/upload", auth, upload.single('audioSample'), uploadAudioController);

export default audioRouter;
