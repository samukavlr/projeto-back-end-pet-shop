const Users = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const sendMail = require('../providers/mailProvider')
const {userCreateMailTemplate} = require('../template/userCreateMail')






exports.create =  async(req, res) =>{
  var dados = req.body;
  dados.password = await bcrypt.hash(dados.password, 8);



  await Users.create(dados)
  .then(()=>{
    /* Envio de email */
    let name = dados.name
    let to = dados.email
    let subject = 'Cadastro de usuário'
    let mailBody = userCreateMailTemplate(name)


    sendMail(to,subject,mailBody)

    return res.json({
      erro: false,
      mensagem: 'Usuário cadastrado com sucesso!'
    });
  }).catch((err)=>{
    return res.status(400).json({
      erro:true,
      mensagem: `Erro: Usuário não encontrado... ${err}`
    })
  })
}
/********************************************************************************* */

exports.findAll = async(req,res)=>{
  await Users.findAll({
    attributes: ['id','name','email', 'password', 'figprofile'],
    order: [['id', 'ASC']]

  })
  .then((users) => {
    return res.json({
      erro: false,
      users
    });
  }).catch((err) => {
    return res.status(400).json({
      erro : true,
      mensagem: `Erro ${err} ou nenhum usuário encontrado!!!`
    })
  })
}
/**************************************************************************** */
exports.update = async(req,res)=>{
  const {id} = req.body;

  await Users.update(req.body, {where: {id}})
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: "Usuário alterado com sucesso!"
    })
  }).catch((err)=>{
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: Usuário não encontrado ...${err}`
    })
  })
}
/******************************************************************************************* */
exports.findOne = async (req, res) =>{
  const {id} = req.params;
  try{
    // await User.findAll({ where: {id: id}})
    const users = await Users.findByPk(id);
    if(!users){
      return res.status(400).json({
        erro: true,
        mensagem: "Erro:Nenhum usuário encontrado!"
      })
    }
    res.status(200).json({
      erro: false,
      users
    })
  }catch(err){
    res.status(400).json({
      erro: true,
      mensagem: `Erro ${err}`
    })
  }
}
/************************************************************* */
exports.delete =  async(req,res)=>{
  const {id} = req.params;
  const user = await Users.findByPk(id);
  const imgOld = './public/images/users/' + user.dataValues.figprofile

          fs.access(imgOld, (err)=>{
              if(!err){
                  fs.unlink(imgOld, ()=>{})
              }
          })

  await Users.destroy({where: {id}})
  .then(()=>{
    
    return res.json({
      erro: false,
      mensagem: "Usuário apadado com sucesso!"
    });
  }).catch((err)=>{
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: ${err} Usuário não apagado...`
    })
  })
}
/************************************************************************************ */
exports.login =  async (req, res) => {
  const user = await Users.findOne({
      attributes: ['id', 'name', 'email', 'password'],
      where: {
          email: req.body.email
      }
  })
  if(user === null){
      return res.status(400).json({
          erro: true,
          mensagem:"Erro: Email ou senha incorreta!!!"
      })
  }
  if(!(await bcrypt.compare(req.body.password, user.password))){
      return res.status(400).json({
          erro: true,
          mensagem: "Erro: Email ou senha incorreta!!!"
      })
  }
  var token = jwt.sign({id: user.id}, process.env.SECRET,{
    expiresIn: 600 // 1min, '7d' 7dias
  })
  return res.json({
    erro:false,
    mensagem: "Login realizado com sucesso!!!",
    token,
    user: user.id
    
  })
  



}
/********************************************************************** */
exports.changepass =  async (req, res) => {
  const {id, password } = req.body;
  var senhaCrypt = await bcrypt.hash(password, 8);
  const users = await Users.findByPk(id);
  if(!users){
    return res.status(400).json({
      erro: true,
      mensagem: "Erro: Nenhum usuário encontrado!"
    })
  }

  await Users.update({password: senhaCrypt }, {where: {id: id}})
  .then(() => {
      // console.log(res.json());
      return res.json({
          erro: false,
          mensagem: "Senha editada com sucesso!"
      }); 
  }).catch( (err) => {
      return res.status(400).json({
          erro: true,
          mensagem: `Erro: ${err}... A senha não foi alterada!!!`
      })
  })
}

exports.validaToken =  async (req, res) => {
  await Users.findByPk(key, {
      attributes: ['id', 'name', 'email']
  }).then((user)=>{
      return res.status(200).json({
          erro: false,
          user
      })
  }).catch(() => {
      return res.status(400).json({
          erro: true,
    
          mensagem: "Erro: Necessário ralizar o login"
  })

})
}

/***************************************************************************************************** */
exports.editProfileImage = async (req,res)=>{

  if(req.file){

      /* apagando a imagem antiga no diretório */
      await Users.findByPk(req.id)
      .then( user => {
          const imgOld = './public/images/users/' + user.dataValues.figprofile

          fs.access(imgOld, (err)=>{
              if(!err){
                  fs.unlink(imgOld, ()=>{})
              }
          })
      }).catch((err)=>{
          return res.status(400).json({
              erro: true,
              mensagem: "Erro: Perfil do usuário não encontrado!",
              msg : `${err}`
          })
      })
      /******************************************/


      await Users.update({figprofile: req.file.filename},
                      {where: {id: req.id}})
      .then(()=>{
              return res.json({
                  erro: false,
                  mensagem: "Imagem de Usuário editada com sucesso!"
              })
      }).catch((err)=>{
          return res.status(400).json({
              erro: true,
              mensagem: `Erro: imagem não editada... ${err}`
          })
      })
} else{
  return res.status(400).json({
      erro: true,
      mensagem: `Erro: Selecione uma imagem em um formato válido (.png .jpeg)`
  })

}   

}

/****************************************************************************************** */
exports.viewProfile =  async (req, res) => {
  const { id } = req.params;
  try {
      // await User.findAll({ where: {id: id}})
      const users = await Users.findByPk(id);
      if(!users){
          return res.status(400).json({
              erro: true,
              mensagem: "Erro: Nenhum Usuário encontrado!"
          })
      }
      if(users.figprofile){
      var endImagem = "http://localhost:4500/files/users/" + users.figprofile
          
      }
      else{
        var endImagem = ""
      }
      res.status(200).json({
          erro:false,
          users,
          endImagem
      })
  } catch (err){
      res.status(400).json({
          erro: true,
          mensagem: `Erro: ${err}`
      })
  }
}