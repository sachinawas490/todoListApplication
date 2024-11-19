import mongoose, { mongo } from "mongoose";
const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    marked: {
        type: Boolean,
        default:false
    }

}, {
    timestamps:true
})

export const todos = mongoose.model('todos', todoSchema);