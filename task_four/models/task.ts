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
        required: true
    },
    "board": {
        type: mongoose.Types.ObjectId,
        ref: "Board"
    }

})

const Task = mongoose.Model("tasks", taskSchema)

export default Task