const multer = require('multer')

module.exports = (multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images/users'),
      cb(null, './public/images/animais')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now().toString() + '_' + file.originalname)

    }
      
  }),

  fileFilter: (req, file, cb) => {
    const extensionImg = ['image/png', 'image/jpeg', 'image/jpg'].find(formatoAceito => formatoAceito == file.mimetype)

    if(extensionImg){
      return cb(null, true)
    }
    
      return cb(null, false)
    

      
  }



}))