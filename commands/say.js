const Discord = require("discord.js")

module.exports = {
    name: 'say',
    description: '[MODERATION] This will simply make Power Chord say the text you input. <[setPrefix]say <#channel> <content> (<ATTACHMENT>)>',
    execute(message) {
        let toChannel = message.mentions.channels.first();
        let messageContent = message.content.split(toChannel)[1];

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        let moderatorR2 = message.guild.roles.cache.find(role => role.name === "Discord Moderator");

        if (moderatorR2) {
            if (!message.member.roles.cache.has(moderatorR2.id)) return;
        } else {
            if (!message.member.roles.cache.has(moderatorR.id)) return;
        }

        if (!toChannel) return message.channel.send(`**[🗣️] ${message.author.username}**, please ensure you're providing a channel for me to send that message in first.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!messageContent) return message.channel.send(`**[🗣️] ${message.author.username}**, please ensure you're giving me a message to send.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!message.guild.channels.cache.get(toChannel.id)) return message.channel.send(`**[🗣️] ${message.author.username}**, please ensure you're providing a channel **in this guild** for me to send that message in.`).then(m => m.delete({
            timeout: 10000
        }));

        if (message.attachments.size > 0) {
            message.attachments.forEach(attachment => {
                let attachmentURL = attachment.url;

                toChannel.send(messageContent, {
                    files: [attachmentURL]
                }).then(() => {
                    message.channel.send(`**[🗣️] ${message.author.username}**, successfully sent message to ${toChannel} + **${message.attachments.size}** attachment(s).`);
                });
            });
            return;
        }

        toChannel.send(messageContent).then(() => {
            message.delete();
            message.channel.send(`**[🗣️] ${message.author.username}**, successfully sent message to ${toChannel}.`);
        });
    }
}