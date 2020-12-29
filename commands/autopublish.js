const Discord = require("discord.js");
const PUB = require("../models/publish.js");

module.exports = {
    name: 'autopublish',
    description: '[MODERATION] This will either (view), include, or disclude the mentioned channel from Auto Publisher given the proper parameters. <[setPrefix]autopublish <view/clear/add/remove> <#channel>>',
    execute(message) {
        const client = message.client;
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        let messageArguments = message.content.split(" ");

        let statusAR = messageArguments[1];
        let toChannel = message.mentions.channels.first();

        if (!statusAR) return message.channel.send(`**[📎] ${message.author.username}**, please ensure you're using the parameters properly.\nAdd: Include a channel to Auto Publisher.\nRemove: Disclude a channel from Auto Publisher.`).then(m => m.delete({
            timeout: 10000
        }));
        if (statusAR.toLowerCase() !== "add" && statusAR.toLowerCase() !== "remove" && statusAR.toLowerCase() !== "view" && statusAR.toLowerCase() !== "clear") return message.channel.send(`**[📎] ${message.author.username}**, please ensure you're either using \`add\` or \`remove\` parameters properly.\nAdd: Include a channel to Auto Publisher.\nRemove: Disclude a channel from Auto Publisher.`).then(m => m.delete({
            timeout: 10000
        }));
        if (statusAR.toLowerCase() !== "view" && statusAR.toLowerCase() !== "clear" && !toChannel) return message.channel.send(`**[📎] ${message.author.username}**, please ensure you're mentioning a channel last to include or disclude in Auto Publisher.`).then(m => m.delete({
            timeout: 10000
        }));

        if (statusAR.toLowerCase() === "add") {
            PUB.findOne({
                guildID: message.guild.id,
            }, (err, data) => {
                if (err) return console.log(err)
                if (!data) {

                    const newPUBData = new PUB({
                        guildID: message.guild.id,
                        channelList: ` ${toChannel.id}`
                    });

                    newPUBData.save().catch(err => console.log(err)).then(() => {
                        const publishEmbed = new Discord.MessageEmbed()
                            .setAuthor(`Auto Publishing Channels | Add`, client.user.displayAvatarURL())
                            .addField(`Channel IDs`, toChannel.id + " ")
                            .setFooter(`To remove a channel from this list, use the parameter \`remove\`.`)
                            .setColor('23FF09')

                        message.channel.send(`**[📎] ${message.author.username}**, added the channel ID \`${toChannel.id}\` to the list. The list is shown below.`, {
                            embed: publishEmbed
                        }).then(m => m.delete({
                            timeout: 35000
                        }));
                    });
                } else {
                    if (data.channelList.includes(toChannel.id)) {
                        return message.channel.send(`**[📎] ${message.author.username}**, that channel's ID already exists within the database!`).then(m => m.delete({
                            timeout: 10000
                        }));
                    }

                    data.guildID = message.guild.id;
                    data.channelList = data.channelList + ` ${toChannel.id}`;

                    data.save().catch(err => console.log(err)).then(() => {
                        var IDListB = data.channelList.replace(/\s\s/g, "");
                        var IDList = IDListB.replace(/\s/g, `\n`);

                        const publishEmbed = new Discord.MessageEmbed()
                            .setAuthor(`Auto Publishing Channels | Add`, client.user.displayAvatarURL())
                            .addField(`Channel IDs`, IDList || `This list is empty.`)
                            .setFooter(`To remove a channel from this list, use the parameter \`remove\`.`)
                            .setColor('23FF09')

                        message.channel.send(`**[📎] ${message.author.username}**, added the channel ID \`${toChannel.id}\` to the list. The list is shown below.`, {
                            embed: publishEmbed
                        }).then(m => m.delete({
                            timeout: 35000
                        }));
                    });
                }
            });
        } else if (statusAR.toLowerCase() === "remove") {
            PUB.findOne({
                guildID: message.guild.id,
            }, (err, data) => {
                if (err) return console.log(err)
                if (!data) {
                    return message.channel.send(`**[📎] ${message.author.username}**, failed to remove that channel: no data found!`).then(m => m.delete({
                        timeout: 10000
                    }));
                } else {
                    if (data.channelList.includes(toChannel.id)) {
                        var delChannel = data.channelList.replace(` ${toChannel.id}`, "");

                        data.channelList = delChannel;
                        data.save().catch(err => console.log(err)).then(() => {
                            var IDListB = data.channelList.replace(/\s\s/g, " ");
                            var IDList = IDListB.replace(/\s/g, `\n`);

                            const publishEmbed = new Discord.MessageEmbed()
                                .setAuthor(`Auto Publishing Channels | Remove`, client.user.displayAvatarURL())
                                .addField(`Channel IDs`, IDList || `This list is empty.`)
                                .setFooter(`To add a channel to this list, use the parameter \`add\`.`)
                                .setColor('ff0000')

                            message.channel.send(`**[📎] ${message.author.username}**, removed the channel ID \`${toChannel.id}\` from the list. The list is shown below.`, {
                                embed: publishEmbed
                            }).then(m => m.delete({
                                timeout: 35000
                            }));
                        });
                    } else {
                        return message.channel.send(`**[📎] ${message.author.username}**, failed to remove that channel: no data found!`).then(m => m.delete({
                            timeout: 10000
                        }));
                    }
                }
            });
        } else if (statusAR.toLowerCase() === "view") {
            PUB.findOne({
                guildID: message.guild.id
            }, (err, data) => {
                if (err) return console.log(err);
                if (data) {
                    var IDListB = data.channelList.replace(/\s\s/g, " ");
                    var IDList = IDListB.replace(/\s/g, `\n`);

                    const publishEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Auto Publishing Channels | Viewing`, client.user.displayAvatarURL())
                        .addField(`Channel IDs`, IDList || `This list is empty.`)
                        .setFooter(`To add a channel to this list, use the parameter \`add\`.\nTo remove a channel to this list, use the parameter \`remove\`.`)
                        .setColor('3ba2d4')

                    return message.channel.send(`**[📎] ${message.author.username}**, here's the current Auto Publisher listing:`, {
                        embed: publishEmbed
                    }).then(m => m.delete({
                        timeout: 35000
                    }));
                } else
                if (!data || !data.channelList.match(/[0-9]/)) {
                    const publishEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Auto Publish Channels | Viewing`, client.user.displayAvatarURL())
                        .addField(`Channel IDs`, `This list is empty.`)
                        .setFooter(`To add a channel to this list, use the parameter \`add\`.\nTo remove a channel to this list, use the parameter \`remove\`.`)
                        .setColor('3ba2d4')

                    return message.channel.send(`**[📎] ${message.author.username}**, here's the current Auto Publisher listing:`, {
                        embed: publishEmbed
                    }).then(m => m.delete({
                        timeout: 35000
                    }));
                }
            });
        } else if (statusAR.toLowerCase() === "clear") {
            PUB.deleteMany().catch(error => console.log(error)).then(() => {
                message.channel.send(`**[📎] ${message.author.username}**, the list of Auto Publishing channels has been successfully cleared.`).then(m => m.delete({
                    timeout: 35000
                }));
            });
        } else {
            return message.channel.send(`**[📎] ${message.author.username}**, failed to remove that channel: an error occurred!`).then(m => m.delete({
                timeout: 10000
            }));
        }
    }
}