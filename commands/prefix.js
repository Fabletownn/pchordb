const Discord = require("discord.js")
const client = new Discord.Client();
const mongoose = require("mongoose")
const botconfig = require("../botconfig.json")

mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const PRE = require("../models/prefix.js");

module.exports = {
    name: 'prefix',
    description: '[MODERATION] This will adjust Power Chord\'s prefix to the specified character(s). <[setPrefix] prefix <character(s)>>',
    execute(message, args) {
        message.delete();

        let administratorR = message.guild.roles.cache.find(role => role.name === "Administrator");
        let itfR = message.guild.roles.cache.find(role => role.name === "I Talk Fortnite");

        if (!message.member.roles.cache.has(administratorR.id) && !message.member.roles.cache.has(itfR.id)) return;

        var prefixA = message.content.split(" ");
        var toPrefix = prefixA[1];
        if (!toPrefix) return message.channel.send(`**[⚠️] ${message.author.username}**, please enter a prefix to change to the bot's prefix.\n*(This feature is guild-specific. In other guilds, this prefix will be different depending on what it was changed to).*`).then(m => m.delete({
            timeout: 10000
        }));
        PRE.findOne({
            guildID: message.guild.id,
        }, (err, data) => {
            if (err) return console.log(err)
            if (!data) {
                const newPREData = new PRE({
                    guildID: message.guild.id,
                    botPrefix: toPrefix
                });
                newPREData.save().catch(err => console.log(err))
                message.channel.send(`**[🎌] ${message.author.username}**, my prefix for "**${message.guild.name}**" has now been successfully changed to \`${toPrefix}\`.`);
            } else {
                if (toPrefix === data.botPrefix) return message.channel.send(`**[⚠️] ${message.author.username}**, this is already the bot's prefix.`).then(m => m.delete({
                    timeout: 10000
                }));
                data.guildID = message.guild.id;
                data.botPrefix = toPrefix;
                data.save().catch(err => console.log(err))
                message.channel.send(`**[🎌] ${message.author.username}**, my prefix for "**${message.guild.name}**" has now been successfully changed to \`${data.botPrefix}\`.`);
            }
        });
    }
}