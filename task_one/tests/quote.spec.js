describe("QuoteController Tests", () => {
    it("should return all quote with a 200 status code", async () => {
        const response = await fetch("http://localhost:8000/api/v1/quotes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty("message");
        expect(data).toHaveProperty("quotes");
    }),
    it("should create a new quote with a 200 status code", async () => {
        const newQuote = {
            quote: "The only limit to our realization of tomorrow is our doubts of today.",
            author: "Franklin D. Roosevelt"
        }

        const response = await fetch("http://localhost:8000/api/v1/quotes/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newQuote)
        });

        expect(response.status).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty("message");
        expect(data).toHaveProperty("newQuote");
        expect(data.newQuote).toHaveProperty("ID");
        expect(data.newQuote).toHaveProperty("Author", newQuote.author);
        expect(data.newQuote).toHaveProperty("Quote", newQuote.quote);
    }),
    it("should return an error for empty quote field", async () => {
        const response = await fetch("http://localhost:8000/api/v1/quotes/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ quote: "", author: "Test Author" })
        });

        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data).toHaveProperty("error", "Quote field cannot be empty.");
    }),
    it("should return an error for empty author field", async () => {
        const response = await fetch("http://localhost:8000/api/v1/quotes/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ quote: "Test Quote", author: "" })
        });

        expect(response.status).toBe(400);
        const data = await response.json();
        expect(data).toHaveProperty("error", "Author field cannot be empty.");
    })
})