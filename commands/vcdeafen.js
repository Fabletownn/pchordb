const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'vcdeafen',
    description: '[MODERATION] If you are in a voice channel, this will server deafen the mentioned member in the same voice channel. If there is no mentioned member, this will server deafen all members within the voice channel. <[setPrefix]vcdeafen (<@member>)>',
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
                return message.channel.send("**[🔈] ${message.author.username}**, please make sure that member is in a **voice channel** before running this command.").then(m => m.delete({
                    timeout: 5000
                }));
            }

            message.guild.members.cache.get(toMute.id).voice.setDeaf(true).then(() => {
                message.channel.send(`**[👂] ${message.author.username}**, successfully **deafened ${toMute.tag}** in "${message.member.voice.channel.name}".`).then(m => m.delete({
                    timeout: 5000
                }));
            });
        } else if (!toMute) {
            message.channel.members.forEach(member => {
                member.voice.setDeaf(true);
            });

            return message.channel.send(`**[👂] ${message.author.username}**, successfully **deafened all members** in "${message.member.voice.channel.name}".`).then(m => m.delete({
                timeout: 5000
            }));
        }
    }
}