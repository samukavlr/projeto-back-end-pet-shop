const router = require('express').Router();



// //Rota de clientes 
 const clientesRoutes = require('./clientes.routes');
 router.use('/clientes', clientesRoutes);

// Rota dos produtos
//const productsRoutes = require('./products.routes');
//router.use('/products', productsRoutes);

// // Rota dos usuários
const usersRoutes = require('./users.routes');
router.use('/users', usersRoutes);

// // Rota dos funcionários
// const funcionariosRoutes = require('./funcionarios.routes');
// router.use('/funcionarios', usersRoutes);

// Rota dos animais
const animaisRoutes = require('./animais.routes');
router.use('/animais', animaisRoutes);




module.exports = router ;

