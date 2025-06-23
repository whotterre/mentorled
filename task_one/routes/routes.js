const express = require("express")
const router = express.Router()
const { createNewQuote, getAllQuotes } = require("../controllers/quoteController")

const base = "/api/v1"
// Append routes to router multiplexer 
router.get(`${base}/quotes`, getAllQuotes)
router.post(`${base}/quotes/new`, createNewQuote)

module.exports = router