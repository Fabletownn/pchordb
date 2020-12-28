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

let messageStored1 = [];
let messageStored2 = [];
let messageStored3 = [];
let messageStored4 = [];
let messageStored5 = [];

let i = 0;

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    client.user.setActivity(`with ${client.guilds.cache.get('614193406838571085').members.cache.filter(member => !member.user.bot).size.toLocaleString()} members.`, {
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
        .addField(`Before Edit`, `${oldMessage.content.substr(0, 1024) || `No content fetched. This was one of the following:\n- an attachment, which is now inaccessible.\n- a Spotify Invite.`}`)
        .addField(`After Edit`, `${newMessage.content.substr(0, 1024) || `No content fetched. This was one of the following:\n- an attachment, which is now inaccessible.\n- a Spotify Invite.`}`)
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
                .addField(`Deleted Message`, `${deletedMessage.content.substr(0, 1024) || `No content fetched. This was one of the following:\n- an attachment, which is now inaccessible.\n- a Spotify Invite.`}`)
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
        .addField(`Deleted Message`, `${deletedMessage.content.substr(0, 1024) || `No content fetched. This was one of the following:\n- an attachment, which is now inaccessible.\n- a Spotify Invite.`}`)
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
        } else if (command === 'rules') {
            client.commands.get('rules').execute(message, args);
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

    if (message.content.startsWith(`+punishmentlist`) || message.content.startsWith(`+punishlist`)) {
        const punishEmbed = new Discord.MessageEmbed()
            .setTitle(`Punishment List`)
            .setDescription(`**__Minor Toxicity__**: 30m Mute\n**__Toxicity__**: 2h Mute\n**__Bigotry/Racism/Sexism/Homophobia or any other form of Hate Speech__**: Ban\n**__Religious/Political Discussions; Discussion on Sensitive Topics__**: 1h Mute\n\n\n**__Spam/Copypasta; Ghost/Spam Pinging; Spamming Bot Commands__**: 30m Mute\n**__Emoji Spam__**: 15m Mute\n__**Not using channels for their intended purpose (e.g. sharing memes in <#614563325556162572>)**__: 10m Mute\n**__Using Bot Commands in channels other than where intended__**: 10m Mute\n\n**__Nonsense Trolling__**: 90m Mute\n**__Self Promotion__**: 90m Mute\n\n**__Bypassing Punishments (Leaving and Rejoining, using Alts)__**: Ban (both main and alt)\n**__Bypassing/Attempt to Bypass Auto-Moderation__**: 30m Mute\n\n**__Doxx/DDoS Threats/Actions__**: Ban\n**__Sharing Malicious/Phishing Links__**: Ban\n\n__**Skipping Songs for no Reason**__: 30m Mute\n**__Requesting Spam/Troll Songs, or songs long in duration to clog VC__**: 15m Mute\n\n__**Accidental Fortnite Customs Griefing**__: Warn + Suspension from 1 Game\n__**Intentional Fortnite Customs Griefing**__: 3h Mute + 1 Week Suspension from Fortnite Customs\n\n**__Multiple Auto-Moderator Protocols in a Short Duration__**: 30m Mute\n**__Not Listening to Staff Member (e.g. continuing to argue when asked to stop__**: 30m Mute\n**__Impersonation of a Member__**: Strike.\n**__Inappropriate content in PFP/Nickname etc.__**: Strike.\n\n**__Mini-Moderation__**: 30m Mute\n**__Asking for Punishments__**: 30m Mute\n\`\`\` \`\`\`\n1) Multiple punishments can add up. For example: 30m Mute + 90m Mute = 2h Mute\n\n2) This is not 100% required to be followed. A Moderator can hand out a stricter/lenient punishment for an offense if the Moderator feels that it is more appropriate.\n\n3) An offense repeated multiple times can be a stricter punishment every time.\n\n4) It's impossible to list everything in one list. Any action which a Moderator deems unacceptable, even if not listed above, can result in a punishment.`)
            .setColor('23FF09')

        message.author.send({
            embed: punishEmbed
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
    if (message.guild === null) return;
    if (message.channel.id !== "778502488844140574") return;

    if (message.author.bot) return;

    /*

    Auto Moderation:
    Guild Invite Prevention

    */

    let messageContentTBS = message.content;
    let messageContentTB = messageContentTBS.replace(`discord.gg/italkfortnite`, ``);
    let messageContentT2 = messageContentTB.replace(/[`,*]/g, "");

    let messageArray2 = messageContentT2.split(" ");
    const messageInvIndex2 = messageArray2.findIndex(detection => detection.includes("discord.gg/"));

    let messageContentT = messageContentTBS.replace(/[0-9`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?~\s]/g, "");
    let messageContentW = messageContentT.replace(`discordgg/italkfortnite`, "");
    let messageContent = messageContentW.replace(`https//`, "");

    let messageArray = messageContentTB.split(" ");
    const messageInvIndex = messageArray.findIndex(detection => detection.includes("discordgg/"));

    if (messageContent.toLowerCase().includes(`discordgg/`)) {
        if (message.channel.id !== "778502488844140574") return;

        const inviteLogEmbed = new Discord.MessageEmbed()
            .setAuthor(`Sharing Server Invites | ${message.author.tag}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .addField(`User`, message.author, true)
            .addField(`Channel`, message.channel, true)
            .addField(`Message`, message.content.substr(0, 1024))
            .addField(`Invite Detected`, `${messageArray[messageInvIndex] || messageArray2[messageInvIndex2] || "Failed to fetch detection."}`)
            .setFooter(`User ID: ${message.author.id}`)
            .setColor(`ff0000`)

        const DMEmbed = new Discord.MessageEmbed()
            .setAuthor(`Message Removed`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .addField(`Channel`, message.channel)
            .addField(`Message`, message.content)
            .setFooter(`If you think this is a mistake, please contact ModMail.`)
            .setColor(`eb4bc9`)
            .setTimestamp()

        message.delete();

        client.channels.cache.get(`793119554259255296`).send({
            embed: inviteLogEmbed
        }).then(message.author.send(`**${message.author.username}**, you aren't allowed to share server invites in the I Talk Server.`, {
            embed: DMEmbed
        }));
    }

    /*

    Auto Moderation:
    Link Prevention

    */

    const urlRegexArray = [/[a-zA-Z]\.com\//g, /[a-zA-Z]\.net\//g, /[a-zA-Z]\.org\//g, /(((https?:\/\/)|(www\.))[^\s]+)/g, /youtu\.be\/[a-zA-Z0-9]/g, /twitch\.tv\//g];

    let messageArray3 = message.content.split(" ");
    const messageLinkIndex = messageArray3.findIndex(detection => detection.includes(".com"));
    const messageLinkIndex2 = messageArray3.findIndex(detection => detection.includes(".net"));
    const messageLinkIndex3 = messageArray3.findIndex(detection => detection.includes(".org"));
    const messageLinkIndex4 = messageArray3.findIndex(detection => detection.includes("youtu.be"));
    const messageLinkIndex5 = messageArray3.findIndex(detection => detection.includes("twitch.tv"));

    if (message.channel.id !== "778502488844140574") return;

    if (urlRegexArray.some(detection => message.content.match(detection))) {
        if (message.channel.id !== "778502488844140574") return;

        const linkLogEmbed = new Discord.MessageEmbed()
            .setAuthor(`Sharing Links | ${message.author.tag}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .addField(`User`, message.author, true)
            .addField(`Channel`, message.channel, true)
            .addField(`Message`, message.content.substr(0, 1024))
            .addField(`Link Detected`, `${messageArray3[messageLinkIndex] || messageArray3[messageLinkIndex2] || messageArray3[messageLinkIndex3] || messageArray3[messageLinkIndex4] || messageArray3[messageLinkIndex5] || "Failed to fetch detection."}`)
            .setFooter(`User ID: ${message.author.id}`)
            .setColor(`ff0000`)

        const DMEmbed = new Discord.MessageEmbed()
            .setAuthor(`Message Removed`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .addField(`Channel`, message.channel)
            .addField(`Message`, message.content)
            .setFooter(`If you think this is a mistake, please contact ModMail.`)
            .setColor(`eb4bc9`)
            .setTimestamp()

        message.delete();

        client.channels.cache.get(`793119554259255296`).send({
            embed: linkLogEmbed
        }).then(message.author.send(`**${message.author.username}**, you aren't allowed to share links in the I Talk Server.`, {
            embed: DMEmbed
        }));
    }

    /*

    Auto Moderation
    Blacklisted Words

    */

    const wildcardWords = ["nigga", "nigger", "nibba", "nibber", "fag", "f4g", "retard", "coon", "cunt", "nazi", "penis", "vagina", "sex", "porn", "blowjob", "handjob", "nude", "rule34", "r34", "stripper", "bangbro", "brazzer", "faketaxi", "hentai", "naughtyamerica", "onlyfan", "realityking", "xvideo", "milf", "anal", "cum"];
    const exactWords = [/anal[a-zA-Z]/g, /[a-zA-Z]anal/g, /[a-zA-Z]anal[a-zA-Z]/g, /cum[a-zA-Z]/g, /[a-zA-Z]cum/g, /[a-zA-Z]cum[a-zA-Z]/g];

    let messageArray4 = message.content.split(" ");
    const messageBlacklistIndex = messageArray4.findIndex(detection => wildcardWords.includes(detection.toLowerCase()));

    if (exactWords.some(safe => message.content.toLowerCase().match(safe))) return;

    if (wildcardWords.some(v => message.content.toLowerCase().includes(v))) {
        if (message.channel.id !== "778502488844140574") return;

        const blacklistLogEmbed = new Discord.MessageEmbed()
            .setAuthor(`Blacklisted Words | ${message.author.tag}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .addField(`User`, message.author, true)
            .addField(`Channel`, message.channel, true)
            .addField(`Message`, message.content.substr(0, 1024))
            .addField(`Word Detected`, `${messageArray4[messageBlacklistIndex] || "Failed to fetch detection."}`)
            .setFooter(`User ID: ${message.author.id}`)
            .setColor(`ff0000`)

        const DMEmbed = new Discord.MessageEmbed()
            .setAuthor(`Message Removed`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .addField(`Channel`, message.channel)
            .addField(`Message`, message.content)
            .setFooter(`If you think this is a mistake, please contact ModMail.`)
            .setColor(`eb4bc9`)
            .setTimestamp()

        message.delete();

        client.channels.cache.get(`793119554259255296`).send({
            embed: blacklistLogEmbed
        }).then(message.author.send(`**${message.author.username}**, ${messageArray4[messageBlacklistIndex] || `a word you have said`} is blacklisted in the I Talk Server.\nFor a full list of blacklisted words, DM me \`+blacklist\`.`, {
            embed: DMEmbed
        }));
    }
});

client.on('message', message => {
    if (message.guild === null) return;
    if (message.channel.id !== "778502488844140574") return;

    if (message.author.bot) return;

    if (message.content.match(/\n{5}/)) {
        const spamEmbed = new Discord.MessageEmbed()
            .setAuthor(`Messages Removed`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .addField(`Channel`, message.channel)
            .addField(`Message Content`, message.content)
            .setFooter(`If you think this is a mistake, please contact ModMail.`)
            .setTimestamp()
            .setColor(`eb4bc9`)

        const spamLogEmbed = new Discord.MessageEmbed()
            .setAuthor(`Message Spam | ${message.author.tag}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .addField(`User`, message.author, true)
            .addField(`Channel`, message.channel, true)
            .addField(`Message`, message.content)
            .setFooter(`User ID: ${message.author.id}`)
            .setColor(`ff0000`)

        message.author.send(`**${message.author.username}**, you've sent a large message with several empty lines. Further spamming may lead to a punishment being handed out.`, {
            embed: spamEmbed
        });

        client.channels.cache.get(`793119554259255296`).send({
            embed: spamLogEmbed
        });

        return message.delete();
    }

    if (message.content && messageStored5.includes(message.author.id)) {
        if (message.channel.id !== "778502488844140574") return;

        let state;

        messageStored1 = messageStored1.filter(e => e !== message.author.id);
        messageStored2 = messageStored2.filter(e => e !== message.author.id);
        messageStored3 = messageStored3.filter(e => e !== message.author.id);
        messageStored4 = messageStored4.filter(e => e !== message.author.id);
        messageStored5 = messageStored5.filter(e => e !== message.author.id);

        message.channel.messages.fetch({
            limit: (i / 2 + 1),
        }).then((messages) => {
            messages = messages.filter(messages => messages.author.id === message.author.id).array().slice(0, 10);
            message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
        }).then(() => {
            var timeEnd = new Date().getTime();

            if (i / 2 < 6 || i === 5) {
                state = "5";
            } else {
                state = "5+";
            }

            const spamEmbed = new Discord.MessageEmbed()
                .setAuthor(`Messages Removed`, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .addField(`Channel`, message.channel)
                .addField(`Recent Message Content`, message.content)
                .setFooter(`Impacted messages have been removed.`)
                .setTimestamp()
                .setColor(`eb4bc9`)

            const spamLogEmbed = new Discord.MessageEmbed()
                .setAuthor(`Message Spam | ${message.author.tag}`, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .addField(`User`, message.author, true)
                .addField(`Channel`, message.channel, true)
                .addField(`Reason of Detection`, `Sent ${state} messages in ${(timeEnd - timeStart)/100} seconds. (NOT ACCURATE ATM)`)
                .setFooter(`User ID: ${message.author.id}`)
                .setColor(`ff0000`)

            message.author.send(`**${message.author.username}**, you've sent ${state} messages in ${(timeEnd - timeStart)/100} (not accurate atm- testing) seconds. Further spamming may lead to a punishment being handed out.`, {
                embed: spamEmbed
            });

            client.channels.cache.get(`793119554259255296`).send({
                embed: spamLogEmbed
            });
        });
    }
    if (message.content) {
        if (message.channel.id !== "778502488844140574") return;

        messageStored1.push(message.author.id);
        var timeStart = new Date().getTime();
        i += 1;
        setTimeout(() => {
            messageStored1 = messageStored1.filter(e => e !== message.author.id);
        }, 3500);
    }
    if (message.content && messageStored4.includes(message.author.id)) {
        i += 1;
        messageStored5.push(message.author.id);
        setTimeout(() => {
            messageStored5 = messageStored5.filter(e => e !== message.author.id);
        }, 3500);
    } else
    if (message.content && messageStored3.includes(message.author.id)) {
        i += 1;
        messageStored4.push(message.author.id);
        setTimeout(() => {
            messageStored4 = messageStored4.filter(e => e !== message.author.id);
        }, 3500);
    } else
    if (message.content && messageStored2.includes(message.author.id)) {
        i += 1;
        messageStored3.push(message.author.id);
        setTimeout(() => {
            messageStored3 = messageStored3.filter(e => e !== message.author.id);
        }, 3500);
    } else
    if (message.content && messageStored1.includes(message.author.id)) {
        i += 1;
        messageStored2.push(message.author.id);
        setTimeout(() => {
            messageStored2 = messageStored2.filter(e => e !== message.author.id);
        }, 3500);
    }
});

client.on('message', message => {
    if (message.channel.id === "685885174025814049" && !message.content.startsWith(`+appeal `)) return message.delete();
});

client.login(process.env.token);