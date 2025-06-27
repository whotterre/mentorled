// Driver code for the server program

const cors = require("cors");
const router = require("./routes/routes.js");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./docs/openapi.json');

const PORT = process.env.PORT || 8000;
const app = express();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors())
app.use(express.json())
app.use(router)



app.listen(PORT, () => {
    console.log(`Quotes API cooking on port ${PORT}`)
})