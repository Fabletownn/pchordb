const Discord = require("discord.js")
const client = new Discord.Client();

const canvacord = require("canvacord");
const { MessageAttachment } = require("discord.js");
const ms = require("parse-ms");

var cooldownVariable;

module.exports = {
    name: 'trigger',
    description: '[GENERAL] This will trigger a mentioned member\'s profile picture (or your own, just don\'t mention anybody). <[setPrefix]trigger (<@member>)>',
    async execute(message, args) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '780027707622424607') return;

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
            return message.channel.send(`**<:zITSBTRage:784206691918675988> ${message.author.username}**, here is **${mentionedUser.tag}**, but triggered. This image will self-destruct in 1 minute. <:zITSBTRage:784206691918675988>`, { files: [attachment] }).then(m => m.delete({ timeout: 60000 }));
        } else {
            let triggered = await canvacord.Canvas.trigger(message.author.displayAvatarURL({ format: "png", dynamic: false }));
            let attachment = new MessageAttachment(triggered, "triggered.gif");

            cooldownVariable = Date.now();
            return message.channel.send(`**<:zITSBTRage:784206691918675988> ${message.author.username}**, here is your triggered self. This image will self-destruct in 1 minute. <:zITSBTRage:784206691918675988>`, { files: [attachment] }).then(m => m.delete({ timeout: 60000 }));
        }
    }
}