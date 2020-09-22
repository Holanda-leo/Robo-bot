const Discord = require("discord.js");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");


dotenv.config();

const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.queues = new Map();



const commandFiles =  fs
    .readdirSync(path.join(__dirname, "/commands"))
    .filter(filename => filename.endsWith(".js"));

for(var filename of commandFiles) {
    const command = require(`./commands/${filename}`);

    bot.commands.set(command.name, command);
}


bot.login(process.env.TOKEN);

bot.on("ready" ,function(){

    console.log(`Estou conectado como ${bot.user.username}`);

});


bot.on("message", (msg) => {
    if (msg.channel.type === "dm") return;
    if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;
    
  
    const args = msg.content.slice(process.env.PREFIX.length).split(" ");
    const command = args.shift();
  
    try {
      bot.commands.get(command).execute(bot, msg, args);
    } catch (e) {
      console.error(e);
      return msg.reply("Ops! Eu ainda não conheço esse comando!\nUtilize +help para saber todos os comandos disponiveis.");
    }
  });

  bot.on("guildMemberAdd", member => {

    
    const welcome = member.guild.channels.cache.find(ch => ch.name === 'bem-vindo');
    if (!welcome) return;
    
    let embedbv = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle(
      `:bell:Seja bem-vindo(a):bell:`
    )
    .setDescription(`${member} aproveite nosso servidor e divirta-se!\nAtualmente estamos com **${member.guild.memberCount}** membros.`)
    .setThumbnail(member.user.displayAvatarURL({dynamic : true, format: "png", size : 1024}))
    .setImage("https://pa1.narvii.com/6489/b1ce3be3b53b9b4f14a644aa16429fca7004d5d0_hq.gif")
    .setAuthor(member.user.tag,member.user.displayAvatarURL())
    .setTimestamp()
    .setFooter('Id do usuário '+ member.user.id);
      welcome.send(embedbv);
  });

  bot.on("guildMemberRemove", member => {


    const welcome = member.guild.channels.cache.find(ch => ch.name === 'bem-vindo');
    if (!welcome) return;
    let embedbv = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle(`${member.user.username} Saiu do servidor`)
    .setThumbnail(member.user.displayAvatarURL({dynamic : true, format: "png", size : 1024}))
    .setImage("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b21a0f1d-3879-48a0-b800-bfa5f4162a97/dd6o9op-60cbe45e-36d7-4cd2-957c-00ea6edfc820.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYjIxYTBmMWQtMzg3OS00OGEwLWI4MDAtYmZhNWY0MTYyYTk3XC9kZDZvOW9wLTYwY2JlNDVlLTM2ZDctNGNkMi05NTdjLTAwZWE2ZWRmYzgyMC5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.qXUm83r0Zh0Lvz0LicN4dOUOCEtqs_D8kkE8gdEeZBo")
    .setAuthor(member.user.tag,member.user.displayAvatarURL())
    .setDescription(`Atualmente estamos com **${member.guild.memberCount}** membros.`)
    .setTimestamp()
    .setFooter('Id do usuário '+ member.user.id);
      welcome.send(embedbv);
    
    

  });




  


  