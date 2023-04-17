const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema({
    recipientEmail: {
        type: String,
        required: true
    },
    recipientText: {
        type: String,
        required: true
    },
    emailDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Content', contentSchema)