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
    "tasks": [{
        type: mongoose.Types.ObjectId,
        ref: "Task"
    }],
    "creator": {
        type: mongoose.Types.ObjectId,
        ref: "User", 
    }
})

const Board = mongoose.model("Board", boardSchema)

export default Board