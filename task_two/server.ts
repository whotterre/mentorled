// Driver code for the server program
import cors from "cors";
import router from "./routes/routes";
import express from "express";
const PORT = process.env.PORT || 8000
const app = express()

app.use(cors())
app.use(express.json())
app.use(router)


app.listen(PORT, () => {
    console.log(`Auth API cooking on port ${PORT}`)
})