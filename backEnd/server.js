const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const usersRoute = require('./routes/usersRoute');
require('./config/dbConnect')();
const error = require('./middlewares/errorMiddlewareHandler');


// instace of express 
const app = express();

// pass the data of body 
app.use(express.json());



// Routes 

/* Note :
 here on every route we have : /api/uesrs/  
so can do something that make it general  */

app.use('/api/users', usersRoute);


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

