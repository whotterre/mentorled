// Driver code for the server program
import cors from "cors";
import router from "./routes/routes";
import express from "express";
import mongoose from "mongoose";
const PORT = process.env.PORT || 8000
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/v1", router);

// Connect to database
(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/authdb");
        console.info("Connected to MongoDB database successfully!")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1)
    }

})()


app.listen(PORT, () => {
    console.log(`Auth API cooking on port ${PORT}`)
})