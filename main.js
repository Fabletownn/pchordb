const Discord = require('discord.js');
const client = new Discord.Client();

const mongoose = require('mongoose');

const PRE = require('./models/prefix.js');
const fs = require("fs");

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
    var result = `${client.user.username} is up n' running.`;
    response.send(result);
}).listen(app.get('port'), function() {
    console.log("Application is attempting to run.. server is listening on PORT:", app.get('port'));
});

mongoose.connect(process.env.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    client.user.setActivity(`MERRY CHRISTMAS!`, {
        type: 'PLAYING'
    });

    console.log(`[${new Date().toLocaleTimeString()}] ${client.user.username} is successfully up and running: in ${client.guilds.cache.size} guilds.\n`);
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.guild === null) return;
    if (oldMessage.guild.id !== "614193406838571085") return;

    if (oldMessage.author.bot) return;
    if (oldMessage.content === newMessage.content) return;

    const editEmbed = new Discord.MessageEmbed()
        .addField(`User`, `${newMessage.author}`, true)
        .addField(`Channel`, `${newMessage.channel}`, true)
        .addField(`Before Edit`, `${oldMessage.content.substr(0, 1024)}`)
        .addField(`After Edit`, `${newMessage.content.substr(0, 1024)}`)
        .setColor('3ba2d4')
        .setFooter(`User ID: ${newMessage.author.id}`)
        .setAuthor(`Message Edited | ${newMessage.author.tag}`, newMessage.author.displayAvatarURL({
            dynamic: true
        }))
        .setTimestamp()

    client.channels.cache.get("690601497767182436").send({
        embed: editEmbed
    });
});

client.on("messageDelete", (deletedMessage) => {
    if (deletedMessage.guild === null) return;
    if (deletedMessage.guild.id !== "614193406838571085") return;

    if (deletedMessage.author.bot) return;

    if (deletedMessage.attachments.size > 0) {
        deletedMessage.attachments.forEach(attachmentsSent => {
            const deleteAttachmentEmbed = new Discord.MessageEmbed()
                .addField(`User`, `${deletedMessage.author}`, true)
                .addField(`Channel`, `${deletedMessage.channel}`, true)
                .addField(`Deleted Message`, `${deletedMessage.content.substr(0, 1024) || `There was no content fetched.\n[This was an attachment, which is now inaccessible](${attachmentsSent.url}).`}`)
                .setColor('ff0000')
                .setImage(`${attachmentsSent.url}`)
                .setFooter(`User ID: ${deletedMessage.author.id}`)
                .setAuthor(`Message Deleted | ${deletedMessage.author.tag}`, deletedMessage.author.displayAvatarURL({
                    dynamic: true
                }))
                .setTimestamp()

            return client.channels.cache.get("690601497767182436").send({
                embed: deleteAttachmentEmbed
            });
        });
        return;
    }

    const deleteEmbed = new Discord.MessageEmbed()
        .addField(`User`, `${deletedMessage.author}`, true)
        .addField(`Channel`, `${deletedMessage.channel}`, true)
        .addField(`Deleted Message`, `${deletedMessage.content.substr(0, 1024) || `There was no content fetched.`}`)
        .setColor('ff0000')
        .setFooter(`User ID: ${deletedMessage.author.id}`)
        .setAuthor(`Message Deleted | ${deletedMessage.author.tag}`, deletedMessage.author.displayAvatarURL({
            dynamic: true
        }))
        .setTimestamp()

    client.channels.cache.get("690601497767182436").send({
        embed: deleteEmbed
    });
});

client.on('message', message => {
    if (message.guild === null) return;

    PRE.findOne({
        guildID: message.guild.id,
    }, (err, data) => {
        if (err) return console.log(err);
        let commandPrefix;

        if (data) {
            commandPrefix = data.botPrefix;
        } else {
            commandPrefix = ">";
        }

        if (!message.content.startsWith(commandPrefix) || message.author.bot) return;

        let moderatorR = message.guild.roles.cache.find(r => r.name === "Moderator");

        if (message.guild.id === "614193406838571085") {
            if (!message.member.roles.cache.has(moderatorR.id) && message.author.id !== "528759471514845194") return;
        }

        const args = message.content.slice(commandPrefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'assistance') {
            client.commands.get('assistance').execute(message, args);
        } else if (command === 'vote' || command === 'reactvote') {
            client.commands.get('vote').execute(message, args);
        } else if (command === 'poll') {
            client.commands.get('poll').execute(message, args);
        } else if (command === 'hotline' || command === 'suicidehotline') {
            client.commands.get('hotline').execute(message, args);
        } else if (command === 'coinflip' || command === 'flipcoin') {
            client.commands.get('coinflip').execute(message, args);
        } else if (command === 'pfp' || command === 'av' || command === 'avatar') {
            client.commands.get('pfp').execute(message, args);
        } else if (command === 'socials' || command === 'medias') {
            client.commands.get('socials').execute(message, args);
        } else if (command === 'staff') {
            client.commands.get('staff').execute(message, args);
        } else if (command === 'rps' || command === 'rockpaperscissors') {
            client.commands.get('rps').execute(message, args);
        } else if (command === 'jean') {
            client.commands.get('jean').execute(message, args);
        } else if (command === 'peaceandlove') {
            client.commands.get('peaceandlove').execute(message, args);
        } else if (command === 'no') {
            client.commands.get('no').execute(message, args);
        } else if (command === 'weather') {
            client.commands.get('weather').execute(message, args);
        } else if (command === 'greact') {
            client.commands.get('greact').execute(message, args);
        } else if (command === 'rreact') {
            client.commands.get('rreact').execute(message, args);
        } else if (command === 'vcmute' || command === 'vcm') {
            client.commands.get('vcmute').execute(message, args);
        } else if (command === 'vcunmute' || command === 'vcun') {
            client.commands.get('vcunmute').execute(message, args);
        } else if (command === 'vcdeafen' || command === 'vcdeaf') {
            client.commands.get('vcdeafen').execute(message, args);
        } else if (command === 'vcundeafen' || command === 'vcundeaf') {
            client.commands.get('vcundeafen').execute(message, args);
        } else if (command === 'announce') {
            client.commands.get('announce').execute(message, args);
        } else if (command === 'ahelp') {
            client.commands.get('ahelp').execute(message, args);
        } else if (command === 'ping') {
            client.commands.get('ping').execute(message, args);
        } else if (command === 'prefix' || command === 'setprefix') {
            client.commands.get('prefix').execute(message, args);
        } else if (command === 'removeoverride' || command === 'rride' || command === 'roverride') {
            client.commands.get('removeoverride').execute(message, args);
        } else if (command === 'description' || command === 'desc') {
            client.commands.get('description').execute(message, args);
        } else if (command === 'appeal') {
            client.commands.get('appeal').execute(message, args);
        } else if (command === 'accept' || command === 'acceptappeal' || command === 'appealaccept') {
            client.commands.get('accept').execute(message, args);
        } else if (command === 'deny' || command === 'denyappeal' || command === 'appealdeny') {
            client.commands.get('deny').execute(message, args);
        } else if (command === 'love' || command === 'itflove' || command === 'luv') {
            client.commands.get('love').execute(message, args);
        } else if (command === '8ball' || command === 'eball' || command === 'eightball') {
            client.commands.get('8ball').execute(message, args);
        } else if (command === 'roleinfo') {
            client.commands.get('roleinfo').execute(message, args);
        } else if (command === 'serverinfo') {
            client.commands.get('serverinfo').execute(message, args);
        } else if (command === 'colorlock') {
            client.commands.get('colorlock').execute(message, args);
        } else if (command === 'trigger' || command === 'triggered') {
            client.commands.get('trigger').execute(message, args);
        } else if (command === 'gtb-addpoints' || command === 'gtb-grantpoints' || command === 'gtb-ap') {
            client.commands.get('gtb-addpoints').execute(message, args);
        } else if (command === 'gtb-removepoints' || command === 'gtb-revokepoints' || command === 'gtb-rp') {
            client.commands.get('gtb-removepoints').execute(message, args);
        } else if (command === 'gtb-display' || command === 'gtb-displaycosmetics') {
            client.commands.get('gtb-display').execute(message, args);
        } else if (command === 'gtb-leaderboard' || command === 'gtb-lb') {
            client.commands.get('gtb-leaderboard').execute(message, args);
        } else if (command === 'gtb-addcosmetic' || command === 'gtb-cosmetic') {
            client.commands.get('gtb-addcosmetic').execute(message, args);
        } else if (command === 'gtb-start' || command === 'gtb-startgame') {
            client.commands.get('gtb-start').execute(message, args);
        } else if (command === 'gtb-end' || command === 'gtb-endgame') {
            client.commands.get('gtb-end').execute(message, args);
        } else if (command === 'help') {
            client.commands.get('help').execute(message, args);
        } else if (command === 'eventstart' || command === 'startevent' || command === 'estart') {
            client.commands.get('eventstart').execute(message, args);
        } else if (command === 'slowmode') {
            client.commands.get('slowmode').execute(message, args);
        } else if (command === 'purge') {
            client.commands.get('purge').execute(message, args);
        } else if (command === 'connect4' || command === 'c4' || command === 'connectfour') {
            client.commands.get('connect4').execute(message, args);
        } else if (command === 'catfact') {
            client.commands.get('catfact').execute(message, args);
        } else if (command === 'dogfact') {
            client.commands.get('dogfact').execute(message, args);
        } else if (command === 'fortnite' || command === 'fortnitestats') {
            client.commands.get('fortnite').execute(message, args);
        } else if (command === 'userinfo' || command === 'userinformation') {
            client.commands.get('userinfo').execute(message, args);
        } else if (command === 'jumble' || command === 'jumblewords') {
            client.commands.get('jumble').execute(message, args);
        } else if (command === 'edit') {
            client.commands.get('edit').execute(message, args);
        } else if (command === 'vcdisconnect' || command === 'vckick' || command === 'disconnect' || command === 'vcdc') {
            client.commands.get('vcdisconnect').execute(message, args);
        } else if (command === 'vcmove' || command === 'movevc') {
            client.commands.get('movevc').execute(message, args);
        } else if (command === 'pin' || command === 'pinmessage') {
            client.commands.get('pin').execute(message, args);
        }
    });
});

client.on('message', message => {
    if (message.guild === null) return;
    if (message.type === "PINS_ADD" && message.author.bot) return message.delete();

    if (message.content) {
        if (message.author.bot) return;
        if (message.channel.id !== "738819371069079622") return;
        if (message.content.toLowerCase() === "s:") return;
        if (!message.content.toLowerCase().startsWith("s:")) return;

        message.react(message.guild.emojis.cache.get("778318625328332810")).then(message.react(message.guild.emojis.cache.get("778318624552779776"))).then(() => {
            message.pin();
        });
    }
});

client.on('message', message => {
    if (message.channel.type !== "dm") return;

    if (message.content.startsWith(`+blacklist`) || message.content.startsWith(`+blocklist`)) {
        const blacklistEmbed = new Discord.MessageEmbed()
            .setTitle(`Blacklisted Words`)
            .setDescription(`**${message.author.username}**, the following words are banned in the I Talk Server.\n\`\`\`\nnigga, nigger, nibba, nibber, fag, f4g, retard, coon, cunt, nazi, penis, vagina, porn, blowjob, handjob, nude, rule34, r34, stripper, bangbro, brazzer, faketaxi, hentai, naughtyamerica, realityking, xvideo milf, anal, cum\n\`\`\`\n- Sending a message which contains any of these words will be auto-deleted by the Auto-Moderation.\n- Attempting to bypass this auto-moderation filter may lead to a punishment being handed out.`)
            .setColor('23FF09')

        message.author.send({
            embed: blacklistEmbed
        }).then(message => message.pin());
    }
});

client.on('message', message => {
    if (message.content.startsWith(`+help -post`)) {
        
        let moderatorR = message.guild.roles.cache.find(r => r.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '789937524763000832') return;

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
                    "name": "`+description {command name}`, `+desc {command name}`",
                    "value": "This will provide the command description for the specified name.\n**Please refrain from using alias names**."
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
                    "name": "`+rride ${user/role}`, `${removeoverride {user/role}`",
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
                    "name": "`+eventstart`",
                    "value": "This will do the following **in order**:\n- Open Events Voice Channel for MEE6 Level 30+.\n- Announce a new event.\n- After 15 minutes, open the channel up to MEE6 Level 10+."
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
        }

        return message.channel.send({
            embed: generalEmbed
        }).then(() => {
            message.channel.send({
                embed: funEmbed
            });
            message.channel.send({
                embed: modEmbed
            });
            message.channel.send({
                embed: gtbEmbed
            });
            message.channel.send({
                embed: appealEmbed
            });
            message.channel.send({
                embed: infoEmbed
            });
        });
    }
});

client.on('message', message => {
    if (message.channel.id === "685885174025814049" && !message.content.startsWith(`+appeal `)) return message.delete();
});

client.login(process.env.token);