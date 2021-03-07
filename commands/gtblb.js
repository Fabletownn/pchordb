const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, MessageEmbed } = require("discord.js");
const mongoose = require('mongoose');

const PNT = require("../models/points.js");

module.exports = {
    name: 'gtb-leaderboard',
    description: '[GTB] This will display the Guess The Blank points leaderboard. <[setPrefix]gtb-leaderboard>',
    execute(message, args) {
        message.delete();

        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273") && message.author.id !== "528759471514845194") return;

        PNT.find({
            lb: "all"
        }).sort([
            ['points', 'descending']
        ]).exec((err, res) => {
            if (err) return console.log(err);

            var page = Math.ceil(res.length / 10);

            const leaderEmbed = new MessageEmbed()
                .setTitle(`Guess The Blank: Points Leaderboard`)
                .setThumbnail('https://cdn.discordapp.com/attachments/730960122221690954/793177649601314826/NormalVer.png')
                .setAuthor(`Showcased by: ` + message.author.username + `#` + message.author.discriminator, message.author.displayAvatarURL())
                .setColor('eb4bc9')
                .setTimestamp()

            let pgLB = parseInt(args[0]);

            if (pgLB != Math.floor(pgLB)) pgLB = 1;
            if (!pgLB) pgLB = 1;

            let end = pgLB * 10;
            let start = (pgLB * 10) - 10;

            if (res.length === 0) {
                leaderEmbed.addField("ERROR:", "No Pages Found");
                return;
            } else if (res.length <= start) {
                leaderEmbed.addField("ERROR:", "No Pages Found");
                return;
            } else if (res.length <= end) {
                leaderEmbed.setFooter(`PAGE ${pgLB} OF ${page}`);
                for (i = start; i < res.length; i++) {
                    leaderEmbed.addField(`[#${i + 1}] ${res[i].name}`, `${res[i].points.toLocaleString()} points`);
                }
            } else {
                leaderEmbed.setFooter(`PAGE ${pgLB} OF ${page}`);
                for (i = start; i < end; i++) {
                    leaderEmbed.addField(`[#${i + 1}] ${res[i].name}`, `${res[i].points.toLocaleString()} points`);
                }
            }
            message.channel.send(`The current Guess The Blank leaderboard is shown below.`, { embed: leaderEmbed });
        });
    }
}