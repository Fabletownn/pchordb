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

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

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

        message.channel.send(`**[💨] ${message.author.username}**, successfully moved all members from \`${fromVoiceChannel.name}\` to \`${toVoiceChannel.name}\`.`).then(m => m.delete({
            timeout: 25000
        }));
    }
}