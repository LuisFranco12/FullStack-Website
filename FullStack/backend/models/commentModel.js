const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
}, {timestamps: true})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment