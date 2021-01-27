const Discord = require("discord.js")
const client = new Discord.Client();
const ANG = require("../models/angel.js");

module.exports = {
    name: 'angelpings',
    description: '[MODERATION] This will check how many times Anhel Freevase has been pinged. <[setPrefix]angelpings>',
    execute(message) {
        message.delete();

        if (message.author.id !== "550384455613677571") return message.channel.send(`Anhel only.`).then(m => m.delete({ timeout: 5000 }));
        ANG.findOne({
            guildID: message.guild.id
        }, (err, data) => {
            if (err) return console.log(err);
            if (!data) return message.channel.send(`No data.`).then(m => m.delete({ timeout: 5000 }));

            message.channel.send(`**[<:yCrystalHeart:778318624032555039>] AnHEL**, you've been pinged **${data.angelPings.toLocaleString()}** times.`);
        });
    }
}