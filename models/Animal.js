const Sequelize = require('sequelize');
const db = require('../database/db');
const Clientes = require('./Cliente')

 const Animais = db.define('animais',{
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
  tipo:{
    type: Sequelize.STRING,
    allowNull: false

  },
  raça:{
    type: Sequelize.STRING(1),
    allowNull: true
  },
  peso:{
    type: Sequelize.STRING,
    allowNull: false
  },
  imagem:{
    type: Sequelize.STRING,
    allowNull: true
  }
  
  
})

Clientes.hasMany(Animais,{
  constraint: true,
  foreignKey: 'ClienteID',
  onDelete: 'RESTRICT',
  onUpdate : 'CASCADE'
})

Animais.belongsTo(Clientes,{
  constraint: true,
  foreignKey: 'ClienteID',
  onDelete: 'RESTRICT',
  onUpdate : 'CASCADE'
})

//Criar a tabela com sequelize
// Animais.sync();

// Excluir a tabela e criar novamente
// Animais.sync({force: true})

// verificar se há alguma diferença na tabel, raliza alteração
// Animais.sync({alter:true});

module.exports = Animais;