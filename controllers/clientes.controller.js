const Clientes = require('../models/Cliente');






exports.create =  async(req, res) =>{
  var dados = req.body;



  await Clientes.create(dados)
  .then(()=>{

    return res.json({
      erro: false,
      mensagem: 'Cliente cadastrado com sucesso!'
    });
  }).catch((err)=>{
    return res.status(400).json({
      erro:true,
      mensagem: `Erro: Cliente não encontrado... ${err}`
    })
  })
}
/********************************************************************************* */

exports.findAll = async(req,res)=>{
  await Clientes.findAll({
    attributes: ['id','nome','email', 'idade', 'sexo', 'cpf', 'telefone'],
    order: [['id', 'ASC']]

  })
  .then((clientes) => {
    return res.json({
      erro: false,
      clientes
    });
  }).catch((err) => {
    return res.status(400).json({
      erro : true,
      mensagem: `Erro ${err} ou nenhum cliente encontrado!!!`
    })
  })
}
/**************************************************************************** */
exports.update = async(req,res)=>{
  const {id} = req.body;

  await Clientes.update(req.body, {where: {id}})
  .then(()=>{
    return res.json({
      erro: false,
      mensagem: "Cliente alterado com sucesso!"
    })
  }).catch((err)=>{
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: Cliente não encontrado ...${err}`
    })
  })
}
/******************************************************************************************* */
exports.findOne = async (req, res) =>{
  const {id} = req.params;
  try{
    // await User.findAll({ where: {id: id}})
    const clientes = await Clientes.findByPk(id);
    if(!clientes){
      return res.status(400).json({
        erro: true,
        mensagem: "Erro:Nenhum cliente encontrado!"
      })
    }
    res.status(200).json({
      erro: false,
      clientes
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
  const cliente = await Clientes.findByPk(id);

  await Clientes.destroy({where: {id}})
  .then(()=>{
    
    return res.json({
      erro: false,
      mensagem: "Cliente apadado com sucesso!"
    });
  }).catch((err)=>{
    return res.status(400).json({
      erro: true,
      mensagem: `Erro: ${err} Cliente não apagado...`
    })
  })
}
/************************************************************************************ */
/********************************************************************** */