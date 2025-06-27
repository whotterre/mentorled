// Driver code for the server program

import cors from "cors";
import router from "./routes/routes.js";
import express from "express";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require('../docs/specs.json');

const PORT = process.env.PORT || 8000;
const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors())
app.use(express.json())
app.use(router)



app.listen(PORT, () => {
    console.log(`Quotes API cooking on port ${PORT}`)
})