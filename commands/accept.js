const Discord = require("discord.js");

module.exports = {
    name: 'accept',
    description: '[MODERATION] This command is restricted to the Appeals guild & channel(s) only. It will accept a ban appeal. <[setPrefix]accept <@user>>',
    execute(message) {
        const client = message.client;

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

            acceptedMember.send(`**${appealAcceptionMention.username}**, your Ban Appeal has been accepted, and you have been unbanned from the **I Talk Server**.\nMake sure to read the rules upon re-joining to prevent further punishments.\n\nPermanent Invite Link: https://discord.gg/italkfortnite`).then(() => {
                acceptedMember.kick(`Appeal was accepted by ${message.author.tag}.`).then(() => {
                    const acceptEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Appeal Accepted | ${message.author.tag}`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .addField(`User`, `${appealAcceptionMention.tag} (${appealAcceptionMention})`, true)
                        .addField(`Time Accepted`, `${new Date().toLocaleTimeString()} UTC\n${new Date()}`)
                        .setThumbnail(appealAcceptionMention.displayAvatarURL({
                            dynamic: true
                        }))
                        .setColor(`6dff48`)

                    client.channels.cache.get('794486722356183052').send({
                        embed: acceptEmbed
                    });

                    message.channel.send(`**[📜] ${message.author.username}**, successfully accepted **${appealAcceptionMention.tag}**'s appeal!`).then(m => m.delete({
                        timeout: 10000
                    }));
                });
            });
        }
    }
}