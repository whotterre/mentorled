"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.signupUser = void 0;
const validator = require("validator");
const User = require("../models/user");
/*
    A controller function to sign up a user

*/
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (validator.isEmpty(name)) {
        return res.status(400).json({ "error": "Name field is required to sign up" });
    }
    if (validator.isEmpty(email)) {
        return res.status(400).json({ "error": "Email field is required to sign up" });
    }
    if (validator.isEmpty(password)) {
        return res.status(400).json({ "error": "Password field is required to sign up" });
    }
    // Check if user already exists
    const userExists = yield User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ "error": "User already exists with that email. Try signing up." });
    }
    const newUser = new User({
        email,
        name,
        password
    });
    yield newUser.save();
    return res.status(200).json({
        "message": "User account created successfully!",
        "user": newUser
    });
});
exports.signupUser = signupUser;
/*
    Controller function to login a user
    
*/
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (validator.isEmpty(email)) {
        return res.status(400).json({ "error": "Email field is required to login" });
    }
    if (validator.isEmpty(password)) {
        return res.status(400).json({ "error": "Password field is required to login" });
    }
    const user = yield User.findOne({ email });
    if (!user) {
        return res.status(400).json({ "error": "User does not exist with that email. Try signing up." });
    }
    if (user.password !== password) {
        return res.status(400).json({ "error": "Incorrect password. Please try again." });
    }
    return res.status(200).json({
        "message": "User logged in successfully!",
        "user": user
    });
});
exports.loginUser = loginUser;
