const Discord = require("discord.js");

module.exports = {
    name: 'accept',
    description: '[MODERATION] This command is restricted to the Appeals guild & channel(s) only. It will accept a ban appeal. <[setPrefix]accept <@user>>',
    execute(message) {
        const client = message.client;

        if (message.guild.id !== '685876599199236173') return;
        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        message.delete();
        var appealAcceptionMention = message.mentions.users.first();
        var acceptedMember = message.guild.member(appealAcceptionMention);

        if (!appealAcceptionMention) return message.channel.send(`**[⚠️] ${message.author.username}**, please mention a member to accept their appeal.`).then(m => m.delete({
            timeout: 10000
        }));

        if (appealAcceptionMention) {
            let receivedR = message.guild.roles.cache.find(role => role.name === "Appeal Received");

            if (!acceptedMember.roles.cache.has(receivedR.id)) return message.channel.send(`**[📜] ${message.author.username}**, this member does not have a pending appeal.`).then(m => m.delete({
                timeout: 10000
            }));

            acceptedMember.send(`**${appealAcceptionMention.username}**, your Ban Appeal has been accepted, and you have been unbanned from the **I Talk Server**.\nMake sure to read the rules upon re-joining to prevent further punishments.\n\nPermanent Invite Link: https://discord.gg/italk`).then(() => {
                acceptedMember.kick(`Appeal was accepted by ${message.author.tag}.`).then(() => {
                    const acceptEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Appeal Accepted | ${appealAcceptionMention.tag}`, appealAcceptionMention.displayAvatarURL({
                            dynamic: true
                        }))
                        .addField(`User`, `${appealAcceptionMention}`, true)
                        .addField(`Moderator`, `${message.author}`, true)
                        .setFooter(`User ID: ${appealAcceptionMention.id}`)
                        .setTimestamp()
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