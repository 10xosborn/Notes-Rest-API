require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to database and start server
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Start Express server
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🏥 Health check: http://localhost:${PORT}/health`);
        });

        // Graceful shutdown
        process.on('SIGTERM', () => {
            console.log('⚠️  SIGTERM signal received: closing HTTP server');
            server.close(() => {
                console.log('✅ HTTP server closed');
                process.exit(0);
            });
        });

        process.on('SIGINT', () => {
            console.log('\n⚠️  SIGINT signal received: closing HTTP server');
            server.close(() => {
                console.log('✅ HTTP server closed');
                process.exit(0);
            });
        });

    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();
