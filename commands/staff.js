const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'staff',
    description: '[ONE-STEP] This will provide a list of the I Talk Server Staff Team. <[setPrefix]staff>',
    execute(message, args) {
        message.delete();
        
        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;

        const staffEmbed = new Discord.MessageEmbed()
            .setTitle(`Staff Team`)
            .addField(`Owner`, `<@152597531824619521>`, true)
            .addField(`Administrators`, `<@340877462047031296>\n<@110215616891207680>`, true)
            .addField(`Moderators`, `<@550384455613677571>\n<@148807073948368896>\n<@99299332494200832>\n<@328246480387440642>\n<@276443499690459146>\n<@467879214771863563>\n<@484351467554340874>`, true)
            .setImage("https://images-ext-2.discordapp.net/external/j0A1e-jilOSPL5904vjRmXopKIFRz6pGwxxg1Ly6yN0/%3Fformat%3Djpg%26name%3Dlarge/https/pbs.twimg.com/media/EmgbvAtXIAAIvM1?width=1204&height=677")
            .setColor('eb4bc9')

        message.channel.send(staffEmbed);
    }
}