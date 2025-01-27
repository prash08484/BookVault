const mongoose = require('mongoose');


const dbConnect = () => {

    // connect DB
    mongoose.connect('mongodb+srv://prashantyug23cs:x6KpO51lv9tW8jL7@cluster0.wffsn.mongodb.net/', {
        // useFindAndModify: false, // depriciated 
        // useCreateIndex: false, // depriciated 
        // useUnifiedTopology: false, // depriciated 
        // useNewUrlParser: false, // depriciated 
    })
        .then(() => console.log('Db Connected'))
        .catch(err => console.log(err));
};


module.exports = dbConnect;

