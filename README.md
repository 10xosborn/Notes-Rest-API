# Notes REST API

Production-ready Notes REST API built with Node.js, Express, MongoDB Atlas, and Mongoose.

## 🚀 Features

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

## 📁 Project Structure

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
│   ├── app.js                    # Express app setup
│   └── server.js                 # Server bootstrap
│
├── .env                          # Environment variables (create this!)
├── .env.example                  # Environment template
├── .gitignore
├── package.json
└── README.md
```

## 🔧 Installation

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

## 📝 API Endpoints

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

### Notes Endpoints (Coming in Phase 2-4)

```
POST   /api/notes          # Create a note
GET    /api/notes          # Get all notes (with pagination, search, filter)
GET    /api/notes/:id      # Get a single note
PUT    /api/notes/:id      # Update a note
DELETE /api/notes/:id      # Delete a note
```

## 🧪 Testing the Setup

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

## 🚢 Deployment to Render.com

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

## 📚 Development Roadmap

### ✅ Phase 1: Setup & Infrastructure (COMPLETE)
- [x] Project initialization
- [x] Dependencies installed
- [x] Folder structure created
- [x] Error handling middleware
- [x] Database configuration
- [x] Server bootstrap

### 🔄 Phase 2: Schema & Validation (NEXT)
- [ ] Mongoose Note model
- [ ] Joi validation schemas
- [ ] Validation middleware integration

### 🔄 Phase 3: CRUD Endpoints
- [ ] Create note
- [ ] Get all notes
- [ ] Get single note
- [ ] Update note
- [ ] Delete note

### 🔄 Phase 4: Advanced Features
- [ ] Pagination
- [ ] Sorting
- [ ] Full-text search
- [ ] Category filtering

### 🔄 Phase 5: Deployment
- [ ] Render.com setup
- [ ] Production testing
- [ ] Documentation finalization

## 🤝 Contributing

This is a learning project following production-ready best practices.

## 📄 License

ISC
