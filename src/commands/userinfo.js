const { User } = require("discord.js");

const MessageEmbed = require("discord.js").MessageEmbed;

const execute = (bot, msg, args) => {
  const embed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(`${msg.author.username}#${msg.author.discriminator}!`
    )
    .setDescription(`${msg.createdAt}`)
    .setThumbnail(
      msg.author.avatar
        ? `https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.png`
        : `https://cdn.discordapp.com/embed/avatars/${
            msg.author.discriminator % 5
          }.png`
    )
    .setURL("https://twitch.tv/reisdev")
    .addFields([
      {
        name: "Você é membro nº",
        value: msg.guild.memberCount,
        inline: true,
      },
      {
        name: "Este é um teste",
        value: "teste",
        inline: true,
      },
    ])
    .setTimestamp()
  msg.channel.send({ embed });
};

  
  module.exports = {
    name: "userinfo",
    help: "Mostra as informações de usuário.",
    execute,
  };