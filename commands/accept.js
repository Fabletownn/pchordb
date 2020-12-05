const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'accept',
    description: '[MODERATION] This command is restricted to the Appeals guild & channel(s) only. It will accept a ban appeal. <[setPrefix]accept <@user>>',
    execute(message, args) {
        if (message.guild.id !== '685876599199236173') return;

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        let administratorR = message.guild.roles.cache.find(role => role.name === "Administrator");
        let acceptedR = message.guild.roles.cache.find(role => role.name === "Appeal Accepted");

        if (!message.member.roles.cache.has(administratorR.id) && !message.member.roles.cache.has(moderatorR.id)) return;

        message.delete();
        var appealAcceptionMention = message.mentions.users.first();
        var acceptedMember = message.guild.member(appealAcceptionMention);

        if (!appealAcceptionMention) return message.channel.send(`**[⚠️] ${message.author.username}**, please mention a member to accept their appeal.`).then(m => m.delete({
            timeout: 10000
        }));

        if (appealAcceptionMention) {
            if (acceptedMember.roles.cache.has(acceptedR.id)) return message.channel.send(`**[📜] ${message.author.username}**, this member has already been accepted.`).then(m => m.delete({
                timeout: 10000
            }));

            acceptedMember.roles.add('700299481672974356');
            message.guild.channels.cache.get('700290345954705408').send(`${appealAcceptionMention}`).then(messageSent => {
                messageSent.delete();
                message.channel.send(`**[📜] ${message.author.username}**, successfully accepted the appeal!`).then(m => m.delete({
                    timeout: 10000
                }));
            });
        }
    }
}