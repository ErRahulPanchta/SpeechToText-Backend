import mongoose from "mongoose";

const audioFileSchema = new mongoose.Schema({
    audio_file: {
        type: String,
        default: "",
        required: true

    }
})

const audioModel = mongoose.model("Audio", audioFileSchema);
export default audioModel;