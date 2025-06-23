const validator = require("validator")
const db = require("../store/store")


/*
    * Controller Function to create a new quote
    * @param {Object} req - The request object containing the quote and author
    * @param {Object} res - The response object to send back the result
    * @returns {Object} - Returns a JSON response with the status and message
*/
const createNewQuote = (req, res) => {
    try {
        const { quote, author } = req.body
        // Validate request body for required fields
        if (validator.isEmpty(quote)) {
            console.log("Quote field cannot be empty")
            return res.status(400).json({
                "error": "Quote field cannot be empty."
            })
        }

        if (validator.isEmpty(author)) {
            console.log("Quote field cannot be empty")
            return res.status(400).json({
                "error": "Author field cannot be empty."
            })
        }
        // Validate quote length
        if (validator.isLength(quote, { min: 0, max: 1000 }) === false) {
            console.log("Quote length must be between 0 and 1000 characters")
            return res.status(400).json({
                "error": "Quote length must be between 0 and 1000 characters."
            })
        }
        const newQuote = {
            "ID": db.getLastID(),
            "Author": author,
            "Quote": quote
        }

        db.items.push(newQuote)

        return res.status(200).json({
            "message": "Quote added successfully",
            newQuote
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            "error": "Something went really wrong with the server. We're working on this..."
        })
    }
}

/*
    * Controller Function to get all quotes
    * This function retrieves all quotes from the database and returns them in a JSON response.
    * @param {Object} req - The request object containing the quote and author
    * @param {Object} res - The response object to send back the result
    * @returns {Object} - Returns a JSON response with the status and message
*/
const getAllQuotes = (req, res) => {
    try {
        if (db.items.length === 0) {
            return res.status(404).json({
                "error": "No quotes found."
            })
        }
        return res.status(200).json({
            "message": "Quotes retrieved successfully",
            "quotes": db.items
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            "error": "Something went really wrong with the server. We're working on this..."
        })
    }
}

module.exports = { createNewQuote,getAllQuotes }