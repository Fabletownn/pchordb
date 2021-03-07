const Discord = require("discord.js");
const PNT = require('../models/points.js');

let feCount = 0;

module.exports = {
    name: 'gtb-end',
    description: '[GTB] This will give all players with 3+ points the \'Guess The Blank Champion\' role and show the leaderboard. Use this at the end of a Guess The Blank game. <[setPrefix]gtb-end>',
    execute(message, args) {
        message.delete();

        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273") && message.author.id !== "528759471514845194") return;

        try {
            PNT.find({
                lb: "all"
            }).sort([
                ['points', 'descending']
            ]).exec((err, res) => {
                if (err) console.log(err);

                var page = Math.ceil(res.length / 10);
                const endEmbed = new Discord.MessageEmbed()
                    .setTitle(`GUESS THE BLANK : Points Leaderboard`)
                    .setThumbnail('https://cdn.discordapp.com/attachments/730960122221690954/793177649601314826/NormalVer.png')
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

                message.channel.send(`**[<:zITFGG:667854871579590696>] Players**, this game's **Guess The Blank** leaderboard is below.\nAll users with 3 points or higher will be granted the \`@Guess The Blank Champion\` role. This role will be slowly rolled out.`).then(message.channel.send({
                    embed: endEmbed
                }));
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
                                    winners.roles.add('626803737595478046');
                                    message.author.send(`[${new Date().toLocaleTimeString()}] Added \`@Guess The Blank Champion\` role to member \`${winners.user.tag}\`. [${data.points.toLocaleString()} points]`).catch(() => console.log('An error occurred.'))
                                } else {
                                    return;
                                }
                            }
                        });
                    }, message.channel.send(`**[${new Date().toLocaleTimeString()}]**: Task complete.`).then(m => m.delete({
                        timeout: 10000
                    }))
                    .then(() => PNT.deleteMany()));
            });
        } catch (err) {
            return console.log(err);
        }
    }
}