const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'rps',
    description: '[GENERAL] This will allow you to play Rock Paper Scissors with the member you mentioned. <[setPrefix]rps <@member>>',
    execute(message, args) {
        message.delete();

        var duelUser = message.mentions.users.first();
        const choices = ["rock 🪨", "paper 📰", "scissors ✂️"];

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;

        if (!duelUser) return message.channel.send(`**[✂️] ${message.author.username}**, please ensure you're mentioning a user you'd like to duel.`).then(m => m.delete({
            timeout: 5000
        }));
        
        if (duelUser === message.author || duelUser.bot) return message.channel.send(`**[🪨] ${message.author.username}**, play with somebody other than yourself or a bot user.`).then(m => m.delete({
            timeout: 5000
        }));

        message.channel.send(`**[🥊] ${message.author.tag}** and **${duelUser.tag}** are dueling in a game of Rock Paper Scissors!`).then(duelMsg => {
            setTimeout(() => {
                duelMsg.delete();
                setTimeout(() => {
                    const duelResult = choices[Math.floor(Math.random() * choices.length)];
                    const duelResult2 = choices[Math.floor(Math.random() * choices.length)];

                    if (duelResult === duelResult2) {
                        const resultEmbed = new Discord.MessageEmbed()
                            .setAuthor(`Rock Paper Scissors`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`${message.author}, you got.. **${duelResult}**.\n${duelUser} got.. **${duelResult2}**.\n\nIt's a tie!`)
                            .setFooter(`Game Started by ${message.author.tag}.`)
                            .setTimestamp()
                            .setColor('fa8812')

                        return message.channel.send(`**[🪨]** Rock.. paper.. scissors.. *shoot*!`, { embed: resultEmbed });
                    }
                    if (duelResult === "paper 📰" && duelResult2 === "rock 🪨" || duelResult === "rock 🪨" && duelResult2 === "scissors ✂️" || duelResult === "scissors ✂️" && duelResult2 === "paper 📰") {
                        const resultEmbed = new Discord.MessageEmbed()
                            .setAuthor(`Rock Paper Scissors`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`${message.author}, you got.. **${duelResult}**.\n${duelUser} got.. **${duelResult2}**.\n\n${message.author} wins!`)
                            .setFooter(`Game Started by ${message.author.tag}.`)
                            .setTimestamp()
                            .setColor('6dff48')
                            
                        return message.channel.send(`**[🪨]** Rock.. paper.. scissors.. *shoot*!`, { embed: resultEmbed });
                    } else {
                        const resultEmbed = new Discord.MessageEmbed()
                            .setAuthor(`Rock Paper Scissors`, duelUser.displayAvatarURL({ dynamic: true }))
                            .setDescription(`${message.author}, you got.. **${duelResult}**.\n${duelUser} got.. **${duelResult2}**.\n\n${duelUser} wins!`)
                            .setFooter(`Game Started by ${message.author.tag}.`)
                            .setTimestamp()
                            .setColor('ff0000')

                        return message.channel.send(`**[🪨]** Rock.. paper.. scissors.. *shoot*!`, { embed: resultEmbed });
                    }
                });
            }, 5000);
        });
    }
}