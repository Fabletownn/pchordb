const Discord = require("discord.js")

module.exports = {
    name: 'farahunpinreedsmessage',
    description: 'Joke command.',
    execute(message) {
        if (message.author.id !== "528759471514845194") return;
        message.channel.messages.fetch("793634327258202112").then(messageInQ => {
            messageInQ.unpin().then(message.channel.send(`done, i unpinned that band kids message lol outdated <:cFarahLove:804108721097408542>`))
        })
    }
}