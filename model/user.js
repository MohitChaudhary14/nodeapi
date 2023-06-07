const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        required: true,
        type: String,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now, // use for find date to check.
    }
});

const User = mongoose.model("User", schema)

module.exports = User