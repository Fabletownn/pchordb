const PNT = require("../models/points.js");

module.exports = {
    name: 'gtb-removepoints',
    description: '[GTB] This will remove a specified amount of Guess The Blank points from the mentioned member. <[setPrefix]gtb-removepoints <@member>>',
    execute(message) {
        message.delete();

        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273") && message.author.id !== "528759471514845194") return;

        const grantTo = message.mentions.users.first();
        const toSplit = message.content.split(" ");
        const pointsTR = toSplit[2];

        if (!grantTo) return message.channel.send(`**[⚠️] ${message.author.username}**, please make sure you're **mentioning** a member to revoke points from.`).then(m => m.delete({
            timeout: 10000
        }));
        if (isNaN(pointsTR) || !pointsTR) return message.channel.send(`**[⚠️] ${message.author.username}**, please make sure you're **specifying** an amount of points to revoke.`).then(m => m.delete({
            timeout: 10000
        }));
        if (pointsTR.includes('-')) return message.channel.send(`**[⚠️] ${message.author.username}**, please make sure you're **specifying** an amount of points to revoke.`).then(m => m.delete({
            timeout: 10000
        }));
        if (pointsTR.length > 9) return message.channel.send(`**[⚠️] ${message.author.username}**, please make sure you're giving a **reasonable** amount of points to revoke from this member.`).then(m => m.delete({
            timeout: 10000
        }));

        PNT.findOne({
            userID: grantTo.id
        }, (err, data) => {
            if (err) return message.channel.send(`**[⚠️] ${message.author.username}**, an error occurred trying to save that user's data.`);
            
            if (!data) {
                const newPNT = new PNT({
                    serverID: message.guild.id,
                    userID: grantTo.id,
                    name: grantTo.username,
                    points: 0,
                    lb: "all"
                });
                newPNT.save().catch(err => console.log(err));
                message.channel.send(`**[💸] ${message.author.username}**, revoked ${parseInt(pointsTR).toLocaleString()} points from \`${grantTo.tag}\`: their point balance is now 0.`).then(m => m.delete({
                    timeout: 10000
                }));
            } else {
                if ((data.points - parseInt(pointsTR) < 0)) {
                    return message.channel.send(`**[⚠️] ${message.author.username}**, please give a **reasonable** amount of points to revoke from this user.`).then(m => m.delete({
                        timeout: 10000
                    }));
                }
                data.points -= parseInt(pointsTR);
                data.save().catch(err => console.log(err));
                message.channel.send(`**[💸] ${message.author.username}**, revoked ${parseInt(pointsTR).toLocaleString()} points from \`${grantTo.tag}\`: their point balance is now ${data.points.toLocaleString()}.`).then(m => m.delete({
                    timeout: 10000
                }));
            }
        });
    }
}