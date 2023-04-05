const jwt = require('jsonwebtoken')

const Story = require('../models/StoryModel')
const Review = require('../models/reviewModel')
const Comment = require('../models/commentModel')

const protect = async (req, res, next) => {

    try {
        let token = req.header("Authorization")

        if (!token) { 
            throw new Error('No token provided')
        }

        token = token.replace("Bearer ", "")

        const payload = jwt.verify(token, process.env.JWT_SECRET)

        if (payload.error) {
            throw new Error(payload.error)
        }

        req.id = payload.id
        req.user = payload.user

        next()

    } catch(err) {
        console.log(err)
        res.status(403).json({ error: err.message })
    }
}

const userAccess = async (req, res, next) => {
    try{
        let resources
        if(req.baseUrl.includes('story')) {
            resources = await Story.findOne({ _id: req.params.id, author: req.user })
        }else if(req.baseUrl.includes('review'))  {
            resources = await Review.findOne({ _id: req.params.rid, reviewer: req.user })
        }else {
            resources = await Comment.findOne({ _id: req.params.cid, author: req.user })
        }

        if(!resources) {
            throw new Error('You do not have access to make changes')
        }

        next()
    }catch(err) {
        res.status(403).json({ error: err.message })
    }
}

module.exports = { protect, userAccess }