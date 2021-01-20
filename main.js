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

            client.channels.cache.get('789056873437331456').send(`${newState.member}, use this channel for text communication for the Livestream Voice Channel!`).then(m => m.delete({
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

            client.channels.cache.get('789056873437331456').send(`${newState.member}, use this channel for text communication for the Gaming Voice Channel!`).then(m => m.delete({
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
    if (oldMessage.guild.id !== "614193406838571085" && oldMessage.guild.id !== "797142251712151583") return;

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
    if (deletedMessage.guild.id !== "614193406838571085" && deletedMessage.guild.id !== "797142251712151583") return;

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

            if (deletedMessage.guild.id === "614193406838571085") {
                return client.channels.cache.get("690601497767182436").send({
                    embed: deleteAttachmentEmbed
                });
            } else if (deletedMessage.guild.id === "797142251712151583") {
                return client.channels.cache.get("799329445555077120").send({
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
        .addField(`Deleted Message`, `${deletedMessage.content.substr(0, 1024) || `No content fetched. This was one of the following:\n- an attachment, which is now inaccessible.\n- a Spotify Invite.`}`)
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
    } else {
        return;
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

        let moderatorR = message.guild.roles.cache.find(r => r.name === "Moderator");

        if (message.guild.id === "614193406838571085" && message.content.startsWith(commandPrefix)) {
            if (!message.content.startsWith(`+assistance`)) {
                if (!message.member.roles.cache.has(moderatorR.id) && message.author.id !== "528759471514845194") return;
            }
        }

        if (message.guild.id === "797142251712151583" && (message.content.startsWith(`${commandPrefix}`) && !message.content.startsWith(`${commandPrefix}purge`) && !message.content.startsWith(`${commandPrefix}ping`) && !message.content.startsWith(`${commandPrefix}announce`) && !message.content.startsWith(`${commandPrefix}say`) && !message.content.startsWith(`${commandPrefix}assistance`) && !message.content.startsWith(`${commandPrefix}slowmode`) && !message.content.startsWith(`${commandPrefix}mcserverinfo`) && !message.content.startsWith(`${commandPrefix}mcrules`) && !message.content.startsWith(`${commandPrefix}fetchbans`) && !message.content.startsWith(`${commandPrefix}mccolorlock`) && !message.content.startsWith(`${commandPrefix}edit`))) return;

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
        }
    });
});

client.on('message', message => {
    if (message.guild === null || message.author.bot) return;

    if (message.content === `+assistance`) {
        if (message.guild.id === "614193406838571085") {
            message.channel.send(`<@&672857887894274058> <@&614196214078111745>\nAssistance has been requested!\n`);
        } else {
            message.channel.send(`<@&797809139836911666> <@&797145089297350736>\nAssistance has been requested!\n`);
        }
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
    if (message.channel.type !== "dm") return;

    if (message.content.startsWith(`+blacklist`) || message.content.startsWith(`+blocklist`)) {
        const blacklistEmbed = new Discord.MessageEmbed()
            .setTitle(`Blacklisted Words`)
            .setDescription(`**${message.author.username}**, the following words are banned in the I Talk Server.\n\`\`\`\nnigga, nigger, nibba, nibber, fag, f4g, faggot, f4ggot, chingchong, ching chong, retard, cunt, nazi, penis, vagina, porn, blowjob, handjob, footjob, blow job, hand job, foot job, rule34, r34, rule 34, stripper, milf, hentai, incest, naughtyamerica, naughty america, realityking, reality king, xvideo, bangbro, bang bro, brazzer, faketaxi, fake taxi, coon, anal, cum, cumshot, nude, nudes, chink\n\`\`\`\n- Sending a message which contains any of these words will be auto-deleted by the Auto-Moderation.\n- Attempting to bypass this auto-moderation filter may lead to a punishment being handed out.`)
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
    if (message.channel.id !== "685885174025814049") return;
    if (message.author.bot) return;

    if (!message.content.startsWith(`+appeal `)) {
        return message.delete();
    }
});

client.login(process.env.token);