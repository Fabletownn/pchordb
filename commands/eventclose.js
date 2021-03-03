const Discord = require("discord.js");

module.exports = {
    name: 'eventclose',
    description: '[MODERATION] This command will make the Server Events VC and Events Chat Channel invisible to those with the @Fortnite Customs, @Server Events and/or @Discord Streams role(s). <[setPrefix]eventclose>',
    execute(message) {
        if (message.guild.id !== '614193406838571085') return;
        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        message.delete({ timeout: 5000 });

        /*discord streams: 816705412451008542
        server events: 731212776936308777
        fort customs: 731217324765479053*/
        
        const serverEvents = message.guild.channels.cache.get("815790709646163968");
        const eventsChat = message.guild.channels.cache.get("720002083226386553");

        serverEvents.updateOverwrite('816705412451008542', {
            VIEW_CHANNEL: false,
        }, `Closing up shop. | ${message.author.tag} [1/6].`);

        eventsChat.updateOverwrite('816705412451008542', {
            VIEW_CHANNEL: false,
        }, `Closing up shop. | ${message.author.tag} [2/6].`);

        serverEvents.updateOverwrite('731212776936308777', {
            VIEW_CHANNEL: false,
        }, `Closing up shop. | ${message.author.tag} [3/6].`);

        eventsChat.updateOverwrite('731212776936308777', {
            VIEW_CHANNEL: false,
        }, `Closing up shop. | ${message.author.tag} [4/6].`);

        serverEvents.updateOverwrite('731217324765479053', {
            VIEW_CHANNEL: false,
        }, `Closing up shop. | ${message.author.tag} [5/6].`);

        eventsChat.updateOverwrite('731217324765479053', {
            VIEW_CHANNEL: false,
        }, `Closing up shop. | ${message.author.tag} [6/6].`);

        message.react("✅");
    }
}