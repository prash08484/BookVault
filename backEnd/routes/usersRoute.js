const express = require('express');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const usersRoute = express.Router();


/*  
    Initially first line of register : --->   
    usersRoute.post('/api/users/register', async (req, res) => {
    NOW ---> 
    we did not need to add : [ /api/users ] 
    because it is common so i push_front() it in server.js 
    with middleware : app.use('/api/users'); 

*/


// REGISTER USER
usersRoute.post('/register',
    asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            throw new Error('User Exists');
        }
        const userCreated = await User.create({
            email, name, password
        });
        res.send("user created successfully ");

    })
);


// LOGIN USER
// usersRoute.post('/login', asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email: email }); // for email in db 


//     if (user && (await bcrypt.compare(password,user.password))) {
//         // set status code
//         console.log("User is login successfully ");
//         res.status(200);
//         res.json({
//             _id: user.id,
//             name: user.name,
//             password: user.password,
//             email: user.email
//         });
//     }
//     else {
//         console.log("Fake user or wrong data  ");
//         res.status(401);
//         throw new Error('Invalid credentials');
//     }
// })


// );




usersRoute.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        console.log("User logged in successfully");
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email
        });
    } else {
        console.log("Fake user or wrong data");
        res.status(401);
        throw new Error('Invalid email or password');
    }
}));



// UPDATE USER
usersRoute.put('/update', (req, res) => {



    res.send("update");


});


// DELETE USER
usersRoute.delete('/:id', (req, res) => {


    res.send("delete");



});

// FETCH USER
usersRoute.get('/', (req, res) => {



    res.send("get");


});


module.exports = usersRoute;