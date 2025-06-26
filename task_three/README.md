# Blog API - MentorLed Task Three Solution

## Problem Statement
Create APIs to manage authors and their posts:
- GET /posts - Get all posts
- GET /posts/:id - Get single post
- POST /posts - Create new post
- PUT /posts/:id - Update post
- DELETE /posts/:id - Delete post
- GET /authors - List all authors

Requirements:
- A post must belong to an author (1-to-many relationship)
- Use a database (MongoDB)
- Include validation for all requests

## Solution Overview
I implemented a RESTful API with Express.js and MongoDB using Mongoose for data modeling. The API features:
- JWT authentication for protected routes
- Comprehensive request validation
- Proper error handling
- 1-to-many relationship between Authors and Posts
- cURL examples for easy testing

# Blog API - cURL Quick Reference

The API is served at `http://localhost:8000/api/v1`.

## Authentication Endpoints

### 1. User Registration

```bash
curl -X POST http://localhost:8000/api/v1/signup \
     -H "Content-Type: application/json" \
     -d '{ "name": "Jane Doe", "email": "jane@example.com", "password": "secure123" }'
```

### 2. User Login

```bash
curl -X POST http://localhost:8000/api/v1/login \
     -H "Content-Type: application/json" \
     -d '{ "email": "jane@example.com", "password": "secure123" }'
```

## Author Endpoints

### 3. Get All Authors (Protected)

```bash
curl -X GET http://localhost:8000/api/v1/authors \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Post Endpoints (All Protected)

### 4. Get All Posts

```bash
curl -X GET http://localhost:8000/api/v1/posts \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 5. Create New Post

```bash
curl -X POST http://localhost:8000/api/v1/posts \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{ "title": "First Post", "content": "This is my first blog post!", "author": "AUTHOR_ID" }'
```

### 6. Get Single Post

```bash
curl -X GET http://localhost:8000/api/v1/posts/POST_ID \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 7. Update Post

```bash
curl -X PUT http://localhost:8000/api/v1/posts/POST_ID \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{ "title": "Updated Title", "content": "Updated content" }'
```

### 8. Delete Post

```bash
curl -X DELETE http://localhost:8000/api/v1/posts/POST_ID \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Validation Examples

### 9. Registration Validation (Missing Name)

```bash
curl -X POST http://localhost:8000/api/v1/signup \
     -H "Content-Type: application/json" \
     -d '{ "email": "jane@example.com", "password": "secure123" }'
```

### 10. Post Creation Validation (Empty Title)

```bash
curl -X POST http://localhost:8000/api/v1/posts \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{ "title": "", "content": "Empty title test", "author": "AUTHOR_ID" }'
```

## How to Use

1. Start your MongoDB service
2. Run the API server: `npm start`
3. Use the cURL commands above to test the API
4. Replace `JWT_SECRET`, `JWT_EXPIRY`, `PORT `and `MONGO_URI=` with actual values in the .env
5. For protected routes, first register/login to get a JWT token

