const Discord = require("discord.js");
const client = new Discord.Client();
const ms = require("parse-ms")
var cooldownVar = "";

const ATT = require("../models/attachs.js")

module.exports = {
    name: 'gtb-display',
    description: '[GTB] This will display all cosmetics ready to be used in a game (via DMs). <[setPrefix]gtb-display>',
    execute(message, args) {
        let timeout = 30000;

        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        ATT.findOne({
            guildID: message.guild.id,
        }, (err, data) => {
            if (err) return console.log(err);
            if (!data) return message.channel.send(`**[⚠️] ${message.author.username}**, there is no information to display.`);

            if (timeout - (Date.now() - cooldownVar) > 0) {
                let time = ms(timeout - (Date.now() - cooldownVar));
                return message.channel.send(`[<:gtbWarn:758808111879421972>] **${message.author.username}**, since displaying cosmetics takes up response time, you've been restricted from using this command for \`${time.seconds} seconds\`.`).then(m => m.delete({
                    timeout: 10000
                }));
            }

            try {
                cooldownVar = Date.now();
                message.author.send(`[**1**] ${data.answer1 || "No information found."}:\n${data.attachs1 || "No attachment found."}\n\n[**2**] ${data.answer2 || "No information found."}:\n${data.attachs2 || "No attachment found."}\n\n[**3**] ${data.answer3 || "No information found."}:\n${data.attachs3 || "No attachment found."}\n\n[**4**] ${data.answer4 || "No information found."}:\n${data.attachs4 || "No attachment found."}\n\n[**5**] ${data.answer5 || "No information found."}:\n${data.attachs5 || "No attachment found."}\n\n`).catch(() => message.channel.send(`[<:gtbWarn:758808111879421972>] **${message.author.username}**, an error occurred. Make sure you are accepting direct messages from this guild. (**Server Settings > Privacy Settings > Allow Direct Messages From Server Members : ON**)`)).then(m => m.delete({
                    timeout: 10000
                }));
                message.author.send(`[**6**] ${data.answer6 || "No information found."}:\n${data.attachs6 || "No attachment found."}\n\n[**7**] ${data.answer7 || "No information found."}:\n${data.attachs7 || "No attachment found."}\n\n[**8**] ${data.answer8 || "No information found."}:\n${data.attachs8 || "No attachment found."}\n\n[**9**] ${data.answer9 || "No information found."}:\n${data.attachs9 || "No attachment found."}\n\n[**10**] ${data.answer10 || "No information found."}:\n${data.attachs10 || "No attachment found."}\n\n`)
                message.author.send(`[**11**] ${data.answer11 || "No information found."}:\n${data.attachs11 || "No attachment found."}\n\n[**12**] ${data.answer12 || "No information found."}:\n${data.attachs12 || "No attachment found."}\n\n[**13**] ${data.answer13 || "No information found."}:\n${data.attachs13 || "No attachment found."}\n\n[**14**] ${data.answer14 || "No information found."}:\n${data.attachs14 || "No attachment found."}\n\n[**15**] ${data.answer15 || "No information found."}:\n${data.attachs15 || "No attachment found."}`)
                message.author.send(`\n\n[**16**] ${data.answer16 || "No information found."}:\n${data.attachs16 || "No attachment found."}\n\n[**17**] ${data.answer17 || "No information found."}:\n${data.attachs17 || "No attachment found."}\n\n[**18**] ${data.answer18 || "No information found."}:\n${data.attachs18 || "No attachment found."}\n\n[**19**] ${data.answer19 || "No information found."}:\n${data.attachs19 || "No attachment found."}\n\n[**20**] ${data.answer20 || "No information found."}:\n${data.attachs20 || "No attachment found."}`)

                message.channel.send(`**[📨] ${message.author.username}**, slidin' into your DMs!\nPlease note that the attachment URLs will be provided instead. Answers are not case-sensitive.`).then(m => m.delete({
                    timeout: 10000
                }));
            } catch (err) {
                message.reply(`An error occurred. Please contact creators ASAP:\n\`\`\`\n${err}\`\`\``).then(m => m.delete({
                    timeout: 5000
                }));
            }
        });
    }
}