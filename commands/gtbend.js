const Discord = require("discord.js");
const {
    Client,
    MessageEmbed
} = require("discord.js");
const client = new Discord.Client();
const mongoose = require('mongoose');
const PNT = require('../models/points.js');

let feCount = 0;

module.exports = {
    name: 'gtb-end',
    description: '[GTB] This will give all players with 3+ points the \'Guess The Blank Champion\' role and show the leaderboard. Use this at the end of a Guess The Blank game. <[setPrefix]gtb-end>',
    execute(message, args) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        try {
            PNT.find({
                lb: "all"
            }).sort([
                ['points', 'descending']
            ]).exec((err, res) => {
                if (err) console.log(err);

                var page = Math.ceil(res.length / 10);
                const endEmbed = new MessageEmbed()
                    .setTitle(`GUESS THE BLANK : Points Leaderboard`)
                    .setThumbnail('https://alphanerdsguild.com/wp-content/uploads/2018/03/11724-video-game.png')
                    .setAuthor(`Game Ended : ` + message.author.username + `#` + message.author.discriminator, message.author.displayAvatarURL())
                    .setColor('eb4bc9')
                    .setTimestamp()

                let pgLB = parseInt(args[0]);
                if (pgLB != Math.floor(pgLB)) pgLB = 1;
                if (!pgLB) pgLB = 1;

                let end = pgLB * 10;
                let start = (pgLB * 10) - 10;

                if (res.length === 0) {
                    endEmbed.addField("ERROR:", "No Pages Found");
                    return;
                } else if (res.length <= start) {
                    endEmbed.addField("ERROR:", "No Pages Found");
                    return;
                } else if (res.length <= end) {
                    endEmbed.setFooter(`PAGE ${pgLB} OF ${page}`);
                    for (i = start; i < res.length; i++) {
                        endEmbed.addField(`[#${i + 1}] ${res[i].name}`, `${res[i].points.toLocaleString()} points`);
                    }
                } else {
                    endEmbed.setFooter(`PAGE ${pgLB} OF ${page}`);
                    for (i = start; i < end; i++) {
                        endEmbed.addField(`[#${i + 1}] ${res[i].name}`, `${res[i].points.toLocaleString()} points`);
                    }
                }

                message.channel.send(`[<:gtbFirst:762551496059387924>] This game's **Guess The Blank** leaderboard is below. [${new Date().toLocaleTimeString()}]\n[<:gtbInfo:759011570545066015>] All users with 3 points or higher will be granted the \`Guess The Blank Champion\` role. This role will be slowly rolled out.`).then(message.channel.send(embed));
                setTimeout(() => {
                    message.guild.members.cache.forEach(winners => {
                            PNT.findOne({
                                userID: winners.user.id,
                            }, (err, data) => {
                                if (err) return console.log(err);
                                if (!data || data.userID === null) {
                                    return;
                                } else {
                                    if (data.points >= 3) {
                                        feCount += 1;
                                        winners.roles.add('776824463114371084');
                                        message.author.send(`[${new Date().toLocaleTimeString()}] Added \`Guess The Blank Champion\` role to member \`${winners.user.tag}\`. [${data.points.toLocaleString()} points]`).catch(() => console.log('An error occurred.'))
                                    } else {
                                        return;
                                    }
                                }
                            });
                        }, message.channel.send(`**[${new Date().toLocaleTimeString()}]**: Task complete.`)
                        .then(() => PNT.deleteMany()).then(setTimeout(() => {
                            process.exit();
                        }, 5000)));
                }, 5000)
            });
        } catch (err) {
            message.channel.send(`An error occurred. Please contact Farah ASAP.\n\`\`\`\n${err}\`\`\``)
        }
    }
}