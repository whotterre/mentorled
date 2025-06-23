const express = require("express")
const router = express.Router()
const { createNewQuote } = require("../controllers/quoteController")


// Append routes to router multiplexer 
router.get("/quotes", () => { })
router.post("/quotes/new", createNewQuote)

module.exports = router