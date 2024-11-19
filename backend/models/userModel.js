import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    }
}, {
    timestamps:true
})
export const users = mongoose.model('users', userSchema); 