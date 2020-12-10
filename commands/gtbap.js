const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require('mongoose');
const ms = require('parse-ms')
var cooldownVar = "";

const PNT = require("../models/points.js");

module.exports = {
    name: 'gtb-addpoints',
    description: '[GTB] This will add a specified amount of Guess The Blank points to the mentioned member. <[setPrefix]gtb-addpoints <@member>>',
    execute(message) {
        message.delete();

        let timeout = 7000;

        const grantTo = message.mentions.users.first();
        const toSplit = message.content.split(" ");
        const pointsTG = toSplit[2];

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        if (!grantTo) return message.channel.send(`**[⚠️] ${message.author.username}**, please make sure you're **mentioning** a member to grant points to.`).then(m => m.delete({
            timeout: 10000
        }));
        if (isNaN(pointsTG) || !pointsTG) return message.channel.send(`**[⚠️] ${message.author.username}**, please make sure you're **specifying** an amount of points to grant.`).then(m => m.delete({
            timeout: 10000
        }));
        if (pointsTG.includes('-')) return message.channel.send(`**[⚠️] ${message.author.username}**, please make sure you're **specifying** an amount of points to grant.`).then(m => m.delete({
            timeout: 10000
        }));
        if (pointsTG.length > 9) return message.channel.send(`**[⚠️] ${message.author.username}**, please make sure you're giving a **reasonable** amount of points to grant to this member.`).then(m => m.delete({
            timeout: 10000
        }));

        if (timeout - (Date.now() - cooldownVar) > 0) {
            let time = ms(timeout - (Date.now() - cooldownVar));
            return message.channel.send(`**[🌬️] ${message.author.username}**, this command is on cooldown: you'll be able to use it again in \`${time.seconds} seconds\`.`).then(m => m.delete({
                timeout: 10000
            }));
        }

        cooldownVar = Date.now();

        PNT.findOne({
            userID: grantTo.id
        }, (err, data) => {
            if (err) return message.channel.send(`**[⚠️] ${message.author.username}**, an error occurred trying to save that user's data: please report this ASAP.`)
            if (!data) {
                const newPNT = new PNT({
                    serverID: message.guild.id,
                    userID: grantTo.id,
                    name: grantTo.username,
                    points: parseInt(pointsTG),
                    lb: "all"
                });
                newPNT.save().catch(err => console.log(err));
                message.channel.send(`**[💵] ${message.author.username}**, granted ${parseInt(pointsTG).toLocaleString()} points to \`${grantTo.tag}\`: their point balance is now ${parseInt(pointsTG).toLocaleString()}.`).then(m => m.delete({
                    timeout: 10000
                }));
            } else {
                data.points += parseInt(pointsTG);
                data.save().catch(err => message.reply(`An error occurred. Please contact creators ASAP.\n\`\`\`${err}\`\`\``));
                message.channel.send(`**[💵] ${message.author.username}**, granted ${parseInt(pointsTG).toLocaleString()} points to \`${grantTo.tag}\`: their point balance is now ${data.points.toLocaleString()}.`).then(m => m.delete({
                    timeout: 10000
                }));
            }
        });
    }
}