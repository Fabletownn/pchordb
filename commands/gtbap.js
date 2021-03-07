const PNT = require("../models/points.js");

module.exports = {
    name: 'gtb-addpoints',
    description: '[GTB] This will add a specified amount of Guess The Blank points to the mentioned member. <[setPrefix]gtb-addpoints <@member>>',
    execute(message) {
        message.delete();

        const grantTo = message.mentions.users.first();
        const toSplit = message.content.split(" ");
        const pointsTG = toSplit[2];

        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273") && message.author.id !== "528759471514845194") return;

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