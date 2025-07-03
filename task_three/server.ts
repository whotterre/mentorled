// Driver code for the server program
import cors from "cors";
import router from "./routes/routes";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
// Swagger serve related stuff 
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "./docs/spec.json"
const PORT = process.env.PORT || 8000
const app = express()

dotenv.config()

app.use(cors())
app.use(express.json());
app.use("/api/v1/", router);
// Serve Swagger stuff on a special route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Connect to database
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.info("Connected to MongoDB database successfully!")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1)
    }

})()


app.listen(PORT, () => {
    console.log(`Auth API cooking on port ${PORT}`)
})
