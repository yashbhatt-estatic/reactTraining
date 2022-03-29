const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({

    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
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
    city: {
        type: String,
        required: [false],
        trim: true
    },
    state: {
        type: String,
        required: [false],
        trim: true
    },
    country: {
        type: String,
        required: [false],
        trim: true
    },
    department: {
        type: String,
        required: [false],
        trim: true
    },
    gender: {
        type: String,
        required: [false],
        trim: true,
    },
    is_delete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ReactNodeUsers', user);
