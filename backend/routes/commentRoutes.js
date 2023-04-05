const express = require('express')

const router = express.Router()

const commentController = require('../controllers/commentController')

const { protect, userAccess } = require('../middleware/authMiddleware')

router.get('/:rid', commentController.index) //

router.post('/:rid', protect, commentController.create) //

router.delete('/:rid/:cid', protect, userAccess, commentController.delete) //

router.put('/:rid/:cid', protect, userAccess, commentController.update) //

module.exports = router