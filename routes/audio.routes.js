import express from "express";
import upload from "../middleware/multer.js";
import { getTranscriptController, uploadAudioController } from "../controller/audio.controller.js"


const audioRouter = express.Router();

audioRouter.post("/upload", upload.single('audioSample'), uploadAudioController);
audioRouter.get("/transcript/:_id", getTranscriptController);

export default audioRouter;
