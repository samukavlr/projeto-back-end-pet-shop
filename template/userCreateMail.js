exports.userCreateMailTemplate = (nome) =>{
  var mailBody = "<h1>Olá, {nome}</h1>";
      mailBody += "<p>Seu cadastro no pet Vida Animal foi realizado com sucesso!</p>"
      
      mailBody = mailBody.replace('{nome}', nome);

        return mailBody;
}