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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.loginUser = exports.signupUser = void 0;
const validator_1 = __importDefault(require("validator"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/*
    A controller function to sign up a user
*/
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (validator_1.default.isEmpty(name)) {
            return res.status(400).json({ "error": "Name field is required to sign up" });
        }
        if (validator_1.default.isEmpty(email)) {
            return res.status(400).json({ "error": "Email field is required to sign up" });
        }
        if (validator_1.default.isEmpty(password)) {
            return res.status(400).json({ "error": "Password field is required to sign up" });
        }
        // Check if user already exists
        const userExists = yield user_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ "error": "User already exists with that email. Try signing up." });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new user_1.default({
            email,
            name,
            password: hashedPassword
        });
        yield newUser.save();
        return res.status(200).json({
            "message": "User account created successfully!",
            "user": newUser
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ "error": "Something went really wrong on our end when you tried to sign up" });
    }
});
exports.signupUser = signupUser;
/*
    Controller function to login a user

*/
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (validator_1.default.isEmpty(email)) {
            return res.status(400).json({ "error": "Email field is required to login" });
        }
        if (validator_1.default.isEmpty(password)) {
            return res.status(400).json({ "error": "Password field is required to login" });
        }
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ "error": "User does not exist with that email. Try signing up." });
        }
        const isValidPassword = bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ "error": "Incorrect password. Please try again." });
        }
        // Sign JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: parseInt(process.env.JWT_EXPIRY || "15", 10) });
        return res.status(200).json({
            "message": "User logged in successfully!",
            "user": user,
            "accessToken": token
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ "error": "Something went really wrong on our end when you tried to sign in" });
    }
});
exports.loginUser = loginUser;
/*
    Gets a user profile
*/
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        // Fetch user profile
        const userProfile = yield user_1.default.findOne({ _id: userId });
        if (!userProfile) {
            return res.status(404).json({ "error": "User profile doesn't exist with that ID" });
        }
        return res.status(200).json({ "message": "User profile fetched successfully", "userId": userId });
    }
    catch (e) {
        return res.status(500).json({ "error": "Something went wrong while try to fetch your profile on our end" });
    }
});
exports.getProfile = getProfile;
