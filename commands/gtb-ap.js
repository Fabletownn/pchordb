const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require('mongoose');
const ms = require('parse-ms');
var cooldownVar = "";

mongoose.connect(process.env.mongoPassGTB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const PNT = require("../models/points.js");

module.exports = {
    name: 'gtb-addpoints',
    description: '[GTB] This will add the specified amount of points to a mentioned member. <[setPrefix]gtb-addpoints <@member>>',
    execute(message, args) {
        message.delete();

        let timeout = 7000;
        const grantTo = message.mentions.users.first();
        const toSplit = message.content.split(" ");
        const pointsTG = toSplit[2];

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        if (!grantTo) return message.channel.send(`**[<:gtbWarn:758808111879421972>] ${message.author.username}**, please \`@mention\` a specific member to grant a specific amount of points to them. Proper syntax would be; \`-ap [@member] [amt of points]\`.\nFor further assistance with syntax, use \`-syntax ap\`.`).then(m => m.delete({
            timeout: 10000
        }));
        if (isNaN(pointsTG) || !pointsTG) return message.channel.send(`**[<:gtbWarn:758808111879421972>] ${message.author.username}**, please give a specific amount of points to grant to this member. Proper syntax would be; \`-ap [@member] [amt of points]\`.\nFor further assistance with syntax, use \`-syntax ap\`.`).then(m => m.delete({
            timeout: 10000
        }));
        if (pointsTG.includes('-')) return message.channel.send(`**[<:gtbWarn:758808111879421972>] ${message.author.username}**, please give a specific amount of points to grant to this member. Proper syntax would be; \`-ap [@member] [amt of points]\`.\nFor further assistance with syntax, use \`-syntax ap\`.`).then(m => m.delete({
            timeout: 10000
        }));
        if (pointsTG.length > 9) return message.channel.send(`**[<:gtbWarn:758808111879421972>] ${message.author.username}**, please give a **reasonable** amount of points to grant to this member. Proper syntax would be; \`-ap [@member] [amt of points]\`.\nFor further assistance with syntax, use \`-syntax ap\`.`).then(m => m.delete({
            timeout: 10000
        }));

        if (timeout - (Date.now() - cooldownVar) > 0) {
            let time = ms(timeout - (Date.now() - cooldownVar));
            return message.channel.send(`**[<:gtbWarn:758808111879421972>] ${message.author.username}**, since repetition of this command may slow down the bot, you've been restricted from using this command for \`${time.seconds} seconds\`.`).then(m => m.delete({
                timeout: 10000
            }));
        }

        cooldownVar = Date.now();

        PNT.findOne({
            userID: grantTo.id
        }, (err, data) => {
            if (err) return message.channel.send(`**[<:gtbWarn:758808111879421972>] ${message.author.username}**, an error occurred trying to save that user's data. Please report this to creators ASAP.\n\`\`\`${err}\`\`\``)
            if (!data) {
                const newPNT = new PNT({
                    serverID: message.guild.id,
                    userID: grantTo.id,
                    name: grantTo.username,
                    points: parseInt(pointsTG),
                    lb: "all"
                });
                newPNT.save().catch(err => console.log(err));
                message.channel.send(`**[<:gtbInfo:759011570545066015>] ${message.author.username}**, granted ${parseInt(pointsTG).toLocaleString()} points to \`${grantTo.tag}\`; their point balance is now ${parseInt(pointsTG).toLocaleString()}.`).then(m => m.delete({
                    timeout: 10000
                }));
            } else {
                data.points += parseInt(pointsTG);
                data.save().catch(err => message.reply(`An error occurred. Please contact creators ASAP.\n\`\`\`${err}\`\`\``));
                message.channel.send(`**[<:gtbInfo:759011570545066015>] ${message.author.username}**, granted ${parseInt(pointsTG).toLocaleString()} points to \`${grantTo.tag}\`; their point balance is now ${data.points.toLocaleString()}.`).then(m => m.delete({
                    timeout: 10000
                }));
            }
        });
    }
}