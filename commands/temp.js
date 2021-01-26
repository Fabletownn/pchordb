const Discord = require("discord.js");
const fs = require(`fs`);

module.exports = {
    name: 'temporarycommandlol',
    description: 'Temporary command. Will fetch current banned users in the main.',
    execute(message) {
        if (message.author.id !== "528759471514845194") return;
        let hi = message.guild.roles.cache.get("655191803858780180").members.size
        message.reply(`${hi} people r tweakers`)
    }
}