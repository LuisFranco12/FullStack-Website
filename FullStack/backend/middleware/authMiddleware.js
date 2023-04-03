const jwt = require('jsonwebtoken')

const Story = require('../models/StoryModel')
const Review = require('../models/reviewModel')
const Comment = require('../models/commentModel')

const protect = async (req, res, next) => {

    try {
        // 1. Check if the request has a token
        let token = req.header("Authorization") // ->  "Bearer adshjh0249384la;sf"

        if (!token) { 
            throw new Error('No token provided')
        }

        token = token.replace("Bearer ", "") // -> "adshjh0249384la;sf"

        // 2. Check that the token is valid and not expired

        const payload = jwt.verify(token, process.env.JWT_SECRET)

        if (payload.error) {
            throw new Error(payload.error)
        }

        // 3. Attach the payload from the token to the request object (req)

        req.id = payload.id
        req.user = payload.user

        // 4. Move on to the requested route (next)

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