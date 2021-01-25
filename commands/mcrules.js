const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'mcrules',
    description: '[MODERATION] Will send the entire list of embeds regarding Minecraft Server Rules in chat. <[setPrefix]mcrules>',
    execute(message) {
        message.delete();

        if (message.guild.id !== "797142251712151583") return;
        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        let MCRulesChannel = message.guild.channels.cache.get("797154896465494016");
        if (!MCRulesChannel) return message.channel.send(`Channel not found.`).then(m => m.delete({
            timeout: 10000
        }));

        const ruleEmbed1 = {
            "title": "I Talk Minecraft | Server Rules",
            "color": 2359049,
            "fields": [{
                "name": "1) Ensure your Minecraft username/nickname aligns with your Discord username/nickname.",
                "value": "** **"
            },
            {
                "name": "2) Don't impersonate other players, through changing your nicknames, using alt-accounts, etc.",
                "value": "** **"
            },
            {
                "name": "3) Be respectful to other players. Don't act in bad faith to make the server experience negative for others.",
                "value": "** **"
            },
            {
                "name": "4) No Bigotry, Racism, Sexism, Homophobia, Transphobia, Xenophobia, or any other form of Hate Speech.",
                "value": "** **"
            },
            {
                "name": "5) No NSFW/NSFL Content/Discussion. This includes - but isn't limited to - sharing content/discussion on violence, pornography, sexually suggestive topics, harm towards animals/humans, etc.",
                "value": "** **"
            },
            {
                "name": "6) No Self-Promotion or Advertisement of any form (other servers, social medias, etc.) It doesn't matter if it benefits you or someone else.",
                "value": "** **"
            },
            {
                "name": "7) Any and all forms of spam are prohibited - this includes caps spam, chain spam, copypasta, etc.",
                "value": "** **"
            },
            {
                "name": "8) Don't beg for items. You can request players for specific items, but don't beg players for them to give you stuff.",
                "value": "** **"
            },
            {
                "name": "9) Don't scam other players. If you or another player are trading item(s), you must go through the process fairly. Acts of scamming/fraud are strictly prohibited.",
                "value": "** **"
            },
            {
                "name": "10) Don't attempt to grief other players via destroying or defacing their constructions/creations, or fighting them in an area not intended for PvP.",
                "value": "** **"
            },
            {
                "name": "11) Any and all client modifications that give you an unfair advantage (e.g. x-ray, movement hacks, etc) is strictly prohibited in the Minecraft Server.",
                "value": "** **"
            },
            {
                "name": "12) Don't attempt to hack or circumvent the security systems set up in the Minecraft Server. These are set up to give a fair gameplay experience to all players.",
                "value": "** **"
            },
            {
                "name": "13) Avoid finding loopholes to the rules, and use your common sense to know what it allowed in the server and what isn't. Moderators retain the right to punish you, even if the offense isn't listed in the rules.",
                "value": "** **"
            },
            {
                "name": "14) Teleport-trapping players is prohibited in the server.",
                "value": "** **"
            },
            {
                "name": "15) Scamming players during 1V1 fights in the Nether is prohibited.",
                "value": "** **"
            }
            ],
            "footer": {
                "text": "Rules Last Updated | 18 January 2021"
            }
        }

        const ruleEmbed2 = {
            "title": "Miscellaneous Information",
            "color": 2359049,
            "fields": [{
                "name": "1) __Blacklisted Words__",
                "value": "DM the <@363766977585479680> bot `+blacklist` to view the full list of blacklisted words.\n```\nCertain words are blacklisted in the server, in respect with the server's rules. Using any of these words in a message will result in your message being deleted by the auto-moderation.\n```\n_ _"
            },
            {
                "name": "2) __Sharing Links.__",
                "value": "```\nUnless it is specified in the channel's topic that links are permitted, any links shared in a channel will be auto-deleted by the auto-moderation. GIFs sent through the GIF Button count as links as well, and will trigger auto-moderation.\n```\n_ _"
            },
            {
                "name": "3) __Rule Violations and Punishments.__",
                "value": "DM the <@363766977585479680> bot `+punishmentlist` to view a more detailed list on how punishments are handed out.\n```\nViolation of a rule will result in you receiving a punishment - ranging from a strike, mute, kick or a ban from the server. \n\nFirst Impressions make Last Impressions. If the first thing you do in the server is violate rules, you will most likely be straightaway banned.\n```"
            }
            ]
        }

        MCRulesChannel.messages.fetch("799669632973537330").then(embedOne => {
            embedOne.edit({ embed: ruleEmbed1 });
        }).catch(err => {
            MCRulesChannel.send({ embed: ruleEmbed1 });
            return console.log(err);
        });

        MCRulesChannel.messages.fetch("799669633673199656").then(embedTwo => {
            embedTwo.edit({ embed: ruleEmbed2 });
        }).catch(err => {
            MCRulesChannel.send({ embed: ruleEmbed2 });
            return console.log(err);
        });
    }
}