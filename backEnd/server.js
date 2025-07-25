const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const usersRoute = require('./routes/usersRoute');
const error = require('./middlewares/errorMiddlewareHandler'); 
const bookRouter = require('./routes/bookRoutes');
dotenv.config({ path: path.join(__dirname, '../.env') }); // Load .env from root directory
require('./config/dbConnect')();



// instace of express 
const app = express();

// Environment variable validation
const requiredEnvVars = ['NODE_ENV'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.warn(`Warning: Environment variable ${envVar} is not set`);
  }
}

// CORS middleware to allow frontend requests
const allowedOrigins = [
  'http://localhost:3000', // Development
  'https://book-vault-aoet.vercel.app', // Your actual Vercel URL
  'https://bookvault.vercel.app', // Alternative URL
  'https://bookvault-frontend.vercel.app', // Alternative production URL
];

// Add additional origins from environment variable if provided
if (process.env.ALLOWED_ORIGINS) {
  allowedOrigins.push(...process.env.ALLOWED_ORIGINS.split(','));
}

app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // Only allow specific origins in production
  if (process.env.NODE_ENV === 'production') {
    if (allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }
  } else {
    // In development, allow all origins
    res.header('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// pass the data of body 
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'BookVault API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to BookVault API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      books: '/api/books',
      health: '/health'
    }
  });
});

// Routes 

/* Note :
    // User Routes
         here on every route we have : /api/uesrs/  
        so can do something that make it general  */
        app.use('/api/users', usersRoute);
    
    
    // Book Routes
        app.use('/api/books',bookRouter);




// Error middleware
app.use(error.errorMiddlewareHandler);


// Server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is up and runing on ${PORT}`);
});



/*
Development Notes:
- Database configuration is handled through environment variables
- Use npm run server to start the development server
*/

