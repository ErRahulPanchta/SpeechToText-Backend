import { AssemblyAI } from "assemblyai";
import audioModel from "../models/audio.model.js";
import { uploadAudioCloudinary } from "../utils/uploadCloudinary.js";

export async function uploadAudioController(req, res) {
    try {
        const audio = req.file;
        const userId = req.userId;

        const upload = await uploadAudioCloudinary(audio);

        const client = new AssemblyAI({
            apiKey: process.env.ASSEMBLYAI_API_KEY
        });

        const params = {
            audio_url: upload.secure_url,
            speech_model: "universal",
        };

        const transcript = await client.transcripts.transcribe(params);


        const newAudio = new audioModel({
            audio_file: upload.secure_url,
            transcript: transcript.text,
            user: userId || null
        });

        await newAudio.save();

        return res.json({
            message: "audio uploaded Successfully!",
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
