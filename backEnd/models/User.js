const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// schema : its mongoDB file for schema and encryption of pass 

const UserSchema = new mongoose.Schema({
    // this is like class of schema 
    name: {
        type: String,
        required: true, // compulsory
    },
    email: {
        type: String,
        required: true,
        unique: true, // all email should be unique not use same mail by two diff. users 
    },
    password: {
        type: String,
        required: true,
    },

});

// adding salt 
UserSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});


const User = mongoose.model('User', UserSchema);
// now every time create a user then it create a 
// instance that need to pass this schema 

module.exports = User;








