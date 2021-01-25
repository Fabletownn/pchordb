const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'credits',
    description: '[MODERATION] This will send the embeds for Server Credits in the channel this command is performed in. <[setPrefix]credits>',
    execute(message) {
        message.delete();

        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        let creditsChannel = message.guild.channels.cache.get("771606110389927946");
        if (!creditsChannel) return message.channel.send(`Channel not found. (?)`).then(m => m.delete({
            timeout: 10000
        }));

        const creditsEmbed = {
            "color": 2359049,
            "fields": [{
                "name": "Server Artwork",
                "value": "Icon: <@145527685349769216>\nBanner: <@308763936847560704>",
                "inline": true
            },
            {
                "name": "I Talk Christmas Trailers 2020",
                "value": "<@241687257931710467> & <@303164850736070666>",
                "inline": true
            },
            {
                "name": "Blob Emojis",
                "value": "Blob Emoji are licensed under the Apache License 2.0.\nAll blob emojis used in this server are from the official servers, and can be downloaded here: https://blobs.gg/blobs.zip.\n\nWebsite: https://blobs.gg/."
            }
            ],
            "thumbnail": {
                "url": "https://cdn.discordapp.com/attachments/752099729130782760/793029555618185226/EqH9dyHXMAEJdIG.png"
            }
        }

        creditsChannel.messages.fetch("793169334985687070").then(embedOne => {
            embedOne.edit({ embed: creditsEmbed });
        }).catch(err => {
            creditsChannel.send({ embed: creditsEmbed });
            return console.log(err);
        });
    }
}