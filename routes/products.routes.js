const productsRoutes = require('express').Router();
const products = require('../controllers/products.controller')
const { validaToken } = require('../middlewares/auth')

productsRoutes.get('/all', validaToken ,products.findAll)
productsRoutes.get('/show/:id',validaToken, products.findOne)
productsRoutes.post('/create', validaToken,products.create)
productsRoutes.put('/update', validaToken, products.update)
productsRoutes.delete('/delete/:id', validaToken, products.delete)



module.exports = productsRoutes