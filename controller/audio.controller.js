import audioModel from "../models/audio.model.js";
import { uploadAudioCloudinary } from "../utils/uploadCloudinary.js"


export async function uploadAudioController(req, res) {
    try {
        const audio = req.file;

        const upload = await uploadAudioCloudinary(audio);
        
        const newAudio = new audioModel({ audio_file: upload.secure_url });
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
        })
    }
}