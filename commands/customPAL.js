const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'peaceandlove',
    description: '[CUSTOM] Peace n\' love, peace n\' love. <[setPrefix]peaceandlove>',
    execute(message, args) {
        message.delete();
        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;

        message.channel.send(`Peace & love!`, {
            files: ['https://cdn.discordapp.com/attachments/778258285689569340/779069765431590932/image.png']
        });
    }
}