module.exports = {
    name: 'movevc',
    description: '[MODERATION] This will move everybody from one VC to another given IDs. <[setPrefix]movevc <from-channel ID> <to-channel ID>>',
    execute(message) {
        message.delete();

        let messageArguments = message.content.split(" ");
        let fromChannelID = messageArguments[1];
        let toChannelID = messageArguments[2];
        let fromVoiceChannel = message.guild.channels.cache.get(fromChannelID);
        let toVoiceChannel = message.guild.channels.cache.get(toChannelID);

        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        if (!fromChannelID) return message.channel.send(`**[💨] ${message.author.username}**, please input a voice channel's ID to move every member from.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!toChannelID) return message.channel.send(`**[💨] ${message.author.username}**, please input a voice channel's ID to move every member to.`).then(m => m.delete({
            timeout: 10000
        }));
        
        if (!fromVoiceChannel) return message.channel.send(`**[💨] ${message.author.username}**, that first channel ID wasn't found: please input a valid channel ID.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!toVoiceChannel) return message.channel.send(`**[💨] ${message.author.username}**, that second channel ID wasn't found: please input a valid channel ID.`).then(m => m.delete({
            timeout: 10000
        }));

        if (fromVoiceChannel.type !== 'voice') return message.channel.send(`**[💨] ${message.author.username}**, that first channel wasn't a voice channel: please input a **valid voice channel** ID.`).then(m => m.delete({
            timeout: 10000
        }));
        if (toVoiceChannel.type !== 'voice') return message.channel.send(`**[💨] ${message.author.username}**, that second channel wasn't a voice channel: please input a **valid voice channel** ID.`).then(m => m.delete({
            timeout: 10000
        }));

        fromVoiceChannel.members.each((member) => {
            member.voice.setChannel(toChannelID);
        });

        message.channel.send(`**[💨] ${message.author.username}**, **moving all members** from \`${fromVoiceChannel.name}\` to \`${toVoiceChannel.name}\`.\n*(For larger VCs, this may take longer due to Discord's ratelimiting)*.`).then(m => m.delete({
            timeout: 25000
        }));
    }
}