const Discord = require("discord.js")

module.exports = {
    name: 'appeal',
    description: '[GENERAL] This command is restricted to the Appeals guild & channel(s) only. It will allow a member to appeal their ban punishment. <[setPrefix]appeal <appeal message>>',
    execute(message, args) {
        const client = message.client;
        message.delete();

        if (message.guild.id !== '685876599199236173') return message.delete();
        if (message.channel.id !== '685885174025814049') return message.delete();

        let receivedR = message.guild.roles.cache.find(role => role.name === "Appeal Received");
        if (message.member.roles.cache.has(receivedR.id)) return message.delete();

        var appealMessageArguments = message.content.split("appeal ");
        var appealMessage = appealMessageArguments[1];

        if (!appealMessage) return;

        const appealEmbed = new Discord.MessageEmbed()
            .setTitle(`Appeal | Ban | ${message.author.tag}`)
            .setDescription(`${appealMessage || 'No appeal message was sent. This shouldn\'t be possible.'}`)
            .setColor(`ff0000`)
            .setFooter(`ID: ${message.author.id}`)

        client.channels.cache.get("738863576890081340").send({
            embed: appealEmbed
        }).then(appealMSG => {
            appealMSG.react(`<:zzITFUpvote:778318625328332810>`).then(appealMSG.react(`<:zzITFDownvote:778318624552779776>`));

            message.member.roles.add('691372147112673441');
            message.author.send(`**[${new Date().toLocaleTimeString()}] ${message.author.username}**, you have successfully appealed your ban for the **I Talk Server**. All appeals are reviewed and voted on Saturday, so please be patient.\nYour appeal message was submitted as the following:\n\`\`\`${appealMessage || 'No appeal message was sent.'}\`\`\``);
        });
    }
}