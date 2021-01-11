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

        if (!toChannel) return message.channel.send(`**[🗣️] ${message.author.username}**, please ensure you're giving a channel for me to speak in first.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!messageContent) return message.channel.send(`**[🗣️] ${message.author.username}**, please ensure giving contents for me to send last.`).then(m => m.delete({
            timeout: 10000
        }));

        if (message.attachments.size > 0) {
            message.attachments.forEach(attachment => {
                let attachmentURL = attachment.url;
                const saidEmbedImage = new Discord.MessageEmbed()
                    .setAuthor(`Message Sent`, message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .addField(`Message Content`, messageContent || `No content found.`, true)
                    .addField(`Channel`, `${toChannel} (${toChannel.id})`, true)
                    .setImage(attachment.url)
                    .setColor(`eb4bc9`)
                    .setTimestamp()

                toChannel.send(messageContent, {
                    files: [attachmentURL]
                }).then(() => {
                    message.channel.send(`**[🗣️] ${message.author.username}**, I've successfully sent the following message and it's contents to ${toChannel}:`, {
                        embed: saidEmbedImage
                    });
                });
            });
            return;
        }

        toChannel.send(messageContent).then(() => {
            message.delete();

            const saidEmbed = new Discord.MessageEmbed()
                .setAuthor(`Message Sent`, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .addField(`Message Content`, messageContent || `No content found.`, true)
                .addField(`Channel`, `${toChannel} (${toChannel.id})`, true)
                .setColor(`eb4bc9`)
                .setTimestamp()

            message.channel.send(`**[🗣️] ${message.author.username}**, I've successfully sent the following message to ${toChannel}:`, {
                embed: saidEmbed
            });
        });
    }
}