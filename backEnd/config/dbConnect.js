const mongoose = require('mongoose');
// const dotenv =require('dotenv'); // do need it becaus in server.js we called it before monogodb
// dotenv.config();


const dbConnect = () => {

    // connect DB
    mongoose.connect(process.env.MONGODB_URL, {
        // useFindAndModify: false, // depriciated 
        // useCreateIndex: false, // depriciated 
        // useUnifiedTopology: false, // depriciated 
        // useNewUrlParser: false, // depriciated 
    })
        .then(() => console.log('Db Connected'))
        .catch(err => console.log(err));
};


module.exports = dbConnect;

