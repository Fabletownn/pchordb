const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'slowmode',
    description: '[MODERATION] This will enable (or disable) a slowmode in the mentioned channel. <[setPrefix] slowmode <#channel> <seconds>>',
    execute(message) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        let channelTo = message.mentions.channels.first();
        let messageArgs = message.content.split(" ");

        let slowModeInt = messageArgs[2];

        if (!channelTo) return message.channel.send(`**[⏲️] ${message.author.username}**, please make sure you're putting in a channel to set the slowmode for first.`).then(m => m.delete({ timeout: 5000 }));
        if (isNaN(slowModeInt)) return message.channel.send(`**[⏲️] ${message.author.username}**, please make sure you're putting in a specific amount of seconds to set the slowmode to.`).then(m => m.delete({ timeout: 5000 }));

        if (slowModeInt === '0') {
            channelTo.setRateLimitPerUser(slowModeInt, `Slowmode disabled by ${message.author.tag}.`);
            return message.channel.send(`**[⏲️] ${message.author.username}**, slowmode has been disabled in ${channelTo}. POGCHAMP.`).then(m => m.delete({ timeout: 10000 }));
        }
        channelTo.setRateLimitPerUser(slowModeInt, `Slowmode initiated by ${message.author.tag}.`);
        message.channel.send(`**[⏲️] ${message.author.username}**, slowmode has been activated in ${channelTo} with a limit of **${slowModeInt} seconds per message**. Takin' it *slow*..`).then(m => m.delete({ timeout: 10000 }));
    }
}