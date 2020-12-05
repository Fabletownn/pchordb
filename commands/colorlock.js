const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'colorlock',
    description: '[MODERATION] Will send the entire list of embeds regarding Color Lock in chat. Please use at your own discretion: it is **LONG**. <[setPrefix]colorlock>',
    execute(message, args) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        const colorEmbed1 = {
            "title": "Color Lock",
            "description": ":tada: Congratulations on unlocking Color Lock! :tada:\n\nYou can choose between any of the following 40 colors to be your name color on the server. Simply click on the corresponding reaction to get the color!\nFeel free to change your role at anytime by simply clicking a different reaction!",
            "color": 2359049,
            "fields": [{
                    "name": "\u200b",
                    "value": "<@&784484399499837492> \n<@&784484421894012950> \n<@&784484472350441482> \n<@&784484425286418441> \n<@&784484428574621716> \n<@&784484431121350727> \n<@&784484433825628180> \n<@&784484438209200159> \n<@&784484440494702642> \n<@&784484442742980638> \n<@&784484444941189181> \n<@&784484447881658388> \n<@&784484450405974017> \n<@&784484453472665610> \n<@&784484455824752671> \n<@&784484458253516821> \n<@&784484461336592423> \n<@&784484463480274946> \n<@&784484466667421746> \n<@&784484469464760360>",
                    "inline": true
                },
                {
                    "name": "\u200b",
                    "value": "<@&784485958778486794> \n<@&784485961005793333> \n<@&784485963513593897> \n<@&784485966161248336> \n<@&784485968992141312> \n<@&784485969244061767> \n<@&784485971181830153> \n<@&784485972787855422> \n<@&784485974830350368>\n<@&784485977497927682> \n<@&784485979229913109> \n<@&784485981406363678> \n<@&784485979456274442> \n<@&784485983223152650> \n<@&784485985060519936> \n<@&784485987795468358> \n<@&784485987848945724> \n<@&784485989409882143> \n<@&784485991536132097> \n<@&784485993604448296>",
                    "inline": true
                }
            ]
        }
        message.channel.send({
            embed: colorEmbed1
        });
    }
}