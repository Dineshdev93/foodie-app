const express = require('express')
const router = new express.Router();
const userController = require('../../controllers/users/userController')
const userImage = require('../../multerConfig/userConfig/userProfile')
const authMiddleware = require('../../middleware/middleware')

// user auth routes
router.post('/register', userImage.single("userProfile"), userController.Register)
router.post('/login',userController.Login)
router.post('/logout',userController.logout)
router.post('/forgotpassword',userController.forgotpassword)
router.get('/forgotpassdetails/:id/:token',userController.forgotpassdetails)
router.put('/resetPassword/:id/:token',userController.resetPassword)

// verify User
router.get('/verifyUser',authMiddleware,userController.verifyUSer)
module.exports = router


