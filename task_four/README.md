# Task Management API (Mini Trello)

A RESTful API for managing tasks across multiple boards with user authentication.

## Features

- **User Authentication**: JWT-based signup/login
- **Boards Management**: Create, view, and delete task boards
- **Tasks Management**: 
  - Create tasks with status (todo/in-progress/done)
  - Update task details and status
  - Delete tasks
- **Relationships**:
  - Tasks belong to boards
  - Boards belong to users
- **Error Handling**: Consistent error responses

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/v1/signup` | Register new user |
| POST   | `/api/v1/login`  | Login existing user |

### Boards
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/v1/boards` | Get all user's boards |
| POST   | `/api/v1/boards` | Create new board |
| DELETE | `/api/v1/boards/:id` | Delete a board |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/v1/boards/:boardId/tasks` | Get all tasks in a board |
| POST   | `/api/v1/boards/:boardId/tasks` | Create new task |
| PUT    | `/api/v1/tasks/:id` | Update task |
| DELETE | `/api/v1/tasks/:id` | Delete task |

## Tech Stack
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT
- **API Documentation**: Swagger UI

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (create `.env` file):
   ```env
   PORT=8000
   MONGO_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=1d
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API Documentation
Interactive documentation available at:
`http://localhost:8000/api-docs` (when server is running)

## Testing
Use the provided cURL commands or import the Postman collection to test endpoints.

## Error Handling
The API returns consistent error responses:
```json
{
  "status": "error",
  "message": "Descriptive error message"
}
```
