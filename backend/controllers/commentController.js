const Review = require('../models/reviewModel')
const Comment = require('../models/commentModel')

module.exports.index = async(req, res) => {
    try {
        const review = await Review.findById(req.params.rid).populate('comments')
        res.status(200).json(review.comments)
    }catch(err){
        res.status(400).json({ error: err.message })
    }
}
 
module.exports.create = async (req, res) => {
    try {
        const comment = await Comment.create(req.body)
        await Review.findByIdAndUpdate(req.params.rid, {
            $push: {
                comments: comment._id
            }
        })
        res.status(200).json(comment)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.delete = async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.cid)
        await Review.findByIdAndUpdate(req.params.rid, {
            $pull: {
                comments: req.params.cid
            }
        })
        res.json({ message: 'deleted successfully' })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.update = async(req, res) => {
    try {
        await Comment.findByIdAndUpdate(req.params.cid, req.body)
        res.json({ message: 'updated successfully' })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}