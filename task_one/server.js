// Driver code for the server program

const cors = require("cors")
const router = require("./routes/routes")
const express = require("express")
const PORT = process.env.PORT || 8000
const app = express()

app.use(cors())
app.use(express.json())
app.use(router)


app.listen(PORT, () => {
    console.log(`Quotes API cooking on port ${PORT}`)
})