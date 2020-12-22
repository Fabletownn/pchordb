const Discord = require("discord.js");

module.exports = {
    name: 'announce',
    description: '[MODERATION] This will announce any message ranging from embeds, plain text, or both. <[setPrefix]announce>',
    execute(message) {
        message.delete();

        var header;
        var description;
        var color;
        var eFooter;

        var aText;

        const client = message.client;

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== "789937524763000832") return;

        message.channel.send(`**[📢] ${message.author.username}**, do you want this announcement to be an embed?\n\`yes\` Embed\n\`no\` Regular Text\n\`both\` Regular Text + Embed`).then(msg => {
            const embedQuestion = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no') || m.content.toLowerCase().startsWith('both'));
            message.channel.awaitMessages(embedQuestion, {
                max: 1,
                time: 999999,
                errors: ['time']
            }).then(collected => {
                collected.first().delete()
                var answer = collected.first();

                if (answer.content.toLowerCase().startsWith('yes')) {
                    msg.edit(`**[🔎] ${message.author.username}**, please enter a **title** for your embed.\n\`Character Limit: 256\` `)

                    const titleQuestion = m => m.author.id === message.author.id && m.content.length < 256;
                    message.channel.awaitMessages(titleQuestion, {
                        max: 1,
                        time: 999999,
                        errors: ['time']
                    }).then(collected => {
                        collected.first().delete()
                        var answer = collected.first();
                        header = answer.content;
                        msg.edit(`**[🔎] ${message.author.username}**, please enter a **description** for your embed.\n\`Character Limit: 2,048\` `)

                        const descQuestion = m => m.author.id === message.author.id && m.content.length < 2048;
                        message.channel.awaitMessages(descQuestion, {
                            max: 1,
                            time: 999999,
                            errors: ['time']
                        }).then(collected => {
                            collected.first().delete()
                            var answer = collected.first();
                            description = answer.content;
                            msg.edit(`**[🔎] ${message.author.username}**, please enter a footer for your embed. Say \`no\` to skip. `)

                            const footQuestion = m => m.author.id === message.author.id;
                            message.channel.awaitMessages(footQuestion, {
                                max: 1,
                                time: 999999,
                                errors: ['time']
                            }).then(collected => {
                                collected.first().delete()
                                if (collected.first().content.toLowerCase().startsWith("no")) {
                                    eFooter = collected.first().content;
                                    msg.edit(`**[🔎] ${message.author.username}**, select the **border color hex code**. You can put in one of your own, otherwise a couple are provided below.\nBlurple: \`7289da\`\nGreen: \`23ff09\`\nRed: \`ff0000\` `)

                                    const colorQuestion = m => m.author.id === message.author.id && m.content.length === 6;
                                    message.channel.awaitMessages(colorQuestion, {
                                        max: 1,
                                        time: 999999,
                                        errors: ['time']
                                    }).then(collected => {
                                        collected.first().delete()
                                        var answer = collected.first();
                                        color = answer.content;
                                        msg.edit(`**[🔎] ${message.author.username}**, please enter any attachments to be added to the embed. Say \`no\` to skip.\n**(DO NOT DELETE THE ATTACHMENT AFTER SENDING IT)**`)

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
                                                msg.edit(`**[🔎] ${message.author.username}**, please mention the **channel** you would like to send the announcement in.`)
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
                                                        .setTitle(text)
                                                        .setDescription(description)
                                                        .setColor(color)

                                                    message.channel.send(customEmbed)
                                                    msg.edit(`**[📢] ${message.author.username}**, this embedded announcement will be sent to ${channelTo}.\n\`yes\` Send.\n\`no\` Cancel.`)

                                                    const confirmationOne = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                                    message.channel.awaitMessages(confirmationOne, {
                                                        max: 1,
                                                        time: 999999,
                                                        errors: ['time']
                                                    }).then(collected => {
                                                        collected.first().delete()
                                                        if (collected.first().content.toLowerCase().startsWith('yes')) {
                                                            message.channel.messages.fetch({
                                                                limit: 3,
                                                            }).then((messages) => {
                                                                messages = messages.filter(messages => messages.author.id === client.user.id).array().slice(0, 2);
                                                                message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                                                            }).then(() => {
                                                                msg.delete();

                                                                message.channel.send(`**[📜] ${message.author.username}**, I've sent this embed and it's contents to ${channelTo}:`, {
                                                                    embed: customEmbed
                                                                });

                                                                channelTo.send({
                                                                    embed: customEmbed
                                                                });
                                                            });
                                                        }

                                                        if (collected.first().content.toLowerCase().startsWith('no')) {
                                                            return message.channel.send(`**[❌] ${message.author.username}**, your announcement request has been cancelled: feel free to make any readjustments.`);
                                                        }
                                                    });
                                                });
                                                return;
                                            }
                                            msg.edit(`**[🔎] ${message.author.username}**, please mention the **channel** you would like to send the announcement in.`)
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
                                                    .setDescription(description)
                                                    .setColor(color)
                                                    .setImage(attachments3)

                                                message.channel.send(customEmbed)
                                                msg.edit(`**[📢] ${message.author.username}**, this embedded announcement will be sent to ${channelTo}.\n\`yes\` Send.\n\`no\` Cancel.`)

                                                const confirmationOne1 = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                                message.channel.awaitMessages(confirmationOne1, {
                                                    max: 1,
                                                    time: 999999,
                                                    errors: ['time']
                                                }).then(collected => {
                                                    collected.first().delete()
                                                    if (collected.first().content.toLowerCase().startsWith('yes')) {
                                                        message.channel.messages.fetch({
                                                            limit: 3,
                                                        }).then((messages) => {
                                                            messages = messages.filter(messages => messages.author.id === client.user.id).array().slice(0, 2);
                                                            message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                                                        }).then(() => {
                                                            msg.delete();

                                                            message.channel.send(`**[📜] ${message.author.username}**, I've sent this embed and it's contents to ${channelTo}:`, {
                                                                embed: customEmbed
                                                            });

                                                            channelTo.send({
                                                                embed: customEmbed
                                                            });
                                                        });
                                                    }
                                                    if (collected.first().content.toLowerCase().startsWith('no')) {
                                                        return message.channel.send(`**[❌] ${message.author.username}**, your announcement request has been cancelled: feel free to make any readjustments.`);
                                                    }
                                                });
                                            });
                                        });
                                    });
                                } else {
                                    eFooter = collected.first().content;
                                    msg.edit(`**[🔎] ${message.author.username}**, select the **border color hex code**. You can put in one of your own, otherwise a couple are provided below.\nBlurple: \`7289da\`\nGreen: \`23ff09\`\nRed: \`ff0000\` `)

                                    const colorQuestion = m => m.author.id === message.author.id && m.content.length === 6;
                                    message.channel.awaitMessages(colorQuestion, {
                                        max: 1,
                                        time: 999999,
                                        errors: ['time']
                                    }).then(collected => {
                                        collected.first().delete()
                                        var answer = collected.first();
                                        color = answer.content;
                                        msg.edit(`**[🔎] ${message.author.username}**, please enter any attachments to be added to the embed. Say \`no\` to skip.\n**(DO NOT DELETE THE ATTACHMENT AFTER SENDING IT)**`)

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
                                                msg.edit(`**[🔎] ${message.author.username}**, please mention the **channel** you would like to send the announcement in.`)
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
                                                        .setTitle(text)
                                                        .setDescription(description)
                                                        .setColor(color)
                                                        .setFooter(eFooter || ``)

                                                    message.channel.send(customEmbed)
                                                    msg.edit(`**[📢] ${message.author.username}**, this embedded announcement will be sent to ${channelTo}.\n\`yes\` Send.\n\`no\` Cancel.`)

                                                    const confirmationOne = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                                    message.channel.awaitMessages(confirmationOne, {
                                                        max: 1,
                                                        time: 999999,
                                                        errors: ['time']
                                                    }).then(collected => {
                                                        collected.first().delete()
                                                        if (collected.first().content.toLowerCase().startsWith('yes')) {
                                                            message.channel.messages.fetch({
                                                                limit: 3,
                                                            }).then((messages) => {
                                                                messages = messages.filter(messages => messages.author.id === client.user.id).array().slice(0, 2);
                                                                message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                                                            }).then(() => {
                                                                msg.delete();

                                                                message.channel.send(`**[📜] ${message.author.username}**, I've sent this embed and it's contents to ${channelTo}:`, {
                                                                    embed: customEmbed
                                                                });

                                                                channelTo.send({
                                                                    embed: customEmbed
                                                                });
                                                            });
                                                        }

                                                        if (collected.first().content.toLowerCase().startsWith('no')) {
                                                            return message.channel.send(`**[❌] ${message.author.username}**, your announcement request has been cancelled: feel free to make any readjustments.`);
                                                        }
                                                    });
                                                });
                                                return;
                                            }
                                            msg.edit(`**[🔎] ${message.author.username}**, please mention the **channel** you would like to send the announcement in.`)
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
                                                    .setDescription(description)
                                                    .setColor(color)
                                                    .setImage(attachments3)
                                                    .setFooter(eFooter || ``)

                                                message.channel.send(customEmbed)
                                                msg.edit(`**[📢] ${message.author.username}**, this embedded announcement will be sent to ${channelTo}.\n\`yes\` Send.\n\`no\` Cancel.`)

                                                const confirmationOne1 = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                                message.channel.awaitMessages(confirmationOne1, {
                                                    max: 1,
                                                    time: 999999,
                                                    errors: ['time']
                                                }).then(collected => {
                                                    collected.first().delete()
                                                    if (collected.first().content.toLowerCase().startsWith('yes')) {
                                                        message.channel.messages.fetch({
                                                            limit: 3,
                                                        }).then((messages) => {
                                                            messages = messages.filter(messages => messages.author.id === client.user.id).array().slice(0, 2);
                                                            message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                                                        }).then(() => {
                                                            msg.delete();

                                                            message.channel.send(`**[📜] ${message.author.username}**, I've sent this embed and it's contents to ${channelTo}:`, {
                                                                embed: customEmbed
                                                            });

                                                            channelTo.send({
                                                                embed: customEmbed
                                                            });
                                                        });
                                                    }
                                                    if (collected.first().content.toLowerCase().startsWith('no')) {
                                                        return message.channel.send(`**[❌] ${message.author.username}**, your announcement request has been cancelled: feel free to make any readjustments.`);
                                                    }
                                                });
                                            });
                                        });
                                    });
                                }
                            });
                        });
                    });
                }
                if (answer.content.toLowerCase().startsWith('no')) {
                    var text;

                    msg.edit(`**[🔎] ${message.author.username}**, please enter the **text** for the announcement.\n\`Character Limit: 2,048\` `).then(msg => {
                        const textQuestion = m => m.author.id === message.author.id;
                        message.channel.awaitMessages(textQuestion, {
                            max: 1,
                            time: 999999,
                            errors: ['time']
                        }).then(collected => {
                            collected.first().delete()
                            var answer = collected.first();
                            text = answer.content;
                            msg.edit(`**[🔎] ${message.author.username}**, please enter any attachments to be added to the embed. Say \`no\` to skip.\n**(DO NOT DELETE THE ATTACHMENT AFTER SENDING IT)**`)

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
                                    msg.edit(`**[🔎] ${message.author.username}**, please mention the **channel** you would like to send the announcement in.`)

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
                                        msg.edit(`**[📢] ${message.author.username}**, this text announcement will be sent to ${channelTo}.\n\`yes\` Send.\n\`no\` Cancel.`)

                                        const confirmationTwo = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                        message.channel.awaitMessages(confirmationTwo, {
                                            max: 1,
                                            time: 999999,
                                            errors: ['time']
                                        }).then(collected => {
                                            collected.first().delete()
                                            if (collected.first().content.toLowerCase().startsWith('yes')) {
                                                message.channel.messages.fetch({
                                                    limit: 3,
                                                }).then((messages) => {
                                                    messages = messages.filter(messages => messages.author.id === client.user.id).array().slice(0, 2);
                                                    message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                                                }).then(() => {
                                                    msg.delete();

                                                    message.channel.send(`**[📜] ${message.author.username}**, I've sent this text and it's contents to ${channelTo}:\n${text}`);

                                                    channelTo.send(text);
                                                });
                                            }
                                            if (collected.first().content.toLowerCase().startsWith('no')) {
                                                return message.channel.send(`**[❌] ${message.author.username}**, your announcement request has been cancelled: feel free to make any readjustments.`);
                                            }
                                        });

                                    });
                                    return;
                                }
                                msg.edit(`**[🔎] ${message.author.username}**, please mention the **channel** you would like to send the announcement in.`)
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
                                    msg.edit(`**[📢] ${message.author.username}**, this text announcement will be sent to ${channelTo}.\n\`yes\` Send.\n\`no\` Cancel.`)
                                    const confirmationTwo1 = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                    message.channel.awaitMessages(confirmationTwo1, {
                                        max: 1,
                                        time: 999999,
                                        errors: ['time']
                                    }).then(collected => {
                                        collected.first().delete()
                                        if (collected.first().content.toLowerCase().startsWith('yes')) {
                                            message.channel.messages.fetch({
                                                limit: 3,
                                            }).then((messages) => {
                                                messages = messages.filter(messages => messages.author.id === client.user.id).array().slice(0, 2);
                                                message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                                            }).then(() => {
                                                msg.delete();

                                                message.channel.send(`**[📜] ${message.author.username}**, I've sent this text and it's contents to ${channelTo}:\n${text}`, {
                                                    files: attachments4
                                                });

                                                channelTo.send(text, {
                                                    files: [attachments4]
                                                });
                                            });
                                        }
                                        if (collected.first().content.toLowerCase().startsWith('no')) {
                                            return message.channel.send(`**[❌] ${message.author.username}**, your announcement request has been cancelled: feel free to make any readjustments.`);
                                        }
                                    });
                                });
                            });
                        });
                    })
                }
                if (answer.content.toLowerCase().startsWith('both')) {
                    msg.edit(`**[🔎] ${message.author.username}**, please enter the **text** for the announcement.\n\`Character Limit: 2,048\``)

                    const textQuestion = m => m.author.id === message.author.id;
                    message.channel.awaitMessages(textQuestion, {
                        max: 1,
                        time: 999999,
                        errors: ['time']
                    }).then(collected => {
                        collected.first().delete();
                        aText = collected.first().content;

                        msg.edit(`**[🔎] ${message.author.username}**, please enter a **title** for your embed.\n\`Character Limit: 256\` `)

                        const titleQuestion = m => m.author.id === message.author.id && m.content.length < 256;
                        message.channel.awaitMessages(titleQuestion, {
                            max: 1,
                            time: 999999,
                            errors: ['time']
                        }).then(collected => {
                            collected.first().delete()
                            var answer = collected.first();
                            header = answer.content;
                            msg.edit(`**[🔎] ${message.author.username}**, please enter a **description** for your embed.\n\`Character Limit: 2,048\` `)

                            const descQuestion = m => m.author.id === message.author.id && m.content.length < 2048;
                            message.channel.awaitMessages(descQuestion, {
                                max: 1,
                                time: 999999,
                                errors: ['time']
                            }).then(collected => {
                                collected.first().delete()
                                var answer = collected.first();
                                description = answer.content;
                                msg.edit(`**[🔎] ${message.author.username}**, please enter a footer for your embed. Say \`no\` to skip. `)

                                const footQuestion = m => m.author.id === message.author.id;
                                message.channel.awaitMessages(footQuestion, {
                                    max: 1,
                                    time: 999999,
                                    errors: ['time']
                                }).then(collected => {
                                    collected.first().delete()
                                    if (collected.first().content.toLowerCase().startsWith("no")) {
                                        eFooter = collected.first().content;
                                        msg.edit(`**[🔎] ${message.author.username}**, select the **border color hex code**. You can put in one of your own, otherwise a couple are provided below.\nBlurple: \`7289da\`\nGreen: \`23ff09\`\nRed: \`ff0000\` `)

                                        const colorQuestion = m => m.author.id === message.author.id && m.content.length === 6;
                                        message.channel.awaitMessages(colorQuestion, {
                                            max: 1,
                                            time: 999999,
                                            errors: ['time']
                                        }).then(collected => {
                                            collected.first().delete()
                                            var answer = collected.first();
                                            color = answer.content;
                                            msg.edit(`**[🔎] ${message.author.username}**, please enter any attachments to be added to the embed. Say \`no\` to skip.\n**(DO NOT DELETE THE ATTACHMENT AFTER SENDING IT)**`)

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
                                                    msg.edit(`**[🔎] ${message.author.username}**, please mention the **channel** you would like to send the announcement in.`)
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
                                                            .setTitle(text)
                                                            .setDescription(description)
                                                            .setColor(color)

                                                        message.channel.send(`${aText}`, {
                                                            embed: customEmbed
                                                        });
                                                        msg.edit(`**[📢] ${message.author.username}**, this embedded announcement will be sent to ${channelTo}.\n\`yes\` Send.\n\`no\` Cancel.`)

                                                        const confirmationOne = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                                        message.channel.awaitMessages(confirmationOne, {
                                                            max: 1,
                                                            time: 999999,
                                                            errors: ['time']
                                                        }).then(collected => {
                                                            collected.first().delete()
                                                            if (collected.first().content.toLowerCase().startsWith('yes')) {
                                                                message.channel.messages.fetch({
                                                                    limit: 3,
                                                                }).then((messages) => {
                                                                    messages = messages.filter(messages => messages.author.id === client.user.id).array().slice(0, 2);
                                                                    message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                                                                }).then(() => {
                                                                    msg.delete();

                                                                    message.channel.send(`**[📜] ${message.author.username}**, I've sent this embed and it's contents to ${channelTo}:\n${aText}`, {
                                                                        embed: customEmbed
                                                                    });

                                                                    channelTo.send(aText, {
                                                                        embed: customEmbed
                                                                    });
                                                                });
                                                            }
                                                            if (collected.first().content.toLowerCase().startsWith('no')) {
                                                                return message.channel.send(`**[❌] ${message.author.username}**, your announcement request has been cancelled: feel free to make any readjustments.`);
                                                            }
                                                        });
                                                    });
                                                    return;
                                                }
                                                msg.edit(`**[🔎] ${message.author.username}**, please mention the **channel** you would like to send the announcement in.`)
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
                                                        .setDescription(description)
                                                        .setColor(color)
                                                        .setImage(attachments3)

                                                    message.channel.send(aText, {
                                                        embed: customEmbed
                                                    });
                                                    msg.edit(`**[📢] ${message.author.username}**, this embedded announcement will be sent to ${channelTo}.\n\`yes\` Send.\n\`no\` Cancel.`)

                                                    const confirmationOne1 = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                                    message.channel.awaitMessages(confirmationOne1, {
                                                        max: 1,
                                                        time: 999999,
                                                        errors: ['time']
                                                    }).then(collected => {
                                                        collected.first().delete()
                                                        if (collected.first().content.toLowerCase().startsWith('yes')) {
                                                            message.channel.messages.fetch({
                                                                limit: 3,
                                                            }).then((messages) => {
                                                                messages = messages.filter(messages => messages.author.id === client.user.id).array().slice(0, 2);
                                                                message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                                                            }).then(() => {
                                                                msg.delete();

                                                                message.channel.send(`**[📜] ${message.author.username}**, I've sent this embed and it's contents to ${channelTo}:\n${aText}`, {
                                                                    embed: customEmbed
                                                                });

                                                                channelTo.send(aText, {
                                                                    embed: customEmbed
                                                                });
                                                            });
                                                        }
                                                        if (collected.first().content.toLowerCase().startsWith('no')) {
                                                            return message.channel.send(`**[❌] ${message.author.username}**, your announcement request has been cancelled: feel free to make any readjustments.`);
                                                        }
                                                    });
                                                });
                                            });
                                        });
                                    } else {
                                        eFooter = collected.first().content;
                                        msg.edit(`**[🔎] ${message.author.username}**, select the **border color hex code**. You can put in one of your own, otherwise a couple are provided below.\nBlurple: \`7289da\`\nGreen: \`23ff09\`\nRed: \`ff0000\` `)

                                        const colorQuestion = m => m.author.id === message.author.id && m.content.length === 6;
                                        message.channel.awaitMessages(colorQuestion, {
                                            max: 1,
                                            time: 999999,
                                            errors: ['time']
                                        }).then(collected => {
                                            collected.first().delete()
                                            var answer = collected.first();
                                            color = answer.content;
                                            msg.edit(`**[🔎] ${message.author.username}**, please enter any attachments to be added to the embed. Say \`no\` to skip.\n**(DO NOT DELETE THE ATTACHMENT AFTER SENDING IT)**`)

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
                                                    msg.edit(`**[🔎] ${message.author.username}**, please mention the **channel** you would like to send the announcement in.`)
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
                                                            .setTitle(text)
                                                            .setDescription(description)
                                                            .setColor(color)
                                                            .setFooter(eFooter || ``)

                                                        message.channel.send(aText, {
                                                            embed: customEmbed
                                                        });
                                                        msg.edit(`**[📢] ${message.author.username}**, this embedded announcement will be sent to ${channelTo}.\n\`yes\` Send.\n\`no\` Cancel.`)

                                                        const confirmationOne = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                                        message.channel.awaitMessages(confirmationOne, {
                                                            max: 1,
                                                            time: 999999,
                                                            errors: ['time']
                                                        }).then(collected => {
                                                            collected.first().delete()
                                                            if (collected.first().content.toLowerCase().startsWith('yes')) {
                                                                message.channel.messages.fetch({
                                                                    limit: 3,
                                                                }).then((messages) => {
                                                                    messages = messages.filter(messages => messages.author.id === client.user.id).array().slice(0, 2);
                                                                    message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                                                                }).then(() => {
                                                                    msg.delete();

                                                                    message.channel.send(`**[📜] ${message.author.username}**, I've sent this embed and it's contents to ${channelTo}:\n${aText}`, {
                                                                        embed: customEmbed
                                                                    });

                                                                    channelTo.send(aText, {
                                                                        embed: customEmbed
                                                                    });
                                                                });
                                                            }

                                                            if (collected.first().content.toLowerCase().startsWith('no')) {
                                                                return message.channel.send(`**[❌] ${message.author.username}**, your announcement request has been cancelled: feel free to make any readjustments.`);
                                                            }
                                                        });
                                                    });
                                                    return;
                                                }
                                                msg.edit(`**[🔎] ${message.author.username}**, please mention the **channel** you would like to send the announcement in.`)
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
                                                        .setDescription(description)
                                                        .setColor(color)
                                                        .setImage(attachments3)
                                                        .setFooter(eFooter || ``)

                                                    message.channel.send(aText, {
                                                        embed: customEmbed
                                                    });
                                                    msg.edit(`**[📢] ${message.author.username}**, this embedded announcement will be sent to ${channelTo}.\n\`yes\` Send.\n\`no\` Cancel.`)

                                                    const confirmationOne1 = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith('yes') || m.content.toLowerCase().startsWith('no'));
                                                    message.channel.awaitMessages(confirmationOne1, {
                                                        max: 1,
                                                        time: 999999,
                                                        errors: ['time']
                                                    }).then(collected => {
                                                        collected.first().delete()
                                                        if (collected.first().content.toLowerCase().startsWith('yes')) {
                                                            message.channel.messages.fetch({
                                                                limit: 3,
                                                            }).then((messages) => {
                                                                messages = messages.filter(messages => messages.author.id === client.user.id).array().slice(0, 2);
                                                                message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
                                                            }).then(() => {
                                                                msg.delete();

                                                                message.channel.send(`**[📜] ${message.author.username}**, I've sent this embed and it's contents to ${channelTo}:\n${aText}`, {
                                                                    embed: customEmbed
                                                                });

                                                                channelTo.send(aText, {
                                                                    embed: customEmbed
                                                                });
                                                            });
                                                        }
                                                        if (collected.first().content.toLowerCase().startsWith('no')) {
                                                            return message.channel.send(`**[❌] ${message.author.username}**, your announcement request has been cancelled: feel free to make any readjustments.`);
                                                        }
                                                    });
                                                });
                                            });
                                        });
                                    }
                                });
                            });
                        });
                    });
                }
            });
        });
    }
}