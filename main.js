const Discord = require('discord.js');
const client = new Discord.Client();

const mongoose = require('mongoose');

const PRE = require('./models/prefix.js');
const WEL = require('./models/welcome.js');
const ANG = require("./models/angel.js");

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
    client.user.setActivity(`with ${client.guilds.cache.get('614193406838571085').members.cache.filter(member => !member.user.bot).size.toLocaleString()} members.`, {
        type: 'PLAYING'
    });

    console.log(`[${new Date().toLocaleTimeString()}] ${client.user.username} is successfully up and running: in ${client.guilds.cache.size} guilds.\n`);
});

client.on('guildMemberAdd', member => {
    WEL.findOne({
        guildID: member.guild.id,
    }, (err, data) => {
        if (err) return console.log(err);
        if (!data) return console.log(`A new member joined, however, no welcome message is currently set up.`);

        if (data) {
            let welcomeMessageUserTag = data.welcomeMessage.replace(`{user.tag}`, client.users.cache.get(member.id).tag);
            let welcomeMessageUser = welcomeMessageUserTag.replace(`{user}`, member);
            let welcomeMessageUserID = welcomeMessageUser.replace(`{user.id}`, member.id);
            let welcomeMessageGuildNameA = welcomeMessageUserID.replace(`{guild.name}`, member.guild.name);
            let welcomeMessageContent = welcomeMessageGuildNameA.replace(`{member.count}`, client.guilds.cache.get(member.guild.id).members.cache.filter(member => !member.user.bot).size.toLocaleString());

            if (member.guild.id === "614193406838571085") {
                client.channels.cache.get('614193679778709517').send(welcomeMessageContent);
            } else if (member.guild.id === "685876599199236173") {
                client.channels.cache.get('685889245570924580').send(welcomeMessageContent);
            } else {
                return console.log(`Couldn't send message! Channel not found.`)
            }
        }
    });
});

client.on('voiceStateUpdate', (oldState, newState) => {
    if (oldState.guild === null || newState.guild === null) return;

    var oldVoiceChannel = oldState.member.voice.channel
    var newVoiceChannel = newState.member.voice.channel

    if (!oldVoiceChannel && !newVoiceChannel) return;

    if (oldState.channel !== null && newState.channel === null) {
        const voiceChannel = newState.guild.channels.cache.get('789056873437331456');
        const voiceChannel2 = newState.guild.channels.cache.get('777842963954270228');
        const voiceChannel3 = newState.guild.channels.cache.get('777842977375780894');
        const voiceChannel4 = newState.guild.channels.cache.get('794626473734570025');
        const voiceChannel5 = newState.guild.channels.cache.get('789057097508716555');

        try {
            voiceChannel.permissionOverwrites.get(newState.member.id).delete();
        } catch (err) {
            return console.log(`No override found. Ignoring.`)
        }
        try {
            voiceChannel2.permissionOverwrites.get(newState.member.id).delete();
        } catch (err) {
            return console.log(`No override found. Ignoring.`)
        }
        try {
            voiceChannel3.permissionOverwrites.get(newState.member.id).delete();
        } catch (err) {
            return console.log(`No override found. Ignoring.`)
        }
        try {
            voiceChannel4.permissionOverwrites.get(newState.member.id).delete();
        } catch (err) {
            return console.log(`No override found. Ignoring.`)
        }
        try {
            voiceChannel5.permissionOverwrites.get(newState.member.id).delete();
        } catch (err) {
            return console.log(`No override found. Ignoring.`)
        }
    }

    if (!newVoiceChannel) return;

    if (oldVoiceChannel === undefined && newVoiceChannel !== undefined) {
        if (newVoiceChannel.id === "774362075618869270") {
            const voiceChannel = newState.guild.channels.cache.get('789056873437331456');
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true
            }, `User joined Voice Channel.`);
    
            client.channels.cache.get('789056873437331456').send(`${newState.member}, use this channel for text communication for the General Voice Channel!`).then(m => m.delete({
                timeout: 10000
            }));
        } else if (newVoiceChannel.id === "614484127722373120") {
            const voiceChannel = newState.guild.channels.cache.get('777842963954270228');
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true
            }, `User joined Voice Channel.`);
    
            client.channels.cache.get('777842963954270228').send(`${newState.member}, use this channel for text communication for the Music 1 Voice Channel! Check the pinned messages for the Music Bot Commands.`).then(m => m.delete({
                timeout: 10000
            }));
        } else if (newVoiceChannel.id === "757301388840665248") {
            const voiceChannel = newState.guild.channels.cache.get('777842977375780894');
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true
            }, `User joined Voice Channel.`);
    
            client.channels.cache.get('777842977375780894').send(`${newState.member}, use this channel for text communication for the Music 2 Voice Channel! Check the pinned messages for the Music Bot Commands.`).then(m => m.delete({
                timeout: 10000
            }));
        } else if (newVoiceChannel.id === "664593167420489730") {
            const voiceChannel = newState.guild.channels.cache.get('794626473734570025');
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true
            }, `User joined Voice Channel.`);
    
            client.channels.cache.get('794626473734570025').send(`${newState.member}, use this channel for text communication for the Livestream Voice Channel!`).then(m => m.delete({
                timeout: 10000
            }));
        } else if (newVoiceChannel.id === "744952618878763088") {
            const voiceChannel = newState.guild.channels.cache.get('789057097508716555');
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true
            }, `User joined Voice Channel.`);
    
            client.channels.cache.get('789057097508716555').send(`${newState.member}, use this channel for text communication for the Gaming Voice Channel!`).then(m => m.delete({
                timeout: 10000
            }));
        } else {
            return;
        }
    }

    if (!oldVoiceChannel) return;

    if (newVoiceChannel === undefined) {
        if (oldVoiceChannel.id === "774362075618869270") {
            const voiceChannel = oldState.guild.channels.cache.get('789056873437331456');
            try {
                voiceChannel.permissionOverwrites.get(newState.member.id).delete();
            } catch (err) {
                return console.log(`No override found. Ignoring.`)
            }
        } else if (oldVoiceChannel.id === "614484127722373120") {
            const voiceChannel = oldState.guild.channels.cache.get('777842963954270228');
            try {
                voiceChannel.permissionOverwrites.get(newState.member.id).delete();
            } catch (err) {
                return console.log(`No override found. Ignoring.`)
            }
        } else if (oldVoiceChannel.id === "757301388840665248") {
            const voiceChannel = oldState.guild.channels.cache.get('777842977375780894');
            try {
                voiceChannel.permissionOverwrites.get(newState.member.id).delete();
            } catch (err) {
                return console.log(`No override found. Ignoring.`)
            }
        } else if (oldVoiceChannel.id === "664593167420489730") {
            const voiceChannel = oldState.guild.channels.cache.get('794626473734570025');
            try {
                voiceChannel.permissionOverwrites.get(newState.member.id).delete();
            } catch (err) {
                return console.log(`No override found. Ignoring.`)
            }
        } else if (oldVoiceChannel.id === "744952618878763088") {
            const voiceChannel = oldState.guild.channels.cache.get('789057097508716555');
            try {
                voiceChannel.permissionOverwrites.get(newState.member.id).delete();
            } catch (err) {
                return console.log(`No override found. Ignoring.`)
            }
        } else {
            return;
        }
    }
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

        if (message.guild.id === "614193406838571085" && message.content.startsWith(commandPrefix)) {
            if (!message.content.startsWith(`+assistance`)) {
                if (!message.member.roles.cache.has(moderatorR.id) && message.author.id !== "528759471514845194") return;
            }
        }

        const args = message.content.slice(commandPrefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if (command === 'vote' || command === 'reactvote') {
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
        } else if (command === 'credits') {
            client.commands.get('credits').execute(message, args);
        } else if (command === 'say') {
            client.commands.get('say').execute(message, args);
        } else if (command === 'dm' || command === 'dmuser') {
            client.commands.get('dm').execute(message, args);
        } else if (command === 'welcome' || command === 'welcomemessage') {
            client.commands.get('welcome').execute(message, args);
        } else if (command === 'serverspotlight' || command === 'spotlight') {
            client.commands.get('spotlight').execute(message, args);
        }
    });
});

client.on('message', message => {
    if (message.guild === null || message.author.bot) return;
    if (message.content === `+assistance`) { // TEMPORARY
        message.channel.send(`<@&672857887894274058> <@&614196214078111745>\nAssistance has been requested!\n`);
    }
});

client.on('message', message => {
    if (message.guild === null || message.author.bot) return;

    if (message.content.includes(`<@!550384455613677571>`) || message.content.includes(`<@550384455613677571>`)) {
        ANG.findOne({
            guildID: message.guild.id
        }, (err, data) => {
            if (err) return console.log(err);
            if (!data) {
                const newANGData = new ANG({
                    guildID: message.guild.id,
                    angelPings: 1
                });
                newANGData.save().catch(err => console.log(err));
                message.channel.send(`You pinged Angel! <:yCrystalHeart:778318624032555039>\n**Angel Ping Count**: 1`);
            } else {
                data.guildID = message.guild.id;
                data.angelPings += 1;

                data.save().catch(err => console.log(err));
                message.channel.send(`You pinged Angel! <:yCrystalHeart:778318624032555039>\n**Angel Ping Count**: ${data.angelPings.toLocaleString()}`);
            }
        });
    }
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
    if (message.channel.type !== "news") return;
    message.crosspost();
});

client.on('message', message => {
    if (message.channel.id === "685885174025814049" && !message.content.startsWith(`+appeal `)) return message.delete();
});

client.login(process.env.token);