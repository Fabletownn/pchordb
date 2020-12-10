const Discord = require("discord.js")
const client = new Discord.Client();
const mongoose = require("mongoose");

const LUV = require("../models/love.js");

module.exports = {
    name: 'love',
    description: '[ONE-STEP] Add one ITF Love to the counter! <[setPrefix]love>',
    execute(message, args) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;

        LUV.findOne({
            guildID: message.guild.id,
        }, (err, data) => {
            if (err) return console.log(err)
            if (!data) {
                const newLUVData = new LUV({
                    guildID: message.guild.id,
                    latestMember: message.author.id,
                    loves: 1
                });
                newLUVData.save().catch(err => console.log(err))
                message.channel.send(`<:zITSBTLove:781301995305959444> **${message.author.tag}** contributed the first ever ITF Love! <:zITSBTLove:781301995305959444>\n\nTotal <:zITSBTLove:781301995305959444>s: 1`);
            } else {
                if (data.latestMember === message.author.id) return message.channel.send(`**[<:zITSBTLove:781301995305959444>] ${message.author.username}**, you cannot give an ITF Love twice in a row!`).then(m => m.delete({
                    timeout: 5000
                }));

                data.guildID = message.guild.id;
                data.latestMember = message.author.id;
                data.loves += 1;

                data.save().catch(err => console.log(err))
                message.channel.send(`<:zITSBTLove:781301995305959444> **${message.author.tag}** contributed 1 ITF Love to the counter! <:zITSBTLove:781301995305959444>\n\nTotal <:zITSBTLove:781301995305959444>s: ${data.loves.toLocaleString()}`);
            }
        });
    }
}