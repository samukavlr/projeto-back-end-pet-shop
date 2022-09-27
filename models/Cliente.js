const Sequelize = require('sequelize');
const db = require('../database/db');

const Clientes = db.define('clientes',{
  id: {
    type: Sequelize.INTEGER,  
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome:{
    type: Sequelize.STRING(50),
    allowNull: false

  },
  email:{
    type: Sequelize.STRING,
    allowNull: false

  },
  idade:{
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sexo:{
    type: Sequelize.STRING,
    allowNull: false
  },
  cpf:{
    type: Sequelize.STRING,
    allowNull: false
  },
  telefone:{
    type: Sequelize.STRING,
    allowNull: false
  },
})
  


  
  

//Criar a tabela com sequelize
// Clientes.sync();

// Excluir a tabela e criar novamente
//Clientes.sync({force: true})

// verificar se há alguma diferença na tabel, raliza alteração
//Clientes.sync({alter:true});


module.exports = Clientes;