const Discord = require("discord.js");
const ms = require("parse-ms");

var cooldownVar = "";

module.exports = {
    name: 'botpfp',
    description: '[MODERATION] This will switch the server and bot from 2XP charged if given \'2\', to normal icon & bot profile picture if given \'1\`. <[setPrefix]botpfp <1 or 2>>',
    execute(message) {
        message.delete();

        const client = message.client;

        let adminR = message.guild.roles.cache.find(role => role.name === "Administrator");
        if (!message.member.roles.cache.has(adminR.id)) return;

        let timeout = 600000;
        let givenXP = message.content.split(" ")[1];

        const nXPEmbed = new Discord.MessageEmbed()
            .setAuthor(`Server Settings`, 'https://cdn.discordapp.com/attachments/730960122221690954/793177649601314826/NormalVer.png')
            .addField(`Role Color`, `#c020cf (Border)`, true)
            .addField(`Server & Bot Icons`, `[View image here](https://cdn.discordapp.com/attachments/730960122221690954/793177649601314826/NormalVer.png).`, true)
            .setThumbnail('https://cdn.discordapp.com/attachments/730960122221690954/793177649601314826/NormalVer.png')
            .setFooter(`These changes may take a while to appear. Reload your client to get the effect sooner.`)
            .setColor('c020cf')

        const dXPEmbed = new Discord.MessageEmbed()
            .setAuthor(`Server Settings`, 'https://cdn.discordapp.com/attachments/730960122221690954/793177650810191932/PWRVer.png')
            .addField(`Role Color`, `#90e75c (Border)`, true)
            .addField(`Server & Bot Icons`, `[View image here](https://cdn.discordapp.com/attachments/730960122221690954/793177650810191932/PWRVer.png).`, true)
            .setThumbnail('https://cdn.discordapp.com/attachments/730960122221690954/793177650810191932/PWRVer.png')
            .setFooter(`These changes may take a while to appear. Reload your client to get the effect sooner.`)
            .setColor('90e75c')

        if (!givenXP || isNaN(givenXP)) return message.channel.send(`**[⚡] ${message.author.username}**, please provide either parameters of \`1\` (normal XP mode) or \`2\` (double XP mode).\nThis will edit the bot's profile picture, bot's role color, and change the guild's icon corresponding to given parameter(s).`).then(m => m.delete({
            timeout: 10000
        }));
        if (timeout - (Date.now() - cooldownVar) > 0) {
            let time = ms(timeout - (Date.now() - cooldownVar));
            return message.channel.send(`**[🌬️] ${message.author.username}**, due to Discord's ratelimit restrictions, this command is on cooldown. You'll be able to use this command in \`${time.minutes} minutes and ${time.seconds} seconds\`.`).then(m => m.delete({
                timeout: 10000
            }));
        }

        if (givenXP === "1") {
            cooldownVar = Date.now();

            message.guild.setIcon('https://cdn.discordapp.com/attachments/730960122221690954/793177649601314826/NormalVer.png');
            client.user.setAvatar('https://cdn.discordapp.com/attachments/730960122221690954/793177649601314826/NormalVer.png');
            client.user.setActivity(`with ${client.guilds.cache.get('694073431380983839').members.cache.filter(member => !member.user.bot).size.toLocaleString()} members.`, {
                type: 'PLAYING'
            });

            message.guild.roles.cache.get('681109347790487563').edit({
                color: "#c020cf"
            }).then(() => {
                return message.channel.send(`**[⚡] ${message.author.username}**, all x2 XP settings have been reverted! The server's settings have been adjusted accordingly. <:statsChordSixString:788870454035087370>`, {
                    embed: nXPEmbed
                }).then(m => m.delete({
                    timeout: 35000
                }));
            });
        } else if (givenXP === "2") {
            cooldownVar = Date.now();

            message.guild.setIcon('https://cdn.discordapp.com/attachments/730960122221690954/793177650810191932/PWRVer.png');
            client.user.setAvatar('https://cdn.discordapp.com/attachments/730960122221690954/793177650810191932/PWRVer.png');
            client.user.setActivity(`MEE6 x2 XP is active in I Talk Server!`, {
                type: 'PLAYING'
            });

            message.guild.roles.cache.get('681109347790487563').edit({
                color: "#90e75c"
            }).then(() => {
                return message.channel.send(`**[⚡] ${message.author.username}**, x2 XP server settings have been activated! The server's settings have been adjusted accordingly. <:budgetgreen:793031187294584875>`, {
                    embed: dXPEmbed
                }).then(m => m.delete({
                    timeout: 35000
                }));
            });
        } else {
            return message.channel.send(`**[⚡] ${message.author.username}**, I couldn't complete that action: are you providing proper paramaters (\`1\` or \`2\`)?`).then(m => m.delete({
                timeout: 10000
            }));
        }
    }
}