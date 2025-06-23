# MentorLed Task One Solution

## Problem Statement
Brief: Create a REST API with two endpoints:
GET /quotes – returns a list of quotes
POST /quotes – adds a new quote (basic validation required)
Use an in-memory array or file-based storage.
Include Postman collection or cURL instructions.

## Notes
I decided to go with an in-memory array as the database because file-based storage could have performance overhead due to reading and writing I/O operations.


# Quotes API - cURL Quick Reference

This document provides cURL commands to quickly interact with the Quotes API.
The API is served at `http://localhost:8000/api/v1`.

## API Endpoints cURL Commands

-----

### 1\. Get All Quotes

  * **Endpoint:** `GET /api/v1/quotes`
  * **Description:** Retrieves a list of all existing quotes.


```bash
curl -X GET http://localhost:8000/api/v1/quotes \
     -H "Content-Type: application/json"
```

-----

### 2\. Create a New Quote (Success)

  * **Endpoint:** `POST /api/v1/quotes/new`
  * **Description:** Adds a new quote to the collection.

<!-- end list -->

```bash
curl -X POST http://localhost:8000/api/v1/quotes/new \
     -H "Content-Type: application/json" \
     -d '{ "quote": "The only way to do great work is to love what you do.", "author": "Steve Jobs" }'
```

-----

### 3\. Create a New Quote (Validation Failure - Empty Quote)

  * **Endpoint:** `POST /api/v1/quotes/new`
  * **Description:** Tests validation when the `quote` field is empty.

<!-- end list -->

```bash
curl -X POST http://localhost:8000/api/v1/quotes/new \
     -H "Content-Type: application/json" \
     -d '{ "quote": "", "author": "Test Author" }'
```

-----

### 4\. Create a New Quote (Validation Failure - Empty Author)

  * **Endpoint:** `POST /api/v1/quotes/new`
  * **Description:** Tests validation when the `author` field is empty.

<!-- end list -->

```bash
curl -X POST http://localhost:8000/api/v1/quotes/new \
     -H "Content-Type: application/json" \
     -d '{ "quote": "Test Quote", "author": "" }'
```

-----

### How to Use:

1.  **Start Your API Server:** Ensure your Express.js API is running on `http://localhost:8000`
2.  **Open Terminal:** Open a new terminal window.
3.  **Execute Commands:** Copy and paste any of the cURL commands and press Enter to send the request and see the response.

-----