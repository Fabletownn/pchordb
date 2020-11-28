const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'pfp',
    description: '[GENERAL] This will provide the profile picture of the member you mentioned: if there is no mentioned member, it will provide yours. <[setPrefix]pfp (<@member>)>',
    execute(message, args) {
        message.delete();
        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '780027707622424607') return;

        const avatarUser = message.mentions.users.first();
        if (avatarUser) {
            const embed = new Discord.MessageEmbed()
                .setTitle(avatarUser.tag)
                .setColor('eb4bc9')
                .setImage(avatarUser.displayAvatarURL({
                    dynamic: true
                }));

            message.channel.send(embed).then(m => m.delete({
                timeout: 30000
            }));
        } else {
            const embed2 = new Discord.MessageEmbed()
                .setTitle(message.author.tag)
                .setColor('eb4bc9')
                .setImage(message.author.displayAvatarURL({
                    dynamic: true
                }));

            message.channel.send(embed2).then(m => m.delete({
                timeout: 30000
            }));
        }
    }
}