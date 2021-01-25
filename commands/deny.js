const Discord = require("discord.js");
const appeal = require("./appeal");

module.exports = {
    name: 'deny',
    description: '[MODERATION] This command is restricted to the Appeals guild & channel(s) only. It will deny a ban appeal. <[setPrefix]deny <@user>>',
    execute(message) {
        const client = message.client;

        if (message.guild.id !== '685876599199236173') return;
        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        message.delete();

        var appealDenialMention = message.mentions.users.first();
        var deniedMember = message.guild.member(appealDenialMention);

        if (!appealDenialMention) return message.channel.send(`**[⚠️] ${message.author.username}**, please mention a member to deny their appeal.`).then(m => m.delete({
            timeout: 10000
        }));

        if (appealDenialMention) {
            if (deniedMember.roles.cache.has(moderatorR.id)) return message.channel.send(`**[📜] ${message.author.username}**, you cannot deny this member.`).then(m => m.delete({
                timeout: 10000
            }));
            if (deniedMember.roles.cache.has(administratorR.id)) return message.channel.send(`**[📜] ${message.author.username}**, you cannot deny this member.`).then(m => m.delete({
                timeout: 10000
            }));

            let receivedR = message.guild.roles.cache.find(role => role.name === "Appeal Received");
            if (!deniedMember.roles.cache.has(receivedR.id)) return message.channel.send(`**[📜] ${message.author.username}**, this member does not have a pending appeal.`).then(m => m.delete({
                timeout: 10000
            }));

            deniedMember.send(`**${appealDenialMention.username}**, your Ban Appeal has been **rejected**. You have been banned from both the **I Talk Server** and the **Appeals Server**.\n\nAs a result, you can no longer appeal or be unbanned from the **I Talk Server**.`);

            deniedMember.ban({
                reason: `Appeal was denied by ${message.author.tag}.`
            }).then(() => {
                const denyEmbed = new Discord.MessageEmbed()
                    .setAuthor(`Appeal Denied | ${appealDenialMention.tag}`, appealDenialMention.displayAvatarURL({
                        dynamic: true
                    }))
                    .addField(`User`, `${appealDenialMention}`, true)
                    .addField(`Moderator`, `${message.author}`, true)
                    .setFooter(`User ID: ${appealDenialMention.id}`)
                    .setTimestamp()
                    .setColor(`ff0000`)

                client.channels.cache.get('794486722356183052').send({
                    embed: denyEmbed
                });

                message.channel.send(`**[📜] ${message.author.username}**, successfully denied the appeal. Proper action has been taken.`).then(m => m.delete({
                    timeout: 10000
                }));
            });
        }
    }
}