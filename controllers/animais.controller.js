const Animais = require('../models/Animal');


exports.create =  async(req, res) =>{
    var dados = req.body;
  
  
  
    await Animais.create(dados)
    .then(()=>{
  
      return res.json({
        erro: false,
        mensagem: 'Pet cadastrado com sucesso!'
      });
    }).catch((err)=>{
      return res.status(400).json({
        erro:true,
        mensagem: `Erro: Pet não encontrado... ${err}`
      })
    })
  }
  /********************************************************************************* */
  exports.findAll = async(req,res)=>{
    await Animais.findAll({
      attributes: ['id','ClienteID','nome','tipo','raça','peso'],
      order: [['id', 'ASC']]
  
    })
    .then((animais) => {
      return res.json({
        erro: false,
        animais
      });
    }).catch((err) => {
      return res.status(400).json({
        erro : true,
        mensagem: `Erro ${err} ou nenhum pet não encontrado!!!`
      })
    })
  }
  /**************************************************************************** */exports.update = async(req,res)=>{
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
/************************************************************************************ */exports.validaToken =  async (req, res) => {
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