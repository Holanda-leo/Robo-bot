const { Message } = require("discord.js");

const execute = (bot, msg, args) => {
    const saymsg = args.join(" ");
   msg.delete().catch(O_o =>{});
   msg.channel.send(saymsg);
  };
  
  module.exports = {
    name: "say",
    help: "Envia uma mensagem falando o que você escreveu.",
    execute,
  };