const Discord = require("discord.js");

module.exports = {
    name: 'discordstreams',
    description: '[MODERATION] This command will make the Server Events VC and Events Chat Channel visible to those with the @Discord Streams role. <[setPrefix]discordstreams>',
    execute(message) {
        if (message.guild.id !== '614193406838571085') return;
        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        message.delete();
        
        const serverEvents = message.guild.channels.cache.get("815790709646163968");
        const eventsChat = message.guild.channels.cache.get("720002083226386553");

        serverEvents.updateOverwrite('816705412451008542', {
            VIEW_CHANNEL: true,
        }, `Activated for Discord Stream | ${message.author.tag} [1/2].`);

        eventsChat.updateOverwrite('816705412451008542', {
            VIEW_CHANNEL: true,
        }, `Activated for Discord Stream | ${message.author.tag} [2/2] (hi discord stream chat bye discord stream chat :dance:)..`);

        message.channel.send(`**[📹] ${message.author.username}**, opened both channels accordingly. Ping the role in <#816729850836156436> to notify members.`).then(m => m.delete({
            timeout: 15000
        }));
    }
}