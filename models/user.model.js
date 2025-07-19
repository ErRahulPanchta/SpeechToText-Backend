import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Provide name"]
    },
    email:{
        type:String,
        unique:true,
        required: [true, "Provide email"],
        lowercase:true
    },
    password:{
        type:String,
        requried:true
    },
    mobile:{
        type:Number,
        default:null
    },
    profile_picture:{
        type:String,
        default:""
    },
    isSubscriber:{
        type:Boolean,
        default:false
    },
    refresh_token:{
        type:String,
        default:""
    }
},{timestamps:true})

const userModel = mongoose.model("User",userSchema);
export default userModel
