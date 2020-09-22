const execute = (bot, msg , args) => {
    const queue = bot.queues.get(msg.guild.id);
        if(!queue){
            return msg.reply("Não existe nenhuma música em reprodução.");
        }
        queue.dispatcher.pause();
};

module.exports = {
    name : "pause",
    help : "Pause a reprodução de música atual.",
    execute,

};
