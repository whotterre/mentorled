import mongoose from "mongoose"

const boardSchema = new mongoose.Schema({
    "title": {
        type: String,
        required: true,
    },
    "description": {
        type: String,
        required: true,
    },
    "content": {
        type: String,
        required: true,
        minLength: 10
    },
    "tasks": {
        type: [mongoose.Types.ObjectId],
        ref: "Task"
    }
})

const Board = mongoose.model("posts", boardSchema)

export default Board