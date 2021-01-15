const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'rules',
    description: '[MODERATION] Will send the entire list of embeds regarding Rules in chat. Please use at your own discretion: it is **LONG**. <[setPrefix]rules>',
    execute(message, args) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        let rulesChannel = message.guild.channels.cache.get("625747090852544532");

        const ruleEmbed1 = {
            "title": "Server Rules",
            "color": 2359049,
            "fields": [{
                "name": "1) __Don't be Toxic, Overly Negative or Mindlessly Argue.__",
                "value": "```\nToxicity, being overly negative about something, arguing without a reason, or even general rudeness is not allowed in the server. If you have issues with a member, take it to DMs, block them, or contact a staff member about it.\n```\n_ _"
            },
            {
                "name": "2) __No Bigotry, Racism, Sexism, Homophobia, Transphobia, Xenophobia, or any other form of Hate Speech.__",
                "value": "```\nPeople are diverse, respect their diversity.\nHate speech, using slurs etc. is prohibited. Violation of this rule will lead to a straightaway ban.\n```\n_ _"
            },
            {
                "name": "3) __No Discussions on Religion and Politics.__",
                "value": "```\nWe respect everyone's beliefs and opinions, however, this server is not the correct place to discuss these. These topics should not be picked up in chat, even if discussed in a civil manner.\n```\n_ _"
            },
            {
                "name": "4) __No NSFW/NSFL Content; No E-Dating or Roleplaying.__",
                "value": "```\nSharing Content/Discussion on violence, pornography, sexually suggestive topics, harm towards animals/humans etc. will result in a straightaway ban. No E-Dating or Roleplaying; this server isn't the correct place for it.\n```\n_ _"
            },
            {
                "name": "5) __No Spam.__",
                "value": "```\nSpam only clogs up chat and doesn't add to the conversation. There are no spam channels in the server. Copypastas, Chain Spam, Emoji Spam, Spamming all caps messages, Ghost/Spam Pinging others, unnecessary spoiler tags, etc. are not allowed under this rule.\n```\n_ _"
            },
            {
                "name": "6) __No Trolling.__",
                "value": "```\nEveryone wishes to have a good time in the server. Don't undermine the chat by trolling. Mindless attempts to break rules, constant immaturity, unpleasant conversations, etc. only degrade chat, so don't introduce them in chat.\n```\n_ _"
            },
            {
                "name": "7) __No Doxx/DDoS Threats/Actions.__",
                "value": "```\nDoxx/DDos Threats/Actions - joke or not - will result in you being banned from the server.\n```\n_ _"
            },
            {
                "name": "8) __No Buying/Selling/Trading/Begging.__",
                "value": "```\nBuying/Selling/Trading/Begging of virtual currency, accounts, redeemable codes, Discord Roles, subscription services etc. is not allowed. Redeemable codes are allowed to be shared if a staff member allows.\n```\n_ _"
            },
            {
                "name": "9) __No Self Promotion.__",
                "value": "```\nDo not self promote social medias, discord servers, YouTube/Twitch channels etc. Any Discord Server invite - apart from this server's invite - will be automatically deleted by the automod. It does not matter if it profits you or someone else.\n```\n_ _"
            },
            {
                "name": "10) __No Impersonation.__",
                "value": "```\nDon't impersonate server members, server staff, other content creators, or people outside the server. Impersonation using one's PFP/Username; Changing Nickname, etc. is against the rules.\n```\n_ _"
            },
            {
                "name": "11) __No Bypassing Punishments/Auto-Moderation.__",
                "value": "```\nIf you receive a punishment, you can appeal it. However, don't attempt to bypass or circumvent your punishments. Mute/Ban evasion, bypassing auto-moderation filter, etc. will result in a stricter punishment being handed out.\n```\n_ _"
            },
            {
                "name": "12) __No Alt Accounts.__",
                "value": "```\nAlts can allow for bypassing of punishments, which is why they are not allowed in the server. Alt accounts found will be kicked.\nException: In case you cannot access your main account, you are allowed to use an alt. You must give prior information to staff regarding this.\n```\n_ _"
            },
            {
                "name": "13) __Rules Regarding Sharing Fortnite Leaks.__",
                "value": "```\nSharing leaks such as cosmetic leaks is allowed across the server. \nSharing of In-Game Fortnite Event Leaks is prohibited across the server. \nSharing false/troll leaks is prohibited. Unsure if a leak is genuine or not? Don't post it.\n```\n_ _"
            },
            {
                "name": "14) __Use Channels for their Intended Purpose.__",
                "value": "```\nCertain channels are intended for specific purposes. Each channel's topic contains info on what the channel is for, role permissions for the channel, and channel rules (if any). Before using a channel, we have assumed that you have read this info.\n```\n_ _"
            },
            {
                "name": "15) __Listen to Staff, and no Mini-Moderation.__",
                "value": "```\nActions deemed unacceptable by a staff member - listed in the rules or not - are liable to punishment. If a staff member asks you to stop, stop immediately. Furthermore, you must not mini-mod and enforce rules as if you are a staff member.\t\n\n```\n_ _"
            },
            {
                "name": "16) __Respect the Server's Rules, and the Server's Members.__",
                "value": "```\n[The Golden Rule of the Server.] \nThe server is meant to have conversations, hang out, and have a good time. Acting in bad faith or making the server an uncomfortable place for others in any way will lead to appropriate punishment.\n```"
            }
            ],
            "footer": {
                "text": "Rules Last Updated | 15 January 2021"
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

        rulesChannel.messages.fetch("793169334553411645").then(embedOne => {
            embedOne.edit({ embed: ruleEmbed1 });
        }).catch(err => console.log(err));

        rulesChannel.messages.fetch("793169334985687070").then(embedTwo => {
            embedTwo.edit({ embed: ruleEmbed2 });
        }).catch(err => console.log(err));
    }
}