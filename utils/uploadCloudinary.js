import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function uploadImageCloudinary(image) {
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

    const uploadImage = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "SpeechToText" }, (error, uploadResult) => {
            return resolve(uploadResult);
        }).end(buffer);
    });
    return uploadImage;
}

export async function uploadAudioCloudinary(audio) {

    const buffer = audio?.buffer || Buffer.from(await audio.arrayBuffer());

    const uploadAudio = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                resource_type: "video",
                folder: "SpeechToText-Audio",
                format: "mp3"

            },
            (error, uploadResult) => {
                return resolve(uploadResult);
            }
        ).end(buffer);
    });
    return uploadAudio;

}