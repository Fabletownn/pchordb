const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'vcunmute',
    description: '[MODERATION] If you are in a voice channel, this will unmute (if server muted) the mentioned member in the same voice channel. If there is no mentioned member, this will server unmute all members server muted within the voice channel. <[setPrefix]vcunmute (<@member>)>',
    execute(message, args) {
        message.delete();
        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        var toMute = message.mentions.users.first();
        if (!message.member.voice.channel) {
            return message.channel.send(`**[🗣️] ${message.author.username}**, Please ensure you're in a **voice channel** first!`).then(m => m.delete({
                timeout: 5000
            }));
        }

        if (toMute) {
            if (!message.guild.member(toMute).voice.channel) {
                return message.channel.send(`**[🔈] ${message.author.username}**, please make sure that member is in a **voice channel** before running this command.`).then(m => m.delete({
                    timeout: 5000
                }));
            }

            return message.guild.members.cache.get(toMute.id).voice.setMute(false).then(() => {
                message.channel.send(`**[🔈] ${message.author.username}**, successfully **unmuted ${toMute.tag}** in "${message.member.voice.channel.name}".`).then(m => m.delete({
                    timeout: 5000
                }));
            });
        } else if (!toMute) {
            message.channel.members.forEach(member => {
                member.voice.setMute(false);
            });

            return message.channel.send(`**[🔈] ${message.author.username}**, successfully **unmuted all members** in "${message.member.voice.channel.name}".`).then(m => m.delete({
                timeout: 5000
            }));
        }
    }
}