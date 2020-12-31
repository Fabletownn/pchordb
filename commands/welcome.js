const Discord = require("discord.js");
const WEL = require("../models/welcome.js");

module.exports = {
    name: 'welcome',
    description: '[MODERATION] This will change the welcome message for when new members join the server. <[setPrefix]welcome <message>>',
    execute(message) {
        const client = message.client;
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        let messageArguments = message.content.split(" ")[1];
        let welcomeContent = message.content.replace(`+welcome `, ``);

        if (!messageArguments || !welcomeContent) return message.channel.send(`**[👋] ${message.author.username}**, please ensure you're inputting a message to welcome members with: variables are given below.\n\`\`\`\n{user} : @User\n{user.tag} : User#0000\n{user.id} : User ID\n\n{guild.name} : Guild Name\n{member.count} : Member Count\`\`\``).then(m => m.delete({
            timeout: 20000
        }));

        if (welcomeContent.toLowerCase() === "clear" || welcomeContent.toLowerCase() === "remove") {
            WEL.deleteMany().then(() => {
                message.channel.send(`**[👋] ${message.author.username}**, successfully removed the welcome message!\nMembers will not be welcomed upon arrival.`).then(m => m.delete({
                    timeout: 10000
                }));
            });
            return;
        }

        if (welcomeContent.toLowerCase() === "show") {
            WEL.findOne({
                guildID: message.guild.id,
            }, (err, data) => {
                if (err) return console.log(err)
                if (!data) return message.channel.send(`**[👋] ${message.author.username}**, there is currently no welcome message set. Feel free to set one!`).then(m => m.delete({
                    timeout: 10000
                }));

                message.delete();

                let welcomeMessageUserTagA = data.welcomeMessage.replace(`{user.tag}`, message.author.tag)
                let welcomeMessageUserA = welcomeMessageUserTagA.replace(`{user}`, message.author)
                let welcomeMessageUserIDA = welcomeMessageUserA.replace(`{user.id}`, message.author.id)
                let welcomeMessageGuildNameA = welcomeMessageUserIDA.replace(`{guild.name}`, message.guild.name)
                let welcomeMessageContentA = welcomeMessageGuildNameA.replace(`{member.count}`, parseInt(client.guilds.cache.get(message.guild.id).members.cache.filter(member => !member.user.bot).size.toLocaleString()) + 1)

                message.channel.send(`**[👋] ${message.author.username}**, the current set welcome message is shown below. Feel free to edit accordingly.\n\`\`\`\n${welcomeMessageContentA}\`\`\``).then(m => m.delete({
                    timeout: 30000
                }));
            });
            return;
        }

        WEL.findOne({
            guildID: message.guild.id,
        }, (err, data) => {
            if (err) return console.log(err)
            if (!data) {
                const newWELData = new WEL({
                    guildID: message.guild.id,
                    welcomeMessage: welcomeContent
                });
                newWELData.save().catch(err => console.log(err))
                message.channel.send(`**[👋] ${message.author.username}**, the new welcome message has been set: the message is shown below.\n**If you'd like to see how this looks, just say "show" sometime in the next 30 seconds**.\n\`\`\`${welcomeContent}\`\`\``).then(m => m.delete({
                    timeout: 30000
                }));
                const showRequest = m => m.author.id === message.author.id && m.content.toLowerCase().includes("show")
                message.channel.awaitMessages(showRequest, {
                    max: 1,
                    time: 30000,
                    errors: ['time']
                }).then(collected => {
                    if (data.welcomeMessage === null) return message.channel.send(`An error occurred: this usually happens when data is first placed into the database.\nFeel free to run the command again for this to work properly.`).then(m => m.delete({
                        timeout: 10000
                    }));
                    collected.first().delete();

                    let welcomeMessageUserTagA = data.welcomeMessage.replace(`{user.tag}`, message.author.tag)
                    let welcomeMessageUserA = welcomeMessageUserTagA.replace(`{user}`, message.author)
                    let welcomeMessageUserIDA = welcomeMessageUserA.replace(`{user.id}`, message.author.id)
                    let welcomeMessageGuildNameA = welcomeMessageUserIDA.replace(`{guild.name}`, message.guild.name)
                    let welcomeMessageContentA = welcomeMessageGuildNameA.replace(`{member.count}`, parseInt(client.guilds.cache.get(message.guild.id).members.cache.filter(member => !member.user.bot).size.toLocaleString()) + 1)

                    message.channel.send(welcomeMessageContentA).then(m => m.delete({
                        timeout: 30000
                    }));
                }).catch(error => {
                    console.log(error);
                    return message.channel.send(`An error occurred: this usually happens when data is first placed into the database.\nFeel free to run the command again for this to work properly.`).then(m => m.delete({
                        timeout: 10000
                    }));
                });
            } else {
                data.guildID = message.guild.id;
                data.welcomeMessage = welcomeContent;

                data.save().catch(err => console.log(err))
                message.channel.send(`**[👋] ${message.author.username}**, the new welcome message has been successfully updated: the message is shown below.\n**If you'd like to see how this looks, just say "show" sometime in the next 30 seconds**.\n\`\`\`${welcomeContent}\`\`\``).then(m => m.delete({
                    timeout: 30000
                }));
                const showRequest = m => m.author.id === message.author.id && m.content.toLowerCase().includes("show")
                message.channel.awaitMessages(showRequest, {
                    max: 1,
                    time: 30000,
                    errors: ['time']
                }).then(collected => {
                    collected.first().delete();

                    let welcomeMessageUserTagA = data.welcomeMessage.replace(`{user.tag}`, message.author.tag)
                    let welcomeMessageUserA = welcomeMessageUserTagA.replace(`{user}`, message.author)
                    let welcomeMessageUserIDA = welcomeMessageUserA.replace(`{user.id}`, message.author.id)
                    let welcomeMessageGuildNameA = welcomeMessageUserIDA.replace(`{guild.name}`, message.guild.name)
                    let welcomeMessageContentA = welcomeMessageGuildNameA.replace(`{member.count}`, parseInt(client.guilds.cache.get(message.guild.id).members.cache.filter(member => !member.user.bot).size.toLocaleString()) + 1)

                    message.channel.send(welcomeMessageContentA).then(m => m.delete({
                        timeout: 30000
                    }));
                }).catch(error => {
                    console.log(error);
                    return message.channel.send(`An error occurred: this usually happens when data is first placed into the database.\nFeel free to run the command again for this to work properly.`).then(m => m.delete({
                        timeout: 10000
                    }));
                });
            }
        });
    }
}