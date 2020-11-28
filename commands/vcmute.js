const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'vcmute',
    description: '[MODERATION] If you are in a voice channel, this will server mute the mentioned member in the same voice channel. If there is no mentioned member, this will server mute all members within the voice channel. <[setPrefix]vcmute (<@member>)>',
    execute(message, args) {
        message.delete();
        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        var toMute = message.mentions.users.first();
        if (!message.member.voice.channel) {
            return message.channel.send(`**[🗣️] ${message.author.username}**, please make sure you're in a **voice channel** before running this command.`).then(m => m.delete({
                timeout: 5000
            }));
        }

        if (toMute) {
            if (!message.guild.member(toMute).voice.channel) {
                return message.channel.send(`**[🔈] ${message.author.username}**, please make sure that member is in a **voice channel** before running this command.`).then(m => m.delete({
                    timeout: 5000
                }));
            }

            return message.guild.members.cache.get(toMute.id).voice.setMute(true).then(() => {
                message.channel.send(`**[🔇] ${message.author.username}**, successfully **muted ${toMute.tag}** in "${message.member.voice.channel.name}".`).then(m => m.delete({
                    timeout: 5000
                }));
            });
        } else if (!toMute) {
            message.channel.members.forEach(member => {
                member.voice.setMute(true)
            });

            return message.channel.send(`**[🔇] ${message.author.username}**, successfully **muted all members** in "${message.member.voice.channel.name}".`).then(m => m.delete({
                timeout: 5000
            }));
        }
    }
}