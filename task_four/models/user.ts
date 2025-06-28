import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
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
        ref: "Board",
    }
})

const User = mongoose.model("Users", userSchema)

export default User