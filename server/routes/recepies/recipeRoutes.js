const express = require('express')
const Router = new express.Router()
const recipeConfig = require('../../multerConfig/recipeConfig/recipeUploda')
const recipeControllers = require('../../controllers/recepies/recipesController')
const userMiddleware = require('../../middleware/middleware')

// recipes routes
Router.post('/createRecipe',userMiddleware,recipeConfig.single('recipeImg'),recipeControllers.createRecipe)
Router.patch('/updateRecipe/:id',userMiddleware,recipeConfig.single('recipeImg'),recipeControllers.updateRecipe)
Router.delete('/deleteRecipe/:id',userMiddleware,recipeControllers.deleterecipe)

Router.get('/getSinglerecipe/:id',recipeControllers.getSinglerecipe)
Router.get('/getAll',recipeControllers.getAlldatawithserchpagination)

module.exports = Router ; 