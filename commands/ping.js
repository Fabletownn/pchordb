const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'ping',
    description: '[GENERAL] This command fetches API data and reports back. <[setPrefix]ping>',
    execute(message) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        let moderatorR2 = message.guild.roles.cache.find(role => role.name === "Discord Moderator");

        if (moderatorR2) {
            if (!message.member.roles.cache.has(moderatorR2.id) && message.channel.id !== '797813892783931402') return;
        } else {
            if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;
        }

        message.channel.send('Fetching..').then(msg => {
            const latency = msg.createdTimestamp - message.createdTimestamp;
            const ping = Math.round(latency);
            var status;

            if (ping < 50) {
                status = "great";
            } else if (ping > 50 && ping < 100) {
                status = "fine";
            } else if (ping > 100 && ping < 150) {
                status = "OK";
            } else {
                status = "bad";
            }

            const embed = new Discord.MessageEmbed()
                .setColor('eb4bc9')
                .setDescription(`**Status**: Online and response time is ${status}.\n**Bot Latency**: ${Math.round(latency)} milliseconds.\n**API Latency**: ${Math.round(message.client.ws.ping)} milliseconds.`)

            msg.edit(`Fetched.`).then(() => {
                msg.edit(embed)
            }).then(msg.delete({
                timeout: 30000
            }));
        });
    }
}