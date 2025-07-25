import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Upload Image to Cloudinary
export async function uploadImageCloudinary(image) {
    try {
        if (!image) {
            throw new Error("No image file provided");
        }

        const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

        const uploadImage = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: "SpeechToText" }, (error, uploadResult) => {
                if (error) {
                    return reject(new Error("Image upload failed: " + error.message));
                }
                resolve(uploadResult);
            }).end(buffer);
        });

        return uploadImage;
    } catch (err) {
        console.error("Cloudinary Image Upload Error:", err.message);
        throw err;
    }
}

// Upload Audio to Cloudinary
export async function uploadAudioCloudinary(audio) {
    try {
        if (!audio) {
            throw new Error("No audio file provided");
        }

        const buffer = audio?.buffer || Buffer.from(await audio.arrayBuffer());

        const uploadAudio = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    resource_type: "video",
                    folder: "SpeechToText-Audio",
                    format: "mp3"
                },
                (error, uploadResult) => {
                    if (error) {
                        return reject(new Error("Audio upload failed: " + error.message));
                    }
                    resolve(uploadResult);
                }
            ).end(buffer);
        });

        return uploadAudio;
    } catch (err) {
        console.error("Cloudinary Audio Upload Error:", err.message);
        throw err;
    }
}
