const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'vcunmute',
    description: '[MODERATION] This will either unmute the mentioned member or all members given the voice channel ID. <[setPrefix]vcunmute <voice channel ID> (<@member>)>',
    execute(message) {
        message.delete();

        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        let messageArguments = message.content.split(" ");

        let channelID = messageArguments[1];
        let toUnmute = message.mentions.users.first();
        let toUnmuteM = message.guild.member(toUnmute);

        let toChannel = message.guild.channels.cache.get(channelID);

        if (!channelID) return message.channel.send(`**[🔈] ${message.author.username}**, please ensure you're providing a voice channel ID first.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!toChannel) return message.channel.send(`**[🔈] ${message.author.username}**, that channel wasn't found: ensure the ID given is valid.`).then(m => m.delete({
            timeout: 10000
        }));
        if (toChannel.type !== 'voice') return message.channel.send(`**[🔈] ${message.author.username}**, that channel isn't a voice channel: please ensure you're providing a voice channel ID.`).then(m => m.delete({
            timeout: 10000
        }));

        if (!toUnmute) {
            toChannel.members.each((member) => {
                member.voice.setMute(false);
            });

            return message.channel.send(`**[🔈] ${message.author.username}**, currently **unmuting all members** in \`${toChannel.name}\`.\n*(For larger VCs, this may take longer due to Discord's ratelimiting)*.`).then(m => m.delete({
                timeout: 35000
            }));
        } else if (toUnmute) {
            toChannel.members.each(() => {
                toUnmuteM.voice.setMute(false);
            });

            return message.channel.send(`**[🔈] ${message.author.username}**, successfully **unmuted ${toUnmute.tag}** in \`${toChannel.name}\`.`).then(m => m.delete({
                timeout: 35000
            }));
        }
    }
}