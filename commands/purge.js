const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'purge',
    description: '[MODERATION] This will purge the specified amount of messages in the mentioned channel. <[setPrefix]purge (<#channel>) (<@member>) <amount>>',
    execute(message) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        let channelTo = message.mentions.channels.first();
        let memberToA = message.mentions.users.first();
        let memberTo = message.guild.member(memberToA);
        let messageArgs = message.content.split(" ");

        let purgeIntA = messageArgs[2];
        let purgeIntB = messageArgs[3];
        let purgeIntC = messageArgs[1];

        if (!channelTo && !memberToA && !purgeIntC) return message.channel.send(`**[🗑️] ${message.author.username}**, please make sure you're putting in either a channel, member, or a specific amount.`).then(m => m.delete({
            timeout: 5000
        }));

        if ((parseInt(purgeIntA) > 100) || (parseInt(purgeIntB) > 100) || (parseInt(purgeIntC) > 100)) return message.channel.send(`**[🗑️] ${message.author.username}**, please make sure you're inputting an amount more than 0 and less than 101.`).then(m => m.delete({
            timeout: 5000
        }));

        if ((parseInt(purgeIntA) < 1) || (parseInt(purgeIntB) < 1) || (parseInt(purgeIntC) < 1)) return message.channel.send(`**[🗑️] ${message.author.username}**, please make sure you're inputting an amount more than 0 and less than 101.`).then(m => m.delete({
            timeout: 5000
        }));

        if (channelTo && !memberToA && purgeIntA && !isNaN(purgeIntA)) {
            channelTo.bulkDelete(purgeIntA).then(messages => {
                message.channel.send(`**[🗑️] ${message.author.username}**, ${messages.size} messages in ${channelTo} were purged.`).then(m => m.delete({
                    timeout: 5000
                }));
            }).catch(console.error);

        } else if (memberToA && !channelTo && purgeIntA && !isNaN(purgeIntA)) {
            message.channel.messages.fetch({
                limit: parseInt(purgeIntA),
            }).then((messages) => {
                const filterBy = memberTo ? memberTo.id : client.user.id;
                messages = messages.filter(m => m.author.id === filterBy).array().slice(0, parseInt(purgeIntA));
                message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                message.channel.send(`**[🗑️] ${message.author.username}**, ${purgeIntA} messages belonging to **${memberToA.tag}** were purged.`).then(m => m.delete({
                    timeout: 5000
                }));
            });

        } else if (!memberToA && channelTo && purgeIntA && !isNaN(purgeIntA)) {
            channelTo.bulkDelete(purgeIntA).then(messages => {
                message.channel.send(`**[🗑️] ${message.author.username}**, ${messages.size} messages in ${channelTo} have been purged.`).then(m => m.delete({
                    timeout: 5000
                }));
            }).catch(console.error);

        } else if (memberToA && channelTo && purgeIntB && !isNaN(purgeIntB)) {
            channelTo.messages.fetch({
                limit: parseInt(purgeIntB),
            }).then((messages) => {
                const filterBy = memberTo ? memberTo.id : client.user.id;
                messages = messages.filter(m => m.author.id === filterBy).array().slice(0, parseInt(purgeIntB));
                channelTo.bulkDelete(messages).catch(error => console.log(error.stack));
                message.channel.send(`**[🗑️] ${message.author.username}**, ${purgeIntB} messages belonging to **${memberToA.tag}** in ${channelTo} were purged.`).then(m => m.delete({
                    timeout: 5000
                }));
            });

        } else if (!channelTo && !memberToA && purgeIntC) {
            message.channel.bulkDelete(purgeIntC).then(messages => {
                message.channel.send(`**[🗑️] ${message.author.username}**, ${messages.size} messages have been purged.`).then(m => m.delete({
                    timeout: 5000
                }));
            }).catch(console.error);
        } else {
            return message.reply(`**[🗑️] ${message.author.username}**, an error occurred trying to purge that channel or user.\nPlease ensure the mentioned member is in the guild and the channel is valid: if you think this is an error, please contact either creators.`)
        }
    }
}