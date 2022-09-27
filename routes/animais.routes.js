const animaisRoutes =require('express').Router()

const animais = require ('../controllers/animais.controller')
const { validaToken } = require('../middlewares/auth');


animaisRoutes.get("/all",validaToken, animais.findAll);

animaisRoutes.get("/show/:id",validaToken, animais.findOne);

animaisRoutes.post("/create", validaToken,animais.create);

animaisRoutes.put("/update",validaToken, animais.update);

animaisRoutes.delete("/delete/:id",validaToken, animais.delete);

animaisRoutes.get("/view-profile/:id",validaToken, animais.viewProfile);

animaisRoutes.put("/edit-profile-image",validaToken,upload.single('image'), animais.editProfileImage);



module.exports = animaisRoutes;