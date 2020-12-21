const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'vote',
    description: '[MODERATION] This will add Power Chord upvote and downvote emotes to the message you specified the ID for. <[setPrefix] vote <message ID>>',
    execute(message) {
        message.delete();
        
        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '789937524763000832') return;

        var messageID = message.content.split("vote ");

        if (!messageID[1]) {
            return message.channel.send(`**[📰] ${message.author.username}**, please input a message ID.`).then(m => m.delete({
                timeout: 5000
            }));
        }

        if (messageID[1].length !== 18 || isNaN(messageID[1])) {
            return message.channel.send(`**[📰] ${message.author.username}**, please ensure that message ID is valid.`).then(m => m.delete({
                timeout: 5000
            }));
        }

        message.channel.messages.fetch(messageID[1]).then(m => {
            m.react(`<:zzITFUpvote:778318625328332810>`).then(m.react(`<:zzITFDownvote:778318624552779776>`));
        }).catch(error => {
            console.log(error);
            return message.channel.send(`**[📰] ${message.author.username}**, please ensure that message is within this channel.`).then(m => m.delete({
                timeout: 5000
            }));
        });
    }
}