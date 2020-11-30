const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'serverinfo',
    description: '[MODERATION] Will send the entire list of embeds regarding Server Information in chat. Please use at your own discretion: it is **LONG**. <[setPrefix]serverinfo>',
    execute(message, args) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        const serverEmbed1 = {
            "title": "Server Owner",
            "description": "This server is owned by <@152597531824619521>, a YouTuber who creates commentaries on Fortnite and topics related to it! You can check out his socials by clicking on these links to support him!\n\n- [YouTube](https://www.youtube.com/c/italkfortnite)\n- [Twitch](https://www.twitch.tv/italkfortnite)\n- [Twitter](https://twitter.com/ITalkFortnite)\n- [Instagram](https://www.instagram.com/icantalkfortnite/)\n- [Reddit](https://www.reddit.com/user/ICanTalkFortnite/)\n\nIf you would like to support him when purchasing things from any Epic Games affiliated game, you can use:\n\nSupport-A-Creator Code: __ITF__ **(#ad #EpicPartner)**",
            "color": '23ff09',
        }

        const serverEmbed2 = {
            "title": "Channel and Category Info",
            "description": "This server has multiple channels that are divided under categories: each category has channels of similar topics. These categories and their contents are summarized below.\n\n`I TALK INFO` - Important Server Information.\n`I TALK GENERAL` - General Channels.\n`I TALK FORTNITE` - Fortnite-Related Channels.\n`I TALK BOTS` - Bot Commands Channels.\n`I TALK VOICE CHANNELS` - Voice Channels.\n`I TALK EVENTS` - Server Events (Accessible after achieving Level 10 through <#673259309555253290>).\n`I TALK CUSTOMS` - Fortnite Customs (Accessible after achieving Level 10 through <#673259309555253290>).\n\nEach channel serves its own purpose, which is explained in the channel's topic, and any channel-specific rules are pinned in the channel.",
            "color": '23ff09',
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
                        "value": "You gain 15-25 XP per minute for talking in a text channel. You get a new Level role every 5 levels. \nAs for color roles, at MEE6 Level 40 you unlock <#711435929537085450>, where you can choose between 20 different colors."
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

        message.channel.send({ embed: serverEmbed1 }).then(() => {
            message.channel.send({ embed: serverEmbed2 }).then(message.channel.send({ embed: serverEmbed3 }));
        });
    }
}