const Discord = require("discord.js");

module.exports = {
    name: 'spotlight',
    description: '[MODERATION] This will prompt instructions for a new Server Spotlight. Restricted to Administrators only. <[setPrefix]spotlight>',
    execute(message) {
        const client = message.client;
        message.delete();

        var userID;
        var userDesc;
        var attachment1;
        var attachment2;
        var attachment3;
        var fleetCard;

        const artArray = ["More work!", "More!", "Even more!", "More of their work!"]
        const artResult = artArray[Math.floor(Math.random() * artArray.length)];

        message.channel.send(`**[🎭] ${message.author.username}**, who will be the Spotlight for this week? Please ensure you're mentioning them (e.g. ${message.author}).`).then(msg => {
            const userQuestion = m => m.author.id === message.author.id && m.mentions.users.first();
            message.channel.awaitMessages(userQuestion, {
                max: 1,
                time: 999999,
                errors: ['time']
            }).then(collected => {
                var toUser = collected.first().mentions.users.first();
                if (toUser && message.guild.member(toUser.id)) {
                    userID = toUser.id;
                    collected.first().delete();
                }

                msg.edit(`**[🎭] ${message.author.username}**, provide their description & socials. An example is provided below.\`\`\`\n📝 Farah, has worked on several bots, and does artwork for his Twitter!\n\n📷 Social Medias: Follow them on Twitter! @/fabletownn\n\`\`\``);

                const descQuestion = m => m.author.id === message.author.id;
                message.channel.awaitMessages(descQuestion, {
                    max: 1,
                    time: 999999,
                    errors: ['time']
                }).then(collected => {
                    collected.first().delete();

                    userDesc = collected.first().content;
                    msg.edit(`**[🎭] ${message.author.username}**, provide an attachment of the **first** piece of work to be shown.`);

                    const attach1Question = m => m.author.id === message.author.id && m.attachments.size !== 0
                    message.channel.awaitMessages(attach1Question, {
                        max: 1,
                        time: 999999,
                        errors: ['time']
                    }).then(collected => {
                        if (collected.first().attachments.size > 0) {
                            collected.first().attachments.forEach(toAttachment => {
                                attachment1 = toAttachment.url;
                            });
                        }

                        msg.edit(`**[🎭] ${message.author.username}**, provide an attachment of the **second** piece of work to be shown.`);

                        const attach2Question = m => m.author.id === message.author.id && m.attachments.size !== 0
                        message.channel.awaitMessages(attach2Question, {
                            max: 1,
                            time: 999999,
                            errors: ['time']
                        }).then(collected => {
                            if (collected.first().attachments.size > 0) {
                                collected.first().attachments.forEach(toAttachment => {
                                    attachment2 = toAttachment.url;
                                });
                            }

                            msg.edit(`**[🎭] ${message.author.username}**, provide an attachment of the **third** piece of work to be shown.`);

                            const attach3Question = m => m.author.id === message.author.id && m.attachments.size !== 0
                            message.channel.awaitMessages(attach3Question, {
                                max: 1,
                                time: 999999,
                                errors: ['time']
                            }).then(collected => {
                                if (collected.first().attachments.size > 0) {
                                    collected.first().attachments.forEach(toAttachment => {
                                        attachment3 = toAttachment.url;
                                    });
                                }

                                msg.edit(`**[🎭] ${message.author.username}**, please provide the **Fleet Card** image to be announced.`)

                                const fleetQuestion = m => m.author.id === message.author.id && m.attachments.size !== 0
                                message.channel.awaitMessages(fleetQuestion, {
                                    max: 1,
                                    time: 999999,
                                    errors: ['time']
                                }).then(collected => {
                                    if (collected.first().attachments.size > 0) {
                                        collected.first().attachments.forEach(fleetAtt => {
                                            fleetCard = fleetAtt.url;
                                        });
                                    }

                                    msg.delete();
                                    message.channel.send(`**[🎭] ${message.author.username}**, please confirm the details below by saying "yes" or "no." Please understand URLs will not be provided.\nSpotlight: <@${userID}>\nDescription & Socials: ${userDesc}\n\nArtwork #1 (URL): ${attachment1}\nArtwork #2 (URL): ${attachment2}\nArtwork #3 (URL): ${attachment3}\nFleet Card (URL): ${fleetCard}`);

                                    const confirmQuestion = m => m.author.id === message.author.id && (m.content.toLowerCase().startsWith("yes") || m.content.toLowerCase().startsWith("no"));
                                    message.channel.awaitMessages(confirmQuestion, {
                                        max: 1,
                                        time: 999999,
                                        errors: ['time']
                                    }).then(collected => {
                                        collected.first().delete();

                                        if (collected.first().content.toLowerCase().startsWith("yes")) {
                                            client.channels.cache.get('803711612548284426').send(`✨ Creator for this Week: <@${userID}>\n\n${userDesc}`, {
                                                files: [attachment1]
                                            }).then(() => {
                                                client.channels.cache.get('803711612548284426').send(`${artResult}`, {
                                                    files: [attachment2]
                                                }).then(() => {
                                                    client.channels.cache.get('803711612548284426').send(`${artResult}`, {
                                                        files: [attachment3]
                                                    });
                                                });
                                            });

                                            client.channels.cache.get('614500763997175824').send(`<@&816704985214615582>\nOur new Server Spotlight, <@${userID}>!\nCheck out <#772175886031650827> for more information! <:zITFHype:680882437894701083>`, { files: [fleetCard] });

                                            client.channels.cache.get('614193406842765375').send(`Our new Server Spotlight, <@${userID}>!\nCheck out <#772175886031650827> for more information! <:zITFHype:680882437894701083>`, { files: [fleetCard] }).then(toPin => {
                                                toPin.pin();
                                            });

                                            var toMember = message.guild.members.cache.get(userID);
                                            toMember.roles.add('772176660958281737');

                                            message.channel.send(`**[🎭] ${message.author.username}**, the Server Spotlight, **${client.users.cache.get(userID).username}**, has been announced!\n\nyay amazing great excellent exceptional favorable great marvelous positive satisfactory satisfying superb valuable wonderful ace boss bully capital choice crack nice pleasing prime rad sound spanking sterling super superior welcome worthy admirable agreeable commendable congenial deluxe first-class first-rate gnarly gratifying honorable neat precious recherché reputable select shipshape splendid stupendous super-eminent super-excellent tip-top up to snuff sheesh`).then(m => m.delete({ timeout: 15000 }));
                                        } else {
                                            return message.channel.send(`**[❌] ${message.author.username}**, successfully cancelled the request. Feel free to readjust and make any changes.`);
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
}