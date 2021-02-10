const Discord = require('discord.js');
const client = new Discord.Client();

const mongoose = require('mongoose');

const PRE = require('./models/prefix.js');
const WEL = require('./models/welcome.js');
const ANG = require("./models/angel.js");

let disabledCommands = [];

const fs = require("fs");

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (request, response) {
    var result = `${client.user.username} is up n' running.`;
    response.send(result);
}).listen(app.get('port'), function () {
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
    client.user.setActivity(`with ${client.guilds.cache.get('614193406838571085').memberCount.toLocaleString()} members.`, {
        type: 'PLAYING'
    });

    console.log(`[${new Date().toLocaleTimeString()}] ${client.user.username} is successfully up and running: in ${client.guilds.cache.size} guilds.\n`);
});

client.on('guildBanAdd', async (guild, user) => {
    if (guild.id !== "614193406838571085") return;

    const fetchedLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD',
    });

    const banLog = fetchedLogs.entries.first();
    const { executor, target } = banLog;

    if (executor.bot) return;
    if (!banLog) return;

    const banReason = await guild.fetchBan(user.id).then(thatBan => thatBan.reason);

    if (target.id === user.id) {
        const banEmbed = new Discord.MessageEmbed()
            .setAuthor(`Ban | ${target.tag}`, target.displayAvatarURL({ dynamic: true }))
            .addField(`User`, target, true)
            .addField(`Moderator`, executor, true)
            .addField(`Reason`, banReason || `No reason provided.`)
            .setFooter(`Manual Ban | User ID: ${target.id}`)
            .setColor(3447003)

        client.channels.cache.get("748952882702712873").send({ embed: banEmbed });
    } else {
        return;
    }
});

client.on('voiceStateUpdate', (oldState, newState) => {
    if (oldState.guild === null || newState.guild === null) return;
    if (oldState.guild.id !== "797142251712151583") return;
    if (newState.guild.id !== "797142251712151583") return;
    if (client.users.cache.get(oldState.member.id).bot) return;
    if (client.users.cache.get(newState.member.id).bot) return;

    var oldVoiceChannel = oldState.channel;
    var newVoiceChannel = newState.channel;

    if (!oldVoiceChannel && !newVoiceChannel) return;
    if (oldState.member.roles.cache.has("797809139836911666")) return;
    if (newState.member.roles.cache.has("797809139836911666")) return;

    if (oldVoiceChannel !== null && newVoiceChannel !== null) {
        if (oldVoiceChannel.id === newVoiceChannel.id) return;

        if (oldVoiceChannel.id === "797142252639748097" || oldVoiceChannel.id === "797770795782766623" || oldVoiceChannel.id === "797770809073991700" || oldVoiceChannel.id === "797802749383147530" || newVoiceChannel.id === "797142252639748097" || newVoiceChannel.id === "797770795782766623" || newVoiceChannel.id === "797770809073991700" || newVoiceChannel.id === "797802749383147530") {
            if (oldVoiceChannel.id === "797142252639748097") {
                var voiceChannel = oldState.guild.channels.cache.get("799547364796006440");
                try {
                    voiceChannel.permissionOverwrites.get(oldState.member.id).delete();
                } catch (err) {
                    return;
                }
            }
            if (oldVoiceChannel.id === "797770795782766623") {
                var voiceChannel = oldState.guild.channels.cache.get("799547403711021056");
                try {
                    voiceChannel.permissionOverwrites.get(oldState.member.id).delete();
                } catch (err) {
                    return;
                }
            }
            if (oldVoiceChannel.id === "797770809073991700") {
                var voiceChannel = oldState.guild.channels.cache.get("799547435390861322");
                try {
                    voiceChannel.permissionOverwrites.get(oldState.member.id).delete();
                } catch (err) {
                    return;
                }
            }
            if (oldVoiceChannel.id === "797802749383147530") {
                var voiceChannel = oldState.guild.channels.cache.get("799547450574635078");
                try {
                    voiceChannel.permissionOverwrites.get(oldState.member.id).delete();
                } catch (err) {
                    return;
                }
            }
        }

        if (newVoiceChannel.id === "797142252639748097") {
            var voiceChannel = newState.guild.channels.cache.get("799547364796006440");
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('799547364796006440').send(`${newState.member}, use this channel for text communication for the Minecraft 1 Voice Channel!`).then(m => m.delete({
                timeout: 10000
            }));
        }
        if (newVoiceChannel.id === "797770795782766623") {
            var voiceChannel = newState.guild.channels.cache.get("799547403711021056");
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('799547403711021056').send(`${newState.member}, use this channel for text communication for the Minecraft 2 Voice Channel!`).then(m => m.delete({
                timeout: 10000
            }));
        }
        if (newVoiceChannel.id === "797770809073991700") {
            var voiceChannel = newState.guild.channels.cache.get("799547435390861322");
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('799547435390861322').send(`${newState.member}, use this channel for text communication for the Livestream 1 Voice Channel! Check the pinned messages for the Music Bot Commands.`).then(m => m.delete({
                timeout: 10000
            }));
        }
        if (newVoiceChannel.id === "797802749383147530") {
            var voiceChannel = newState.guild.channels.cache.get("799547450574635078");
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('799547450574635078').send(`${newState.member}, use this channel for text communication for the Livestream 2 Voice Channel!`).then(m => m.delete({
                timeout: 10000
            }));
        }
    }
});

client.on('voiceStateUpdate', (oldState, newState) => {
    if (oldState.guild === null || newState.guild === null) return;
    if (oldState.guild.id !== "797142251712151583") return;
    if (newState.guild.id !== "797142251712151583") return;
    if (client.users.cache.get(oldState.member.id).bot) return;
    if (client.users.cache.get(newState.member.id).bot) return;

    var oldVoiceChannel = oldState.channel;
    var newVoiceChannel = newState.channel;

    if (oldState.member.roles.cache.has("797809139836911666")) return;
    if (newState.member.roles.cache.has("797809139836911666")) return;

    if (oldVoiceChannel === null && newVoiceChannel !== null) {
        if (newVoiceChannel.id === "797142252639748097") {
            const voiceChannel = newState.guild.channels.cache.get('799547364796006440');
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('799547364796006440').send(`${newState.member}, use this channel for text communication for the Minecraft 1 Voice Channel!`).then(m => m.delete({
                timeout: 10000
            }));
        } else if (newVoiceChannel.id === "797770795782766623") {
            const voiceChannel = newState.guild.channels.cache.get('799547403711021056');
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('799547403711021056').send(`${newState.member}, use this channel for text communication for the Minecraft 2 Voice Channel! Check the pinned messages for the Music Bot Commands.`).then(m => m.delete({
                timeout: 10000
            }));
        } else if (newVoiceChannel.id === "797770809073991700") {
            const voiceChannel = newState.guild.channels.cache.get('799547435390861322');
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('799547435390861322').send(`${newState.member}, use this channel for text communication for the Livestream 1 Voice Channel! Check the pinned messages for the Music Bot Commands.`).then(m => m.delete({
                timeout: 10000
            }));
        } else if (newVoiceChannel.id === "797802749383147530") {
            const voiceChannel = newState.guild.channels.cache.get('799547450574635078');
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('799547450574635078').send(`${newState.member}, use this channel for text communication for the Livestream 2 Voice Channel!`).then(m => m.delete({
                timeout: 10000
            }));
        }
    } else

        if (oldVoiceChannel !== null && newVoiceChannel === null) {
            if (oldVoiceChannel.id === "797142252639748097") {
                const voiceChannel = oldState.guild.channels.cache.get('799547364796006440');
                try {
                    voiceChannel.permissionOverwrites.get(newState.member.id).delete();
                } catch (err) {
                    return;
                }
            } else if (oldVoiceChannel.id === "797770795782766623") {
                const voiceChannel = oldState.guild.channels.cache.get('799547403711021056');
                try {
                    voiceChannel.permissionOverwrites.get(newState.member.id).delete();
                } catch (err) {
                    return;
                }
            } else if (oldVoiceChannel.id === "797770809073991700") {
                const voiceChannel = oldState.guild.channels.cache.get('799547435390861322');
                try {
                    voiceChannel.permissionOverwrites.get(newState.member.id).delete();
                } catch (err) {
                    return;
                }
            } else if (oldVoiceChannel.id === "797802749383147530") {
                const voiceChannel = oldState.guild.channels.cache.get('799547450574635078');
                try {
                    voiceChannel.permissionOverwrites.get(newState.member.id).delete();
                } catch (err) {
                    return;
                }
            } else {
                return;
            }
        }
});

client.on('voiceStateUpdate', (oldState, newState) => {
    if (oldState.guild === null || newState.guild === null) return;
    if (client.users.cache.get(oldState.member.id).bot) return;
    if (client.users.cache.get(newState.member.id).bot) return;

    var oldVoiceChannel = oldState.channel;
    var newVoiceChannel = newState.channel;

    if (!oldVoiceChannel && !newVoiceChannel) return;
    if (oldState.member.roles.cache.has("614196214078111745") || oldState.member.roles.cache.has("672857887894274058")) return;
    if (newState.member.roles.cache.has("614196214078111745") || newState.member.roles.cache.has("672857887894274058")) return;

    if (oldVoiceChannel !== null && newVoiceChannel !== null) {
        if (oldVoiceChannel.id === newVoiceChannel.id) return;

        if (oldVoiceChannel.id === "774362075618869270" || oldVoiceChannel.id === "614484127722373120" || oldVoiceChannel.id === "757301388840665248" || oldVoiceChannel.id === "664593167420489730" || oldVoiceChannel.id === "744952618878763088" || newVoiceChannel.id === "774362075618869270" || newVoiceChannel.id === "614484127722373120" || newVoiceChannel.id === "757301388840665248" || newVoiceChannel.id === "664593167420489730" || newVoiceChannel.id === "744952618878763088") {
            if (oldVoiceChannel.id === "774362075618869270") {
                var voiceChannel = oldState.guild.channels.cache.get("789056873437331456");
                try {
                    voiceChannel.permissionOverwrites.get(oldState.member.id).delete();
                } catch (err) {
                    return;
                }
            }
            if (oldVoiceChannel.id === "614484127722373120") {
                var voiceChannel = oldState.guild.channels.cache.get("777842963954270228");
                try {
                    voiceChannel.permissionOverwrites.get(oldState.member.id).delete();
                } catch (err) {
                    return;
                }
            }
            if (oldVoiceChannel.id === "757301388840665248") {
                var voiceChannel = oldState.guild.channels.cache.get("777842977375780894");
                try {
                    voiceChannel.permissionOverwrites.get(oldState.member.id).delete();
                } catch (err) {
                    return;
                }
            }
            if (oldVoiceChannel.id === "664593167420489730") {
                var voiceChannel = oldState.guild.channels.cache.get("794626473734570025");
                try {
                    voiceChannel.permissionOverwrites.get(oldState.member.id).delete();
                } catch (err) {
                    return;
                }
            }
            if (oldVoiceChannel.id === "744952618878763088") {
                var voiceChannel = oldState.guild.channels.cache.get("789057097508716555");
                try {
                    voiceChannel.permissionOverwrites.get(oldState.member.id).delete();
                } catch (err) {
                    return;
                }
            }
        }

        if (newVoiceChannel.id === "774362075618869270") {
            var voiceChannel = newState.guild.channels.cache.get("789056873437331456");
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('789056873437331456').send(`${newState.member}, use this channel for text communication for the General Voice Channel!`).then(m => m.delete({
                timeout: 10000
            }));
        }
        if (newVoiceChannel.id === "614484127722373120") {
            var voiceChannel = newState.guild.channels.cache.get("777842963954270228");
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('777842963954270228').send(`${newState.member}, use this channel for text communication for the Music 1 Voice Channel! Check the pinned messages for the Music Bot Commands.`).then(m => m.delete({
                timeout: 10000
            }));
        }
        if (newVoiceChannel.id === "757301388840665248") {
            var voiceChannel = newState.guild.channels.cache.get("777842977375780894");
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('777842977375780894').send(`${newState.member}, use this channel for text communication for the Music 2 Voice Channel! Check the pinned messages for the Music Bot Commands.`).then(m => m.delete({
                timeout: 10000
            }));
        }
        if (newVoiceChannel.id === "664593167420489730") {
            var voiceChannel = newState.guild.channels.cache.get("794626473734570025");
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('794626473734570025').send(`${newState.member}, use this channel for text communication for the Livestream Voice Channel!`).then(m => m.delete({
                timeout: 10000
            }));
        }
        if (newVoiceChannel.id === "744952618878763088") {
            var voiceChannel = newState.guild.channels.cache.get("789057097508716555");
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('789057097508716555').send(`${newState.member}, use this channel for text communication for the Gaming Voice Channel!`).then(m => m.delete({
                timeout: 10000
            }));
        }
    }
});

client.on('voiceStateUpdate', (oldState, newState) => {
    if (oldState.guild === null || newState.guild === null) return;
    if (client.users.cache.get(oldState.member.id).bot) return;
    if (client.users.cache.get(newState.member.id).bot) return;

    var oldVoiceChannel = oldState.channel;
    var newVoiceChannel = newState.channel;

    if (!oldVoiceChannel && !newVoiceChannel) return;
    if (oldState.member.roles.cache.has("614196214078111745") || oldState.member.roles.cache.has("672857887894274058")) return;
    if (newState.member.roles.cache.has("614196214078111745") || newState.member.roles.cache.has("672857887894274058")) return;

    if (oldVoiceChannel === null && newVoiceChannel !== null) {
        if (newVoiceChannel.id === "774362075618869270") {
            const voiceChannel = newState.guild.channels.cache.get('789056873437331456');
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('789056873437331456').send(`${newState.member}, use this channel for text communication for the General Voice Channel!`).then(m => m.delete({
                timeout: 10000
            }));
        } else if (newVoiceChannel.id === "614484127722373120") {
            const voiceChannel = newState.guild.channels.cache.get('777842963954270228');
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('777842963954270228').send(`${newState.member}, use this channel for text communication for the Music 1 Voice Channel! Check the pinned messages for the Music Bot Commands.`).then(m => m.delete({
                timeout: 10000
            }));
        } else if (newVoiceChannel.id === "757301388840665248") {
            const voiceChannel = newState.guild.channels.cache.get('777842977375780894');
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('777842977375780894').send(`${newState.member}, use this channel for text communication for the Music 2 Voice Channel! Check the pinned messages for the Music Bot Commands.`).then(m => m.delete({
                timeout: 10000
            }));
        } else if (newVoiceChannel.id === "664593167420489730") {
            const voiceChannel = newState.guild.channels.cache.get('794626473734570025');
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('794626473734570025').send(`${newState.member}, use this channel for text communication for the Livestream Voice Channel!`).then(m => m.delete({
                timeout: 10000
            }));
        } else if (newVoiceChannel.id === "744952618878763088") {
            const voiceChannel = newState.guild.channels.cache.get('789057097508716555');
            voiceChannel.updateOverwrite(newState.member.id, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            }, `User joined Voice Channel.`);

            client.channels.cache.get('789057097508716555').send(`${newState.member}, use this channel for text communication for the Gaming Voice Channel!`).then(m => m.delete({
                timeout: 10000
            }));
        }
    } else

        if (oldVoiceChannel !== null && newVoiceChannel === null) {
            if (oldVoiceChannel.id === "774362075618869270") {
                const voiceChannel = oldState.guild.channels.cache.get('789056873437331456');
                try {
                    voiceChannel.permissionOverwrites.get(newState.member.id).delete();
                } catch (err) {
                    return;
                }
            } else if (oldVoiceChannel.id === "614484127722373120") {
                const voiceChannel = oldState.guild.channels.cache.get('777842963954270228');
                try {
                    voiceChannel.permissionOverwrites.get(newState.member.id).delete();
                } catch (err) {
                    return;
                }
            } else if (oldVoiceChannel.id === "757301388840665248") {
                const voiceChannel = oldState.guild.channels.cache.get('777842977375780894');
                try {
                    voiceChannel.permissionOverwrites.get(newState.member.id).delete();
                } catch (err) {
                    return;
                }
            } else if (oldVoiceChannel.id === "664593167420489730") {
                const voiceChannel = oldState.guild.channels.cache.get('794626473734570025');
                try {
                    voiceChannel.permissionOverwrites.get(newState.member.id).delete();
                } catch (err) {
                    return;
                }
            } else if (oldVoiceChannel.id === "744952618878763088") {
                const voiceChannel = oldState.guild.channels.cache.get('789057097508716555');
                try {
                    voiceChannel.permissionOverwrites.get(newState.member.id).delete();
                } catch (err) {
                    return;
                }
            } else {
                return;
            }
        }
});

client.on('guildMemberAdd', member => {
    WEL.findOne({
        guildID: member.guild.id,
    }, (err, data) => {
        if (err) return console.log(err);
        if (!data) return;

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
            } else if (member.guild.id === "797142251712151583") {
                client.channels.cache.get('797142832045359155').send(welcomeMessageContent);
            } else {
                return;
            }
        }
    });

    const joinEmbed = new Discord.MessageEmbed()
        .setAuthor(`${client.users.cache.get(member.id).tag} Joined`, client.users.cache.get(member.id).displayAvatarURL({
            dynamic: true
        }))
        .setDescription(`${member} joined the server.`)
        .setFooter(`User ID: ${member.id}`)
        .setColor('23ff09')
        .setTimestamp()

    if (member.guild.id === "797142251712151583") {
        client.channels.cache.get("799313607020118016").send({
            embed: joinEmbed
        });
    } else {
        return;
    }
});

client.on('guildMemberRemove', member => {
    const leaveEmbed = new Discord.MessageEmbed()
        .setAuthor(`${client.users.cache.get(member.id).tag} Left`, client.users.cache.get(member.id).displayAvatarURL({
            dynamic: true
        }))
        .setDescription(`${member} left the server.`)
        .addField(`Roles`, `${member.roles.cache.map(roleList => `${roleList}`).slice(0, -1).join(' ') || `None.`}`)
        .setColor('ff0000')
        .setFooter(`User ID: ${member.id}`)
        .setTimestamp()

    if (member.guild.id === "797142251712151583") {
        client.channels.cache.get("799313607020118016").send({
            embed: leaveEmbed
        });
    } else {
        return;
    }
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.channel.id !== "738819371069079622" && oldMessage.channel.id !== "797575762286215188" && oldMessage.channel.id !== "797771341566705665" && newMessage.channel.id !== "738819371069079622" && newMessage.channel.id !== "797575762286215188" && newMessage.channel.id !== "797771341566705665") return;

    if (oldMessage.content.toLowerCase().startsWith(`s:`) && !newMessage.content.toLowerCase().startsWith(`s:`)) {
        newMessage.unpin();
        newMessage.reactions.removeAll().catch(err => console.log(err));
    } else if (!oldMessage.content.toLowerCase().startsWith(`s:`) && newMessage.content.toLowerCase().startsWith(`s:`)) {
        newMessage.pin();
        newMessage.react(`<:zzITFUpvote:778318625328332810>`).then(newMessage.react(`<:zzITFDownvote:778318624552779776>`));
    } else {
        return;
    }
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.guild === null) return;

    if (oldMessage.author.bot) return;
    if (oldMessage.content === newMessage.content) return;

    if (oldMessage.attachments.size > 0) {
        oldMessage.attachments.forEach(oldAttachment => {
            const editEmbed = new Discord.MessageEmbed()
                .addField(`User`, `${newMessage.author}`, true)
                .addField(`Channel`, `${newMessage.channel}`, true)
                .addField(`Before Edit`, `${oldMessage.content.substr(0, 1024) || `No content.`}`)
                .addField(`After Edit`, `${newMessage.content.substr(0, 1024) || `No content.`}`)
                .addField(`Attachments [${oldMessage.attachments.size}]`, `[View](${oldAttachment.url})`)
                .setColor('3ba2d4')
                .setFooter(`User ID: ${newMessage.author.id}`)
                .setAuthor(`Message Edited | ${newMessage.author.tag}`, newMessage.author.displayAvatarURL({
                    dynamic: true
                }))
                .setTimestamp()

            if (oldMessage.guild.id === "614193406838571085") {
                client.channels.cache.get("690601497767182436").send({
                    embed: editEmbed
                });
            } else if (oldMessage.guild.id === "797142251712151583") {
                client.channels.cache.get("799329445555077120").send({
                    embed: editEmbed
                });
            } else {
                return;
            }
        });
        return;
    }

    const editEmbed = new Discord.MessageEmbed()
        .addField(`User`, `${newMessage.author}`, true)
        .addField(`Channel`, `${newMessage.channel}`, true)
        .addField(`Before Edit`, `${oldMessage.content.substr(0, 1024) || `No content.`}`)
        .addField(`After Edit`, `${newMessage.content.substr(0, 1024) || `No content.`}`)
        .setColor('3ba2d4')
        .setFooter(`User ID: ${newMessage.author.id}`)
        .setAuthor(`Message Edited | ${newMessage.author.tag}`, newMessage.author.displayAvatarURL({
            dynamic: true
        }))
        .setTimestamp()

    if (oldMessage.guild.id === "614193406838571085") {
        client.channels.cache.get("690601497767182436").send({
            embed: editEmbed
        });
    } else if (oldMessage.guild.id === "797142251712151583") {
        client.channels.cache.get("799329445555077120").send({
            embed: editEmbed
        });
    } else {
        return;
    }
});

client.on("messageDelete", (deletedMessage) => {
    if (deletedMessage.guild === null) return;
    if (deletedMessage.author.bot) return;

    if (deletedMessage.attachments.size > 0) {
        deletedMessage.attachments.forEach(attachmentsSent => {
            const deleteAttachmentEmbed = new Discord.MessageEmbed()
                .addField(`User`, `${deletedMessage.author}`, true)
                .addField(`Channel`, `${deletedMessage.channel}`, true)
                .addField(`Deleted Message`, `${deletedMessage.content.substr(0, 1024) || `No content.`}`)
                .addField(`Attachments [${deletedMessage.attachments.size}]`, `[Inaccessible](${attachmentsSent.url})`)
                .setColor('ff0000')
                .setFooter(`User ID: ${deletedMessage.author.id}`)
                .setAuthor(`Message Deleted | ${deletedMessage.author.tag}`, deletedMessage.author.displayAvatarURL({
                    dynamic: true
                }))
                .setTimestamp()

            if (deletedMessage.guild.id === "614193406838571085") {
                client.channels.cache.get("690601497767182436").send({
                    embed: deleteAttachmentEmbed
                });
            } else if (deletedMessage.guild.id === "797142251712151583") {
                client.channels.cache.get("799329445555077120").send({
                    embed: deleteAttachmentEmbed
                });
            } else if (deletedMessage.guild.id === "685876599199236173") {
                if (deletedMessage.channel.id !== "685885174025814049") return;
                client.channels.cache.get("803196219396194346").send({
                    embed: deleteAttachmentEmbed
                });
            } else {
                return;
            }
        });
        return;
    }

    const deleteEmbed = new Discord.MessageEmbed()
        .addField(`User`, `${deletedMessage.author}`, true)
        .addField(`Channel`, `${deletedMessage.channel}`, true)
        .addField(`Deleted Message`, `${deletedMessage.content.substr(0, 1024) || `No content.`}`)
        .setColor('ff0000')
        .setFooter(`User ID: ${deletedMessage.author.id}`)
        .setAuthor(`Message Deleted | ${deletedMessage.author.tag}`, deletedMessage.author.displayAvatarURL({
            dynamic: true
        }))
        .setTimestamp()

    if (deletedMessage.guild.id === "614193406838571085") {
        client.channels.cache.get("690601497767182436").send({
            embed: deleteEmbed
        });
    } else if (deletedMessage.guild.id === "797142251712151583") {
        client.channels.cache.get("799329445555077120").send({
            embed: deleteEmbed
        });
    } else if (deletedMessage.guild.id === "685876599199236173") {
        if (deletedMessage.channel.id !== "685885174025814049") return;

        client.channels.cache.get("803196219396194346").send({
            embed: deleteEmbed
        });
    } else {
        return;
    }
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
    if (oldMember.guild.id !== "685876599199236173") return;
    if (newMember.guild.id !== "685876599199236173") return;

    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        newMember.roles.cache.forEach(role => {
            if (!oldMember.roles.cache.has(role.id)) {
                if (role.id !== "700290943420727366") return;

                const verifiedEmbed = new Discord.MessageEmbed()
                    .setAuthor(`Verified | ${newMember.user.tag}`, newMember.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setDescription(`${newMember} has verified into the server, and has obtained the ${role} role.`)
                    .setFooter(`User ID: ${newMember.user.id}`)
                    .setColor(6004451)
                    .setTimestamp()

                client.channels.cache.get("803196162952658964").send({
                    embed: verifiedEmbed
                });
            }
        });
    }
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

        const args = message.content.slice(commandPrefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if (disabledCommands.some(disabled => command === disabled)) return;

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
        } else if (command === 'uproleinfo') {
            client.commands.get('uproleinfo').execute(message, args);
        } else if (command === 'upserverinfo') {
            client.commands.get('upserverinfo').execute(message, args);
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
        } else if (command === 'angelpings') {
            client.commands.get('angelpings').execute(message, args);
        } else if (command === 'mcserverinfo') {
            client.commands.get('mcserverinfo').execute(message, args);
        } else if (command === 'mcrules') {
            client.commands.get('mcrules').execute(message, args);
        } else if (command === 'fetchbans') {
            client.commands.get('fetchbans').execute(message, args);
        } else if (command === 'mccolorlock') {
            client.commands.get('mccolorlock').execute(message, args);
        } else if (command === 'roleinfo') {
            client.commands.get('roleinfo').execute(message, args);
        } else if (command === 'assistance') {
            client.commands.get('assistance').execute(message, args);
        } else if (command === 'eval') {
            client.commands.get('eval').execute(message, args);
        }
    });
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
            } else {
                data.guildID = message.guild.id;
                data.angelPings += 1;

                data.save().catch(err => console.log(err));
            }
        });
    }
});

client.on('message', message => {
    if (message.guild === null) return;
    if (message.type === "PINS_ADD" && message.author.bot) return message.delete();

    if (message.content) {
        if (message.author.bot) return;
        if (message.channel.id !== "738819371069079622" && message.channel.id !== "797575762286215188" && message.channel.id !== "797771341566705665") return;
        if (message.content.toLowerCase() === "s:") return;
        if (!message.content.toLowerCase().startsWith("s:")) return;

        message.react(`<:zzITFUpvote:778318625328332810>`).then(message.react(`<:zzITFDownvote:778318624552779776>`)).then(() => {
            message.pin();
        });
    }
});

client.on('message', message => {
    if (message.content.startsWith(`+blacklist`) || message.content.startsWith(`+blocklist`)) {
        if (message.channel.type !== "dm") return;

        const blacklistEmbed = new Discord.MessageEmbed()
            .setTitle(`Blacklisted Words`)
            .setDescription(`**${message.author.username}**, the following words are banned in the I Talk Server.\n\`\`\`\nnigga, nigger, nibba, nibber, fag, f4g, faggot, f4ggot, chingchong, ching chong, retard, cunt, nazi, penis, vagina, porn, blowjob, handjob, footjob, blow job, hand job, foot job, rule34, r34, rule 34, stripper, milf, hentai, incest, naughtyamerica, naughty america, realityking, reality king, xvideo, bangbro, bang bro, brazzer, faketaxi, fake taxi, coon, anal, cum, cumshot, nude, nudes, chink\n\`\`\`\n- Sending a message which contains any of these words will be auto-deleted by the Auto-Moderation.\n- Attempting to bypass this auto-moderation filter will lead to a punishment being handed out.`)
            .setColor('23FF09')

        message.author.send({
            embed: blacklistEmbed
        }).then(message => message.pin());
    }

    if (message.content.startsWith(`+punishmentlist`) || message.content.startsWith(`+punishlist`)) {
        const punishList1 = {
            "title": "Manual Moderation",
            "description": "A violation of the servers rules will result in a punishment being handed out by a server moderator/administrator. The severity of the punishment will be based on how many active infractions you have. \n\nAll strikes are permanent, unless appealed.",
            "color": 16711680,
            "fields": [{
                "name": "Infractions",
                "value": "`Infraction 1`: 15m Mute\n`Infraction 2`: 1h Mute\n`Infraction 3`: 6h Mute\n`Infraction 4`: 24h Mute\n`Infraction 5`: Ban"
            },
            {
                "name": "Notes:",
                "value": "1) Certain rule violations will result in an instant ban from the server.\n\n2) Punishments are up to moderator discretion. Any attempts to find loopholes, bypass the rules or acting in bad faith in the server will result in a punishment as well.\n\n3) A moderator can hand out a different punishment than what is listed here - lenient or strict - based on the context of the situation in the server.\n\n4) First Impressions make Last Impressions. If the first thing you do in the server is violate rules, you will most likely be straightaway banned."
            }
            ]
        }

        const punishList2 = {
            "title": "Auto-Moderation",
            "description": "Auto-Moderation filters have been set up in the server in respect to the server's rules. These include\n\n- Blacklisted Words\n- Sharing any Links\n- Sharing any Discord Server Invites\n- Fast Message Spam\n- Mass Mentioning users.\n\nIf an auto-moderation filter is violated, the auto-moderation will delete your message. \nAuto-Moderation infractions **DO NOT** count towards your strike count. However, a Moderator may hand out a manual punishment on your auto-moderation infraction, if you have violated a server rule.",
            "color": 3447003
        }

        const punishList3 = {
            "title": "Appealing",
            "description": "All Manual Moderation Punishments can be appealed to remove the infraction from your Moderation Logs. You can appeal each punishment ONCE. \nAuto-Moderation Infractions do not count towards your strike count, thus cannot be appealed.",
            "color": 2359049,
            "fields": [{
                "name": "__Appeal a Strike/Mute/Kick__",
                "value": "You must DM the <@575252669443211264> bot the punishment you are appealing for, and your appeal message."
            },
            {
                "name": "__Appeal a Ban__",
                "value": "You must file a ban appeal through the __[Ban Appeals Server](https://discord.gg/d4kCrjt)__."
            },
            {
                "name": "__What is included in an appeal?__",
                "value": "An appeal message can be but is not limited to: An explanation of what happened, an apology, or your justification for your actions if you felt they were fair."
            },
            {
                "name": "__What happens once the appeal is filed?__",
                "value": "Once you file an appeal, it will be gone over by the server staff - Moderators, Administrators and I Talk. \nIf the appeal is accepted, the punishment will be removed from the moderation logs. If it is rejected, it will stay on the logs, and you will be unable to appeal again.\n\`\`\` \`\`\`\n**You can DM <@575252669443211264> to get a list of your currently active punishments.**"
            }
            ]
        }

        if (message.channel.type === "dm") {
            message.author.send({
                embed: punishList1
            }).then((message1) => {
                message.author.send({
                    embed: punishList2
                }).then((message2) => {
                    message.author.send({
                        embed: punishList3
                    }).then((message3) => {
                        message3.pin();
                        message2.pin();
                        message1.pin();
                    });
                });
            });
        } else if (message.channel.type === "text") {
            if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;
            message.delete();

            const punishListEmbed = new Discord.MessageEmbed()
                .setAuthor(`Punishment List`, client.user.displayAvatarURL())
                .setDescription(`This is the agenda regarding Moderation infractions.\nFor more information, DM <@363766977585479680> \`+punishmentlist\`.`)
                .addField(`Infractions`, `\`Infraction 1\`: 15m Mute\n\`Infraction 2\`: 1h Mute\n\`Infraction 3\`: 6h Mute\n\`Infraction 4\`: 24h Mute\n\`Infraction 5\`: Ban`)
                .setColor("ff0000")

            message.channel.send({
                embed: punishListEmbed
            });
        }
    }
});

client.on('message', message => {
    if (message.channel.type !== "news") return;
    message.crosspost();
});

client.on('message', message => {
    if (message.channel.id !== "685885174025814049") return;
    if (message.author.bot) return;

    if (!message.content.startsWith(`+appeal `)) {
        return message.delete();
    }
});

client.on('message', message => {
    if (message.guild === null) return;

    if (message.content.startsWith(`+disable`) || message.content.startsWith(`+disablecmd`)) {
        if (message.author.id !== "528759471514845194" && !message.member.roles.cache.has("614196214078111745")) return;
        message.delete();

        const command = message.content.split(" ")[1];

        if (!command) return message.channel.send(`**[🚫] ${message.author.username}**, please provide a command name to disable.\n*(Command aliases will not work with this.)*`).then(m => m.delete({
            timeout: 5000
        }));
        if (!client.commands.get(command)) return message.channel.send(`**[🚫] ${message.author.username}**, that command wasn't found. Ensure you aren't using an alias name?`).then(m => m.delete({
            timeout: 5000
        }));

        disabledCommands.push(command);
        message.channel.send(`**[🚫] ${message.author.username}**, \`+${command}\` has been disabled and will no longer execute.`);
    } else if (message.content.startsWith(`+enable`) || message.content.startsWith(`+enablecmd`)) {
        if (message.author.id !== "528759471514845194" && !message.member.roles.cache.has("614196214078111745")) return;
        message.delete();

        const command = message.content.split(" ")[1];

        if (!command) return message.channel.send(`**[✅] ${message.author.username}**, please provide a command name to enable.\n*(Command aliases will not work with this.)*`).then(m => m.delete({
            timeout: 5000
        }));
        if (!client.commands.get(command)) return message.channel.send(`**[✅] ${message.author.username}**, that command wasn't found. Ensure you aren't using an alias name?`).then(m => m.delete({
            timeout: 5000
        }));

        disabledCommands = disabledCommands.filter(filterE => filterE !== command);
        message.channel.send(`**[✅] ${message.author.username}**, \`+${command}\` has been enabled.`);
    }
});

client.login(process.env.token);