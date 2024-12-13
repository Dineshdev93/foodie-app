const express = require('express');
const Router = new express.Router;
const userMiddleware = require('../../middleware/middleware')
const reviewController = require('../../controllers/reviews/reviewController');



Router.post('/createreview/:recipeid',userMiddleware,reviewController.createreview)
Router.patch('/editreview/:reviewid',userMiddleware,reviewController.updatereview)
Router.get('/getalldata/:recipeid',reviewController.getallReviewdata)
Router.delete('/deletereview/:reviewid',userMiddleware,reviewController.deleteReview)

module.exports = Router ; 