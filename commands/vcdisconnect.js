module.exports = {
    name: 'vcdisconnect',
    description: '[MODERATION] This will kick everybody out of a specific Voice Channel given the ID. <[setPrefix]vcdisconnect <voice channel ID>>',
    execute(message) {
        message.delete();

        let messageArguments = message.content.split(" ");
        let channelID = messageArguments[1];
        let voiceChannel = message.guild.channels.cache.get(channelID);

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        if (!channelID) return message.channel.send(`**[🔌] ${message.author.username}**, please input a voice channel's ID to disconnect every member from.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!voiceChannel) return message.channel.send(`**[🔌] ${message.author.username}**, that channel wasn't found: please input a valid channel's ID.`).then(m => m.delete({
            timeout: 10000
        }));
        if (voiceChannel.type !== 'voice') return message.channel.send(`**[🔌] ${message.author.username}**, that channel wasn't a voice channel: please input a voice channel's ID.`).then(m => m.delete({
            timeout: 10000
        }));

        voiceChannel.members.each((member) => {
            member.voice.kick();
        });

        message.channel.send(`**[🔌] ${message.author.username}**, currently **disconnecting all members** out of \`${voiceChannel.name}\`.\n*(For larger VCs, this may take longer due to Discord's ratelimiting)*.`).then(m => m.delete({
            timeout: 25000
        }));
    }
}