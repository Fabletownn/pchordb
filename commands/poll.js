const Discord = require("discord.js");
const {
    Client,
    MessageEmbed
} = require("discord.js");
const client = new Discord.Client();

module.exports = {
    name: 'poll',
    description: '[PROMPT] This will run a poll using the details you specified. You are able to freely use any Unicode emojis OR Power Chord UPVOTE/DOWNVOTE emotes as your options. <[setPrefix]poll>',
    execute(message, args) {
        var question;
        var emote1;
        var emote2;
        var anon;

        var alrR = [""];

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        message.channel.send(`**[📌] ${message.author.username}**, what is the **question** you would like to ask? (please ensure your question ends with OR includes a "?")`).then(msg => {
            message.delete();
            const questionQ = m => m.author.id === message.author.id && (m.content.includes("?"))
            message.channel.awaitMessages(questionQ, {
                max: 1,
                time: 999999,
                errors: ['time']
            }).then(collected => {
                collected.first().delete();
                var answer = collected.first();
                question = answer.content;

                msg.edit(`**[👤] ${message.author.username}**, would you like to run this poll **anonymously**? (yes/no)\n*(Your username as well as your profile picture will be shared if no).*`)
                const anonymousQ = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                message.channel.awaitMessages(anonymousQ, {
                    max: 1,
                    time: 999999,
                    errors: ['time']
                }).then(collected => {
                    collected.first().delete();
                    anon = collected.first().content;

                    msg.edit(`**[🐦] ${message.author.username}**, what would you like the **first emoji/reaction** to be? **(please ensure you're using Unicode emojis)** [say "pc" for Power Chord upvotes & downvotes].`)
                    const emojiQ = m => m.author.id === message.author.id && (m.content.match(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g) || m.content.toLowerCase().startsWith('pc'))
                    message.channel.awaitMessages(emojiQ, {
                        max: 1,
                        time: 999999,
                        errors: ['time']
                    }).then(collected => {
                        collected.first().delete();
                        if (collected.first().content.toLowerCase().startsWith('pc')) {
                            msg.edit(`**[📢] ${message.author.username}**, what **channel** would you like to send this poll to? **(please ensure you're mentioning it, e.g. "<#614193406842765375>")**.`);

                            const channelQ = m => m.author.id === message.author.id && m.mentions.channels.first();
                            message.channel.awaitMessages(channelQ, {
                                max: 1,
                                time: 999999,
                                errors: ['time']
                            }).then(collected => {
                                collected.first().delete();
                                var channelTo = collected.first().mentions.channels.first();
                                if (anon === "yes") {
                                    const pollEmbed = new Discord.MessageEmbed()
                                        .setTitle(`A poll has been run! Please vote using the two emojis.`)
                                        .setDescription(`**Q**: ${question}`)
                                        .setColor('eb4bc9')
                                        .setTimestamp()

                                    msg.edit(`**[❓] ${message.author.username}, please confirm whether or not to send this poll**: to send this poll to ${channelTo}, reply with "yes": to restart, reply with "no".`).then(message.channel.send(pollEmbed));
                                    const confirmQ = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                    message.channel.awaitMessages(confirmQ, {
                                        max: 1,
                                        time: 999999,
                                        errors: ['time']
                                    }).then(collected => {
                                        collected.first().delete();
                                        if (collected.first().content === 'yes') {
                                            message.channel.send(`Sent!`).then(m => m.delete({
                                                timeout: 5000
                                            }));
                                            channelTo.send('**If you change your vote (via reactions), that vote is finalized.**')
                                            channelTo.send(pollEmbed).then(msgR => {
                                                msgR.react(`<:zzITFUpvote:778318625328332810>`).then(msgR.react(`<:zzITFDownvote:778318624552779776>`));
                                                const filter = (reaction, user) => reaction.emoji.id === "778318625328332810" || reaction.emoji.id === "778318624552779776" && !user.bot
                                                const collector = msgR.createReactionCollector(filter, {
                                                    time: 999999
                                                });
                                                collector.on('collect', (r, user) => {
                                                    if (alrR.includes(user.id)) {
                                                        r.message.reactions.cache.forEach((reaction) => {
                                                            reaction.message.reactions.cache.first().users.remove(user.id);
                                                            return alrR = alrR.filter(id => id !== user.id);
                                                        });
                                                    }
                                                    alrR.push(user.id);
                                                });
                                            });
                                        } else {
                                            return message.channel.send(`**[❌] ${message.author.username}**, alrighty! Your request has been cancelled. Please **restart** and feel free to make any adjustments.`)
                                        }
                                    });
                                } else if (anon === "no") {
                                    const pollEmbed = new Discord.MessageEmbed()
                                        .setTitle(`A poll has been run! Please vote using the two emojis.`)
                                        .setDescription(`**Q**: ${question}`)
                                        .setColor('eb4bc9')
                                        .setThumbnail(collected.first().author.displayAvatarURL({
                                            dynamic: true
                                        }))
                                        .setFooter(`This poll has been run by ${collected.first().author.tag}.`)
                                        .setTimestamp()

                                    msg.edit(`**[❓] ${message.author.username}, please confirm whether or not to send this poll**: to send this poll to ${channelTo}, reply with "yes": to restart, reply with "no".`).then(message.channel.send(pollEmbed));
                                    const confirmQ = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                    message.channel.awaitMessages(confirmQ, {
                                        max: 1,
                                        time: 999999,
                                        errors: ['time']
                                    }).then(collected => {
                                        collected.first().delete();
                                        if (collected.first().content === 'yes') {
                                            message.channel.send(`Sent!`).then(m => m.delete({
                                                timeout: 5000
                                            }));
                                            channelTo.send('**If you change your vote (via reactions), that vote is finalized.**')
                                            channelTo.send(pollEmbed).then(msgR => {
                                                msgR.react(`<:zzITFUpvote:778318625328332810>`).then(msgR.react(`<:zzITFDownvote:778318624552779776>`));
                                                const filter = (reaction, user) => reaction.emoji.id === "778318625328332810" || reaction.emoji.id === "778318624552779776" && !user.bot
                                                const collector = msgR.createReactionCollector(filter, {
                                                    time: 999999
                                                });
                                                collector.on('collect', (r, user) => {
                                                    if (alrR.includes(user.id)) {
                                                        r.message.reactions.cache.forEach((reaction) => {
                                                            reaction.message.reactions.cache.first().users.remove(user.id);
                                                            return alrR = alrR.filter(id => id !== user.id);
                                                        });
                                                    }
                                                    alrR.push(user.id);
                                                });
                                            });
                                        } else {
                                            return message.channel.send(`**[❌] ${message.author.username}**, alrighty! Your request has been cancelled. Please **restart** and feel free to make any adjustments.`)
                                        }
                                    });
                                }
                            });
                        } else {
                            emote1 = collected.first().content;
                            msg.edit(`**[🐦] ${message.author.username}**, what would you like the **second emoji/reaction** to be? **(please ensure you're using Unicode emojis)**.`)
                            const emoteTwo = m => m.author.id === message.author.id && (m.content.match(/(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g)) && !m.content.includes(emote1);
                            message.channel.awaitMessages(emoteTwo, {
                                max: 1,
                                time: 999999,
                                errors: ['time']
                            }).then(collected => {
                                collected.first().delete();
                                emote2 = collected.first().content;
                                msg.edit(`**[📢] ${message.author.username}**, what **channel** would you like to send this poll to? **(please ensure you're mentioning it, e.g. "<#614193406842765375>").**`);

                                const channelQ = m => m.author.id === message.author.id && m.mentions.channels.first();
                                message.channel.awaitMessages(channelQ, {
                                    max: 1,
                                    time: 999999,
                                    errors: ['time']
                                }).then(collected => {
                                    collected.first().delete();
                                    var channelTo = collected.first().mentions.channels.first();
                                    if (anon === "yes") {
                                        const pollEmbed = new Discord.MessageEmbed()
                                            .setTitle(`A poll has been run! Please vote using the two emojis.`)
                                            .setDescription(`**Q**: ${question}`)
                                            .setColor('eb4bc9')
                                            .setTimestamp()

                                        msg.edit(`**[❓] ${message.author.username}, please confirm whether or not to send this poll**: to send this poll to ${channelTo}, reply with "yes": to restart, reply with "no".`).then(message.channel.send(pollEmbed));
                                        const confirmQ = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                        message.channel.awaitMessages(confirmQ, {
                                            max: 1,
                                            time: 999999,
                                            errors: ['time']
                                        }).then(collected => {
                                            collected.first().delete();
                                            if (collected.first().content === 'yes') {
                                                message.channel.send(`Sent!`).then(m => m.delete({
                                                    timeout: 5000
                                                }));
                                                channelTo.send('**If you change your vote (via reactions), that vote is finalized.**')
                                                channelTo.send(pollEmbed).then(msgR => {
                                                    msgR.react(emote1).then(msgR.react(emote2));
                                                    const filter = (reaction, user) => reaction.emoji.name === emote1 || reaction.emoji.name === emote2 && !user.bot
                                                    const collector = msgR.createReactionCollector(filter, {
                                                        time: 999999
                                                    });
                                                    collector.on('collect', (r, user) => {
                                                        if (alrR.includes(user.id)) {
                                                            r.message.reactions.cache.forEach((reaction) => {
                                                                reaction.message.reactions.cache.first().users.remove(user.id);
                                                                return alrR = alrR.filter(id => id !== user.id);
                                                            });
                                                        }
                                                        alrR.push(user.id);
                                                    });
                                                });
                                            } else {
                                                return message.channel.send(`**[❌] ${message.author.username}**, alrighty! Your request has been cancelled. Please **restart** and feel free to make any adjustments.`)
                                            }
                                        });
                                    } else if (anon === "no") {
                                        const pollEmbed = new Discord.MessageEmbed()
                                            .setTitle(`A poll has been run! Please vote using the two emojis.`)
                                            .setDescription(`**Q**: ${question}`)
                                            .setColor('eb4bc9')
                                            .setThumbnail(collected.first().author.displayAvatarURL({
                                                dynamic: true
                                            }))
                                            .setFooter(`This poll has been run by ${collected.first().author.tag}.`)
                                            .setTimestamp()

                                        msg.edit(`**[❓] ${message.author.username}, please confirm whether or not to send this poll**: to send this poll to ${channelTo}, reply with "yes": to restart, reply with "no".`).then(message.channel.send(pollEmbed));
                                        const confirmQ = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                        message.channel.awaitMessages(confirmQ, {
                                            max: 1,
                                            time: 999999,
                                            errors: ['time']
                                        }).then(collected => {
                                            collected.first().delete();
                                            if (collected.first().content === 'yes') {
                                                message.channel.send(`Sent!`).then(m => m.delete({
                                                    timeout: 5000
                                                }));
                                                channelTo.send('**If you change your vote (via reactions), that vote is finalized.**')
                                                channelTo.send(pollEmbed).then(msgR => {
                                                    msgR.react(emote1).then(msgR.react(emote2));
                                                    const filter = (reaction, user) => reaction.emoji.name === emote1 || reaction.emoji.name === emote2 && !user.bot
                                                    const collector = msgR.createReactionCollector(filter, {
                                                        time: 999999
                                                    });
                                                    collector.on('collect', (r, user) => {
                                                        if (alrR.includes(user.id)) {
                                                            r.message.reactions.cache.forEach((reaction) => {
                                                                reaction.message.reactions.cache.first().users.remove(user.id);
                                                                return alrR = alrR.filter(id => id !== user.id);
                                                            });
                                                        }
                                                        alrR.push(user.id);
                                                    });
                                                });
                                            } else {
                                                return message.channel.send(`**[❌] ${message.author.username}**, alrighty! Your request has been cancelled. Please **restart** and feel free to make any adjustments.`)
                                            }
                                        });
                                    }
                                });
                            });
                        }
                    });
                });
            });
        });
    }
}