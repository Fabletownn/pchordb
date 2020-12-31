const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'test',
    description: '[GENERAL] Test!',
    execute(message, args) {
        message.delete();

        message.channel.send(`hi :^)`)
    }
}