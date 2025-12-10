# Notes REST API

A production-ready REST API for managing notes with user authentication, built with Node.js, Express, and MongoDB.

## Features

- ✅ Create, Read, Update, Delete notes
- ✅ Pagination and sorting
- ✅ Full-text search
- ✅ Category filtering (Work, Personal, Other)
- ✅ Input validation with Joi
- ✅ Centralized error handling
- ✅ User authentication with JWT

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Validation**: Joi
- **Authentication**: JWT & Bcrypt
- **Environment**: dotenv

## Project Structure

```
src/
├── config/db.js
├── controllers/
│   ├── note.controller.js
│   └── user.controller.js
├── models/
│   ├── note.model.js
│   └── user.model.js
├── routes/
│   ├── note.routes.js
│   └── user.route.js
├── middleware/
│   ├── validate.js
│   ├── errorHandler.js
│   └── requireAuth.js
├── utils/ApiError.js
└── app.js
```

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create `.env` file**
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-api
   NODE_ENV=development
   JWT_SECRET=your_jwt_secret_key
   ```

3. **Start server**
   ```bash
   npm run dev
   ```

## Authentication

### Register User
```
POST /sign-up
```

**Request:**
```json
{
  "name": "Feose Chiki",
  "email": "feose@example.com",
  "password": "securePassword123"
}
```

### Login User
```
POST /login
```

**Request:**
```json
{
  "email": "feose@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "logged in",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "feose@example.com",
    "name": "Feose Chiki"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

## API Endpoints

### Health Check
```
GET /health
```

### Notes (all require Authorization header with token)

#### Create Note
```
POST /note
Content-Type: application/json
Authorization: Bearer <TOKEN>
```

**Request:**
```json
{
  "title": "Project Meeting",
  "content": "Discussed Q1 objectives and timeline for delivery",
  "category": "Work",
  "tags": "meeting,project,q1"
}
```

#### Get All Notes with Pagination
```
GET /note?page=1&limit=10
Authorization: Bearer <TOKEN>
```

**Query Parameters:**
- `page` (optional, default: 1) — Page number
- `limit` (optional, default: 10) — Items per page

**Examples:**
```bash
# Get first page (10 items)
curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:5000/note

# Get page 2 with 5 items per page
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:5000/note?page=2&limit=5"

# Get page 3 with 20 items per page
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:5000/note?page=3&limit=20"
```

**Response:**
```json
{
  "message": "Notes fetched",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Project Meeting",
      "content": "Discussed Q1 objectives and timeline for delivery",
      "category": "Work",
      "tags": "meeting,project,q1",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Personal Goals",
      "content": "Read 2 books this month and start exercising regularly",
      "category": "Personal",
      "tags": "goals,health",
      "createdAt": "2024-01-14T15:45:00.000Z",
      "updatedAt": "2024-01-14T15:45:00.000Z"
    }
  ]
}
```

#### Full-Text Search
```
GET /note/search?search=<query>
Authorization: Bearer <TOKEN>
```

**Query Parameters:**
- `search` (required) — Search string applied across title, content, category, and tags

**Examples:**
```bash
# Search for "project"
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:5000/note/search?search=project"

# Search for "Q1"
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:5000/note/search?search=Q1"

# Search for "meeting goals"
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:5000/note/search?search=meeting%20goals"
```

**Response:**
```json
{
  "message": "Notes fetched",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Project Meeting",
      "content": "Discussed Q1 objectives and timeline for delivery",
      "category": "Work",
      "tags": "meeting,project,q1",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### Get Single Note
```
GET /note/:id
Authorization: Bearer <TOKEN>
```

#### Update Note
```
PUT /note/:id
Content-Type: application/json
Authorization: Bearer <TOKEN>
```

**Request:**
```json
{
  "title": "Updated Project Meeting",
  "content": "Updated content for the meeting",
  "category": "Work",
  "tags": "updated,project"
}
```

#### Delete Note
```
DELETE /note/:id
Authorization: Bearer <TOKEN>
```

## Validation Rules

### Note Schema
- **title**: Required, minimum 5 characters
- **content**: Required, 10-250 characters
- **category**: Optional, enum: "Work", "Personal", "Other" (default: "Other")
- **tags**: Optional, comma-separated string

### User Schema
- **name**: Required, minimum 2 characters
- **email**: Required, valid email format, unique
- **password**: Required, minimum 6 characters (recommended)

## Deployment

Push to GitHub and deploy on Render.com:
1. Create Web Service from GitHub repo
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables: `MONGODB_URI`, `NODE_ENV=production`, `JWT_SECRET`

## License

ISC

© [Osborn Tulasi, Emmanuel Kuuku Dela Agyei, Ekwem Chidumaga Emmanuel, Feosi Chiki and Amos Ofori Ottei]