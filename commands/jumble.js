const Discord = require("discord.js");
const client = new Discord.Client();

const Jumble = require("jumble-words");
const jumble = new Jumble();

const ms = require("parse-ms");
var cooldownVariable;

module.exports = {
    name: 'jumble',
    description: '[GENERAL] This will initiate a game of Jumble Words. <[setPrefix]jumble>',
    async execute(message) {
        message.delete();

        const word = jumble.generate();
        let timeout = 5000;

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '789937524763000832') return;

        if (timeout - (Date.now() - cooldownVariable) > 0) return;
        const hintList = [word[0].word.substring(0, 2), word[0].word.substring(0, 3)];
        const hint = hintList[Math.floor(Math.random() * hintList.length)];

        if (word[0].word.includes("www") || word[0].word.endsWith("com") || word[0].word.includes("phobic") || word[0].word.includes("phobia") || word[0].word.includes("a")) {
            word[0].jumble = "kcifnotreti"
            word[0].word = "nickfortnite"
        }

        cooldownVariable = Date.now();
        message.channel.send(`**[🕹️] ${message.author.username}**, let's play **Jumble**! Your word will be shown shortly. __Get ready!__`).then(msg => {
            setTimeout(async function() {
                const gameEmbed = new Discord.MessageEmbed()
                    .setAuthor(`Jumble Words | ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription(`Your jumbled word is **${word[0].jumble}**.\n**HINT**: ||It starts with "${hint}".||`)
                    .setColor(`eb4bc9`)
                    .setFooter(`In case of any concerning words, contact ModMail.`)
                    .setTimestamp()

                await msg.edit(`**${message.author.username}**, you have 15 seconds to answer. Get guessin'!`, { embed: gameEmbed });
                console.log(word[0].word) // don't mind me cheating

                const filter = m => m.author.id === message.author.id;
                message.channel.awaitMessages(filter, {
                        max: 1,
                        error: ["time"],
                        time: 15000,
                    })
                    .then(collected => {
                        const answer = collected.first();
                        if (word[0].word.toLowerCase === 'jumble' && answer.content.includes('+jumble')) return;

                        if (!answer.content.toLowerCase().includes(word[0].word.toLowerCase())) {
                            const incorrectEmbed = new Discord.MessageEmbed()
                            .setAuthor(`Jumble Words | ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`🛎️ **Incorrect.** The non-jumbled word was "${word[0].word}".`)
                            .setColor(`ff0000`)
                            .setFooter(`The game has ended.`)
                            .setTimestamp()
                        
                        answer.delete();
                        return msg.edit(`**${message.author.username}**, nice try. Run the command to play again.`, { embed: incorrectEmbed }).then(m => m.delete({ timeout: 5000 }));
                        }
                        const correctEmbed = new Discord.MessageEmbed()
                            .setAuthor(`Jumble Words | ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`🛎️ **Correct!** The non-jumbled word was "${word[0].word}".`)
                            .setColor(`00ff00`)
                            .setFooter(`The game has ended.`)
                            .setTimestamp()
                        
                        answer.delete();
                        return msg.edit(`**${message.author.username}**, nice work! Run the command to play again.`, { embed: correctEmbed }).then(m => m.delete({ timeout: 5000 }));
                    })
                    .catch(() => {
                        message.channel.send(`Tiiiiime's up! You couldn't answer in time: the correct answer was "**${word[0].word}**"! RIP.`).then(m => m.delete({
                            timeout: 5000
                        }));
                        return msg.delete();
                    });
            }, 3000);
        });
    }
}