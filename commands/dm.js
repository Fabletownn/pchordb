const Discord = require("discord.js");

module.exports = {
    name: 'dm',
    description: '[MODERATION] Similar to the announce prompt command, this will DM any mention member with a given message. <[setPrefix]dm>',
    execute(message) {
        const client = message.client;
        message.delete();

        var userID;
        var anonymousMode;
        var attachment;

        message.channel.send(`**[📬] ${message.author.username}**, who would you like to privately message?\nEither mention a member, or provide a member's ID. **All messages are logged**.`).then(msg => {
            const userQuestion = m => m.author.id === message.author.id
            message.channel.awaitMessages(userQuestion, {
                max: 1,
                time: 999999,
                errors: ['time']
            }).then(collected => {
                var toUser = collected.first().mentions.users.first();
                if (toUser && message.guild.member(toUser.id)) {
                    userID = toUser.id;
                    collected.first().delete();
                } else if (collected.first().content.length === 18) {
                    userID = collected.first().content;
                    collected.first().delete();
                }

                msg.edit(`**[📬] ${message.author.username}**, would you like this message to be sent anonymously?\nA default Discord profile picture and no name will be sent if yes.`);

                const anonQuestion = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith("yes") || m.content.toLowerCase().startsWith("no"))
                message.channel.awaitMessages(anonQuestion, {
                    max: 1,
                    time: 999999,
                    errors: ['time']
                }).then(collected => {
                    collected.first().delete();
                    if (collected.first().content.toLowerCase() === "yes") {
                        anonymousMode = "yes";
                    } else if (collected.first().content.toLowerCase() === "no") {
                        anonymousMode = "no";
                    }
                    msg.edit(`**[📬] ${message.author.username}**, what message would you like to send?\nAny and all attachments are included.`)

                    const msgQuestion = m => m.author.id === message.author.id
                    message.channel.awaitMessages(msgQuestion, {
                        max: 1,
                        time: 999999,
                        errors: ['time']
                    }).then(collected => {
                        let messageContent = collected.first().content;

                        if (collected.first().attachments.size > 0) {
                            collected.first().attachments.forEach(toAttachment => {
                                attachment = toAttachment.url;
                            });
                        }

                        client.users.fetch(userID).then(user => {
                            collected.first().delete();

                            const DMEmbedNAnon = new Discord.MessageEmbed()
                                .setAuthor(`Message via ${message.author.tag}`, message.author.displayAvatarURL({
                                    dynamic: true
                                }))
                                .setDescription(messageContent)
                                .setImage(attachment || "")
                                .setColor('eb4bc9')
                                .setFooter(`I Talk Server | ${message.guild.id}`, client.user.displayAvatarURL())
                                .setTimestamp()

                            const DMEmbedAnon = new Discord.MessageEmbed()
                                .setAuthor(`Message Received`, `https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/198142ac-f410-423a-bf0b-34c9cb5d9609/dbtif5j-60306864-d6b7-44b6-a9ff-65e8adcfb911.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvMTk4MTQyYWMtZjQxMC00MjNhLWJmMGItMzRjOWNiNWQ5NjA5XC9kYnRpZjVqLTYwMzA2ODY0LWQ2YjctNDRiNi1hOWZmLTY1ZThhZGNmYjkxMS5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.W3KM95rnj_ofajggtIrj5DA6xNti742Ho-VWcV1uYd4`)
                                .setDescription(messageContent)
                                .setImage(attachment || "")
                                .setColor('eb4bc9')
                                .setFooter(`I Talk Server | ${message.guild.id}`, client.user.displayAvatarURL())
                                .setTimestamp()

                            if (anonymousMode === "yes") {
                                user.send({
                                    embed: DMEmbedAnon
                                }).catch(err => {
                                    console.log(`An error occurred trying to DM a user:\n${err}`);
                                    return message.channel.send(`**[📭] ${message.author.username}**, actually, an error occurred. It seems they might have their DMs off. <:peepoChordCry:793887600754556948>`).then(m => m.delete({
                                        timeout: 10000
                                    }));
                                });

                                message.channel.send(`**[📬] ${message.author.username}**, I've successfully sent the following embed to <@${userID}>:`, {
                                    embed: DMEmbedAnon
                                }).then(m => m.delete({
                                    timeout: 35000
                                }));
                            } else if (anonymousMode === "no") {
                                user.send({
                                    embed: DMEmbedNAnon
                                }).catch(err => {
                                    console.log(`An error occurred trying to DM a user:\n${err}`);
                                    return message.channel.send(`**[📭] ${message.author.username}**, actually, an error occurred. It seems they might have their DMs off. <:peepoChordCry:793887600754556948>`).then(m => m.delete({
                                        timeout: 10000
                                    }));
                                });

                                message.channel.send(`**[📬] ${message.author.username}**, I've successfully sent the following embed to <@${userID}>:`, {
                                    embed: DMEmbedNAnon
                                }).then(m => m.delete({
                                    timeout: 35000
                                }));
                            }
                        }).catch(err => {
                            console.log(`An error occurred trying to DM a user:\n${err}`)
                            return message.channel.send(`**[📭] ${message.author.username}**, an error occurred: was everything provided valid?`).then(m => m.delete({
                                timeout: 10000
                            }));
                        });
                    });
                });
            });
        });
    }
}