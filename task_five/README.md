# Task Five - Task Management API with Prisma

A comprehensive REST API for task management built with Express.js, TypeScript, Prisma, and PostgreSQL. This solution implements all required CRUD operations with JWT authentication, user ownership, and advanced filtering capabilities.

## 📋 Requirements Implementation

### ✅ CRUD Operations for Tasks
Complete implementation of Create, Read, Update, and Delete operations for tasks with the following schema:

- **title** (string) - Required task title
- **description** (text) - Detailed task description  
- **due_date** (date) - Task deadline with proper date validation
- **completed** (boolean) - Task completion status with default false
- **priority** (enum) - LOW, MEDIUM, HIGH priority levels

### ✅ User Ownership & Authentication
- **JWT-based Authentication**: Secure user registration and login
- **User Isolation**: Each user can only access their own tasks
- **Protected Routes**: All task endpoints require valid JWT tokens
- **Password Security**: bcrypt hashing for secure password storage

### ✅ Extra Endpoints & Features
- **Task Completion**: `PATCH /tasks/:id/complete` endpoint to mark tasks as completed
- **Advanced Filtering**: Filter tasks by completion status, priority, and due date range
- **Flexible Updates**: Partial updates using PATCH with selective field modification

### ✅ Validation & Error Handling
- **Input Validation**: No empty titles, valid date formats, required field checks
- **HTTP Status Codes**: Proper status codes (400, 401, 403, 404, 500)
- **Meaningful Errors**: Descriptive error messages for all failure scenarios
- **Type Safety**: Full TypeScript implementation with Prisma type generation

### ✅ Bonus Features
- **Pagination Support**: Limit/offset pagination on task list endpoint
- **Timestamps**: Automatic `createdAt` and `updatedAt` tracking
- **Priority Management**: Enum-based priority system with validation

## 🚀 API Endpoints

### Authentication Endpoints
| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/auth/signup` | Register new user | `{name, email, password}` |
| POST | `/auth/login` | Login user | `{email, password}` |

### Task Management Endpoints (Protected)
| Method | Endpoint | Description | Body | Query Params |
|--------|----------|-------------|------|--------------|
| POST | `/tasks` | Create new task | `{title, description, dueDate, priority}` | - |
| GET | `/tasks` | Get user tasks with filtering | - | `limit, offset, completed, priority, dueDateFrom, dueDateTo` |
| GET | `/tasks/:id` | Get specific task | - | - |
| PATCH | `/tasks/:id` | Update task | `{title?, description?, dueDate?, priority?, completed?}` | - |
| PATCH | `/tasks/:id/complete` | Mark task as completed | - | - |
| DELETE | `/tasks/:id` | Delete task | - | - |

## 🛠️ Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Language**: TypeScript for type safety
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Custom validation with meaningful error messages
- **API Documentation**: Swagger UI integration
- **Development Tools**: nodemon, ts-node

## 📦 Installation & Setup

### Prerequisites
- Node.js (v20+)
- PostgreSQL database
- npm or yarn

### Quick Start

1. **Clone & Install**
   ```bash
   git clone <repository-url>
   cd task_five
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your database credentials:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/task_five_db"
   JWT_SECRET="your_super_secret_jwt_key_here"
   JWT_EXPIRY="1h"
   PORT=3000
   ```

3. **Database Setup**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev --name init
   
   # (Optional) View database
   npx prisma studio
   ```

4. **Start Development Server**
   ```bash
   npm run start
   ```
   API available at: `http://localhost:3000`
   
   Swagger Documentation: `http://localhost:3000/api-docs`

## 🗄️ Database Schema
```prisma
model User {
  userId    String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  tasks     Task[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Task {
  taskId      String    @id @default(cuid())
  title       String
  description String
  dueDate     DateTime?
  completed   Boolean   @default(false)
  priority    Priority  @default(LOW)
  userId      String
  user        User      @relation(fields: [userId], references: [userId])
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

enum Priority {
  LOW
  MEDIUM
  HIGH
}
```

## 📚 API Usage Examples

### Authentication Flow

#### 1. Register User
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "userId": "cluser123...",
    "email": "john@example.com",
    "name": "John Doe"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 2. Login User
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Task Management

#### 3. Create Task
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Complete API Documentation",
    "description": "Write comprehensive documentation for the task management API",
    "dueDate": "2025-07-15T10:00:00Z",
    "priority": "HIGH"
  }'
```

#### 4. Get Tasks with Filtering & Pagination
```bash
# Get all tasks with pagination
curl -X GET "http://localhost:3000/tasks?limit=10&offset=0" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Filter by completion status
curl -X GET "http://localhost:3000/tasks?completed=false" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Filter by priority
curl -X GET "http://localhost:3000/tasks?priority=HIGH" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Filter by due date range
curl -X GET "http://localhost:3000/tasks?dueDateFrom=2025-07-01&dueDateTo=2025-07-31" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### 5. Update Task
```bash
curl -X PATCH http://localhost:3000/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Updated Task Title",
    "priority": "MEDIUM"
  }'
```

#### 6. Mark Task as Completed
```bash
curl -X PATCH http://localhost:3000/tasks/TASK_ID/complete \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### 7. Delete Task
```bash
curl -X DELETE http://localhost:3000/tasks/TASK_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔒 Security Features

- **JWT Authentication**: All task endpoints require valid JWT tokens
- **User Isolation**: Tasks are filtered by user ID to prevent unauthorized access
- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **Input Validation**: Comprehensive validation for all request data
- **SQL Injection Prevention**: Prisma ORM provides built-in protection
- **Rate Limiting**: (Recommended for production)

## ✅ Validation Rules

### User Registration
- **Email**: Must be valid email format and unique
- **Password**: Minimum 6 characters
- **Name**: Optional but recommended

### Task Creation/Updates
- **Title**: Required, non-empty string
- **Description**: Required, non-empty string
- **Due Date**: Valid ISO date format (optional)
- **Priority**: Must be LOW, MEDIUM, or HIGH
- **Completed**: Boolean value

## 🔧 Error Handling

The API returns consistent error responses with appropriate HTTP status codes:

```json
{
  "error": "Descriptive error message",
  "details": "Additional context when available"
}
```

### Status Codes
- **200**: Success
- **201**: Created successfully
- **400**: Bad request (validation errors)
- **401**: Unauthorized (missing/invalid token)
- **403**: Forbidden (insufficient permissions)
- **404**: Not found
- **500**: Internal server error

## 📖 Swagger Documentation

Interactive API documentation is available at `http://localhost:3000/api-docs` when the server is running. The Swagger UI provides:

- Complete endpoint documentation
- Request/response schemas
- Interactive testing interface
- Authentication examples



## 🚀 Deployment
### Environment Variables
```env
NODE_ENV=production
DATABASE_URL=your_production_database_url
JWT_SECRET=your_production_jwt_secret
PORT=3000
```
## 📁 Project Structure

```
task_five/
├── controllers/           # Request handlers
│   ├── authController.ts
│   └── taskController.ts
├── services/             # Business logic
│   ├── user.service.ts
│   └── task.service.ts
├── middleware/           # Custom middleware
│   └── authMiddleware.ts
├── prisma/              # Database schema
│   ├── schema.prisma
│   └── migrations/
├── docs/             # API documentation
│   └── swagger.json
└── server.ts           # Application entry point