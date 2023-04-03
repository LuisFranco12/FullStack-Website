const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    reviewer: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1.0,
        max: 5.0,
        default: 1.0,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref:'Comment',
            default: []
        }
    ],
}, {timestamps: true})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review