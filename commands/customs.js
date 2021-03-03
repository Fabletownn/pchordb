const Discord = require("discord.js");

module.exports = {
    name: 'customs',
    description: '[MODERATION] This command will make the Server Events VC and Events Chat Channel visible to those with the @Fortnite Customs role. <[setPrefix]customs>',
    execute(message) {
        const client = message.client;

        if (message.guild.id !== '614193406838571085') return;
        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        message.delete();
        
        const serverEvents = message.guild.channels.cache.get("815790709646163968");
        const eventsChat = message.guild.channels.cache.get("720002083226386553");

        serverEvents.updateOverwrite('731217324765479053', {
            VIEW_CHANNEL: true,
        }, `Activated for Customs | ${message.author.tag} [1/2].`);

        eventsChat.updateOverwrite('731217324765479053', {
            VIEW_CHANNEL: true,
        }, `Activated for Customs | ${message.author.tag} [2/2].`);

        client.channels.cache.get("815790709646163968").setName("👾 Fortnite Customs").catch(console.error);
        client.channels.cache.get("720002083226386553").setName("🎤customs-chat").then(() => {
            message.channel.send(`**[📹] ${message.author.username}**, opened and renamed both channels accordingly. Ping the role in <#777432257521909801> to notify members.`).then(m => m.delete({
                timeout: 15000
            }));
        });
    }
}