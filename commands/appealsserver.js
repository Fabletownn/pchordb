const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'appealsrules',
    description: 'temporary command',
    execute(message) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        const appealsEmbed = {
            "title": "Appeals Server Rules",
            "description": "This is the I Talk Server's Ban Appeals server, which shall only be used for appealing **bans** from the main server.\n\nIf you were banned from the main server, you're free to file an appeal here.\nThe rules are shown below. **Do not submit an appeal if you're not banned**.\n``` ```",
            "color": 2359049,
            "fields": [{
                    "name": "1) Rehearsing the above, do not file appeals if you are not banned.",
                    "value": "You can choose to stay in this server if you haven't been banned from the main server, but are requested to not file any appeals.\nIn case you file an appeal and aren't banned in the main server, you will be permanently banned from this server and lose your chance to appeal."
                },
                {
                    "name": "2) Be patient.",
                    "value": "Appeals are all voted on Saturday, unanimously by all Moderators.\nOnce your appeal is received by Moderators, wait for it to be reviewed."
                },
                {
                    "name": "3) Accept your fate.",
                    "value": "The decision is final. If your appeal is accepted, you will be unbanned from the main server and kicked from the Appeals server.\nLikewise, if your appeal is rejected, you will stay banned in the main server."
                }
            ],
            "footer": {
                "text": "All appeals must be filed for BANS, not punishments such as strikes, mutes, or kicks."
            }
        }

        message.channel.messages.fetch('734473888095797320').then(toEdit => {
            toEdit.edit({
                embed: appealsEmbed
            });
        });
    }
}