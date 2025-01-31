const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a name'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    },
    premium: {
        type: Boolean,
        default: false
    }
})
const User=mongoose.model('User',userSchema);
module.exports=User;