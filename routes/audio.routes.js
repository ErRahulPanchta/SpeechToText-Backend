import express from "express";
import upload from "../middleware/multer.js";
import { uploadAudioController } from "../controller/audio.controller.js";

const audioRouter = express.Router();

audioRouter.post("/upload", upload.single('audioSample'), uploadAudioController);

export default audioRouter