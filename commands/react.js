const Discord = require("discord.js")

module.exports = {
    name: 'react',
    description: '[MODERATION] Given the (optional) mentioned channel, message ID and emoji, the bot will react to that specified message with the given emoji. <[setPrefix]react (<#channel>) <message ID> <emoji>>',
    execute(message) {
        message.delete();

        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;
        let messageArguments = message.content.split(" ");

        let toChannel = message.mentions.channels.first();
        let messageID = messageArguments[2] || messageArguments[1];
        let toEmoji = messageArguments[3] || messageArguments[2];

        if (!messageID) return message.channel.send(`**[📝] ${message.author.username}**, please ensure you're inputting a message ID.\n*(Note: If it belongs in another channel, mention that channel first.)*`).then(m => m.delete({
            timeout: 10000
        }));
        if (!toEmoji) return message.channel.send(`**[📝] ${message.author.username}**, please ensure you're inputting an emote for me to react with.`).then(m => m.delete({
            timeout: 10000
        }));

        if (!toChannel) {
            message.channel.messages.fetch(messageArguments[1]).then(toReact => {
                toReact.react(toEmoji);
            }).catch(() => {
                return message.channel.send(`**[🗞️] ${message.author.username}**, failed to execute task: that message ID may be incorrect.\n*(Note: If it belongs in another channel, mention that channel first.)*`).then(m => m.delete({
                    timeout: 10000
                }));
            });
            return;
        }

        if (!toChannel) return message.channel.send(`**[📝] ${message.author.username}**, please ensure you're mentioning the channel first.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!toChannel || messageID.length !== 18) return message.channel.send(`**[📝] ${message.author.username}**, please ensure you're inputting a **valid** message ID.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!toChannel.messages.fetch(messageID)) return message.channel.send(`**[📝] ${message.author.username}**, that message couldn't be fetched in the mentioned channel.`).then(m => m.delete({
            timeout: 10000
        }));

        if (toChannel) {
            toChannel.messages.fetch(messageID).then(toReact => {
                toReact.react(toEmoji);
            }).catch(() => {
                return message.channel.send(`**[🗞️] ${message.author.username}**, failed to execute task: that message ID may be incorrect.\n*(Note: If it belongs in another channel, mention that channel first.)*`).then(m => m.delete({
                    timeout: 10000
                }));
            });
        }
    }
}