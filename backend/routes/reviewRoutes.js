const express = require('express')

const router = express.Router()

const reviewController = require('../controllers/reviewController')

const { protect, userAccess } = require('../middleware/authMiddleware')

router.get('/:sid', reviewController.index) //

router.post('/:sid', protect, reviewController.create) //

router.delete('/:sid/:rid', protect, userAccess, reviewController.delete) //

router.put('/:sid/:rid', protect, userAccess,  reviewController.update) //

router.get('/:sid/:rid', reviewController.show)

module.exports = router