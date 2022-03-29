const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({

    first_name: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: [true, 'Email is already exist']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: [true, 'Username is already exist']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true
    },
    company: {
        type: String,
        required: [false],
        trim: true
    },
    profile_pic: {
        type: String,
        required: [false]
    },
    is_delete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', user);
