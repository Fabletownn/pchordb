const Discord = require("discord.js")
const client = new Discord.Client();

const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");
const ms = require("parse-ms");

var cooldownVariable;

module.exports = {
    name: 'trigger',
    description: '[FUN] This will trigger a mentioned member\'s profile picture (or your own). <[setPrefix]trigger (<@member>)>',
    async execute(message) {
        message.delete();

        let timeout = 30000;

        if (timeout - (Date.now() - cooldownVariable) > 0) {
            let time = ms(timeout - (Date.now() - cooldownVariable));
            return message.channel.send(`**[🌬️] ${message.author.username}**, due to risks of eye strain, this command is on cooldown. You'll be able to use this command in **${time.seconds} seconds**.`).then(m => m.delete({
                timeout: 10000
            }));
        }

        var mentionedUser = message.mentions.users.first();

        if (mentionedUser) {
            let triggered = await canvacord.Canvas.trigger(mentionedUser.displayAvatarURL({ format: "png", dynamic: false }));
            let attachment = new MessageAttachment(triggered, "triggered.gif");

            cooldownVariable = Date.now();
            return message.channel.send(`<:zITFRage:667854648861917184> **${message.author.username}**, this will self-destruct in 1 minute. <:zITFRage:667854648861917184>`, { files: [attachment] }).then(m => m.delete({ timeout: 60000 }));
        } else {
            let triggered = await canvacord.Canvas.trigger(message.author.displayAvatarURL({ format: "png", dynamic: false }));
            let attachment = new MessageAttachment(triggered, "triggered.gif");

            cooldownVariable = Date.now();
            return message.channel.send(`<:zITFRage:667854648861917184> **${message.author.username}**, this will self-destruct in 1 minute. <:zITFRage:667854648861917184>`, { files: [attachment] }).then(m => m.delete({ timeout: 60000 }));
        }
    }
}