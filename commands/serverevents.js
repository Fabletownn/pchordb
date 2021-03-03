const Discord = require("discord.js");

module.exports = {
    name: 'serverevents',
    description: '[MODERATION] This command will make the Server Events VC and Events Chat Channel visible to those with the @Server Events role. <[setPrefix]serverevents>',
    execute(message) {
        if (message.guild.id !== '614193406838571085') return;
        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        message.delete();
        
        const serverEvents = message.guild.channels.cache.get("815790709646163968");
        const eventsChat = message.guild.channels.cache.get("720002083226386553");

        serverEvents.updateOverwrite('731212776936308777', {
            VIEW_CHANNEL: true,
        }, `Activated for Server Event | ${message.author.tag} [1/2].`);

        eventsChat.updateOverwrite('731212776936308777', {
            VIEW_CHANNEL: true,
        }, `Activated for Server Event | ${message.author.tag} [2/2] (hi events chat bye events chat :dance:).`);

        client.channels.cache.get("815790709646163968").setName("👾 Server Events");
        client.channels.cache.get("720002083226386553").setName("🎤events-chat").then(() => {
            message.channel.send(`**[📹] ${message.author.username}**, opened and renamed both channels accordingly. Ping the role in <#731380572189884436> to notify members.`).then(m => m.delete({
                timeout: 15000
            }));
        });
    }
}