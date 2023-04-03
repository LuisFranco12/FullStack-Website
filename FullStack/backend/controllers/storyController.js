const Story = require('../models/StoryModel')
const Review = require('../models/reviewModel')
const Comment = require('../models/commentModel')

module.exports.index = async(req, res) => {

    const {title} = req.query

    const queryObject = {}

    if(title) {
        queryObject.title = {$regex: title, $options: '1'}
    }

    let result = Story.find(queryObject).sort({ createdAt: 1 }).populate({
        path: 'reviews',
        populate: {
            path: 'comments'
        }
    })

    const story = await result

    res.status(200).json(story)
}

module.exports.create = async (req, res) => {
    const story = await Story.create(req.body)

    res.status(200).json(story)
}

module.exports.delete = async (req, res) => {
    try {
       const story = await Story.findByIdAndDelete(req.params.id)

       await Review.deleteMany({ _id: {
        $in: story.reviews
       } })
    //    add a way to delete comments


        res.status(200).json({ message: 'deleted successfully' })
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.update = async (req, res) => {
    try {
        const updatedStory = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(200).json(updatedStory)
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports.show = async(req, res) => {
    try{
        const story = await Story.findById(req.params.id).populate('reviews').populate({
            path: 'reviews',
            populate: {
                path: 'comments'
            }
        })
       res.status(200).json(story)
    }catch(err){
        res.status(400).json({ error: err.message })
    }
}

module.exports.clear = async(req, res) => {
    try{
        await Story.deleteMany({})

        await Review.deleteMany({})

        await Comment.deleteMany({})
        res.status(200).json({message: 'deleted all'})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}