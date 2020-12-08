const Discord = require("discord.js");
const client = new Discord.Client();

const Jumble = require("jumble-words");
const jumble = new Jumble();

const ms = require("parse-ms");
var cooldownVariable;

module.exports = {
    name: 'jumble',
    description: '[GENERAL] This will initiate a game of Jumble Words. <[setPrefix]jumble>',
    async execute(message, commandPrefix) {
        message.delete();
        const word = jumble.generate();
        let timeout = 5000;

        if (timeout - (Date.now() - cooldownVariable) > 0) return;
        const hintList = [word[0].word.substring(0, 3), word[0].word.substring(0, 4), word[0].word.substring(0, 5)];
        const hint = hintList[Math.floor(Math.random() * hintList.length)];

        cooldownVariable = Date.now();
        message.channel.send(`**[🕹️] ${message.author.username}**, let's play **Jumble**! Your word will be shown shortly. __Get ready!__`).then(msg => {
            setTimeout(async function() {
                await msg.edit(`**[🕹️] ${message.author.username}**, your word is **${word[0].jumble}**!\n**You have 15 seconds to answer. If you do not answer in time, the game will timeout.**\n\nHINT: ||starts with "${hint}"||`);

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
                            message.channel.send(`Incorrect! "**${word[0].word}**" was the correct answer.`).then(m => m.delete({
                                timeout: 5000
                            }));
                            answer.delete();
                            return msg.delete();
                        }
                        message.channel.send(`POGGERS! You got it right. "**${word[0].word}**" was the correct answer!`).then(m => m.delete({
                            timeout: 5000
                        }));
                        answer.delete();
                        return msg.delete();
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