const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    "title": {
        type: String,
        required: true,
    },
    "description": {
        type: String,
        required: true,
    },
    "status": {
        type: String,
        enum: ["todo", "in-progress", "done"],
        default: "todo",
        required: true
    },
    "board": {
        type: mongoose.Types.ObjectId,
        ref: "Board"
    }

})

const Task = mongoose.model("Task", taskSchema)

export default Task