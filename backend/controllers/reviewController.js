const Story = require('../models/StoryModel')
const Review = require('../models/reviewModel')
const Comment = require('../models/commentModel')

module.exports.index = async(req, res) => {
    try {
        const story = await Story.findById(req.params.sid).populate({
            path: 'reviews',
            populate: {
                path: 'comments'
            }
        })
        res.status(200).json(story.reviews)
    }catch(err){
        res.status(400).json({ error: err.message })
    }
}
 
module.exports.create = async (req, res) => {
    try {
        const review = await Review.create(req.body)
        await Story.findByIdAndUpdate(req.params.sid, {
            $push: {
                reviews: review._id
            }
        })
        res.status(200).json(review)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.delete = async (req, res) => {
    try {
        
        const review = await Review.findByIdAndDelete(req.params.rid)
        await Story.findByIdAndUpdate(req.params.sid, {
            $pull: {
                reviews: req.params.rid
            }
        })

        await Comment.deleteMany({ _id: {
            $in: review.comments
        } })
        
        res.json({ message: 'deleted successfully' })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.update = async(req, res) => {
    try {
        await Review.findByIdAndUpdate(req.params.rid, req.body)
        res.json({ message: 'updated successfully' })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.show = async (req, res) => {
    try {
        const review = await Review.findById(req.params.rid).populate('comments')
        res.status(200).json(review)
    }catch(err) {
        res.status(400).json({ error: err.message })
    }
}
