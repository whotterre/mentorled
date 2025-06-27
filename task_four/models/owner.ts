import mongoose from "mongoose"

const ownerSchema = new mongoose.Schema({
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
    "boards": {
        type: [mongoose.Types.ObjectId],
        ref: "Task",
    }
})

const Owner = mongoose.model("owners", ownerSchema)

export default Owner