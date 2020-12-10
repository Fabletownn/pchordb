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
    const dinoCreator = 'aaro#0882';
    const farahCreator = 'Fable#0001';

    client.user.setActivity(`Created by ${dinoCreator} & ${farahCreator}.`, {
        type: 'PLAYING'
    });

    console.log(`${client.user.username} is successfully up and running: in ${client.guilds.cache.size} guilds.\n`);
});

client.on('message', message => {
    if (message.guild === null) return;

    let moderatorR = message.guild.roles.cache.find(r => r.name === "Moderator");
    let administratorR = message.guild.roles.cache.find(r => r.name === "Administrator");
    let itfR = message.guild.roles.cache.find(r => r.name === "I Talk Fortnite");

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
        if (message.content.startsWith(commandPrefix) && (!moderatorR || !administratorR || !itfR)) return console.log(`I was run in a server that didn't have the proper roles. Ignoring.`).then(m => m.delete({
            timeout: 10000
        }));

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
        }
    });
});

client.on('message', message => {
    if (message.type === "PINS_ADD" && message.author.bot) return message.delete();

    if (message.content) {
        if (message.author.bot) return;
        if (message.channel.id !== "776804935907147827") return;
        if (message.content.toLowerCase() === "s:") return;
        if (!message.content.toLowerCase().startsWith("s:")) return;

        message.react(message.guild.emojis.cache.get("778352094876139560")).then(message.react(message.guild.emojis.cache.get("778352093982752828"))).then(() => {
            message.pin();
        });
    }
});

client.login(process.env.token);