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

// CORS middleware to allow frontend requests
const allowedOrigins = [
  'http://localhost:3000', // Development
  'https://bookvault.vercel.app', // Production (update with your actual Vercel URL)
  'https://bookvault-frontend.vercel.app', // Alternative production URL
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || !origin) {
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

YT LEC: https://www.youtube.com/watch?v=iPbdQwKpKCQ
User name : prashantyug23cs
Password: x6KpO51lv9tW8jL7
Link : mongodb+srv://prashantyug23cs:x6KpO51lv9tW8jL7@cluster0.wffsn.mongodb.net/

npm run server 


*/

