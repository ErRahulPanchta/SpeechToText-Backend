import mongoose from "mongoose";

if (!process.env.MONGODB_URI) {
    throw new error("Provide MongoDB Connection String in .env file");
}

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        return console.log("MongoDB connection Successful!");

    } catch (error) {
        return console.log("Something went wrong " + error);
    }
}
export default connectDb