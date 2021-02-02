const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
    name: '8ball',
    description: '[GENERAL] This will respond to any question with an 8Ball response. <[setPrefix]8ball <question>>',
    execute(message) {
        message.delete();

        var eBallArguments = message.content.split("+8ball ");
        var eBallQuestion = eBallArguments[1];

        const blacklistedWords = ["nigga", "nigger", "nibba", "nibber", "fag", "f4g", "retard", "coon", "cunt", "nazi", "penis", "vagina", "sex", "porn", "anal", "blowjob", "handjob", "nude", "rule34", "r34", "stripper", "bangbro", "brazzer", "faketaxi", "hentai", "naughtyamerica", "onlyfan", "realityking", "xvideo", "milf", "@everyone", "@here", "<@", "ching chong", "chingchong", "chink", "cum"];

        const eBallResponseArray = ["As I see it, yes.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "It is certain.", "It is decidedly so.", "Most likely.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Outlook good.", "Reply hazy, try again.", "Signs point to yes.", "Very doubtful.", "Without a doubt.", "Yes.", "Yes - definitely.", "You may rely on it."]
        const eBallResult = eBallResponseArray[Math.floor(Math.random() * eBallResponseArray.length)];

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;

        if (!eBallQuestion) return message.channel.send(`**[❓] ${message.author.username}**, please ensure you're providing a question.`).then(m => m.delete({
            timeout: 10000
        }));

        if (blacklistedWords.some(v => message.content.includes(v))) return;

        const eBallEmbedB = new Discord.MessageEmbed()
            .setAuthor(eBallQuestion, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setDescription(`<a:loadingChord:806179255321886825>`)
            .setColor('1d1c1c')

        const eBallEmbedWOB = new Discord.MessageEmbed()
            .setAuthor(`${eBallQuestion}?`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setDescription(`<a:loadingChord:806179255321886825>`)
            .setColor('1d1c1c')

        const eBallEmbed = new Discord.MessageEmbed()
            .setAuthor(eBallQuestion, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setDescription(eBallResult)
            .setColor('f5f0f0')

        const eBallEmbedWO = new Discord.MessageEmbed()
            .setAuthor(`${eBallQuestion}?`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setDescription(eBallResult)
            .setColor('f5f0f0')

        if (message.content.includes("?")) {
            message.channel.send({
                embed: eBallEmbedB
            }).then(eBallMessage => {
                setTimeout(() => {
                    eBallMessage.edit({
                        embed: eBallEmbed
                    }).then(m => m.delete({
                        timeout: 30000
                    }));
                }, 3000);
            });
            return;
        } else if (!message.content.includes("?")) {
            message.channel.send({
                embed: eBallEmbedWOB
            }).then(eBallMessage => {
                setTimeout(() => {
                    eBallMessage.edit({
                        embed: eBallEmbedWO
                    }).then(m => m.delete({
                        timeout: 30000
                    }));
                }, 3000);
            });
            return;
        }
    }
}