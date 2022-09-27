const clientesRoutes = require('express').Router();
const clientes = require('../controllers/clientes.controller');
const { validaToken } = require('../middlewares/auth');



clientesRoutes.get("/all",validaToken, clientes.findAll);

clientesRoutes.get("/show/:id",validaToken, clientes.findOne);

clientesRoutes.post("/create",validaToken, clientes.create);

clientesRoutes.put("/update",validaToken, clientes.update);

clientesRoutes.delete("/delete/:id",validaToken, clientes.delete);








module.exports = clientesRoutes;