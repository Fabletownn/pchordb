const Discord = require("discord.js")

module.exports = {
    name: 'edit',
    description: '[MODERATION] This will edit one of Power Chord\'s messages given the channel ID, message ID & content(s). <[setPrefix]edit <#channel> <message ID> <content>>',
    execute(message) {
        message.delete();

        const client = message.client;
        let messageArguments = message.content.split(" ");
        
        let channel = message.mentions.channels.first();
        let messageID = messageArguments[2];
        
        let editContent = message.content.substr(47, 2048);

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;
        
        if (!channel) return message.channel.send(`**[📝] ${message.author.username}**, please ensure you're mentioning the channel to edit in first.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!messageID || messageID.length !== 18) return message.channel.send(`**[📝] ${message.author.username}**, please ensure you're inputting a valid message ID second.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!editContent) return message.channel.send(`**[📝] ${message.author.username}**, please ensure you're inputting content to edit this message to last.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!channel.messages.fetch(messageID)) return message.channel.send(`**[📝] ${message.author.username}**, that message ID wasn't found in the mentioned channel.`).then(m => m.delete({
            timeout: 10000
        }));
        
        channel.messages.fetch(messageID).then(toEdit => {
            if (toEdit.author.id !== client.user.id) return message.channel.send(`**[📝] ${message.author.username}**, that message is **not** my message, therefore I cannot edit it.`).then(m => m.delete({
                timeout: 10000
            }));
            
            const editEmbed = new Discord.MessageEmbed()
                .setAuthor(`Power Chord Content Edited`, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setDescription(`Message successfully edited (embeds not impacted).`)
                .addField(`Before Edited Content(s)`, toEdit.content || `No content.`)
                .addField(`After Edited Content(s)`, editContent || `No content (?).`)
                .setFooter(`Content(s) edited by ${message.author.tag}`)
                .setTimestamp()
                .setColor(`eb4bc9`)
        
            toEdit.edit(editContent).then(message.channel.send(`**[📝] ${message.author.username}**, the deeeed's been done. You can view the new content(s) below.`, {
                embed: editEmbed
            }));
        }).catch(error => {
            message.channel.send(`**[📝] ${message.author.username}**, an error occurred trying to fetch the message & edit it's content(s).`).then(m => m.delete({
                timeout: 10000
            }));
            return console.log(error);
        });
    }
}