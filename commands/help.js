const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'help',
    description: '[GENERAL] This will provide you the list of commands, their aliases, and how to use them. <[setPrefix]help>',
    execute(message, commandPrefix) {
        message.delete();
        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        let administratorR = message.guild.roles.cache.find(role => role.name === "Administrator");

        if (message.member.roles.cache.has(moderatorR.id) || message.member.roles.cache.has(administratorR.id)) {
            const commandsEmbed = new Discord.MessageEmbed()
                .setTitle(`Power Chord Commands`)
                .setDescription(`- **assistance**: call Staff Member assistance **(only use in important/urgent circumstances)**.\n- **coinflip** **|** **flipcoin**: flip a coin, having bets for each side.\n- **8ball | eightball | eball**: will give a standard 8Ball prediction to the question asked.\n- **hotline** **|** **suicidehotline**: Suicide Prevention Hotlines for those in need.\n- **pfp** **|** **avatar** **|** **av**: view your avatar or the mentioned user's avatar.\n- **rps**: play "Rock Paper Scissors" with another member.\n- **love | itflove | luv**: will add 1 ITF Love to the counter!\n- **socials** **|** **medias**: I Talk Fortnite's Social Media Links.\n- **staff**: showcases the I Talk Server Staff Team.\n- **weather**: showcases the weather for location you've specified.\n\n- **peaceandlove**: ☮️ and ❤️!\n- **no**: no\n- **jean**: Jenna go back to modding!\n\n- **appeal**: appeal a ban punishment [restricted to the Appeals Server].`)
                .setColor('6dff48')

            const moderatorEmbed = new Discord.MessageEmbed()
                .setTitle(`Moderator Enforced Commands`)
                .setDescription(`\n- **prefix**, **setprefix**: sets the prefix for Power Chord (guild-specific) [Administrators Only]\n- **ping**: will provide Bot & API Latency.\n- **description**, **desc**: will provide the description for specified command: refrain from using alias names.\n- **greact**: will grant \`ADD_REACTIONS\` permissions to member/role in all channels under the \`I TALK GENERAL\` and \`I TALK FORTNITE\` categories.\n- **rreact**: will revoke \`ADD_REACTIONS\` permission from member/role in all channels under the \`I TALK GENERAL\` and \`I TALK FORTNITE\` categories.\n- **removeoverride**, **rride**, **roverride**: removes member/role's permission overwrite in all channels under the \`I TALK GENERAL\` and \`I TALK FORTNITE\` categories.\n- **poll**: will run a poll with specified details.\n- **announce**: will create an announcement (embed or plain text) using specified details.\n- **vcmute**, **vcm**: if there is no mentioned member, this will server mute all members in your voice channel.\n- **vcunmute**, **vcun**: if there is no mentioned member, this will unmute all members in your voice channel if server muted.\n- **vcdeafen**, **vcdeaf**: if there is no mentioned member, this will server deafen all members in your voice channel.\n- **vcundeafen**, **vcundeaf**: if there is no mentioned member, this will undeafen all members in your voice channel if server deafened.\n- **vote**, **reactvote**: when provided a message ID, the bot will add Power Chord upvote and downvote reactions on message.\n\n- **accept**, **acceptappeal**, **appealaccept**: will accept the mentioned member's ban appeal [restricted to Appeals Server].\n- **deny**, **denyappeal**, **appealdeny**: will deny & ban the mentioned member's ban appeal [restricted to Appeals Server].`)
                .setColor('ff0000')

            const aliasEmbed = new Discord.MessageEmbed()
                .setTitle(`Alias Commands`)
                .setDescription('- **prefix** has `1` other alias: "**setprefix**"\n- **description** has `1` other alias: "**desc**"\n- **vcmute** has `1` other alias: "**vcm**"\n- **vcunmute** has `1` other alias: "**vcun**"\n- **vcdeafen** has `1` other alias: "**vcdeaf**"\n- **vcundeafen** has `1` other alias: "**vcundeaf**"\n- **vote** has `1` other alias: "**reactvote**"\n- **removeoverride** has `2` other aliases: "**roverride** & **rride**"\n\n- **accept** has `2` other aliases: "**acceptappeal** & **appealaccept**"\n- **deny** has `2` other aliases: "**denyappeal** & **appealdeny**"\n\n- **coinflip** has `1` other alias: "**flipcoin**"\n- **love** has `2` other aliases: "**itflove** & **luv**"\n- **suicidehotline** has `1` other alias: "**hotline**"\n- **pfp** has `2` other aliases: "**av** & **avatar**"\n- **socials** has `1` other alias: "**medias**"')
                .setColor('e6810a')

            const usageEmbed = new Discord.MessageEmbed()
                .setTitle(`Command Usages`)
                .setDescription(`- **assistance**: +assistance\n- **coinflip**: +coinflip\n- **love**: +love\n- **help**: +help\n- **socials**: +socials\n- **staff**: +staff\n- **hotline**: +hotline\n- **ping**: +ping\n\n- **peaceandlove**: +peaceandlove\n- **no**: +no\n- **jean**: +jean\n\n- **description**: +description <command name> [categorized by: \`GENERAL\`, \`MODERATION\`, \`PROMPT\`, \`ONE-STEP\`].\n- **pfp**: +pfp (<@member>)\n- **rps**: +rps <@member to duel>\n- **weather**: +weather <location> (e.g. "san francisco")\n\n- **prefix**: +prefix <prefix>\n- **greact**: +greact <@member> / <@role> / <member ID> / <role ID>\n- **rreact**: +rreact <@member> / <@role> / <member ID> / <role ID>\n- **removeoverride**: +removeoverride <@member> / <@role> / <member ID> / <role ID>\n- **poll**: +poll (instructions will be prompted when command run)\n- **vcmute**: +vcmute <@Member> OR +vcmute (will mute everybody in VC)\n- **vcunmute**: +vcunmute <@Member> OR +vcunmute (will unmute everybody in VC)\n- **vcdeafen**: +vcdeafen <@Member> OR +vcdeafen (will mute everybody in VC)\n- **vcundeafen**: +vcundeafen <@Member> OR +vcundeafen (will undeafen everybody in VC)\n- **vote**: +vote <message ID>\n\n- **appeal**: +appeal <ban appeal message> [restricted to Appeals Server]\n- **accept**: +accept <@member> [restricted to Appeals Server]\n- **deny**: +deny <@member> [restricted to Appeals Server]`)
                .setColor('eb4bc9')

            message.author.send(commandsEmbed);
            message.author.send(moderatorEmbed);
            message.author.send(aliasEmbed);
            message.author.send(usageEmbed).then(message.author.send(`**[🔨]** Since you are a **staff member**, you have been provided the full list of commands.\n*(Those who are not staff members are not provided embeds containing Moderator commands. This message will be different as well).*\n\n- This bot was created **specifically** for the I Talk Server guild.\n- This bot is a collaboration between <@148807073948368896> and <@528759471514845194>, and the original Power Chord bot was created by <@148807073948368896>.\n\n- If a regular member runs a moderator-enforced command, the bot will not respond.\n- All commands are deleted, and most bot responses are deleted after a short period of time as well.\n- Any issues, concerns, or feature suggestions can be directed to either creators.`))

            message.channel.send(`**[📨]** Slidin' right into your DMs.`).then(m => m.delete({
                timeout: 5000
            }));
            return;
        }

        const commandsEmbed = new Discord.MessageEmbed()
            .setTitle(`Power Chord Commands`)
            .setDescription(`- **assistance**: call Staff Member assistance **(only use in important/urgent circumstances)**.\n- **coinflip** **|** **flipcoin**: flip a coin, having bets for each side.\n- **8ball | eightball | eball**: will give a standard 8Ball prediction to the question asked.\n- **hotline** **|** **suicidehotline**: Suicide Prevention Hotlines for those in need.\n- **pfp** **|** **avatar** **|** **av**: view your avatar or the mentioned user's avatar.\n- **rps**: play "Rock Paper Scissors" with another member.\n- **love | itflove | luv**: will add 1 ITF Love to the counter!\n- **socials** **|** **medias**: I Talk Fortnite's Social Media Links.\n- **staff**: showcases the I Talk Server Staff Team.\n- **weather**: showcases the weather for location you've specified.\n\n- **peaceandlove**: ☮️ and ❤️!\n- **no**: no\n- **jean**: Jenna go back to modding!\n\n- **appeal**: appeal a ban punishment [restricted to the Appeals Server].`)
            .setColor('6dff48')

        const aliasEmbed = new Discord.MessageEmbed()
            .setTitle(`Alias Commands`)
            .setDescription('- **coinflip** has `1` other alias: "**flipcoin**"\n- **love** has `2` other aliases: "**itflove** & **luv**"\n- **suicidehotline** has `1` other alias: "**hotline**"\n- **pfp** has `2` other aliases: "**av** & **avatar**"\n- **socials** has `1` other alias: "**medias**"')
            .setColor('e6810a')

        const usageEmbed = new Discord.MessageEmbed()
            .setTitle(`Command Usages`)
            .setDescription(`- **assistance**: +assistance\n- **coinflip**: +coinflip\n- **love**: +love\n- **help**: +help\n- **socials**: +socials\n- **staff**: +staff\n- **hotline**: +hotline\n\n- **peaceandlove**: +peaceandlove\n- **no**: +no\n- **jean**: +jean\n\n- **pfp**: +pfp <@Member>\n- **rps**: +rps <@Member to duel>\n- **weather**: +weather <location> (e.g. "san francisco")\n\n- **appeal**: +appeal <ban appeal message> [restricted to the Appeals Server]`)
            .setColor('eb4bc9')

        message.author.send(commandsEmbed);
        message.author.send(aliasEmbed);
        message.author.send(usageEmbed).then(message.author.send(`- This bot was created **specifically** for the I Talk Server guild.\n- This bot is a collaboration between <@148807073948368896> and <@528759471514845194>, and the Power Chord bot was created by <@148807073948368896>.\n\n- All commands are deleted, and most bot responses are deleted after a short period of time as well.\n- Any issues, concerns, or feature suggestions can be directed to either creators.\n\nIf you would like to invite others to the **I Talk Server**, the invite URL is discord.gg/italkfortnite .`));

        message.channel.send(`**[📨]** Slidin' right into your DMs.`).then(m => m.delete({
            timeout: 5000
        }));
    }
}