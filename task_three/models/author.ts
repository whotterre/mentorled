import mongoose from "mongoose"

const authorSchema = new mongoose.Schema({
    "name": {
        type: String,
        required: true,
    },
    "email": {
        type: String,
        required: true,
        unique: true,
    },
    "password": {
        type: String,
        required: true
    },
    "posts": {
        type: [mongoose.Types.ObjectId],
        ref: "Post",
    }
})

const Author = mongoose.model("authors", authorSchema)

export default Author