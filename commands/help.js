const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'help',
    description: '[GENERAL] This will prompt a help message in your DMs with information about commands, their aliases, and how to use them. <[setPrefix]help>',
    execute(message) {
        message.delete();

        const homeEmbed = new Discord.MessageEmbed()
            .setAuthor(`Power Chord Help Menu`, `https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg`)
            .setTitle(`Main Menu`)
            .setDescription(`This help menu includes all commands that you're able to use.\nThese different types of commands are separated into five different categories: **general**, **moderator enforced**, **Guess The Blank**, **fun** and **appeals**.\n\nYou are a staff member, so you have been provided the full list of commands: those who are not part of the staff team will be given a help menu excluding Moderator-restricted commands. 🔨\n<:pcPLACEHOLDER:786598522001817630>`)
            .addField(`🌍 General Commands`, `This will provide a list of commands you're able to use for general use.`)
            .addField(`🎲 Fun Commands`, `This will provide a list of fun commands you can get a kick out of.`)
            .addField(`🔨 Moderator Enforced Commands`, `This will provide a list of commands restricted to Moderators.`)
            .addField(`🎮 Guess The Blank Commands`, `This will provide a list of commands used to control/host Guess The Blank games.`)
            .addField(`📜 Appeal Commands`, `This will provide a list of commands restricted to the I Talk Appeals server, to appeal a ban.`)
            .addField(`🛰️ Command Aliases`, `This will provide a list of commands that have different names that're able to be used.`)
            .addField(`🔧 Command Usages`, `This will provide a list of how you're able to use every single command.`)
            .addField(`ℹ️ Bot Information`, `This will provide information on the Power Chord bot.`, true)
            .addField(`🏠 Home Page`, `Brings you back to here.`, true)
            .setColor('eb4bc9')
            .setFooter(`Page 1 of 9`)
            .setTimestamp();

        const homeEmbedEG = new Discord.MessageEmbed()
            .setAuthor(`Power Chord Help Menu`, `https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg`)
            .setTitle(`Main Menu`)
            .setDescription(`This help menu includes all commands that you're able to use.\nThese different types of commands are separated into five different categories: **general**, **moderator enforced**, **Guess The Blank**, **fun** and **appeals**.\n\nYou are a staff member, so you have been provided the full list of commands: those who are not part of the staff team will be given a help menu excluding Moderator-restricted commands. 🔨\n<:pcPLACEHOLDER:786598522001817630>`)
            .addField(`🌍 General Commands`, `This will provide a list of commands you're able to use for general use.`)
            .addField(`🎲 Fun Commands`, `This will provide a list of fun commands you can get a kick out of.`)
            .addField(`🔨 Moderator Enforced Commands`, `This will provide a list of commands restricted to Moderators.`)
            .addField(`🎮 Guess The Blank Commands`, `This will provide a list of commands used to control/host Guess The Blank games.`)
            .addField(`📜 Appeal Commands`, `This will provide a list of commands restricted to the I Talk Appeals server, to appeal a ban.`)
            .addField(`🛰️ Command Aliases`, `This will provide a list of commands that have different names that're able to be used.`)
            .addField(`🔧 Command Usages`, `This will provide a list of how you're able to use every single command.`)
            .addField(`ℹ️ Bot Information`, `This will provide information on the Power Chord bot.`, true)
            .addField(`<:pcThanosSnap:786691150173962300> Home Page`, `And where did that bring you? Back to me.`, true)
            .setColor('eb4bc9')
            .setFooter(`Page 1 of 9`)
            .setTimestamp();

        const generalEmbed = new Discord.MessageEmbed()
            .setAuthor(`Power Chord Help Menu`, `https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg`)
            .setTitle(`General Commands`)
            .setDescription(`These list of commands are **restricted** and may only be used in <#615594300108963867>. **The exceptions to this are assistance & hotline, which can be used anywhere in the server.**\nAny and all commands are deleted: this means that running these commands in the incorrect channel will delete & disregard your message.\n\n- **ahelp**: will provide a list of commands all at once.\n- **assistance**: call Staff Member assistance **(only use in urgent circumstances)**.\n- **hotline**, **suicidehotline**: Suicide Prevention Hotlines for those in need.\n- **socials**, **medias**: will provide I Talk Fortnite's social media links.\n- **staff**: will showcase the I Talk Server Staff Team!`)
            .setColor('6dff48')
            .setFooter(`Page 2 of 9`)
            .setTimestamp();

        const funEmbed = new Discord.MessageEmbed()
            .setAuthor(`Power Chord Help Menu`, `https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg`)
            .setTitle(`Fun Commands`)
            .setDescription(`Unlike a couple of General Commands, all of the commands listed below are restricted to use in <#615594300108963867>. If you're confused on how to use any of these commands, press on the 🔧 reaction for command usage information.\n\n- **coinflip**, **flipcoin**: will flip a coin, allowing you to provide a bet for each side.\n- **8ball**, **eightball**, **eball**: will give a standard 8Ball prediction to the specified question.\n- **pfp**, **avatar**, **av**: will provide a preview of either your avatar, or a mentioned member's avatar.\n- **trigger**: will make the mentioned member's profile picture triggered.\n- **rps**, **rockpaperscissors**: play Rock Paper Scissors with the mentioned member.\n- **weather**: will showcase the weather for the specified location.\n\n- **peaceandlove**: ☮️ and ❤️!\n- **no**: no\n- **jean**: Jenna go back to modding!`)
            .setColor('056ef7')
            .setFooter(`Page 3 of 9`)
            .setTimestamp();

        const modEmbed = new Discord.MessageEmbed()
            .setAuthor(`Power Chord Help Menu`, `https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg`)
            .setTitle(`Moderator Enforced Commands`)
            .setDescription(`This command list will only be provided in the Help Menu to Moderators. These commands are restricted to Moderators only: **the only exception to this is prefix, which is restricted for Administrator use only**.\nThese commands may be used anywhere. Regular members are not provided this list of commands.\n\n- **prefix**, **setprefix**: sets the prefix for Power Chord (guild-specific) [Administrators Only]\n- **ping**: will provide Bot & API Latency.\n- **description**, **desc**: will provide the description for specified command: refrain from using alias names.\n- **greact**: will grant \`ADD_REACTIONS\` permissions to member/role in all channels under the \`I TALK GENERAL\` and \`I TALK FORTNITE\` categories.\n- **rreact**: will revoke \`ADD_REACTIONS\` permission from member/role in all channels under the \`I TALK GENERAL\` and \`I TALK FORTNITE\` categories.\n- **removeoverride**, **rride**, **roverride**: removes member/role's permission overwrite in all channels under the \`I TALK GENERAL\` and \`I TALK FORTNITE\` categories.\n- **poll**: will run a poll with specified details.\n- **announce**: will create an announcement (embed or plain text) using specified details.\n- **vcmute**, **vcm**: if there is no mentioned member, this will server mute all members in your voice channel.\n- **vcunmute**, **vcun**: if there is no mentioned member, this will unmute all members in your voice channel if server muted.\n- **vcdeafen**, **vcdeaf**: if there is no mentioned member, this will server deafen all members in your voice channel.\n- **vcundeafen**, **vcundeaf**: if there is no mentioned member, this will undeafen all members in your voice channel if server deafened.\n- **vote**, **reactvote**: when provided a message ID, the bot will add Power Chord upvote and downvote reactions on message.\n\n- **accept**, **acceptappeal**, **appealaccept**: will accept the mentioned member's ban appeal [restricted to Appeals Server].\n- **deny**, **denyappeal**, **appealdeny**: will deny & ban the mentioned member's ban appeal [restricted to Appeals Server].`)
            .setColor('ff0000')
            .setFooter(`Page 4 of 9`)
            .setTimestamp();

        const gtbEmbed = new Discord.MessageEmbed()
            .setAuthor(`Power Chord Help Menu`, `https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg`)
            .setTitle(`Guess The Blank Commands`)
            .setDescription(`These list of commands are used to control the **Guess The Blank** minigame that is hosted. These are, obviously, restricted to Moderator use only. **These commands are able to be used anywhere.**\n\n- **gtb-start**, **gtb-startgame**: will start a Guess The Blank game in the channel sent in.\n- **gtb-end**, **gtb-endgame**: will reward players with 3+ points with 'Guess The Blank Champion' role, will reset all points, then show & wipe leaderboard.\n\n- **gtb-addpoints**, **gtb-grantpoints**, **gtb-ap**: will grant the specified amount of points to a mentioned member.\n- **gtb-removepoints**, **gtb-revokepoints**, **gtb-rp**: will revoke a specified amount of points from a mentioned member.\n- **gtb-display**, **gtb-displaycosmetics**: will display all cosmetics (answers, images, question number).\n- **gtb-leaderboard**, **gtb-lb**: will display the current Guess The Blank points leaderboard.\n- **gtb-addcosmetic**, **gtb-cosmetic**: will add the cosmetic using the specified number, image, and answer.`)
            .setFooter(`Page 5 of 9`)
            .setTimestamp();

        const appealEmbed = new Discord.MessageEmbed()
            .setAuthor(`Power Chord Help Menu`, `https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg`)
            .setTitle(`Appeal Commands`)
            .setDescription(`This list of commands are **restricted to the "I Talk Server Appeals"** guild. None of these commands can be used outside of said server, and commands are restricted to their respective channels.\n\n- **appeal**: will allow you to provide an appeal message to appeal for a ban.\n- **accept**, **acceptappeal**, **appealaccept**: will accept the mentioned member's ban appeal [restricted to Appeals Server].\n- **deny**, **denyappeal**, **appealdeny**: will deny & ban the mentioned member's ban appeal [restricted to Appeals Server].`)
            .setColor('ffde96')
            .setFooter(`Page 6 of 9`)
            .setTimestamp();

        const aliasEmbed = new Discord.MessageEmbed()
            .setAuthor(`Power Chord Help Menu`, `https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg`)
            .setTitle(`Command Aliases`)
            .setDescription('These are a list of **command aliases**. Command aliases are different names that are able to be used for the same commands: these are not different commands as they serve the same purpose. Just different names.\nThese were implemented to be able to shorten long command names or make jobs get done easier. A list of them are below.\n\n- **prefix** has `1` other alias: "**setprefix**"\n- **description** has `1` other alias: "**desc**"\n- **vcmute** has `1` other alias: "**vcm**"\n- **vcunmute** has `1` other alias: "**vcun**"\n- **vcdeafen** has `1` other alias: "**vcdeaf**"\n- **vcundeafen** has `1` other alias: "**vcundeaf**"\n- **vote** has `1` other alias: "**reactvote**"\n- **removeoverride** has `2` other aliases: "**roverride** & **rride**"\n\n- **accept** has `2` other aliases: "**acceptappeal** & **appealaccept**"\n- **deny** has `2` other aliases: "**denyappeal** & **appealdeny**"\n\n- **gtb-start** has `1` other alias: "**gtb-startgame**"\n- **gtb-end** has `1` other alias: "**gtb-endgame**"\n- **gtb-addpoints** has `2` other aliases: "**gtb-grantpoints** & **gtb-ap**"\n- **gtb-removepoints** has `2` other aliases: "**gtb-revokepoints** & **gtb-rp**"\n- **gtb-display** has `1` other alias: "**gtb-displaycosmetics**"\n- **gtb-leaderboard** has `1` other alias: "**gtb-lb**"\n- **gtb-addcosmetic** has `1` other alias: "**gtb-cosmetic**"\n\n- **coinflip** has `1` other alias: "**flipcoin**"\n- **love** has `2` other aliases: "**itflove** & **luv**"\n- **rps** has `1` other alias: "**rockpaperscissors"**\n- **suicidehotline** has `1` other alias: "**hotline**"\n- **pfp** has `2` other aliases: "**av** & **avatar**"\n- **socials** has `1` other alias: "**medias**"')
            .setColor('e6810a')
            .setFooter(`Page 7 of 9`)
            .setTimestamp();

        const usageEmbed = new Discord.MessageEmbed()
            .setAuthor(`Power Chord Help Menu`, `https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg`)
            .setTitle(`Command Usages`)
            .setDescription(`This is a list of how to use **every command** you are able to access. If you're still confused on a command's syntax, feel free to contact either creators of this bot (more information: press the ℹ️ reaction).\n\n- **assistance**: +assistance\n- **coinflip**: +coinflip\n- **love**: +love\n- **help**: +help\n- **socials**: +socials\n- **staff**: +staff\n- **hotline**: +hotline\n- **ping**: +ping\n\n- **peaceandlove**: +peaceandlove\n- **no**: +no\n- **jean**: +jean\n\n- **gtb-start**: +gtb-start\n- **gtb-end**: +gtb-end\n- **gtb-display**: +gtb-display\n- **gtb-leaderboard**: +gtb-leaderboard\n- **gtb-addpoints**: +gtb-addpoints <@member> <points>\n- **gtb-removepoints**: +gtb-removepoints <@member> <points>\n- **gtb-addcosmetic**: +gtb-addcosmetic <cosmetic number> <cosmetic name> { ATTACHMENT }\n\n- **description**: +description <command name> [categorized by: \`GENERAL\`, \`MODERATION\`, \`GTB\`, \`PROMPT\`, \`ONE-STEP\`].\n- **pfp**: +pfp (<@member>)\n- **rps**: +rps <@member to duel>\n- **weather**: +weather <location> (e.g. "san francisco")\n\n- **prefix**: +prefix <prefix>\n- **greact**: +greact <@member> / <@role> / <member ID> / <role ID>\n- **rreact**: +rreact <@member> / <@role> / <member ID> / <role ID>\n- **removeoverride**: +removeoverride <@member> / <@role> / <member ID> / <role ID>\n- **poll**: +poll (instructions will be prompted when command run)\n- **vcmute**: +vcmute <@Member> OR +vcmute (will mute everybody in VC)\n- **vcunmute**: +vcunmute <@Member> OR +vcunmute (will unmute everybody in VC)\n- **vcdeafen**: +vcdeafen <@Member> OR +vcdeafen (will mute everybody in VC)\n- **vcundeafen**: +vcundeafen <@Member> OR +vcundeafen (will undeafen everybody in VC)\n- **vote**: +vote <message ID>\n\n- **appeal**: +appeal <ban appeal message> [restricted to Appeals Server]\n- **accept**: +accept <@member> [restricted to Appeals Server]\n- **deny**: +deny <@member> [restricted to Appeals Server]`)
            .setColor('a9a9a9')
            .setFooter(`Page 8 of 9`)
            .setTimestamp();

        const infoEmbed = new Discord.MessageEmbed()
            .setAuthor(`Power Chord Help Menu`, `https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg`)
            .setTitle(`Bot Information`)
            .setDescription(`- Power Chord was created **specifically** for the "I Talk Server" Discord guild.\n- This bot is a collaboration between <@148807073948368896> and <@528759471514845194>, and the original Power Chord bot was created by <@148807073948368896>.\n\n- If a regular member runs a moderator-enforced command, the bot will not respond. Likewise for all commands used incorrectly.\n- All commands will self-destruct after some time, and most bot responses are deleted after a short period of time as well.\n\nIf you have **any** issues, concerns, __or__ feature suggestions, don't hesitate to contact either creators. We'd love to hear it.\n\nThe Power Chord bot has a GitHub Repository, which is what's code is used for the bot to be hosted. You can access the source code [here](https://github.com/Fabletownn/pchordb).\n\n**(Please do not share this GitHub Repository with anybody outside of the Staff Team)**.`)
            .setColor('eb4bc9')
            .setThumbnail('https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg')
            .setFooter(`Page 9 of 9`)
            .setTimestamp();

        message.channel.send(`**[📨]** Slidin' right into your DMs.`).then(m => m.delete({
            timeout: 5000
        }));

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        let administratorR = message.guild.roles.cache.find(role => role.name === "Administrator");

        if (message.member.roles.cache.has(moderatorR.id) || message.member.roles.cache.has(administratorR.id)) {
            message.author.send(`Loading help menu..\n*(If this does not function properly, you may run \`+ahelp\` to get a full list of commands).*`).then(msg => {
                msg.edit(``, {
                    embed: homeEmbed
                });

                msg.react('🏠').then(r => {
                    msg.react('⬛');
                    msg.react('🌍');
                    msg.react('🎲');
                    msg.react('🔨');
                    msg.react('🎮');
                    msg.react('📜');
                    msg.react('🛰️');
                    msg.react('🔧');
                    msg.react('ℹ️');


                    const generalFilter = (reaction, user) => reaction.emoji.name === '🌍' && user.id === message.author.id;
                    const moderationFilter = (reaction, user) => reaction.emoji.name === '🔨' && user.id === message.author.id;
                    const funFilter = (reaction, user) => reaction.emoji.name === '🎲' && user.id === message.author.id;
                    const appealFilter = (reaction, user) => reaction.emoji.name === '📜' && user.id === message.author.id;
                    const gtbFilter = (reaction, user) => reaction.emoji.name === '🎮' && user.id === message.author.id;
                    const homeFilter = (reaction, user) => reaction.emoji.name === '🏠' && user.id === message.author.id;
                    const aliasFilter = (reaction, user) => reaction.emoji.name === '🛰️' && user.id === message.author.id;
                    const usageFilter = (reaction, user) => reaction.emoji.name === '🔧' && user.id === message.author.id;
                    const infoFilter = (reaction, user) => reaction.emoji.name === 'ℹ️' && user.id === message.author.id;

                    const generalReaction = msg.createReactionCollector(generalFilter, {
                        timer: 99999
                    });
                    const modReaction = msg.createReactionCollector(moderationFilter, {
                        timer: 99999
                    });
                    const funReaction = msg.createReactionCollector(funFilter, {
                        timer: 99999
                    });
                    const appealReaction = msg.createReactionCollector(appealFilter, {
                        timer: 99999
                    });
                    const gtbReaction = msg.createReactionCollector(gtbFilter, {
                        timer: 99999
                    });
                    const homeReaction = msg.createReactionCollector(homeFilter, {
                        timer: 99999
                    });
                    const aliasReaction = msg.createReactionCollector(aliasFilter, {
                        timer: 99999
                    });
                    const usageReaction = msg.createReactionCollector(usageFilter, {
                        timer: 99999
                    });
                    const infoReaction = msg.createReactionCollector(infoFilter, {
                        timer: 99999
                    });

                    generalReaction.on('collect', r => {
                        msg.edit({
                            embed: generalEmbed
                        });
                    });

                    modReaction.on('collect', r => {
                        msg.edit({
                            embed: modEmbed
                        });
                    });

                    funReaction.on('collect', r => {
                        msg.edit({
                            embed: funEmbed
                        });
                    });

                    appealReaction.on('collect', r => {
                        msg.edit({
                            embed: appealEmbed
                        });
                    });

                    gtbReaction.on('collect', r => {
                        msg.edit({
                            embed: gtbEmbed
                        });
                    });

                    homeReaction.on('collect', r => {
                        msg.edit({
                            embed: homeEmbedEG
                        });
                    });

                    aliasReaction.on('collect', r => {
                        msg.edit({
                            embed: aliasEmbed
                        });
                    });

                    usageReaction.on('collect', r => {
                        msg.edit({
                            embed: usageEmbed
                        });
                    });

                    infoReaction.on('collect', r => {
                        msg.edit({
                            embed: infoEmbed
                        });
                    });
                });
            });
            return;
        } else {
            const homeEmbed = new Discord.MessageEmbed()
                .setAuthor(`Power Chord Help Menu`, `https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg`)
                .setTitle(`Main Menu`)
                .setDescription(`This help menu includes all commands that you're able to use.\nThese different types of commands are separated into five different categories: **general**, **moderator enforced**, **Guess The Blank**, **fun** and **appeals**.\n\nYou are a staff member, so you have been provided the full list of commands: those who are not part of the staff team will be given a help menu excluding Moderator-restricted commands. 🔨\n<:pcPLACEHOLDER:786598522001817630>`)
                .addField(`🌍 General Commands`, `This will provide a list of commands you're able to use for general use.`)
                .addField(`🎲 Fun Commands`, `This will provide a list of fun commands you can get a kick out of.`)
                .addField(`🛰️ Command Aliases`, `This will provide a list of commands that have different names that are able to be used.`)
                .addField(`🔧 Command Usages`, `This will provide a list of how you're able to use every single command.`)
                .addField(`ℹ️ Bot Information`, `This will provide information on the Power Chord bot.`, true)
                .addField(`🏠 Home Page`, `Brings you back to here.`, true)
                .setColor('eb4bc9')
                .setFooter(`Page 1 of 7`)
                .setTimestamp();

            const homeEmbedEG = new Discord.MessageEmbed()
                .setAuthor(`Power Chord Help Menu`, `https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg`)
                .setTitle(`Main Menu`)
                .setDescription(`This help menu includes all commands that you're able to use.\nThese different types of commands are separated into five different categories: **general**, **moderator enforced**, **Guess The Blank**, **fun** and **appeals**.\n\nYou are a staff member, so you have been provided the full list of commands: those who are not part of the staff team will be given a help menu excluding Moderator-restricted commands. 🔨\n<:pcPLACEHOLDER:786598522001817630>`)
                .addField(`🌍 General Commands`, `This will provide a list of commands you're able to use for general use.`)
                .addField(`🎲 Fun Commands`, `This will provide a list of fun commands you can get a kick out of.`)
                .addField(`📜 Appeal Commands`, `This will provide the command(s) restricted to the I Talk Appeals server, to appeal your ban.`)
                .addField(`🛰️ Command Aliases`, `This will provide a list of commands that have different names that are able to be used.`)
                .addField(`🔧 Command Usages`, `This will provide a list of how you're able to use every single command.`)
                .addField(`ℹ️ Bot Information`, `This will provide information on the Power Chord bot.`, true)
                .addField(`<:pcThanosSnap:786691150173962300> Home Page`, `And where did that bring you? Back to me.`, true)
                .setColor('eb4bc9')
                .setFooter(`Page 1 of 7`)
                .setTimestamp();

            const generalEmbed = new Discord.MessageEmbed()
                .setAuthor(`Power Chord Help Menu`, `https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg`)
                .setTitle(`General Commands`)
                .setDescription(`These list of commands are **restricted** and may only be used in <#615594300108963867>. **The exceptions to this are assistance & hotline, which can be used anywhere in the server.**\nAny and all commands are deleted: this means that running these commands in the incorrect channel will delete & disregard your message.\n\n- **ahelp**: will provide list of commands all at once.\n- **assistance**: call Staff Member assistance **(only use in urgent circumstances)**.\n- **hotline**, **suicidehotline**: Suicide Prevention Hotlines for those in need.\n- **socials**, **medias**: will provide I Talk Fortnite's social media links.\n- **staff**: will showcase the I Talk Server Staff Team!`)
                .setColor('6dff48')
                .setFooter(`Page 2 of 7`)
                .setTimestamp();

            const funEmbed = new Discord.MessageEmbed()
                .setAuthor(`Power Chord Help Menu`, `https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg`)
                .setTitle(`Fun Commands`)
                .setDescription(`Unlike a couple of General Commands, all of the commands listed below are restricted to use in <#615594300108963867>. If you're confused on how to use any of these commands, press on the 🔧 reaction for command usage information.\n\n- **coinflip**, **flipcoin**: will flip a coin, allowing you to provide a bet for each side.\n- **8ball**, **eightball**, **eball**: will give a standard 8Ball prediction to the specified question.\n- **pfp**, **avatar**, **av**: will provide a preview of either your avatar, or a mentioned member's avatar.\n- **trigger**: will make the mentioned member's profile picture triggered.\n- **rps**, **rockpaperscissors**: play Rock Paper Scissors with the mentioned member.\n- **weather**: will showcase the weather for the specified location.\n\n- **peaceandlove**: ☮️ and ❤️!\n- **no**: no\n- **jean**: Jenna go back to modding!`)
                .setColor('056ef7')
                .setFooter(`Page 3 of 7`)
                .setTimestamp();

            const aliasEmbed = new Discord.MessageEmbed()
                .setAuthor(`Power Chord Help Menu`, `https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg`)
                .setTitle(`Command Aliases`)
                .setDescription('These are a list of **command aliases**. Command aliases are different names that are able to be used for the same commands: these are not different commands as they serve the same purpose. Just different names.\nThese were implemented to be able to shorten long command names. A list of them are below.\n\n- **coinflip** has `1` other alias: "**flipcoin**"\n- **love** has `2` other aliases: "**itflove** & **luv**"\n- **rps** has `1` other alias: "**rockpaperscissors"**\n- **suicidehotline** has `1` other alias: "**hotline**"\n- **pfp** has `2` other aliases: "**av** & **avatar**"\n- **socials** has `1` other alias: "**medias**"')
                .setColor('e6810a')
                .setFooter(`Page 5 of 7`)
                .setTimestamp();

            const usageEmbed = new Discord.MessageEmbed()
                .setAuthor(`Power Chord Help Menu`, `https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg`)
                .setTitle(`Command Usages`)
                .setDescription(`This is a list of how to use **every command** you are able to access. If you're still confused on a command's syntax, feel free to contact either creators of this bot (more information: press the ℹ️ reaction).\n\n- **assistance**: +assistance\n- **coinflip**: +coinflip\n- **love**: +love\n- **help**: +help\n- **socials**: +socials\n- **staff**: +staff\n- **hotline**: +hotline\n- **ping**: +ping\n- **pfp**: +pfp (<@member>)\n- **rps**: +rps <@member to duel>\n- **weather**: +weather <location> (e.g. "san francisco")\n\n- **peaceandlove**: +peaceandlove\n- **no**: +no\n- **jean**: +jean`)
                .setColor('a9a9a9')
                .setFooter(`Page 6 of 7`)
                .setTimestamp();

            const infoEmbed = new Discord.MessageEmbed()
                .setAuthor(`Power Chord Help Menu`, `https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg`)
                .setTitle(`Bot Information`)
                .setDescription(`- Power Chord was created **specifically** for the "I Talk Server" Discord guild.\n- This bot is a collaboration between <@148807073948368896> and <@528759471514845194>, and the original Power Chord bot was created by <@148807073948368896>.\n\n- All commands will self-destruct after some time, and most bot responses are deleted after a short period of time as well.\n\nIf you have **any** issues, concerns, __or__ feature suggestions, don't hesitate to contact either creators. We'd love to hear it.`)
                .setColor('eb4bc9')
                .setThumbnail('https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg')
                .setFooter(`Page 7 of 7`)
                .setTimestamp();

            message.author.send(`Loading help menu..\n*(If this does not function properly, you may run \`+ahelp\` to get a full list of commands).*`).then(msg => {
                msg.edit(``, {
                    embed: homeEmbed
                });

                msg.react('🏠').then(r => {
                    msg.react('⬛');
                    msg.react('🌍');
                    msg.react('🎲');
                    msg.react('🛰️');
                    msg.react('🔧');
                    msg.react('ℹ️');


                    const generalFilter = (reaction, user) => reaction.emoji.name === '🌍' && user.id === message.author.id;
                    const funFilter = (reaction, user) => reaction.emoji.name === '🎲' && user.id === message.author.id;
                    const homeFilter = (reaction, user) => reaction.emoji.name === '🏠' && user.id === message.author.id;
                    const aliasFilter = (reaction, user) => reaction.emoji.name === '🛰️' && user.id === message.author.id;
                    const usageFilter = (reaction, user) => reaction.emoji.name === '🔧' && user.id === message.author.id;
                    const infoFilter = (reaction, user) => reaction.emoji.name === 'ℹ️' && user.id === message.author.id;

                    const generalReaction = msg.createReactionCollector(generalFilter, {
                        timer: 99999
                    });
                    const funReaction = msg.createReactionCollector(funFilter, {
                        timer: 99999
                    });
                    const homeReaction = msg.createReactionCollector(homeFilter, {
                        timer: 99999
                    });
                    const aliasReaction = msg.createReactionCollector(aliasFilter, {
                        timer: 99999
                    });
                    const usageReaction = msg.createReactionCollector(usageFilter, {
                        timer: 99999
                    });
                    const infoReaction = msg.createReactionCollector(infoFilter, {
                        timer: 99999
                    });

                    generalReaction.on('collect', r => {
                        msg.edit({
                            embed: generalEmbed
                        });
                    });

                    funReaction.on('collect', r => {
                        msg.edit({
                            embed: funEmbed
                        });
                    });

                    homeReaction.on('collect', r => {
                        msg.edit({
                            embed: homeEmbedEG
                        });
                    });

                    aliasReaction.on('collect', r => {
                        msg.edit({
                            embed: aliasEmbed
                        });
                    });

                    usageReaction.on('collect', r => {
                        msg.edit({
                            embed: usageEmbed
                        });
                    });

                    infoReaction.on('collect', r => {
                        msg.edit({
                            embed: infoEmbed
                        });
                    });
                });
            });
        }
    }
}