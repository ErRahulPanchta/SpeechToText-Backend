import mongoose from "mongoose";

const audioFileSchema = new mongoose.Schema({
    audio_file: {
        type: String,
        default: "",
        required: true
    },
    transcript: {
        type: String,
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

const audioModel = mongoose.model("Audio", audioFileSchema);
export default audioModel;
