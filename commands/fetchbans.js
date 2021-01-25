const Discord = require("discord.js");

module.exports = {
    name: 'fetchbans',
    description: 'Will fetch bans from the main server to the Minecraft server.',
    execute(message) {
        const client = message.client;

        let mainServer = client.guilds.cache.get("614193406838571085");

        if (message.guild.id !== "797142251712151583") return;
        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        let userID = message.content.split(" ")[1];

        if (!userID) {
            mainServer.fetchBans().then(banned => {
                var list = "";

                banned.map(ban => {
                    if (message.guild.member(ban.user.id)) list = list + `<@${ban.user.id}> (${ban.user.id})\n`;
                }).join('\n');

                const bannedEmbed = new Discord.MessageEmbed()
                    .setAuthor(`Fetched Affiliated Bans`, mainServer.iconURL())
                    .setDescription(`This is a list of users banned in the main server but in here.\nUse \`+fetchbans <user ID>\` to get their ban reason.`)
                    .addField(`Fetched Bans`, list || `No bans fetched.`)
                    .setFooter(`All bans are finalized across all guilds: you may use this information.`)
                    .setColor('eb4bc9')

                message.channel.send({
                    embed: bannedEmbed
                });
            }).catch(console.error);
        } else if (userID) {
            if (!client.users.cache.get(userID)) return message.channel.send(`**[🔨] ${message.author.username}**, couldn't resolve a ban from that user (<@${userID}>).`).then(m => m.delete({
                timeout: 5000
            }));
            let reasonLogged = mainServer.fetchBan(userID).then(banLog => message.channel.send(`**[🔨] ${message.author.username}**, <@${userID}> (${userID}) was banned in **${mainServer.name}** for the following reason:\n\`\`\`${banLog.reason || `No reason specified.`}\`\`\``));
        }
    }
}