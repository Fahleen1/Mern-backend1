const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    message: {
        type: String,
        maxLength: 500 
    },
    created_at: {
        type: Date,
        required: true
    }
});

const Chat = mongoose.model("Chat", userSchema);
module.exports = Chat;