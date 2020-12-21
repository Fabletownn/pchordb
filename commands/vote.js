const Discord = require("discord.js")

module.exports = {
    name: 'vote',
    description: '[MODERATION] This will react to the specific message (given the ID) with ITF Upvote/Downvote reactions. <[setPrefix]vote (<#channel>) <messageID>>',
    execute(message) {
        message.delete({ timeout: 3000 });

        let messageArguments = message.content.split(" ");

        let toChannel = message.mentions.channels.first();
        let messageID = messageArguments[2] || messageArguments[1];

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        if (!messageID) return message.channel.send(`**[📝] ${message.author.username}**, please ensure you're inputting a (valid) message ID. If it belongs in another channel, mention that channel first.`).then(m => m.delete({
            timeout: 10000
        }));

        if (!toChannel) {
            message.channel.messages.fetch(messageID).then(toReact => {
                toReact.react(`<:zzITFUpvote:778318625328332810>`).then(toReact.react(`<:zzITFDownvote:778318624552779776>`));
                message.react('✅');
            }).catch(() => {
                return message.channel.send(`**[🗞️] ${message.author.username}**, is that message ID valid? If that message is in another channel, please mention it following proper syntax.`).then(m => m.delete({
                    timeout: 10000
                }));
            });
            return;
        }

        if (!toChannel) return message.channel.send(`**[📝] ${message.author.username}**, please ensure you're mentioning the channel to edit in first.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!toChannel || messageID.length !== 18) return message.channel.send(`**[📝] ${message.author.username}**, please ensure you're inputting a valid message ID second.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!toChannel) return message.channel.send(`**[📝] ${message.author.username}**, please ensure you're inputting content to edit this message to last.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!toChannel.messages.fetch(messageID)) return message.channel.send(`**[📝] ${message.author.username}**, that message ID wasn't found in the mentioned channel.`).then(m => m.delete({
            timeout: 10000
        }));

        if (toChannel) {
            toChannel.messages.fetch(messageID).then(toReact => {
                toReact.react(`<:zzITFUpvote:778318625328332810>`).then(toReact.react(`<:zzITFDownvote:778318624552779776>`));
                message.react('✅');
            }).catch(() => {
                return message.channel.send(`**[🗞️] ${message.author.username}**, is that message ID valid? Please re-check that ID and/or channel and re-run the command.`).then(m => m.delete({
                    timeout: 10000
                }));
            });
        }
    }
}