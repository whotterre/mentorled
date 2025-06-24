"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
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
    }
});
const User = mongoose.model("users", userSchema);
exports.default = User;
