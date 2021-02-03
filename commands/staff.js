const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'staff',
    description: '[GENERAL] This will provide a list of the I Talk Server Staff Team. <[setPrefix]staff>',
    execute(message) {
        message.delete();
        
        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;

        const staffEmbed = new Discord.MessageEmbed()
            .setTitle(`Staff Team`)
            .addField(`Owner`, `<@152597531824619521>`, true)
            .addField(`Administrators`, `<@340877462047031296>\n<@110215616891207680>\n<@550384455613677571>`, true)
            .addField(`Moderators`, `<@148807073948368896>\n<@99299332494200832>\n<@276443499690459146>\n<@467879214771863563>\n<@484351467554340874>`, true)
            .setImage("https://cdn.discordapp.com/attachments/793520414143676417/793523674711719977/ServerBanner.png")
            .setColor('eb4bc9')

        message.channel.send({ embed: staffEmbed });
    }
}