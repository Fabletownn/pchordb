const Discord = require("discord.js")

module.exports = {
    name: 'say',
    description: '[MODERATION] This will simply make Power Chord say the text you input. <[setPrefix]say <#channel> <content> (<ATTACHMENT>)>',
    execute(message) {
        let toChannel = message.mentions.channels.first();
        let messageContent = message.content.split(toChannel)[1];

        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        if (!toChannel) return message.channel.send(`**[🗣️] ${message.author.username}**, please ensure you're providing a channel for me to send that message in first.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!messageContent) return message.channel.send(`**[🗣️] ${message.author.username}**, please ensure you're giving me a message to send.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!message.guild.channels.cache.get(toChannel.id)) return message.channel.send(`**[🗣️] ${message.author.username}**, please ensure you're providing a channel **in this guild** for me to send that message in.`).then(m => m.delete({
            timeout: 10000
        }));

        if (message.attachments.size > 0 && !message.content) {
            message.attachments.forEach(attachment => {
                let attachmentURL = attachment.url;

                toChannel.send({
                    files: [attachmentURL]
                }).then(() => {
                    message.channel.send(`**[🗣️] ${message.author.username}**, successfully sent to ${toChannel} + **${message.attachments.size}** attachment(s).`).then(m => m.delete({
                        timeout: 10000
                    }));
                });
            });
            return;
        }

        if (message.attachments.size > 0) {
            message.attachments.forEach(attachment => {
                let attachmentURL = attachment.url;

                toChannel.send(messageContent, {
                    files: [attachmentURL]
                }).then(() => {
                    message.channel.send(`**[🗣️] ${message.author.username}**, successfully sent message to ${toChannel} + **${message.attachments.size}** attachment(s).`).then(m => m.delete({
                        timeout: 10000
                    }));
                });
            });
            return;
        }

        toChannel.send(messageContent).then(() => {
            message.delete();
            message.channel.send(`**[🗣️] ${message.author.username}**, successfully sent message to ${toChannel}.`).then(m => m.delete({
                timeout: 10000
            }));
        });
    }
}