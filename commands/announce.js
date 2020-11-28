const Discord = require("discord.js");
const {
    Client,
    MessageEmbed
} = require("discord.js");
const client = new Discord.Client();

module.exports = {
    name: 'announce',
    description: '[PROMPT] This will announce any message ranging from embeds, plain text, or both. <[setPrefix]announce>',
    execute(message, args) {
        var header;
        var footer;
        var color;

        var aText;

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        message.channel.send(`**[🔎] ${message.author.username}**, would you like this to be an **embed**? (yes/no/both)\n(**New Feature!**: Selecting 'both' will give you the option to have text above an embed).`).then(msg => {
            message.delete();
            const embedQuestion = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no') || m.content.toLowerCase().startsWith('both'));
            message.channel.awaitMessages(embedQuestion, {
                max: 1,
                time: 999999,
                errors: ['time']
            }).then(collected => {
                collected.first().delete()
                var answer = collected.first();

                if (answer.content.toLowerCase().startsWith('yes')) {
                    msg.edit(`**[🔎] ${message.author.username}**, please enter a **title** for your embed (character limit: 256).`)

                    const titleQuestion = m => m.author.id === message.author.id && m.content.length < 256;
                    message.channel.awaitMessages(titleQuestion, {
                        max: 1,
                        time: 999999,
                        errors: ['time']
                    }).then(collected => {
                        collected.first().delete()
                        var answer = collected.first();
                        header = answer.content;
                        msg.edit(`**[🔎] ${message.author.username}**, please enter a **description** for your embed (character limit: 2,048).`)

                        const descQuestion = m => m.author.id === message.author.id && m.content.length < 2048;
                        message.channel.awaitMessages(descQuestion, {
                            max: 1,
                            time: 999999,
                            errors: ['time']
                        }).then(collected => {
                            collected.first().delete()
                            var answer = collected.first();
                            footer = answer.content;
                            msg.edit(`**[🔎] ${message.author.username}**, what **color** would you like this embed to be? **[HEX code]** (7289da for Blurple).`)

                            const colorQuestion = m => m.author.id === message.author.id && m.content.length === 6;
                            message.channel.awaitMessages(colorQuestion, {
                                max: 1,
                                time: 999999,
                                errors: ['time']
                            }).then(collected => {
                                collected.first().delete()
                                var answer = collected.first();
                                color = answer.content;
                                msg.edit(`**[🔎] ${message.author.username}**, are there any **attachments** you would like to add to this embed? Please say "no" if none.\n(**Please do not delete this message while this command is in progress or the image will not show up correctly.)**`)

                                const imgQuestion = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('no') || m.attachments.size > 0);
                                message.channel.awaitMessages(imgQuestion, {
                                    max: 1,
                                    time: 999999,
                                    errors: ['time']
                                }).then(collected => {
                                    var attachments3;
                                    if (collected.first().attachments.size > 0) {
                                        collected.first().attachments.forEach(attachment => {
                                            attachments3 = attachment.url;
                                        });
                                    } else {
                                        collected.first().delete()
                                    }
                                    if (answer.content.toLowerCase().startsWith('no')) {
                                        msg.edit(`**[🔎] ${message.author.username}**, what **channel** would you like this to be sent to? **Please mention it (e.g. "<#614193406842765375>")**.`)
                                        const channelQuestion6 = m => m.author.id === message.author.id && m.mentions.channels.first();
                                        message.channel.awaitMessages(channelQuestion6, {
                                            max: 1,
                                            time: 999999,
                                            errors: ['time']
                                        }).then(collected => {
                                            collected.first().delete()
                                            var answer = collected.first();
                                            var channelTo = collected.first().mentions.channels.first();
                                            const customEmbed = new Discord.MessageEmbed()
                                                .setFooter(footer)
                                                .setDescription(text)
                                                .setColor(color)

                                            message.channel.send(customEmbed)
                                            msg.edit(`**[📢] ${message.author.username}**, this **embed announcement** will be sent to ${channelTo}. Please **confirm** whether or not to send this: say "yes" to send, and "no" to cancel.`)

                                            const confirmationOne = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                            message.channel.awaitMessages(confirmationOne, {
                                                max: 1,
                                                time: 999999,
                                                errors: ['time']
                                            }).then(collected => {
                                                collected.first().delete()
                                                if (collected.first().content.toLowerCase().startsWith('yes')) {
                                                    channelTo.send(customEmbed)
                                                    message.channel.send(`Sent!`).then(m => m.delete({
                                                        timeout: 5000
                                                    }));
                                                }

                                                if (collected.first().content.toLowerCase().startsWith('no')) {
                                                    return message.channel.send(`**[❌] ${message.author.username}**, alrighty! Your request has been cancelled. Please **restart** and feel free to make any adjustments.`)
                                                }
                                            });
                                        });
                                        return;
                                    }
                                    msg.edit(`**[🔎] ${message.author.username}**, what **channel** would you like this to be sent to? **Please mention it (e.g. "<#614193406842765375>")**.`)
                                    const channelQuestion = m => m.author.id === message.author.id && m.mentions.channels.first();
                                    message.channel.awaitMessages(channelQuestion, {
                                        max: 1,
                                        time: 999999,
                                        errors: ['time']
                                    }).then(collected => {
                                        collected.first().delete()
                                        var answer = collected.first();
                                        var channelTo = collected.first().mentions.channels.first();
                                        const customEmbed = new Discord.MessageEmbed()
                                            .setTitle(header)
                                            .setDescription(footer)
                                            .setColor(color)
                                            .setImage(attachments3)

                                        message.channel.send(customEmbed)
                                        msg.edit(`**[📢] ${message.author.username}**, this **embed announcement** will be sent to ${channelTo}. Please **confirm** whether or not to send this: say "yes" to send, and "no" to cancel.`)

                                        const confirmationOne1 = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                        message.channel.awaitMessages(confirmationOne1, {
                                            max: 1,
                                            time: 999999,
                                            errors: ['time']
                                        }).then(collected => {
                                            collected.first().delete()
                                            if (collected.first().content.toLowerCase().startsWith('yes')) {
                                                channelTo.send(customEmbed)
                                                message.channel.send(`Sent!`).then(m => m.delete({
                                                    timeout: 5000
                                                }));
                                            }
                                            if (collected.first().content.toLowerCase().startsWith('no')) {
                                                return message.channel.send(`**[❌] ${message.author.username}**, alrighty! Your request has been cancelled. Please **restart** and feel free to make any adjustments.`)
                                            }
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
                if (answer.content.toLowerCase().startsWith('no')) {
                    var text;

                    msg.edit(`**[🔎] ${message.author.username}**, please enter the **text** for your announcement.`).then(msg => {
                        const textQuestion = m => m.author.id === message.author.id;
                        message.channel.awaitMessages(textQuestion, {
                            max: 1,
                            time: 999999,
                            errors: ['time']
                        }).then(collected => {
                            collected.first().delete()
                            var answer = collected.first();
                            text = answer.content;
                            msg.edit(`**[🔎] ${message.author.username}**, are there any **attachments** you would like to add to this announcement? Please say "no" if none.\n(**Please do not delete this message while this command is in progress or the image will not show up correctly.)**`)

                            const imgQuestionTwo = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('no') || m.attachments.size > 0);
                            message.channel.awaitMessages(imgQuestionTwo, {
                                max: 1,
                                time: 999999,
                                errors: ['time']
                            }).then(collected => {
                                var answer = collected.first();
                                var attachments4;
                                if (collected.first().attachments.size > 0) {
                                    collected.first().attachments.forEach(attachment => {
                                        attachments4 = attachment.url;
                                    });
                                }
                                if (answer.content.toLowerCase().startsWith('no')) {
                                    collected.first().delete()
                                    msg.edit(`**[🔎] ${message.author.username}**, what **channel** would you like this to be sent to? **Please mention it (e.g. "<#614193406842765375>")**.`)

                                    const channelQuestion7 = m => m.author.id === message.author.id && m.mentions.channels.first();
                                    message.channel.awaitMessages(channelQuestion7, {
                                        max: 1,
                                        time: 999999,
                                        errors: ['time']
                                    }).then(collected => {
                                        collected.first().delete()
                                        var answer = collected.first();
                                        var channelTo = collected.first().mentions.channels.first();
                                        message.channel.send(`${text}`)
                                        msg.edit(`**[📢] ${message.author.username}**, this **text announcement** will be sent to ${channelTo}. Please **confirm** whether or not to send this: say "yes" to send, and "no" to cancel.`)

                                        const confirmationTwo = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                        message.channel.awaitMessages(confirmationTwo, {
                                            max: 1,
                                            time: 999999,
                                            errors: ['time']
                                        }).then(collected => {
                                            collected.first().delete()
                                            if (collected.first().content.toLowerCase().startsWith('yes')) {
                                                channelTo.send(text)
                                                message.channel.send(`Sent!`).then(m => m.delete({
                                                    timeout: 5000
                                                }))
                                            }
                                            if (collected.first().content.toLowerCase().startsWith('no')) {
                                                return message.channel.send(`**[❌] ${message.author.username}**, alrighty! Your request has been cancelled. Please **restart** and feel free to make any adjustments.`)
                                            }
                                        });

                                    });
                                    return;
                                }
                                msg.edit(`**[🔎] ${message.author.username}**, what **channel** would you like this to be sent to? **Please mention it (e.g. "<#614193406842765375>")**.`)
                                const channelQuestion8 = m => m.author.id === message.author.id && m.mentions.channels.first();
                                message.channel.awaitMessages(channelQuestion8, {
                                    max: 1,
                                    time: 999999,
                                    errors: ['time']
                                }).then(collected => {
                                    collected.first().delete()
                                    var channelTo = collected.first().mentions.channels.first();
                                    message.channel.send(text, {
                                        files: [attachments4]
                                    })
                                    msg.edit(`**[📢] ${message.author.username}**, this **text announcement** will be sent to ${channelTo}. Please **confirm** whether or not to send this: say "yes" to send, and "no" to cancel.`)
                                    const confirmationTwo1 = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                    message.channel.awaitMessages(confirmationTwo1, {
                                        max: 1,
                                        time: 999999,
                                        errors: ['time']
                                    }).then(collected => {
                                        collected.first().delete()
                                        if (collected.first().content.toLowerCase().startsWith('yes')) {
                                            channelTo.send(text, {
                                                files: [attachments4]
                                            });
                                            message.channel.send(`Sent!`).then(m => m.delete({
                                                timeout: 5000
                                            }));
                                        }
                                        if (collected.first().content.toLowerCase().startsWith('no')) {
                                            return message.channel.send(`**[❌] ${message.author.username}**, alrighty! Your request has been cancelled. Please **restart** and feel free to make any adjustments.`)
                                        }
                                    });
                                });
                            });
                        });
                    })
                }
                if (answer.content.toLowerCase().startsWith('both')) {
                    msg.edit(`**[🔎] ${message.author.username}**, please enter **text** for your announcement.`)

                    const textQuestion = m => m.author.id === message.author.id;
                    message.channel.awaitMessages(textQuestion, {
                        max: 1,
                        time: 999999,
                        errors: ['time']
                    }).then(collected => {
                        collected.first().delete();
                        aText = collected.first().content;

                        msg.edit(`**[🔎] ${message.author.username}**, please enter a **title** for your embed (character limit: 256).`)

                        const titleQuestion = m => m.author.id === message.author.id && m.content.length < 256;
                        message.channel.awaitMessages(titleQuestion, {
                            max: 1,
                            time: 999999,
                            errors: ['time']
                        }).then(collected => {
                            collected.first().delete()
                            var answer = collected.first();
                            header = answer.content;
                            msg.edit(`**[🔎] ${message.author.username}**, please enter a **description** for your embed (character limit: 2,048).`)

                            const descQuestion = m => m.author.id === message.author.id && m.content.length < 2048;
                            message.channel.awaitMessages(descQuestion, {
                                max: 1,
                                time: 999999,
                                errors: ['time']
                            }).then(collected => {
                                collected.first().delete()
                                var answer = collected.first();
                                footer = answer.content;
                                msg.edit(`**[🔎] ${message.author.username}**, what **color** would you like this embed to be? **[HEX code]** (7289da for Blurple).`)

                                const colorQuestion = m => m.author.id === message.author.id && m.content.length === 6;
                                message.channel.awaitMessages(colorQuestion, {
                                    max: 1,
                                    time: 999999,
                                    errors: ['time']
                                }).then(collected => {
                                    collected.first().delete()
                                    var answer = collected.first();
                                    color = answer.content;
                                    msg.edit(`**[🔎] ${message.author.username}**, are there any **attachments** you would like to add to this embed? Please say "no" if none.\n(**Please do not delete this message while this command is in progress or the image will not show up correctly.)**`)

                                    const imgQuestion = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('no') || m.attachments.size > 0);
                                    message.channel.awaitMessages(imgQuestion, {
                                        max: 1,
                                        time: 999999,
                                        errors: ['time']
                                    }).then(collected => {
                                        var attachments3;
                                        if (collected.first().attachments.size > 0) {
                                            collected.first().attachments.forEach(attachment => {
                                                attachments3 = attachment.url;
                                            });
                                        } else {
                                            collected.first().delete()
                                        }
                                        if (answer.content.toLowerCase().startsWith('no')) {
                                            msg.edit(`**[🔎] ${message.author.username}**, what **channel** would you like this to be sent to? **Please mention it (e.g. "<#614193406842765375>")**.`)
                                            const channelQuestion6 = m => m.author.id === message.author.id && m.mentions.channels.first();
                                            message.channel.awaitMessages(channelQuestion6, {
                                                max: 1,
                                                time: 999999,
                                                errors: ['time']
                                            }).then(collected => {
                                                collected.first().delete()
                                                var answer = collected.first();
                                                var channelTo = collected.first().mentions.channels.first();
                                                const customEmbed = new Discord.MessageEmbed()
                                                    .setFooter(footer)
                                                    .setDescription(text)
                                                    .setColor(color)

                                                message.channel.send(`${aText}`, {
                                                    embed: customEmbed
                                                });
                                                msg.edit(`**[📢] ${message.author.username}**, this **embed announcement** will be sent to ${channelTo}. Please **confirm** whether or not to send this: say "yes" to send, and "no" to cancel.`)

                                                const confirmationOne = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                                message.channel.awaitMessages(confirmationOne, {
                                                    max: 1,
                                                    time: 999999,
                                                    errors: ['time']
                                                }).then(collected => {
                                                    collected.first().delete()
                                                    if (collected.first().content.toLowerCase().startsWith('yes')) {
                                                        channelTo.send(`${aText}`, {
                                                            embed: customEmbed
                                                        })
                                                        message.channel.send(`Sent!`).then(m => m.delete({
                                                            timeout: 5000
                                                        }));
                                                    }

                                                    if (collected.first().content.toLowerCase().startsWith('no')) {
                                                        return message.channel.send(`**[❌] ${message.author.username}**, alrighty! Your request has been cancelled. Please **restart** and feel free to make any adjustments.`)
                                                    }
                                                });
                                            });
                                            return;
                                        }
                                        msg.edit(`**[🔎] ${message.author.username}**, what **channel** would you like this to be sent to? **Please mention it (e.g. "<#614193406842765375>")**.`)
                                        const channelQuestion = m => m.author.id === message.author.id && m.mentions.channels.first();
                                        message.channel.awaitMessages(channelQuestion, {
                                            max: 1,
                                            time: 999999,
                                            errors: ['time']
                                        }).then(collected => {
                                            collected.first().delete()
                                            var answer = collected.first();
                                            var channelTo = collected.first().mentions.channels.first();
                                            const customEmbed = new Discord.MessageEmbed()
                                                .setTitle(header)
                                                .setDescription(footer)
                                                .setColor(color)
                                                .setImage(attachments3)

                                            message.channel.send(`${aText}`, {
                                                embed: customEmbed
                                            });
                                            msg.edit(`**[📢] ${message.author.username}**, this **embed announcement** will be sent to ${channelTo}. Please **confirm** whether or not to send this: say "yes" to send, and "no" to cancel.`)

                                            const confirmationOne1 = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                            message.channel.awaitMessages(confirmationOne1, {
                                                max: 1,
                                                time: 999999,
                                                errors: ['time']
                                            }).then(collected => {
                                                collected.first().delete()
                                                if (collected.first().content.toLowerCase().startsWith('yes')) {
                                                    channelTo.send(`${aText}`, {
                                                        embed: customEmbed
                                                    });
                                                    message.channel.send(`Sent!`).then(m => m.delete({
                                                        timeout: 5000
                                                    }));
                                                }
                                                if (collected.first().content.toLowerCase().startsWith('no')) {
                                                    return message.channel.send(`**[❌] ${message.author.username}**, alrighty! Your request has been cancelled. Please **restart** and feel free to make any adjustments.`)
                                                }
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                }
            });
        })
    }
}