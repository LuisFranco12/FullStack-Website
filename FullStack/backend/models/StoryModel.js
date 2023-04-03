const mongoose = require('mongoose')

const Schema = mongoose.Schema

const storySchema = new Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enums: ['action', 'adventure', 'comedy', 'fantasy', 'horror', 'mystery', 'romance'],
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    reviews: [
        {
            type: mongoose.Types.ObjectId,
            ref:'Review',
            default: []
        }
    ],
    likes: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const Story = mongoose.model('Story', storySchema)

module.exports = Story 