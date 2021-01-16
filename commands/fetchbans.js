module.exports = {
    name: 'fetchbans',
    description: 'Temporary command. Will fetch current banned users in the main.',
    execute(message) {
        const client = message.client;

        let mainServer = client.guilds.cache.get("614193406838571085");
        let moderatorR = message.guild.roles.cache.find(r => r.name === "Discord Moderator");

        if (message.guild.id !== "797142251712151583") return;
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        mainServer.fetchBans().then(banned => {
            banned.map(ban => {
                if (message.guild.member(ban.user.id)) {
                    return message.channel.send(`In the **${mainServer.name}** (${mainServer.id}), <@${ban.user.id}> is banned + in this guild.`);
                }
            }).join('\n');
        }).catch(console.error);
    }
}