const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'no',
    description: '[CUSTOM] No. <[setPrefix]no>',
    execute(message, args) {
        message.delete();
        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '780027707622424607') return;
        
        message.channel.send({
            files: ['https://cdn.discordapp.com/attachments/778258285689569340/779069772826148894/image.png']
        });
    }
}