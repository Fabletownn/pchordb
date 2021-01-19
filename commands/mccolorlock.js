const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'mccolorlock',
    description: '[MODERATION] Will send the entire list of embeds regarding Color Lock for Minecraft in chat. <[setPrefix]mccolorlock>',
    execute(message) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Discord Moderator");
        if (message.guild.id !== "797142251712151583") return;
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        const colorEmbed = {
            "title": "Color Roles",
            "description": "Pick a Color Role for your username color in the server. You can choose one color role at a time, and can switch color roles at any time by simply choosing a different reaction.",
            "color": 2359049,
            "fields": [{
                "name": "\u200b",
                "value": "<@&800874780764143647>\n<@&800875015859208202>\n<@&800875236999692338>\n<@&800875940951359548>\n<@&800876186057703464>\n<@&800876301606584362>\n<@&800876454694354945>\n<@&800876564564410438>\n<@&800876698203455528>\n<@&801007318857941014>\n<@&801007410038439936>\n<@&801007492271308800>\n<@&801007558319276055>\n<@&801007620990828585>\n<@&801007676720021514>\n<@&801007739609284608>\n<@&801007809289650177>\n<@&801007857389666314>\n<@&801007921785602051>\n<@&801008010075176981>",
                "inline": true
            },
            {
                "name": "\u200b",
                "value": "<@&801008072095956992>\n<@&801008140061114400>\n<@&801008199264239626>\n<@&801008244285767691>\n<@&801008295598489643>\n<@&801008347985215498>\n<@&801008398245953556>\n<@&801008434777423903>\n<@&801008479682560020>\n<@&801008543079596052>\n<@&801008618161045564>\n<@&801008670561140768>\n<@&801008753909825556>\n<@&801008798360928256>\n<@&801008850311708692>\n<@&801008923402174464>\n<@&801009021455958036>\n<@&801009077693054987>\n<@&801009109104590848>\n<@&801009151458672651>",
                "inline": true
            }
            ]
        }

        message.channel.send({
            embed: colorEmbed
        });
    }
}