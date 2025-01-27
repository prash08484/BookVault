const express = require('express');
const dotenv = require('dotenv');
const usersRoute = require('./routes/usersRoute');
const error = require('./middlewares/errorMiddlewareHandler');
const bookRouter = require('./routes/bookRoutes');
dotenv.config(); // it should be pre because it accessiblle to its lower file and functions 
require('./config/dbConnect')();



// instace of express 
const app = express();

// pass the data of body 
app.use(express.json());


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

