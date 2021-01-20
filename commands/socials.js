const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'socials',
    description: '[GENERAL] This will provide a list of all of I Talk\'s social medias. <[setPrefix]socials>',
    execute(message, args) {
        message.delete();
        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;

        const socialsEmbed = new Discord.MessageEmbed()
            .setAuthor(`I Talk: Socials`, message.author.displayAvatarURL({ 
                dynamic: true
            }))
            .setDescription(`For his **YouTube** Channel, press [here](http://bit.ly/2Nu6QOG).\nFor his **Twitch** Channel, press [here](https://www.twitch.tv/itsitalk).\nFor his **Twitter** Profile, press [here](https://twitter.com/ThisIsITalk).\nFor his **Trello** Account, press [here](https://trello.com/b/KbYIp5kZ/videos).\nFor his **Instagram** Account, press [here](http://bit.ly/327S5Fa).\nFor his **Reddit** Account, press [here](https://www.reddit.com/user/ICanTalkFortnite/).\nFor his **Spotify** Account, press [here](https://spoti.fi/2TWjhEh).`)
            .setColor('eb4bc9')

        message.channel.send({ embed: socialsEmbed });
    }
}