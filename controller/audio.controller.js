import { AssemblyAI } from "assemblyai";
import audioModel from "../models/audio.model.js";
import { uploadAudioCloudinary } from "../utils/uploadCloudinary.js";

//upload audio to api controller
export async function uploadAudioController(req, res) {
    try {
        const audio = req.file;
        const userId = req.userId;

        if (!audio) {
            return res.status(400).json({
                message: "Please Provide Audio File",
                error: true,
                success: false
            })
        }

        const upload = await uploadAudioCloudinary(audio);

        const client = new AssemblyAI({
            apiKey: process.env.ASSEMBLYAI_API_KEY
        });

        const params = {
            audio_url: upload.secure_url,
            speech_model: "universal",
        };

        const transcript = await client.transcripts.transcribe(params);
        if (!transcript) {
            return res.status(500).json({
                message: error.message || error,
                error: true,
                success: false
            })
        }

        const newAudio = new audioModel({
            audio_file: upload.secure_url,
            transcript: transcript.text,
            user: userId || null
        });

        await newAudio.save();

        return res.json({
            message: "audio uploaded Successfully!",
            error: false,
            success: true,
            data: {
                audio: newAudio,
                _id: newAudio._id
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


//get audio details
export async function getAudioDetails(req, res) {

    try {

        const { id: audioId } = req.params;

        if (!audioId) {
            return res.status(400).json({
                message: "please provide audio",
                error: true,
                success: false
            });
        }

        const audio = await audioModel.findById(audioId);

        if (!audio) {
            return res.status(400).json({
                message: "audio not found",
                error: true,
                success: false
            });
        }

        return res.json({
            message: "deatils of audio",
            error: false,
            success: true,
            data: audio
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

} 
