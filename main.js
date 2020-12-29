const Discord = require('discord.js');
const client = new Discord.Client();

const mongoose = require('mongoose');

const PRE = require('./models/prefix.js');
const PUB = require('./models/publish.js');

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
        } else if (command === 'botpfp' || command === 'botxp') {
            client.commands.get('botpfp').execute(message, args);
        } else if (command === 'autopublish' || command === 'apublish') {
            client.commands.get('autopublish').execute(message, args);
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
            .setDescription(`**${message.author.username}**, the following words are banned in the I Talk Server.\n\`\`\`\nnigga, nigger, nibba, nibber, fag, f4g, retard, coon, cunt, nazi, penis, vagina, porn, blowjob, handjob, nude, rule34, r34, stripper, bangbro, brazzer, faketaxi, hentai, naughtyamerica, realityking, xvideo, milf, anal, cum\n\`\`\`\n- Sending a message which contains any of these words will be auto-deleted by the Auto-Moderation.\n- Attempting to bypass this auto-moderation filter may lead to a punishment being handed out.`)
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
    if (message.guild === null) return;
    PUB.findOne({
        guildID: message.guild.id
    }, (err, data) => {
        if (err) return console.log(err);
        if (!data) return;

        if (data.channelList.includes(message.channel.id)) {
            if (message.channel.type !== "news") return;
            message.crosspost();
        } else {
            return;
        }
    });
});

client.on('message', message => {
    if (message.channel.id === "685885174025814049" && !message.content.startsWith(`+appeal `)) return message.delete();
});

client.login(process.env.token);