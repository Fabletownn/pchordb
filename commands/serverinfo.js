const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'serverinfo',
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
            "description": "This server is owned by <@152597531824619521>, a YouTuber who creates commentaries on Fortnite and topics related to it! You can check out his socials by clicking on these links to support him!\n\n- [YouTube](https://www.youtube.com/channel/UCIZP6nCTyU9VV0zIhY7q1Aw)\n- [Twitch](https://www.twitch.tv/itsitalk)\n- [Twitter](https://twitter.com/ThisIsITalk)\n- [Trello](https://trello.com/b/KbYIp5kZ/videos)\n- [Instagram](https://www.instagram.com/icantalkfortnite/)\n- [Reddit](https://www.reddit.com/user/ICanTalkFortnite/)\n\n- [I Talk Server Twitter](https://www.twitter.com/italkserver)\n\nIf you would like to support him when purchasing things from any Epic Games affiliated game, you can use:\n\nSupport-A-Creator Code: __ITF__ **(#ad #EpicPartner)**",
            "color": '23ff09',
        }

        const serverEmbed2 = {
            "title": "Channel and Category Info",
            "description": "Short info on the channels and categories in the server. It is advised to read each channel's channel topic to get a more detailed info on what each channel is for.",
            "color": 2359049,
            "fields": [{
                "name": "I TALK INFO",
                "value": "<#614193679778709517> - Sends a message when someone joins the server.\n<#625747090852544532> -  The server's rules.\n<#614519517724278837> -  Information and FAQ about the server.\n<#781814866779570236> - Information and FAQ about the server's roles.\n<#771606110389927946> - Credits and Information of Server Art, emojis, etc.\n<#614500763997175824> -  Updates for the server.\n<#614193604277043228> -  Notifications for <@152597531824619521>'s socials.\n<#735534103352574052> - Updates on Fortnite Tweets, Item Shop and Challenge CheatSheets.\n<#793868857638912020> - STW Daily Llamas, Mission Resets, Event and Weekly Shop Resets.\n<#673259309555253290> -  Roles members can assign themselves using reactions.\n<#711435929537085450> -  Color Roles [Unlocked at MEE6 Level 40.]\n<#738819371069079622> - Feedback and Questions regarding this server.\n<#615594300108963867> - Channel for using Bot Commands.\n```\n \n```"
            },
            {
                "name": "I TALK GENERAL",
                "value": "<#614193406842765375> -  Main General Chat of the server, open to everyone.\n<#710916484427415602> -  General Chat for members Level 30 and above.\n<#652578641343152148> -  General Chat for  <@&615597085202317325>s and <@&614193913707757639>s.\n<#761997427111886908> -  Discussion about, and for LFG for games.\n<#693169647217803316> -  Sharing media (images/videos/GIFs).\n<#616739992798232624> -  Discussion about anime.\n<#614550170478051349> -  Sharing memes.\n<#723586295083040769> -  Sharing /Discussion of unpopular opinions.\n<#757307092263501975> -  Submitting intros for <@152597531824619521>'s YouTube.\n<#778502488844140574> - An open platform for having discussions about the server. \n[Unlocked through the <@&655191803858780180> role.]\n```\n \n```"
            },
            {
                "name": "I TALK CREATORS",
                "value": "<#772175886031650827> - Promoting and showcasing creators and artists in the server.\n<#621834479228682250> - Sharing and posting art. \n<#802604142790443018> - Discussion and topics related to art.\n[Accessed with the <@&678294533552865299> role.]\n```\n \n```"
            },
            {
                "name": "I TALK FORTNITE",
                "value": "<#785618559236833361> - General chat for Fortnite: Battle Royale.\n<#618196499343474712> - General chat for Fortnite: Save the World.\n<#683373679832334376> - General chat for Fortnite: Creative.\n<#703294596914085989> - Sharing of Fortnite Leaks.\n<#614563325556162572> - Sharing/Discussion around Fortnite Cosmetics and Combos.\n<#714511122157404231> - Sharing/Discussion around Fortnite Cosmetic Lockers.\n<#614506784798801940> - Discussion about the daily Fortnite Item Shop.\n```\n \n```"
            },
            {
                "name": "I TALK VOICE CHANNELS",
                "value": "<#774362075618869270> - General Voice Channel.\n<#614484127722373120> - Music Voice Channel for the <@235088799074484224> bot.\n<#757301388840665248> - Music Voice Channel for the <@235088799074484224> bot.\n<#664593167420489730> - Voice channel for Livestreaming.\n<#744952618878763088> - Voice Channel for In-Game Communication.\n<#614484562952585229> - Members AFK in a VC will be auto-moved here.\n```\n \n```"
            }
            ]
        }

        const serverEmbed3 = {
            "title": "Frequently Asked Questions",
            "color": '23ff09',
            "fields": [{
                "name": "> __**How do I join Server Events, Customs, etc.?**__",
                "value": "You need to be atleast Level 10 to be eligible to participate in these. Once you do so, you get access to <#673259309555253290>, through where you can choose what all you wish to participate in!"
            },
            {
                "name": "> __**How do I become a Staff Member (Moderator/Administrator)**__",
                "value": "We do not have a system of applications for staff members. If we feel like we need more staff, and we feel you will be a good staff member, we will grant you the <@&672857887894274058> role for some time, and then take a decision later on whether we think you should be a staff member or not.\n\nWe look for friendliness, helpfulness, etc. However, do not mini-moderate to try and get moderator/administrator."
            },
            {
                "name": "> __**How do I get a specific Color role? How do I level up under MEE6?**__",
                "value": "You gain 15-25 XP per minute for talking in a text channel. You get a new Level role every 5 levels. \nAs for color roles, at MEE6 Level 40 you unlock <#711435929537085450>, where you can choose between 40 different colors."
            },
            {
                "name": "> __**Can I appeal a Warn/Mute/Kick/Ban?**__",
                "value": "Yes. You can file a ModMail with the image of your infraction log in case you wish to appeal a Warn/Mute/Kick. On the other hand, bans are appealable through the Appeal Server. In case you are banned, you will be DMed the Invite Link to the Appeal Server."
            },
            {
                "name": "> __**How do I contact the Staff team?**__",
                "value": "- File a <@575252669443211264>. (Preferred)\n- Ping a staff member who is in chat, to ask them something minor.\n- Use the `+assistance` command to get immediate help of the staff team. [Use only in urgent situations]"
            },
            {
                "name": "> __**How do I submit feedback, or ask more questions?**__",
                "value": "We welcome any feedback/suggestions/criticism you have! Send a message in <#738819371069079622> for the same. The same channel can be used for asking questions about the server."
            },
            {
                "name": "> __How can I become a Server Tweaker?__",
                "value": "The <@&655191803858780180> role is randomly handed out by Server Staff to members Level 30 and above. \nBeing above Level 30 isn't the only requirement, it also depends on the way you interact in chat, your activeness in providing server feedback, etc. Begging for the role will only reduce your chances of getting it."
            },
            {
                "name": "> __Why can't I send images in some channels?__",
                "value": "You need to be Level 10 before you unlock image permissions in certain channels. The exact role permissions are mentioned in each channel's channel topic."
            },
            {
                "name": "> __What are the roles in the server? What perks do they grant? How do I obtain them?__",
                "value": "Info on the roles in the server are listed in the <#781814866779570236> channel."
            },
            {
                "name": "> __How can I get a Custom role on the server?__",
                "value": "The first 30 members to reach Level 50 obtained custom roles on the server. We do not hand out this reward anymore.\nWinners of server-hosted tournaments have the chance to obtain a custom role."
            }
            ]
        }

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
    }
}