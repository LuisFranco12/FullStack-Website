const express = require('express')

const router = express.Router()

const storyController = require('../controllers/storyController')

const { protect, userAccess } = require('../middleware/authMiddleware')

router.get('/', storyController.index) //

// router.all('/clear', storyController.clear) //

router.delete('/:id', protect, userAccess, storyController.delete) //

router.put('/:id', protect, userAccess, storyController.update) //

router.post('/', protect, storyController.create) //

router.get('/:id', storyController.show) //

module.exports = router