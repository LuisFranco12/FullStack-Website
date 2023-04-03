const express = require('express')

const router = express.Router()

const { registerUser, loginUser, show } = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, show)
router.post('/', registerUser)
router.post('/login', loginUser)


module.exports = router