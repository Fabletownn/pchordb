const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'upserverinfo',
    description: '[MODERATION] Will send the entire list of embeds regarding Server Information in chat. Please use at your own discretion: it is **LONG**. <[setPrefix]serverinfo>',
    execute(message) {
        message.delete();

        if (message.guild.id !== "614193406838571085") return;
        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        let infoChannel = message.guild.channels.cache.get("614519517724278837");
        if (!infoChannel) return message.channel.send(`Channel not found.`).then(m => m.delete({
            timeout: 10000
        }));

        const serverEmbed1 = {
            "title": "Server Owner",
            "description": "This server is owned by <@152597531824619521>, a YouTuber who creates commentaries on Fortnite and topics related to it! You can check out his socials by clicking on these links to support him!\n\n- [YouTube](https://www.youtube.com/channel/UCIZP6nCTyU9VV0zIhY7q1Aw)\n- [Twitch](https://www.twitch.tv/itsitalk)\n- [Twitter](https://twitter.com/ThisIsITalk)\n- [Trello](https://trello.com/b/KbYIp5kZ/videos)\n- [TikTok](https://www.tiktok.com/@imitalk?)\n- [Instagram](https://www.instagram.com/icantalkfortnite/)\n- [Reddit](https://www.reddit.com/user/ICanTalkFortnite/)\n- [Spotify](https://spoti.fi/2TWjhEh)\n\n- [I Talk Server Twitter](https://www.twitter.com/italkserver)\n\nIf you would like to support him when purchasing things from any Epic Games affiliated game, you can use:\n\nSupport-A-Creator Code: __ITF__ **(#ad #EpicPartner)**",
            "color": 'c020cf',
            "thumbnail": {
                "url": "https://cdn.discordapp.com/attachments/793520398137688154/793523562018242601/ServerIcon.png"
            }
        }

        const serverEmbed2 = {
            "title": "Channel and Category Info",
            "description": "Short info on the channels and categories in the server. It is advised to read each channel's channel topic to get a more detailed info on what each channel is for.",
            "color": '00ffff',
            "fields": [{
                "name": "I TALK INFO",
                "value": "<#614193679778709517> - Sends a message when someone joins the server.\n<#625747090852544532> -  The server's rules.\n<#614519517724278837> -  Information and FAQ about the server.\n<#781814866779570236> - Information and FAQ about the server's roles.\n<#771606110389927946> - Credits and Information of Server Art, emojis, etc.\n<#614500763997175824> -  Updates for the server.\n<#614193604277043228> -  Notifications for <@152597531824619521>'s socials.\n<#735534103352574052> - Updates on Fortnite Tweets, Item Shop and Challenge CheatSheets.\n<#793868857638912020> - STW Daily Llamas, Mission Resets, Event and Weekly Shop Resets.\n<#673259309555253290> -  Roles members can assign themselves using reactions.\n<#738819371069079622> - Feedback and Questions regarding this server.\n<#615594300108963867> - Channel for using Bot Commands.\n```\n \n```"
            },
            {
                "name": "I TALK GENERAL",
                "value": "<#614193406842765375> -  Main General Chat of the server, open to everyone.\n<#710916484427415602> -  General Chat for members Level 30 and above.\n<#652578641343152148> -  General Chat for  <@&615597085202317325>s and <@&802243800458068028>s.\n<#761997427111886908> -  Discussion about, and for LFG for games.\n<#693169647217803316> -  Sharing media (images/videos/GIFs).\n<#616739992798232624> -  Discussion about anime.\n<#614550170478051349> -  Sharing memes.\n<#723586295083040769> -  Sharing /Discussion of unpopular opinions.\n<#757307092263501975> -  Submitting intros for <@152597531824619521>'s YouTube.\n<#778502488844140574> - An open platform for having discussions about the server. \n[Unlocked through the <@&655191803858780180> role.]\n```\n \n```"
            },
            {
                "name": "I TALK CREATORS",
                "value": "<#772175886031650827> - Promoting and showcasing creators and artists in the server.\n<#621834479228682250> - Sharing and posting art. [Accessed with the <@&678294533552865299> role.]\n<#802604142790443018> - Discussion and topics related to art.\n```\n \n```"
            },
            {
                "name": "I TALK FORTNITE",
                "value": "<#785618559236833361> - General chat for Fortnite: Battle Royale.\n<#618196499343474712> - General chat for Fortnite: Save the World.\n<#683373679832334376> - General chat for Fortnite: Creative.\n<#703294596914085989> - Sharing of Fortnite Leaks.\n<#614563325556162572> - Sharing/Discussion around Fortnite Cosmetics and Combos.\n<#714511122157404231> - Sharing/Discussion around Fortnite Cosmetic Lockers.\n<#614506784798801940> - Discussion about the daily Fortnite Item Shop.\n```\n \n```"
            },
            {
                "name": "I TALK VOICE CHANNELS",
                "value": "<#774362075618869270> - General Voice Channel.\n<#614484127722373120> - Music Voice Channel for the <@235088799074484224> bot.\n<#757301388840665248> - Music Voice Channel for the <@252128902418268161> bot.\n<#664593167420489730> - Voice channel for Livestreaming.\n<#744952618878763088> - Voice Channel for In-Game Communication.\n<#614484562952585229> - Members AFK in a VC will be auto-moved here.\n```\n \n```"
            }
            ]
        }

        const serverEmbed3 = {
            "title": "Frequently Asked Questions",
            "color": 2359049,
            "fields": [{
                    "name": "__How do I Join I Talk's Discord Streams__?",
                    "value": "```\nYou must be MEE6 Level 10 or above, a Server Booster, Twitch Subscriber, VIP, Homie, Server Artist or Server Spotlight to be eligible to participate in the streams. [Meeting one of these conditions is enough].\nOnce you meet any one of these conditions, head over to #👤self-assign-roles and obtain the @Discord Streams role to be able to participate in the streams.\n\n```"
                },
                {
                    "name": "__How do I use ModMail?__",
                    "value": "```\nBy simply DMing the bot the message you wish to send. If you wish to attach any files (images/videos), you DM that to the bot as well.\nOnce you do that, select the I Talk Server in the list of servers to send the ModMail message into this server.\n```"
                },
                {
                    "name": "__Some members have Custom Roles, how do I get those?__",
                    "value": "```\nAll Staff members in the server have a custom role. \nThe first 30 members in the server to get MEE6 Level 50 got customised roles. This reward is no longer handed out.\nCustom roles are sometimes handed out as rewards for specific tournaments hosted in the server, which is a way you can win Custom Roles.\n```"
                },
                {
                    "name": "__Why can I not send images in channels?__",
                    "value": "```\nImage Permissions is only restricted to certain channels. Check each channel's topic on information on how you unlock image permissions in said channel.\nFurthermore, you must be MEE6 Level 5 before you have the access to send images in these channels.\n```"
                },
                {
                    "name": "__How do I become a Moderator/Administrator__?",
                    "value": "```\nThis server does not have a system of applications; new staff members are hand-picked by the current staff team in the case we believe we need more staff members.\n\nWe look for friendliness, helpfulness, etc. However, do not mini-moderate to try and get moderator/administrator.\n```"
                },
                {
                    "name": "__I just got Striked/Muted/Kicked/Banned. I wish to appeal my punishment, can I do that?__",
                    "value": "```\n[Strikes/Mutes/Kicks]\nFile a ModMail in order to appeal your punishment. You will receive further instructions there.\n\n[Bans]\nThe bot will DM you an invite to a Ban Appeals server. Join it to appeal your ban.\n```"
                },
                {
                    "name": "__What is this Level system under MEE6? How do I level up?__",
                    "value": "```\nYou gain 15-25 XP for every minute you send messages under MEE6. Spamming won't help you gain extra XP, and will only invite punishment.\nYou can check your current level by typing !rank in #🤖bot-commands.\n```"
                },
                {
                    "name": "__What are the roles in the server?__",
                    "value": "```\nRefer to #✅role-info for information on all roles in the server. \n```"
                }
            ]
        }

        message.channel.send(`**${message.author.username}**, updating the <#614519517724278837> channel.`).then(progMsg => {
            infoChannel.messages.fetch("798334900460716062").then(embedOne => {
                embedOne.edit({ embed: serverEmbed1 });
                progMsg.edit(`Updated first message in the channel.`);
            }).catch(err => {
                infoChannel.send({ embed: serverEmbed1 });
                progMsg.edit(`I couldn't find the first message, so I sent one in the channel.`);
                return console.log(err);
            });

            infoChannel.messages.fetch("798334900930347029").then(embedTwo => {
                embedTwo.edit({ embed: serverEmbed2 });
                progMsg.edit(`Updated second message in the channel.`);
            }).catch(err => {
                infoChannel.send({ embed: serverEmbed2 });
                progMsg.edit(`I couldn't find the second message, so I sent one in the channel.`);
                return console.log(err);
            });

            infoChannel.messages.fetch("798334901480325150").then(embedThree => {
                embedThree.edit({ embed: serverEmbed3 });
                progMsg.edit(`**${message.author.username}**, successfully updated third message. The <#614519517724278837> channel is now up-to-date.`).then(m => m.delete({
                    timeout: 10000
                }));
            }).catch(err => {
                infoChannel.send({ embed: serverEmbed3 });
                progMsg.edit(`I couldn't find the third message, so I sent one in the channel.`);
                return console.log(err);
            });
        })
    }
}

/*
        infoChannel.messages.fetch("798334900460716062").then(embedOne => {
            embedOne.edit({ embed: serverEmbed1 });
        }).catch(err => {
            infoChannel.send({ embed: serverEmbed1 });
            return console.log(err);
        });

        infoChannel.messages.fetch("798334900930347029").then(embedTwo => {
            embedTwo.edit({ embed: serverEmbed2 });
        }).catch(err => {
            infoChannel.send({ embed: serverEmbed2 });
            return console.log(err);
        });

        infoChannel.messages.fetch("798334901480325150").then(embedThree => {
            embedThree.edit({ embed: serverEmbed3 });
        }).catch(err => {
            infoChannel.send({ embed: serverEmbed3 });
            return console.log(err);
        });
*/