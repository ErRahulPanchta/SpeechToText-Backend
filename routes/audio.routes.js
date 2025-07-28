import express from "express";
import upload from "../middleware/multer.js";
import { audioHistoryController, deleteAudioHistory, getAudioDetails, uploadAudioController } from "../controller/audio.controller.js"
import auth from "../middleware/auth.js";
import optionalAuth from "../middleware/optionalAuth.js";


const audioRouter = express.Router();

audioRouter.post("/upload",optionalAuth, upload.single('audioSample'), uploadAudioController);
audioRouter.get("/audio-details/:id", getAudioDetails);
audioRouter.get("/history",auth,audioHistoryController);
audioRouter.delete("/:id",auth,deleteAudioHistory);

export default audioRouter;
