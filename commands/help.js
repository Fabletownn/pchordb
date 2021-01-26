const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'help',
    description: '[GENERAL] This will prompt a help message in your DMs with information about commands, their aliases, and how to use them. <[setPrefix]help>',
    execute(message) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;

        const homeEmbed = new Discord.MessageEmbed()
            .setAuthor(`Power Chord Help Menu`, client.user.displayAvatarURL({ dynamic: true }))
            .setTitle(`Main Menu`)
            .setDescription(`This help menu includes all commands that you're able to use.\nThese different types of commands are separated into five different categories: **general**, **moderator enforced**, **Guess The Blank**, **fun** and **appeals**.\n\nYou are a staff member, so you have been provided the full list of commands: those who are not part of the staff team will be given a help menu excluding Moderator-restricted commands. 🔨\n<:pcPLACEHOLDER:786598522001817630>`)
            .addField(`🌍 General Commands`, `This will provide a list of commands you're able to use for general use.`)
            .addField(`🎲 Fun Commands`, `This will provide a list of fun commands you can get a kick out of.`)
            .addField(`🔨 Moderator Enforced Commands`, `This will provide a list of commands restricted to Moderators.`)
            .addField(`🎮 Guess The Blank Commands`, `This will provide a list of commands used to control/host Guess The Blank games.`)
            .addField(`📜 Appeal Commands`, `This will provide a list of commands restricted to the I Talk Appeals server, to appeal a ban.`)
            .addField(`ℹ️ Bot Information`, `This will provide information on the Power Chord bot.`, true)
            .addField(`🏠 Home Page`, `Brings you back to here.`, true)
            .setColor('eb4bc9')
            .setFooter(`Page 1 of 7`)

        const homeEmbedEG = new Discord.MessageEmbed()
            .setAuthor(`Power Chord Help Menu`, client.user.displayAvatarURL({ dynamic: true }))
            .setTitle(`Main Menu`)
            .setDescription(`This help menu includes all commands that you're able to use.\nThese different types of commands are separated into five different categories: **general**, **moderator enforced**, **Guess The Blank**, **fun** and **appeals**.\n\nYou are a staff member, so you have been provided the full list of commands: those who are not part of the staff team will be given a help menu excluding Moderator-restricted commands. 🔨\n<:pcPLACEHOLDER:786598522001817630>`)
            .addField(`🌍 General Commands`, `This will provide a list of commands you're able to use for general use.`)
            .addField(`🎲 Fun Commands`, `This will provide a list of fun commands you can get a kick out of.`)
            .addField(`🔨 Moderator Enforced Commands`, `This will provide a list of commands restricted to Moderators.`)
            .addField(`🎮 Guess The Blank Commands`, `This will provide a list of commands used to control/host Guess The Blank games.`)
            .addField(`📜 Appeal Commands`, `This will provide a list of commands restricted to the I Talk Appeals server, to appeal a ban.`)
            .addField(`ℹ️ Bot Information`, `This will provide information on the Power Chord bot.`, true)
            .addField(`<:pcThanosSnap:786691150173962300> Home Page`, `And where did that bring you? Back to me.`, true)
            .setColor('eb4bc9')
            .setFooter(`Page 1 of 7`)

        const generalEmbed = {
            "title": "🌍 General Commands",
            "description": "All specified commands will only work in the <#615594300108963867> channel.\nExclusions include: `+assistance`, `+hotline`.\n``` ```",
            "color": 2359049,
            "fields": [{
                "name": "`+ahelp`",
                "value": "This will provide a list of all commands at once (6+ embeds)."
            },
            {
                "name": "`+help`",
                "value": "This will provide you this exact command list."
            },
            {
                "name": "`+assistance`",
                "value": "This will call for Staff Member assistance **(only use in urgent situations)**."
            },
            {
                "name": "`+ping`",
                "value": "This will provide the Bot and API Latency."
            },
            {
                "name": "`+hotline`, `+suicidehotline`",
                "value": "This will provide Suicide Prevention Hotlines for those in need."
            },
            {
                "name": "`+userinfo {user}`, `+userinformation {user}`",
                "value": "This will provide the user information of the member mentioned.\nMention a member to get their information, and don't to get yours."
            },
            {
                "name": "`+socials`, `+medias`",
                "value": "This will provide I Talk Fortnite's social media links."
            },
            {
                "name": "`+staff`",
                "value": "This will showcase the I Talk Server's Staff Team."
            }
            ],
            "author": {
                "name": "Power Chord Help Menu",
                "icon_url": "https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg"
            },
            "footer": {
                "text": "Page 2 of 7"
            }
        }

        const funEmbed = {
            "title": "🎲 Fun Commands",
            "description": "All specified commands will only work in the <#615594300108963867> channel.\n```\n \n```",
            "color": 356087,
            "fields": [{
                "name": "`+8ball {question}`, `+eball {question}`",
                "value": "This will give a standard 8Ball prediction to the specified question."
            },
            {
                "name": "`+coinflip`, `+flipcoin`",
                "value": "This will flip a coin and allow you to give the bets for each side."
            },
            {
                "name": "`+connect4 {user}`, `+c4 {user}`",
                "value": "This will allow you to play Connect 4 with another member."
            },
            {
                "name": "`+jumble`, `+jumblewords`, `+jumblegame`",
                "value": "A minigame to unjumble the jumbled word."
            },
            {
                "name": "`+rps {user}`",
                "value": "This will allow you to play Rock Paper Scissors with another member."
            },
            {
                "name": "`+pfp {optional user}`, `+avatar {optional user}`, `+av {optional user}`",
                "value": "This will get the preview of a member's profile picture in an enlarged image format.\nMention a member to get their profile picture, and don't to get yours."
            },
            {
                "name": "`+trigger {user}`, `+triggered {user}`",
                "value": "This will generate a triggered profile picture of the mentioned member.\nMention a user to get their triggered profile picture, and don't to get yours."
            },
            {
                "name": "`+catfact`",
                "value": "Learn a new random cat fact!"
            },
            {
                "name": "`+dogfact`",
                "value": "Learn a new random dog fact!"
            },
            {
                "name": "`+fortnitestats {EPIC Games Account Name} {platform}`",
                "value": "This will provide Fortnite Statistics from the EPIC account's username."
            },
            {
                "name": "`+weather {location}`",
                "value": "This will provide the weather of the specified location."
            },
            {
                "name": "`+itflove`, `+love`, `+luv`",
                "value": "This will add 1 ITF Love to the counter!"
            },
            {
                "name": "`+peaceandlove`",
                "value": "☮️ and ❤️!"
            },
            {
                "name": "`+no`",
                "value": "No."
            },
            {
                "name": "`+jean`",
                "value": "Jenna go back to modding!"
            }
            ],
            "author": {
                "name": "Power Chord Help Menu",
                "icon_url": "https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg"
            },
            "footer": {
                "text": "Page 3 of 7"
            }
        }

        const modEmbed = {
            "title": "🔨 Moderator Enforced Commands",
            "description": "All specified commands will work anywhere in the server.\nThis command menu will not be provided to regular members.\n``` ```",
            "color": 16711680,
            "fields": [{
                "name": "`+prefix {prefix}`, `+setprefix {prefix}`",
                "value": "This will set the prefix for Power Chord (guild specific).\n**This command is restricted to Administrators only**."
            },
            {
                "name": "`+welcome ({clear/show}) {welcome message}`",
                "value": "This will either set up or update the current message used to welcome new members.\nVariables able to be used are as follows:\n- {user}\n- {user.tag}\n- {user.id}\n- {guild.name}\n- {member.count}\nAll messages are sent directly to <#614193679778709517>."
            },
            {
                "name": "`+botpfp {1/2}`, `+botxp {1/2}`",
                "value": "This will change the following:\n- bot's profile picture\n- bot's status\n- bot's role color\n- server icon.\nThe **1** parameter will set the listed items to normal.\nThe **2** parameter will set the listed items to x2 XP (or charged) mode.\n**This command is restricted for Administrator use only**."
            },
            {
                "name": "`+description {command name}`, `+desc {command name}`",
                "value": "This will provide the command description for the specified name.\n**Please refrain from using alias names**."
            },
            {
                "name": "`+help -post`",
                "value": "This will post all member help embeds/menus in chat (General and Fun).\nThe regular `+help` command remains **unchanged**."
            },
            {
                "name": "`+greact {user/role}`",
                "value": "This will grant ADD_REACTIONS permission to specified parameter.\nThis will overwrite in all channels under:\n- I TALK GENERAL\n- I TALK FORTNITE"
            },
            {
                "name": "`+rreact {user/role}`",
                "value": "This will revoke ADD_REACTIONS permission to specified parameter.\nThis will overwrite in all channels under:\n- I TALK GENERAL\n- I TALK FORTNITE"
            },
            {
                "name": "`+rride {user/role}`, `+removeoverride {user/role}`",
                "value": "This will remove all permission overwrites to specified parameter.\nThis will remove overwrites in all channels under:\n- I TALK GENERAL\n- I TALK FORTNITE"
            },
            {
                "name": "`+announce`",
                "value": "This will prompt instructions for announcing messages.\nYou may announce with embeds, plain text, or both given details."
            },
            {
                "name": "`+poll`",
                "value": "This will prompt instructions to create a poll."
            },
            {
                "name": "`+dm`, `+dmuser`",
                "value": "This will prompt instructions to privately message a member.\n**All messages sent are logged**."
            },
            {
                "name": "`+eventstart`",
                "value": "This will do the following **in order**:\n- Open Events Voice Channel for MEE6 Level 30+.\n- Announce a new event.\n- After 15 minutes, open the channel up to MEE6 Level 10+."
            },
            {
                "name": "`+say {channel} {message} ({attachment})`",
                "value": "This will simply make Power Chord say any message, given proper parameters.\nThis command includes attachments, and is easier for simple text instead of '+announce'."
            },
            {
                "name": "`+vote {message ID}`, `+reactvote {message ID}`",
                "value": "This will add Power Chord upvote and downvote emotes under specified message given the message ID."
            },
            {
                "name": "`+edit {channel} {message ID} {edited content}`",
                "value": "This will edit one of Power Chord's messages given the ID."
            },
            {
                "name": "`+pin {channel} {message ID}`, `+pinmessage {channel} {message ID}",
                "value": "This will pin a specific message given the proper parameters.\n**If the message is in a different channel, mention it first**."
            },
            {
                "name": "`+purge {optional channel} {optional user} {amount}`",
                "value": "This will purge an amount of messages given specific parameter(s).\nYou're able to purge a member's messages if they're still in the guild."
            },
            {
                "name": "`+slowmode {channel} {amount}`",
                "value": "This will enable (or disable) slowmode given specific parameters.\nSlowmode will be disabled if given a `0` argument for \"amount.\""
            },
            {
                "name": "`+vcmute {user}`, `vcm {user}`",
                "value": "This will mute a member or a channel given specified parameters.\nMention a member to mute them specifically, and don't to mute the entire voice channel."
            },
            {
                "name": "`+vcunmute {user}`, `+vcun {user}`",
                "value": "This will unmute a member or a channel given specified parameters.\nMention a member to unmute them specifically, and don't to unmute the entire voice channel."
            },
            {
                "name": "`+vcdeafen {user}`, `+vcdeaf {user}`",
                "value": "This will deafen a member or a channel given specified parameters.\nMention a member to deafen them specifically, and don't to deafen the entire voice channel."
            },
            {
                "name": "`+vcundeafen {user}`, `+vcundeaf {user}`",
                "value": "This will undeafen a member or a channel given specified parameters.\nMention a member to undeafen them specifically, and don't to undeafen the entire voice channel."
            },
            {
                "name": "`+vcdisconnect {channel ID}`, `+disconnect {channel ID}`",
                "value": "This will boot everybody out of a voice channel given the ID."
            },
            {
                "name": "`+vcmove {from channel ID} {to channel ID}`",
                "value": "This will move everybody from one voice channel to another.\n**Please provide valid voice channel IDs for both channels**."
            }
            ],
            "author": {
                "name": "Power Chord Help Menu",
                "icon_url": "https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg"
            },
            "footer": {
                "text": "Page 4 of 7"
            }
        }

        const gtbEmbed = {
            "title": "🎮 Guess The Blank Commands",
            "description": "These commands are able to be used anywhere in the server.\nAll specified commands are prefixed with `gtb-` for organization.\n``` ```",
            "color": null,
            "fields": [{
                "name": "`+gtb-start`, `+gtb-startgame`",
                "value": "This will start a Guess The Blank minigame.\nThis minigame will use the provided cosmetics & answers.\n**Do not start a game without providing cosmetics beforehand**."
            },
            {
                "name": "`+gtb-end`, `+gtb-endgame`",
                "value": "This will send the Guess The Blank leaderboard in chat, wipe it, and reward all members with 3+ points the \"Guess The Blank Champion\" role."
            },
            {
                "name": "`+gtb-addpoints {user} {amount}`, `+gtb-ap {user} {amount}`",
                "value": "This will grant the specified amount of points to the mentioned member."
            },
            {
                "name": "`+gtb-removepoints {user} {amount}`, `+gtb-rp {user} {amount}`",
                "value": "This will revoke the specified amount of points from the mentioned member."
            },
            {
                "name": "`+gtb-display`, `+gtb-displaycosmetics`",
                "value": "This will display all current provided cosmetics that will be used to initiate a Guess The Blank game.\nThis will provide the answers to the images, and the question #."
            },
            {
                "name": "`+gtb-leaderboard`, `+gtb-lb`",
                "value": "This will display the current Guess The Blank points leaderboard."
            },
            {
                "name": "`+gtb-addcosmetic {question #} {question answer} {image}`",
                "value": "This will add the cosmetic using specified question number, image, and answer.\n**Answers are not case-sensitive, and will be marked correct if so**."
            }
            ],
            "author": {
                "name": "Power Chord Help Menu",
                "icon_url": "https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg"
            },
            "footer": {
                "text": "Page 5 of 7"
            }
        }

        const appealEmbed = {
            "title": "📜 Appeal Commands",
            "description": "All specified commands will only work in I Talk Server Appeals.\n``` ```",
            "color": 16768662,
            "fields": [{
                "name": "`+appeal {appeal message}`",
                "value": "This will allow a member to provide an appeal message.\nThis will be used for their ban appeal process."
            },
            {
                "name": "`+accept {user}`, `acceptappeal {user}`, `appealaccept {user}`",
                "value": "This will accept the mentioned member's appeal, DM them an invite to the I Talk Server, and kick them from the Appeals guild."
            },
            {
                "name": "`+deny {user}`, `denyappeal {user}`, `appealdeny {user}`",
                "value": "This will deny the mentioned member's appeal, DM them informing of such, and ban them from the Appeals guild."
            }
            ],
            "author": {
                "name": "Power Chord Help Menu",
                "icon_url": "https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg"
            },
            "footer": {
                "text": "Page 6 of 7"
            }
        }

        const infoEmbed = {
            "title": "ℹ️ Bot Information",
            "description": "Power Chord was created specifically for  the I Talk Server.\n``` ```",
            "color": 15420361,
            "fields": [{
                "name": "Creators",
                "value": "This bot is a collaboration between <@148807073948368896> and <@528759471514845194>.\nThe original Power Chord bot was created by <@148807073948368896>."
            },
            {
                "name": "Information",
                "value": "If a regular member runs a Moderator Enforced command, the bot will not respond. Likewise for all incorrectly used commands.\n\nAll commands will self-destruct after some time, and most bot responses are deleted after a short time period as well."
            },
            {
                "name": "Contact & Repository",
                "value": "If you have any issues, concerns, __or__ feature suggestions, do not hesitate to contact either creators. We'd love to hear it.\n\nThe Power Chord bot has a GitHub Repository!\nThe code in the repository is what's used to run the bot on it's host.\n\nYou can access the source code [here](https://github.com/Fabletownn/pchordb).\n**Do not share this link with any member outside of the staff team**."
            }
            ],
            "author": {
                "name": "Power Chord Help Menu",
                "icon_url": "https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg"
            },
            "footer": {
                "text": "Page 7 of 7"
            }
        }

        const generalEmbedPost = {
            "title": "🌍 General Commands",
            "description": "All specified commands will only work in the <#615594300108963867> channel.\nExclusions include: `+assistance`, `+hotline`.\n``` ```",
            "color": 2359049,
            "fields": [{
                "name": "`+ahelp`",
                "value": "This will provide a list of all commands at once (6+ embeds)."
            },
            {
                "name": "`+help`",
                "value": "This will provide you this exact command list."
            },
            {
                "name": "`+assistance`",
                "value": "This will call for Staff Member assistance **(only use in urgent situations)**."
            },
            {
                "name": "`+ping`",
                "value": "This will provide the Bot and API Latency."
            },
            {
                "name": "`+hotline`, `+suicidehotline`",
                "value": "This will provide Suicide Prevention Hotlines for those in need."
            },
            {
                "name": "`+userinfo {user}`, `+userinformation {user}`",
                "value": "This will provide the user information of the member mentioned.\nMention a member to get their information, and don't to get yours."
            },
            {
                "name": "`+socials`, `+medias`",
                "value": "This will provide I Talk Fortnite's social media links."
            },
            {
                "name": "`+staff`",
                "value": "This will showcase the I Talk Server's Staff Team."
            }
            ],
            "author": {
                "name": "Power Chord Help Menu",
                "icon_url": client.user.displayAvatarURL()
            }
        }

        const funEmbedPost = {
            "title": "🎲 Fun Commands",
            "description": "All specified commands will only work in the <#615594300108963867> channel.\n```\n \n```",
            "color": 356087,
            "fields": [{
                "name": "`+8ball {question}`, `+eball {question}`",
                "value": "This will give a standard 8Ball prediction to the specified question."
            },
            {
                "name": "`+coinflip`, `+flipcoin`",
                "value": "This will flip a coin and allow you to give the bets for each side."
            },
            {
                "name": "`+connect4 {user}`, `+c4 {user}`",
                "value": "This will allow you to play Connect 4 with another member."
            },
            {
                "name": "`+jumble`, `+jumblewords`, `+jumblegame`",
                "value": "A minigame to unjumble the jumbled word."
            },
            {
                "name": "`+rps {user}`",
                "value": "This will allow you to play Rock Paper Scissors with another member."
            },
            {
                "name": "`+pfp {optional user}`, `+avatar {optional user}`, `+av {optional user}`",
                "value": "This will get the preview of a member's profile picture in an enlarged image format.\nMention a member to get their profile picture, and don't to get yours."
            },
            {
                "name": "`+trigger {user}`, `+triggered {user}`",
                "value": "This will generate a triggered profile picture of the mentioned member.\nMention a user to get their triggered profile picture, and don't to get yours."
            },
            {
                "name": "`+catfact`",
                "value": "Learn a new random cat fact!"
            },
            {
                "name": "`+dogfact`",
                "value": "Learn a new random dog fact!"
            },
            {
                "name": "`+fortnitestats {EPIC Games Account Name} {platform}`",
                "value": "This will provide Fortnite Statistics from the EPIC account's username."
            },
            {
                "name": "`+weather {location}`",
                "value": "This will provide the weather of the specified location."
            },
            {
                "name": "`+itflove`, `+love`, `+luv`",
                "value": "This will add 1 ITF Love to the counter!"
            },
            {
                "name": "`+peaceandlove`",
                "value": "☮️ and ❤️!"
            },
            {
                "name": "`+no`",
                "value": "No."
            },
            {
                "name": "`+jean`",
                "value": "Jenna go back to modding!"
            }
            ],
            "author": {
                "name": "Power Chord Help Menu",
                "icon_url": client.user.displayAvatarURL()
            }
        }

        if (message.content.includes(`-post`)) {
            if (!message.member.roles.cache.has(moderatorR.id)) return;

            message.channel.send({
                embed: generalEmbedPost
            });
            message.channel.send({
                embed: funEmbedPost
            });

            return;
        }

        message.channel.send(`**[📨]** Slidin' right into your DMs.\nIf no DM is sent, ensure "allow direct messages from server members" are on in your Privacy Settings.`).then(m => m.delete({
            timeout: 5000
        }));

        let administratorR = message.guild.roles.cache.find(role => role.name === "Administrator");

        if (message.member.roles.cache.has(moderatorR.id) || message.member.roles.cache.has(administratorR.id)) {
            message.author.send(`Loading help menu..\n*(If this does not function properly, please try again later or contact a staff member).*`).then(msg => {
                msg.edit(``, {
                    embed: homeEmbed
                });

                msg.react('🏠').then(r => {
                    msg.react(`<:pcPLACEHOLDER:786598522001817630>`);
                    msg.react('🌍');
                    msg.react('🎲');
                    msg.react('🔨');
                    msg.react('🎮');
                    msg.react('📜');
                    msg.react('ℹ️');


                    const generalFilter = (reaction, user) => reaction.emoji.name === '🌍' && user.id === message.author.id;
                    const moderationFilter = (reaction, user) => reaction.emoji.name === '🔨' && user.id === message.author.id;
                    const funFilter = (reaction, user) => reaction.emoji.name === '🎲' && user.id === message.author.id;
                    const appealFilter = (reaction, user) => reaction.emoji.name === '📜' && user.id === message.author.id;
                    const gtbFilter = (reaction, user) => reaction.emoji.name === '🎮' && user.id === message.author.id;
                    const homeFilter = (reaction, user) => reaction.emoji.name === '🏠' && user.id === message.author.id;
                    const infoFilter = (reaction, user) => reaction.emoji.name === 'ℹ️' && user.id === message.author.id;

                    const generalReaction = msg.createReactionCollector(generalFilter, {
                        time: 600000
                    });
                    const modReaction = msg.createReactionCollector(moderationFilter, {
                        time: 600000
                    });
                    const funReaction = msg.createReactionCollector(funFilter, {
                        time: 600000
                    });
                    const appealReaction = msg.createReactionCollector(appealFilter, {
                        time: 600000
                    });
                    const gtbReaction = msg.createReactionCollector(gtbFilter, {
                        time: 600000
                    });
                    const homeReaction = msg.createReactionCollector(homeFilter, {
                        time: 600000
                    });
                    const infoReaction = msg.createReactionCollector(infoFilter, {
                        time: 600000
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
                .setAuthor(`Power Chord Help Menu`, client.user.displayAvatarURL({ dynamic: true }))
                .setTitle(`Main Menu`)
                .setDescription(`This help menu includes all commands that you're able to use.\nThese different types of commands are separated into two different categories: **general** and **fun**. The command's aliases and how to use them are included as well.`)
                .addField(`🌍 General Commands`, `This will provide a list of commands you're able to use for general use.`)
                .addField(`🎲 Fun Commands`, `This will provide a list of fun commands you can get a kick out of.`)
                .addField(`ℹ️ Bot Information`, `This will provide information on the Power Chord bot.`, true)
                .addField(`🏠 Home Page`, `Brings you back to here.`, true)
                .setColor('eb4bc9')
                .setFooter(`Page 1 of 4`)

            const homeEmbedEG = new Discord.MessageEmbed()
                .setAuthor(`Power Chord Help Menu`, client.user.displayAvatarURL({ dynamic: true }))
                .setTitle(`Main Menu`)
                .setDescription(`This help menu includes all commands that you're able to use.\nThese different types of commands are separated into two different categories: **general** and **fun**. The command's aliases and how to use them are included as well.`)
                .addField(`🌍 General Commands`, `This will provide a list of commands you're able to use for general use.`)
                .addField(`🎲 Fun Commands`, `This will provide a list of fun commands you can get a kick out of.`)
                .addField(`ℹ️ Bot Information`, `This will provide information on the Power Chord bot.`, true)
                .addField(`<:pcThanosSnap:786691150173962300> Home Page`, `And where did that bring you? Back to me.`, true)
                .setColor('eb4bc9')
                .setFooter(`Page 1 of 4`)

            const generalEmbed = {
                "title": "🌍 General Commands",
                "description": "All specified commands will only work in the <#615594300108963867> channel.\nExclusions include: `+assistance`, `+hotline`.\n``` ```",
                "color": 2359049,
                "fields": [{
                    "name": "`+ahelp`",
                    "value": "This will provide a list of all commands at once (6+ embeds)."
                },
                {
                    "name": "`+help`",
                    "value": "This will provide you this exact command list."
                },
                {
                    "name": "`+assistance`",
                    "value": "This will call for Staff Member assistance **(only use in urgent situations)**."
                },
                {
                    "name": "`+ping`",
                    "value": "This will provide the Bot and API Latency."
                },
                {
                    "name": "`+hotline`, `+suicidehotline`",
                    "value": "This will provide Suicide Prevention Hotlines for those in need."
                },
                {
                    "name": "`+userinfo {user}`, `+userinformation {user}`",
                    "value": "This will provide the user information of the member mentioned.\nMention a member to get their information, and don't to get yours."
                },
                {
                    "name": "`+socials`, `+medias`",
                    "value": "This will provide I Talk Fortnite's social media links."
                },
                {
                    "name": "`+staff`",
                    "value": "This will showcase the I Talk Server's Staff Team."
                },
                {
                    "name": "`+appeal {appeal message}`",
                    "value": "This will allow you to appeal for a ban.\n**This command is restricted to the I Talk Server Appeals** server."
                }
                ],
                "author": {
                    "name": "Power Chord Help Menu",
                    "icon_url": "https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg"
                },
                "footer": {
                    "text": "Page 2 of 4"
                }
            }

            const funEmbed = {
                "title": "🎲 Fun Commands",
                "description": "All specified commands will only work in the <#615594300108963867> channel.\n```\n \n```",
                "color": 356087,
                "fields": [{
                    "name": "`+8ball {question}`, `+eball {question}`",
                    "value": "This will give a standard 8Ball prediction to the specified question."
                },
                {
                    "name": "`+coinflip`, `+flipcoin`",
                    "value": "This will flip a coin and allow you to give the bets for each side."
                },
                {
                    "name": "`+connect4 {user}`, `+c4 {user}`",
                    "value": "This will allow you to play Connect 4 with another member."
                },
                {
                    "name": "`+jumble`, `+jumblewords`, `+jumblegame`",
                    "value": "A minigame to unjumble the jumbled word."
                },
                {
                    "name": "`+rps {user}`",
                    "value": "This will allow you to play Rock Paper Scissors with another member."
                },
                {
                    "name": "`+pfp {optional user}`, `+avatar {optional user}`, `+av {optional user}`",
                    "value": "This will get the preview of a member's profile picture in an enlarged image format.\nMention a member to get their profile picture, and don't to get yours."
                },
                {
                    "name": "`+trigger {user}`, `+triggered {user}`",
                    "value": "This will generate a triggered profile picture of the mentioned member.\nMention a user to get their triggered profile picture, and don't to get yours."
                },
                {
                    "name": "`+catfact`",
                    "value": "Learn a new random cat fact!"
                },
                {
                    "name": "`+dogfact`",
                    "value": "Learn a new random dog fact!"
                },
                {
                    "name": "`+fortnitestats {EPIC Games Account Name} {platform}`",
                    "value": "This will provide Fortnite Statistics from the EPIC account's username."
                },
                {
                    "name": "`+weather {location}`",
                    "value": "This will provide the weather of the specified location."
                },
                {
                    "name": "`+itflove`, `+love`, `+luv`",
                    "value": "This will add 1 ITF Love to the counter!"
                },
                {
                    "name": "`+peaceandlove`",
                    "value": "☮️ and ❤️!"
                },
                {
                    "name": "`+no`",
                    "value": "No."
                },
                {
                    "name": "`+jean`",
                    "value": "Jenna go back to modding!"
                }
                ],
                "author": {
                    "name": "Power Chord Help Menu",
                    "icon_url": "https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg"
                },
                "footer": {
                    "text": "Page 3 of 4"
                }
            }

            const infoEmbed = {
                "title": "ℹ️ Bot Information",
                "description": "Power Chord was created specifically for  the I Talk Server.\n``` ```",
                "color": 15420361,
                "fields": [{
                    "name": "Creators",
                    "value": "This bot is a collaboration between <@148807073948368896> and <@528759471514845194>.\nThe original Power Chord bot was created by <@148807073948368896>."
                },
                {
                    "name": "Information",
                    "value": "All commands will self-destruct after some time, and most bot responses are deleted after a short time period."
                },
                {
                    "name": "Contact",
                    "value": "If you have any issues, concerns, __or__ feature suggestions, do not hesitate to contact either creators. We'd love to hear it.\n\nIf you'd like to invite anybody to I Talk Server, the invite URL is below (vanity).\nhttps://discord.gg/italkfortnite."
                }
                ],
                "author": {
                    "name": "Power Chord Help Menu",
                    "icon_url": "https://cdn.discordapp.com/attachments/778258285689569340/778298324146847764/ServerIcon.jpeg"
                },
                "footer": {
                    "text": "Page 4 of 4"
                }
            };

            message.author.send(`Loading help menu..\n*(If this does not function properly, please try again later or contact a staff member).*`).then(msg => {
                msg.edit(``, {
                    embed: homeEmbed
                });

                msg.react('🏠').then(r => {
                    msg.react(`<:pcPLACEHOLDER:786598522001817630>`);
                    msg.react('🌍');
                    msg.react('🎲');
                    msg.react('ℹ️');


                    const generalFilter = (reaction, user) => reaction.emoji.name === '🌍' && user.id === message.author.id;
                    const funFilter = (reaction, user) => reaction.emoji.name === '🎲' && user.id === message.author.id;
                    const homeFilter = (reaction, user) => reaction.emoji.name === '🏠' && user.id === message.author.id;
                    const infoFilter = (reaction, user) => reaction.emoji.name === 'ℹ️' && user.id === message.author.id;

                    const generalReaction = msg.createReactionCollector(generalFilter, {
                        time: 600000
                    });
                    const funReaction = msg.createReactionCollector(funFilter, {
                        time: 600000
                    });
                    const homeReaction = msg.createReactionCollector(homeFilter, {
                        time: 600000
                    });
                    const infoReaction = msg.createReactionCollector(infoFilter, {
                        time: 600000
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