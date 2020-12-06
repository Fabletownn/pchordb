const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'socials',
    description: '[ONE-STEP] This will provide a list of all of I Talk Fortnite\'s social medias. <[setPrefix]socials>',
    execute(message, args) {
        message.delete();
        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;

        const socialsEmbed = new Discord.MessageEmbed()
            .setTitle(`I Talk Fortnite: Socials`)
            .setDescription(`For his **YouTube** Channel, press [here](http://bit.ly/2Nu6QOG).\nFor his **Twitch** Channel, press [here](http://bit.ly/2KQ1DyN).\nFor his **Twitter** Profile, press [here](http://bit.ly/2Z9CS9H).\nFor his **Instagram** Account, press [here](http://bit.ly/327S5Fa).\nFor his **Spotify** Account, press [here](https://spoti.fi/2TWjhEh).`)
            .setColor('eb4bc9')

        message.channel.send({ embed: socialsEmbed });
    }
}