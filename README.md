# Notes REST API

A production-ready REST API for managing notes with user authentication, built with Node.js, Express, and MongoDB.

## Features

- ✅ Create, Read, Update, Delete notes
- ✅ Pagination and sorting
- ✅ Full-text search
- ✅ Category filtering
- ✅ Input validation with Joi
- ✅ Centralized error handling
- ✅ Production-ready architecture

## 🛠 Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Validation**: Joi
- **Logging**: Morgan
- **Environment**: dotenv

## Project Structure

```
NOTES REST API/
│
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   └── note.controller.js    # Business logic
│   ├── models/
│   │   └── note.model.js         # Mongoose schema
│   ├── routes/
│   │   └── note.routes.js        # API routes
│   ├── middleware/
│   │   ├── validate.js           # Validation middleware
│   │   └── errorHandler.js       # Error handling
│   ├── validators/
│   │   └── note.validation.js    # Joi schemas
│   ├── utils/
│   │   └── ApiError.js           # Custom error class
│   └──app.js                     # Express app setup and server bootstrap
│
├── .env                          # Environment variables (create this!)
├── .gitignore
├── package.json
└── README.md
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Steps

1. **Clone or navigate to the project directory**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables**
   
   Edit `.env` and add your MongoDB connection string:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-api?retryWrites=true&w=majority
   NODE_ENV=development
   ```

   **To get your MongoDB Atlas URI:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your credentials

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **For production**
   ```bash
   npm start
   ```

## API Endpoints

### Health Check
```
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Notes Endpoints (examples for search & pagination)

Base route (requires Authorization header, middleware: requireAuth):
- POST   /api/note          # Create a note
- GET    /api/note          # Get all notes (supports pagination)
- GET    /api/note/search   # Full-text search across title and content
- GET    /api/note/:id      # Get a single note
- PUT    /api/note/:id      # Update a note
- DELETE /api/note/:id      # Delete a note

Note: the controller sorts results by createdAt descending (newest first).

#### Pagination (GET /api/note)
Query params:
- page (optional, default: 1) — page number
- limit (optional, default: 10) — number of items per page

Examples:
```bash
# Default (page 1, 10 items)
curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:5000/api/note

# Page 2, 5 items per page
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:5000/api/note?page=2&limit=5"
```

Sample response:
```json
{
  "message": "Notes fetched",
  "data": [
    {
      "_id": "62f1f77bcf86cd799439011",
      "title": "Meeting Notes",
      "content": "Discussed quarterly objectives...",
      "category": "Work",
      "tags": "meeting,quarterly",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
    // more notes...
  ]
}
```

Behavior: the controller uses skip = (page - 1) * limit with limit(Number(limit)) and skip(Number(skip)). If you have 25 notes with limit=10:
- page=1 returns notes 1-10
- page=2 returns notes 11-20
- page=3 returns notes 21-25

#### Full-text Search (GET /api/note/search)
Query params:
- search (required) — search string applied with MongoDB full-text search across title and content.

Examples:
```bash
# Search for "project"
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:5000/api/note/search?search=project"

# Multi-word search (URL-encoded)
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:5000/api/note/search?search=project%20kickoff"
```

Sample response:
```json
{
  "message": "Notes fetched",
  "data": [
    {
      "_id": "62f1f77bcf86cd799439012",
      "title": "Project Kickoff",
      "content": "Kickoff notes for the new project...",
      "category": "Work",
      "tags": "project,kickoff",
      "createdAt": "2024-01-13T09:15:00.000Z",
      "updatedAt": "2024-01-13T09:15:00.000Z"
    }
  ]
}
```

Note: Search returns all matches found by the MongoDB $text query as implemented in the controller. If you want pagination on search results, you may add pagination logic to the search controller (e.g., .skip()/.limit()).

#### Quick workflows

Create → paginate → search:
```bash
# 1. Create
curl -X POST -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Q1 Planning","content":"Quarterly planning and budget review","category":"Planning"}' \
  http://localhost:5000/api/note

# 2. List, first page (10 items)
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:5000/api/note?page=1&limit=10"

# 3. Search for "Q1"
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:5000/api/note/search?search=Q1"
```

## Testing the Setup

1. **Test the health endpoint:**
   ```bash
   curl http://localhost:5000/health
   ```

2. **Expected response:**
   ```json
   {
     "success": true,
     "message": "Server is running",
     "timestamp": "2024-01-01T12:00:00.000Z"
   }
   ```

## Deployment to Render.com

### Steps:

1. **Push your code to GitHub** (make sure `.env` is in `.gitignore`)

2. **Create a new Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure the service:**
   - **Name**: notes-rest-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Add Environment Variables:**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `NODE_ENV`: production
   - `PORT`: (leave empty, Render sets this automatically)

5. **Deploy!**

## Development Roadmap

### Phase 1: Setup & Infrastructure (COMPLETE)
- [x] Project initialization
- [x] Dependencies installed
- [x] Folder structure created
- [x] Error handling middleware
- [x] Database configuration
- [x] Server bootstrap

### Phase 2: Schema & Validation (NEXT)
- [ ] Mongoose Note model
- [ ] Joi validation schemas
- [ ] Validation middleware integration

### Phase 3: CRUD Endpoints
- [ ] Create note
- [ ] Get all notes
- [ ] Get single note
- [ ] Update note
- [ ] Delete note

### Phase 4: Advanced Features
- [ ] Pagination
- [ ] Sorting
- [ ] Full-text search
- [ ] Category filtering

### Phase 5: Deployment
- [ ] Render.com setup
- [ ] Production testing
- [ ] Documentation finalization

## Contributing

This is a learning project following production-ready best practices.

## License

ISC
