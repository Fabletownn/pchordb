const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: '8ball',
    description: '[GENERAL] This will respond to any question with an 8Ball response. <[setPrefix]8ball <question>>',
    execute(message, args) {
        message.delete();

        var eBallArguments = message.content.split("ball ");
        var eBallQuestion = eBallArguments[1];

        const blacklistedWords = ["nigga", "nigger", "nibba", "nibber", "fag", "f4g", "retard", "coon", "cunt", "nazi", "penis", "vagina", "sex", "porn", "anal", "blowjob", "handjob", "nude", "rule34", "r34", "stripper", "bangbro", "brazzer", "faketaxi", "hentai", "naughtyamerica", "onlyfan", "realityking", "xvideo", "milf", "@everyone", "@here", "<@"];

        const eBallResponseArray = ["As I see it, yes", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "It is certain", "It is decidedly so", "Most likely", "My reply is no", "My sources say no", "Outlook not so good", "Outlook good", "Reply hazy, try again", "Signs point to yes", "Very doubtful", "Without a doubt", "Yes", "Yes - definitely", "You may rely on it"]
        const eBallResult = eBallResponseArray[Math.floor(Math.random() * eBallResponseArray.length)];

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;

        if (!eBallQuestion) return message.channel.send(`**[❓] ${message.author.username}**, please put a question for me to answer (make sure it ends with OR includes a question mark as well)!`).then(m => m.delete({
            timeout: 5000
        }));
        if (!eBallQuestion.includes("?")) return message.channel.send(`**[❓] ${message.author.username}**, please put a question for me to answer (make sure it ends with OR includes a question mark as well)!`).then(m => m.delete({
            timeout: 5000
        }));
        if (blacklistedWords.some(v => message.content.includes(v))) return;

        message.channel.send(`**[🎱] ${message.author.username}**, my very, very, totally-accurate magical prediction to the question "**${eBallQuestion}**" is...!`).then(eBallMessage => {
            setTimeout(() => {
                eBallMessage.edit(`**[🎱] ${message.author.username}**, my very, very, totally-accurate magical prediction to the question "**${eBallQuestion}**" is: **${eBallResult}**.`).then(m => m.delete({
                    timeout: 30000
                }));
            }, 3000);
        });
    }
}