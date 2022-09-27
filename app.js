const express = require('express');
const app = express();
require('dotenv').config()
var cors = require('cors')

const Users = require('./models/User');
const Clientes = require('./models/Cliente');
const Animais = require('./models/Animal');
const Products = require('./models/Products');



const router = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const path = require('path');
 app.use('/files', express.static(path.resolve(__dirname, "public", "images")))

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers","Content-Type, Authorization");
  app.use(cors());
  next();
})

app.get("/", function(request,response){
  response.send("Serviço API Rest iniciada...");
  console.log(response)
})

app.use(router);



app.listen(4500, ()=>{
  console.log(`Servidor iniciado na porta 4500 http://localhost:4500`);
});




