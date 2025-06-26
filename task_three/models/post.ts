import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
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
    "author": {
        type: mongoose.Types.ObjectId,
        ref: "Author"
    }
})

const Post = mongoose.model("posts", postSchema)

export default Post