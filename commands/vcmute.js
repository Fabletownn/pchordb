const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'vcmute',
    description: '[MODERATION] This will either mute the mentioned member or all members given the voice channel ID. <[setPrefix]vcmute <voice channel ID> (<@member>)>',
    execute(message) {
        message.delete();

        let itfR = message.guild.roles.cache.find(role => role.name === "I Talk Fortnite");
        let administratorR = message.guild.roles.cache.find(role => role.name === "Administrator");
        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");

        if (!message.member.roles.cache.has(moderatorR.id)) return;

        let messageArguments = message.content.split(" ");

        let channelID = messageArguments[1];
        let toMute = message.mentions.users.first();
        let toMuteM = message.guild.member(toMute);

        let toChannel = message.guild.channels.cache.get(channelID);

        if (!channelID) return message.channel.send(`**[🔇] ${message.author.username}**, please ensure you're providing a voice channel ID first.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!toChannel) return message.channel.send(`**[🔇] ${message.author.username}**, that channel wasn't found: ensure the ID given is valid.`).then(m => m.delete({
            timeout: 10000
        }));
        if (toChannel.type !== 'voice') return message.channel.send(`**[🔇] ${message.author.username}**, that channel isn't a voice channel: please ensure you're providing a voice channel ID.`).then(m => m.delete({
            timeout: 10000
        }));

        if (!toMute) {
            toChannel.members.each((member) => {
                let memberC = message.guild.member(member);
                if (memberC.roles.cache.has(itfR.id)) return;
                if (memberC.roles.cache.has(administratorR.id)) return;
                if (memberC.roles.cache.has(moderatorR.id)) return;

                member.voice.setMute(true);
            });

            return message.channel.send(`**[🔇] ${message.author.username}**, currently **muting all members** in \`${toChannel.name}\`.\n*(For larger VCs, this may take longer due to Discord's ratelimiting)*.`).then(m => m.delete({
                timeout: 35000
            }));
        } else if (toMute) {
            toChannel.members.each(() => {
                toMuteM.voice.setMute(true);
            });

            return message.channel.send(`**[🔇] ${message.author.username}**, successfully **muted ${toMute.tag}** in \`${toChannel.name}\`.`).then(m => m.delete({
                timeout: 35000
            }));
        }
    }
}