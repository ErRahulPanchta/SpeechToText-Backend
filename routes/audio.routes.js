import express from "express";
import upload from "../middleware/multer.js";
import { getAudioDetails, uploadAudioController } from "../controller/audio.controller.js"


const audioRouter = express.Router();

audioRouter.post("/upload", upload.single('audioSample'), uploadAudioController);
audioRouter.get("/audio-details/:id", getAudioDetails);

export default audioRouter;
