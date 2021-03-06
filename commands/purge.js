const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'purge',
    description: '[MODERATION] This will purge the specified amount of messages in the mentioned channel. <[setPrefix]purge (<#channel>) (<@member>) <amount>>',
    execute(message) {
        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        let channelTo = message.mentions.channels.first();
        let memberToA = message.mentions.users.first();
        let memberTo = message.guild.member(memberToA);
        let messageArgs = message.content.split(" ");

        let purgeIntA = messageArgs[2];
        let purgeIntB = messageArgs[3];
        let purgeIntC = messageArgs[1];

        if (!channelTo && !memberToA && !purgeIntC) return message.channel.send(`**[🗑️] ${message.author.username}**, please make sure you're putting in either a channel, member, or a specific amount.`).then(m => m.delete({
            timeout: 10000
        }));

        if ((parseInt(purgeIntA) > 100) || (parseInt(purgeIntB) > 100) || (parseInt(purgeIntC) > 100)) return message.channel.send(`**[🗑️] ${message.author.username}**, please make sure you're inputting an amount more than 0 and less than 101.`).then(m => m.delete({
            timeout: 10000
        }));

        if ((parseInt(purgeIntA) < 1) || (parseInt(purgeIntB) < 1) || (parseInt(purgeIntC) < 1)) return message.channel.send(`**[🗑️] ${message.author.username}**, please make sure you're inputting an amount more than 0 and less than 101.`).then(m => m.delete({
            timeout: 10000
        }));

        if (channelTo) {
            if (!message.guild.channels.cache.get(channelTo.id)) return message.channel.send(`**[🗑️] ${message.author.username}**, that channel does not exist within this server.`).then(m => m.delete({
                timeout: 10000
            }));
        }

        if (channelTo && !memberToA && purgeIntA && !isNaN(purgeIntA)) {
            message.guild.channels.cache.get(channelTo.id).messages.fetch({
                limit: 100
            });

            message.delete().then(() => {
                channelTo.bulkDelete(parseInt(purgeIntA)).then(messages => {
                    message.channel.send(`**[🗑️] ${message.author.username}**, ${messages.size} message(s) in ${channelTo} were purged.`).then(m => m.delete({
                        timeout: 10000
                    }));
                }).catch(console.error);
            });
        } else if (memberToA && !channelTo && purgeIntA && !isNaN(purgeIntA)) {
            message.channel.messages.fetch({
                limit: 100
            });

            message.delete().then(() => {
                message.channel.messages.fetch({
                    limit: 100,
                }).then((messages) => {
                    const filterBy = memberTo ? memberTo.id : client.user.id;
                    messages = messages.filter(m => m.author.id === filterBy).array().slice(0, parseInt(purgeIntA));
                    message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                    message.channel.send(`**[🗑️] ${message.author.username}**, ${purgeIntA} message(s) belonging to **${memberToA.tag}** were purged.`).then(m => m.delete({
                        timeout: 10000
                    }));
                });
            });
        } else if (!memberToA && channelTo && purgeIntA && !isNaN(purgeIntA)) {
            message.guild.channels.cache.get(channelTo.id).messages.fetch({
                limit: 100
            });

            message.delete().then(() => {
                channelTo.bulkDelete(parseInt(purgeIntA)).then(messages => {
                    message.channel.send(`**[🗑️] ${message.author.username}**, ${messages.size} message(s) in ${channelTo} have been purged.`).then(m => m.delete({
                        timeout: 10000
                    }));
                }).catch(console.error);
            });
        } else if (memberToA && channelTo && purgeIntB && !isNaN(purgeIntB)) {
            message.guild.channels.cache.get(channelTo.id).messages.fetch({
                limit: 100
            });

            message.delete().then(() => {
                channelTo.messages.fetch({
                    limit: 100,
                }).then((messages) => {
                    const filterBy = memberToA ? memberToA.id : client.user.id;
                    messages = messages.filter(m => m.author.id === filterBy).array().slice(0, parseInt(purgeIntB));
                    channelTo.bulkDelete(messages).catch(error => console.log(error.stack));
                    message.channel.send(`**[🗑️] ${message.author.username}**, ${purgeIntB} message(s) belonging to **${memberToA.tag}** in ${channelTo} were purged.`).then(m => m.delete({
                        timeout: 10000
                    }));
                });
            });
        } else if (!channelTo && !memberToA && purgeIntC) {
            message.channel.messages.fetch({
                limit: 100
            });

            message.delete().then(() => {
                message.channel.bulkDelete(purgeIntC).then(messages => {
                    message.channel.send(`**[🗑️] ${message.author.username}**, ${messages.size} message(s) purged successfully.`).then(m => m.delete({
                        timeout: 10000
                    }));
                }).catch(console.error);
            });
        } else {
            return message.channel.send(`**[🗑️] ${message.author.username}**, please make sure you're providing the required parameters for this command to run.`).then(m => m.delete({
                timeout: 10000
            }));
        }
    }
}