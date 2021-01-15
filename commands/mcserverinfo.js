const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'mcserverinfo',
    description: '[MODERATION] Will send the entire list of embeds regarding Minecraft Server Information in chat. <[setPrefix]mcserverinfo>',
    execute(message) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Discord Moderator");
        if (message.guild.id !== "797142251712151583") return;
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        const serverEmbed1 = {
            "title": "Minecraft | Server Info",
            "description": "The **I Talk Minecraft Server** is a survival multiplayer server, which is crossplay between Minecraft Java Edition and Minecraft Bedrock Edition players.\n\nIn the future, there are plans to implement Creative into the server as well. All suggestions can go in <#797771341566705665> for the same.  \n\nInformation on how to join the Minecraft Server is in <#797145212321398825>.",
            "color": 43520
        }

        const serverEmbed2 = {
            "title": "Discord | Channel and Category Info",
            "description": "Short info on the channels and categories in the server. It is advised to read each channel's channel topic to get a more detailed info on what each channel is for.",
            "color": 7506394,
            "fields": [
                {
                    "name": "⠀",
                    "value": "<#797142832045359155> - Sends a message when someone joins the server.\n<#797773452395937822> - Invite to the main I Talk Server.\n```\n \n```"
                },
                {
                    "name": "INFORMATION",
                    "value": "<#797145212321398825> - Instructions on joining the Minecraft Server.\n<#797154896465494016> - Rules for the Minecraft and the Discord Server.\n<#797788245794488340> - Roles you can assign yourself.\n<#797774446475214859> - Important announcements for the server.\n```\n \n```"
                },
                {
                    "name": "GENERAL CHANNELS",
                    "value": "<#797788018613551124> - Main channel for conversations in the server.\n<#797788083923582987> - Channel to share media in.\n<#797813892783931402> - Channel to run bot commands in.\n<#797199041795588146> - Synced In Game Chat between the Minecraft and the Discord Server.\n```\n \n```"
                },
                {
                    "name": "FEEDBACK AND QUESTIONS",
                    "value": "<#797575762286215188> - Suggestions for the Discord Server.\n<#797771341566705665> - Suggestions for the Minecraft Server.\n<#797771393143144458> - Questions for the Discord Server.\n<#797771416120066048> - Questions for the Minecraft Server.\n```\n \n```"
                },
                {
                    "name": "VOICE CHANNELS",
                    "value": "<#797142252639748097> - Primary Voice Channel for in-game communication.\n<#797770795782766623> - Secondary Voice Channel for in-game communication.\n<#797770809073991700> - Primary Voice Channel for livestreaming gameplay into. \n<#797802749383147530> - Secondary Voice Channel for livestreaming gameplay into.\n```\n \n```"
                },
                {
                    "name": "SERVER EVENTS",
                    "value": "<#797774477130989588> - Updates for Minecraft Server Events.\n<#797793585025777683> - Text Chat for Minecraft Server Events.\n<#797793687727767559> - Voice Channel for Minecraft Server Events."
                }
            ]
        }

        const serverEmbed3 = {
            "title": "Discord | Role Info",
            "description": "Short info on some of the important roles on the server. If it is possible for you to obtain the roles, it has been specified how. Do not beg for the server staff to give you certain roles - you will only receive a role if you require it.",
            "color": 7506394,
            "fields": [
                {
                    "name": "SERVER STAFF ROLES",
                    "value": "<@&797787761200726016> - <@152597531824619521>, the server owner.\n\n<@&797145089297350736> - Server Staff for this Discord Server.\n<@&797770573778386944> - Server Operators for the Minecraft Server.\n<@&797809139836911666> - All Discord and Minecraft Server Staff Members have this role.\n```\n \n```"
                },
                {
                    "name": "SELF ASSIGN ROLES",
                    "value": "<@&797778665462562837> - Receive notifications for any important server announcements.\n<@&797778701725990922> - Receive notifications for any server events hosted.\n\n**[Can be obtained from <#797788245794488340>]**"
                }
            ]
        }

        message.channel.send({
            embed: serverEmbed1
        }).then(() => {
            message.channel.send({
                embed: serverEmbed2
            }).then(() => {
                message.channel.send({
                    embed: serverEmbed3
                });
            });
        });
    }
}