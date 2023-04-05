const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/UserModel')

// // generate a token
// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, {
//         expiresIn: 60
//     })
// }

const registerUser = async(req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username })

        if (foundUser) {
            return res.status(400).json({ error: 'User already exists' })
        }

        const salt = await bcrypt.genSalt(10)
        const encryptedPassword = await bcrypt.hash(req.body.password, salt) 

        const newUser = await User.create({ ...req.body, password: encryptedPassword })

        const payload = { id: newUser._id, user: newUser.username }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 2000 })

        res.status(200).json({ token }) 
    } catch(err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }
}

const loginUser = async(req, res) => {
    try {
        const foundUser = await User.findOne({ username: req.body.username })

        if (!foundUser) {
            return res.status(404).json({ error: 'No such user exists' })
        }

        const validPass = await bcrypt.compare(req.body.password, foundUser.password)

        if (!validPass) {
            return res.status(400).json({ error: 'Invalid credentials' })
        }

        const payload = { id: foundUser._id, user: foundUser.username }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 2000 })

        res.status(200).json({ token, message: "you logged in" }) 

    } catch(err) {
        console.log(err)
        res.status(400).json({ error: err.message})
    }
}

const show = async (req, res) => {
    try {
        const foundUser = await User.findById(req.id)
        
        res.json({ 
            username: foundUser.username, 
            email: foundUser.email,
            id: req.id 
        })

    } catch (error) {
        res.json({ error: error.message })
    }
}

module.exports = {
    registerUser,
    loginUser,
    show
}