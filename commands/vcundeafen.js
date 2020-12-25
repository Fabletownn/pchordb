const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'vcundeafen',
    description: '[MODERATION] This will either undeafen the mentioned member or all members given the voice channel ID. <[setPrefix]vcundeafen <voice channel ID> (<@member>)>',
    execute(message) {
        message.delete();

        let itfR = message.guild.roles.cache.find(role => role.name === "I Talk Fortnite");
        let administratorR = message.guild.roles.cache.find(role => role.name === "Administrator");
        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");

        if (!message.member.roles.cache.has(moderatorR.id)) return;

        let messageArguments = message.content.split(" ");

        let channelID = messageArguments[1];
        let toUndeafen = message.mentions.users.first();
        let toUndeafenM = message.guild.member(toUndeafen);

        let toChannel = message.guild.channels.cache.get(channelID);

        if (!channelID) return message.channel.send(`**[👂] ${message.author.username}**, please ensure you're providing a voice channel ID first.`)
        if (!toChannel) return message.channel.send(`**[👂] ${message.author.username}**, that channel wasn't found: ensure the ID given is valid.`)
        if (toChannel.type !== 'voice') return message.channel.send(`**[👂] ${message.author.username}**, that channel isn't a voice channel: please ensure you're providing a voice channel ID.`)

        if (!toUndeafen) {
            toChannel.members.each((member) => {
                member.voice.setDeaf(false);
            });

            return message.channel.send(`**[👂] ${message.author.username}**, currently **undeafening all members** in \`${toChannel.name}\`.\n*(For larger VCs, this may take longer due to Discord's ratelimiting)*.`).then(m => m.delete({
                timeout: 35000
            }));
        } else if (toUndeafen) {
            toChannel.members.each(() => {
                toUndeafenM.voice.setDeaf(false);
            });

            return message.channel.send(`**[👂] ${message.author.username}**, successfully **undeafened ${toUndeafen.tag}** in \`${toChannel.name}\`.`).then(m => m.delete({
                timeout: 35000
            }));
        }
    }
}