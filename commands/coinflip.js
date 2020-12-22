const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'coinflip',
    description: '[FUN] This will prompt a coin flipping game: name circumstances for each side, and will roll. <[setPrefix]coinflip>',
    execute(message, args) {
        message.delete();
        var heads;
        var tails;
        var side;

        const bets = ["Heads", "Tails", "the Side"];
        const blacklistedWords = ["nigga", "nigger", "nibba", "nibber", "fag", "f4g", "retard", "coon", "cunt", "nazi", "penis", "vagina", "sex", "porn", "anal", "blowjob", "handjob", "nude", "rule34", "r34", "stripper", "bangbro", "brazzer", "faketaxi", "hentai", "naughtyamerica", "onlyfan", "realityking", "xvideo", "milf", "@everyone", "@here", "<@"];

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;

        message.channel.send(`**[🪙] ${message.author.username}**, I'm interested: what is the circumstance if it lands on **Heads**?`).then(msg => {
            const headsBet = m => m.author.id === message.author.id && !blacklistedWords.some(v => m.content.includes(v));
            message.channel.awaitMessages(headsBet, {
                max: 1,
                time: 999999,
                errors: ['time']
            }).then(collected => {
                collected.first().delete();
                heads = collected.first().content;

                msg.edit(`**[🪙] ${message.author.username}**, alrighty then. What is the circumstance if it lands on **Tails**?`)
                const tailsBet = m => m.author.id === message.author.id && !blacklistedWords.some(v => m.content.includes(v));
                message.channel.awaitMessages(tailsBet, {
                    max: 1,
                    time: 999999,
                    errors: ['time']
                }).then(collected => {
                    collected.first().delete();
                    tails = collected.first().content;

                    msg.edit(`**[🪙] ${message.author.username}**, how about if it lands on it's **Side**?`)
                    const sideBet = m => m.author.id === message.author.id && !blacklistedWords.some(v => m.content.includes(v));
                    message.channel.awaitMessages(sideBet, {
                        max: 1,
                        time: 999999,
                        errors: ['time']
                    }).then(collected => {
                        collected.first().delete();
                        side = collected.first().content;
                        msg.delete()

                        message.channel.send(`Flipping the coin, and it landed on..`).then(result => {
                            setTimeout(() => {
                                const betResult = bets[Math.floor(Math.random() * bets.length)];
                                if (betResult.toLowerCase() === "heads") {
                                    result.edit(`**HEADS**! The circumstance for Heads was, "${heads}".`).then(m => m.delete({
                                        timeout: 30000
                                    }));
                                } else if (betResult.toLowerCase() === "tails") {
                                    result.edit(`**TAILS**! The circumstance for Tails was, "${tails}".`).then(m => m.delete({
                                        timeout: 30000
                                    }));
                                } else if (betResult.toLowerCase() === "the side") {
                                    result.edit(`**THE SIDE**! The circumstance for the Side was, "${side}".`).then(m => m.delete({
                                        timeout: 30000
                                    }));
                                }
                            }, 3000)
                        });
                    });
                });
            });
        });
    }
}