const execute = (bot, msg , args) => {
    const queue = bot.queues.get(msg.guild.id);
        if(!queue){
            return msg.reply("Não existe nenhuma música em pause.");
        }
        queue.songs = [];
        bot.queues.set(msg.guild.id, queue);
        queue.dispatcher.end();
};

module.exports = {
    name : "stop",
    help : "Para a reprodução de música completamente.",
    execute,

};
