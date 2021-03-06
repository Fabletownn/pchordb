/*
This some of the messiest code blocks I've ever had, along with the gtb-start code.
Good luck on your eyes with this one. You'll need it.
*/

const Discord = require("discord.js");
const client = new Discord.Client();

const ATT = require("../models/attachs.js");

module.exports = {
    name: 'gtb-addcosmetic',
    description: '[GTB] This will add any cosmetic with the cosmetic name provided. <[setPrefix]gtb-addcosmetic <cosmetic number> <cosmetic answer/name> { ATTACHMENT }>',
    execute(message) {
        var answerC1 = message.content.split("cosmetic ");

        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273") && message.author.id !== "528759471514845194") return;

        let argsNum = message.content.split(" ");

        if (isNaN(argsNum[1])) return message.channel.send(`[⚠️] **${message.author.username}**, please make sure you're including what **number question** this cosmetic is first.`).then(m => m.delete({
            timeout: 10000
        }));
        if (message.attachments.size === 0) return message.channel.send(`[⚠️] **${message.author.username}**, please make sure you're including an **image** to use for the cosmetic.`).then(m => m.delete({
            timeout: 10000
        }));
        if (!answerC1[1].slice(2).match(/^[ A-Za-z]+$/)) return message.channel.send(`[⚠️] **${message.author.username}**, please make sure your answers only include **letters**.`).then(m => m.delete({
            timeout: 10000
        }));

        if (message.content && message.attachments.size > 0) {
            message.attachments.forEach(attachment => {
                const url = attachment.url;
                if (argsNum[1] == '1') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs1: url,
                                answer1: answerC1[1].slice(2)
                            })
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #1. Please review the data below.\n**Cosmetic #1** [URL]: \`${url}\`\n**Answer #1** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs1 = url;
                            data.answer1 = answerC1[1].slice(2);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #1. Please review the data below.\n**Cosmetic #1** [URL]: \`${data.attachs1}\`\n**Answer #1** [N-CS]: \`${data.answer1}\``)
                        }
                    });
                } else if (argsNum[1] == '2') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs2: url,
                                answer2: answerC1[1].slice(2)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #2. Please review the data below.\n**Cosmetic #2** [URL]: \`${url}\`\n**Answer #2** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs2 = url;
                            data.answer2 = answerC1[1].slice(2);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #2. Please review the data below.\n**Cosmetic #2** [URL]: \`${data.attachs2}\`\n**Answer #2** [N-CS]: \`${data.answer2}\``)
                        }
                    });


                } else if (argsNum[1] == '3') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs3: url,
                                answer3: answerC1[1].slice(2)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #3. Please review the data below.\n**Cosmetic #3** [URL]: \`${url}\`\n**Answer #3** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs3 = url;
                            data.answer3 = answerC1[1].slice(2);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #3. Please review the data below.\n**Cosmetic #3** [URL]: \`${data.attachs3}\`\n**Answer #3** [N-CS]: \`${data.answer3}\``)
                        }
                    });

                } else if (argsNum[1] == '4') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs4: url,
                                answer4: answerC1[1].slice(2)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #4. Please review the data below.\n**Cosmetic #4** [URL]: \`${url}\`\n**Answer #4** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs4 = url;
                            data.answer4 = answerC1[1].slice(2);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #4. Please review the data below.\n**Cosmetic #4** [URL]: \`${data.attachs4}\`\n**Answer #4** [N-CS]: \`${data.answer4}\``)
                        }
                    });

                } else if (argsNum[1] == '5') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs5: url,
                                answer5: answerC1[1].slice(2)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #5. Please review the data below.\n**Cosmetic #5** [URL]: \`${url}\`\n**Answer #5** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs5 = url;
                            data.answer5 = answerC1[1].slice(2);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #5. Please review the data below.\n**Cosmetic #5** [URL]: \`${data.attachs5}\`\n**Answer #5** [N-CS]: \`${data.answer5}\``)
                        }
                    });

                } else if (argsNum[1] == '6') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs6: url,
                                answer6: answerC1[1].slice(2)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #6. Please review the data below.\n**Cosmetic #6** [URL]: \`${url}\`\n**Answer #6** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs6 = url;
                            data.answer6 = answerC1[1].slice(2);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #6. Please review the data below.\n**Cosmetic #6** [URL]: \`${data.attachs6}\`\n**Answer #6** [N-CS]: \`${data.answer6}\``)
                        }
                    });

                } else if (argsNum[1] == '7') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs7: url,
                                answer7: answerC1[1].slice(2)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #7. Please review the data below.\n**Cosmetic #7** [URL]: \`${url}\`\n**Answer #7** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs7 = url;
                            data.answer7 = answerC1[1].slice(2);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #7. Please review the data below.\n**Cosmetic #7** [URL]: \`${data.attachs7}\`\n**Answer #7** [N-CS]: \`${data.answer7}\``)
                        }
                    });

                } else if (argsNum[1] == '8') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs8: url,
                                answer8: answerC1[1].slice(2)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #8. Please review the data below.\n**Cosmetic #8** [URL]: \`${url}\`\n**Answer #8** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs8 = url;
                            data.answer8 = answerC1[1].slice(2);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #8. Please review the data below.\n**Cosmetic #8** [URL]: \`${data.attachs8}\`\n**Answer #8** [N-CS]: \`${data.answer8}\``)
                        }
                    });

                } else if (argsNum[1] == '9') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs9: url,
                                answer9: answerC1[1].slice(2)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #9. Please review the data below.\n**Cosmetic #9** [URL]: \`${url}\`\n**Answer #9** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs9 = url;
                            data.answer9 = answerC1[1].slice(2);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #9. Please review the data below.\n**Cosmetic #9** [URL]: \`${data.attachs9}\`\n**Answer #9** [N-CS]: \`${data.answer9}\``)
                        }
                    });

                } else if (argsNum[1] == '10') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs10: url,
                                answer10: answerC1[1].slice(3)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #10. Please review the data below.\n**Cosmetic #10** [URL]: \`${url}\`\n**Answer #10** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs10 = url;
                            data.answer10 = answerC1[1].slice(3);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #10. Please review the data below.\n**Cosmetic #10** [URL]: \`${data.attachs10}\`\n**Answer #10** [N-CS]: \`${data.answer10}\``)
                        }
                    });

                } else if (argsNum[1] == '11') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs11: url,
                                answer11: answerC1[1].slice(3)
                            })
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #11. Please review the data below.\n**Cosmetic #11** [URL]: \`${url}\`\n**Answer #11** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs11 = url;
                            data.answer11 = answerC1[1].slice(3);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #11. Please review the data below.\n**Cosmetic #11** [URL]: \`${data.attachs11}\`\n**Answer #11** [N-CS]: \`${data.answer11}\``)
                        }
                    });


                } else if (argsNum[1] == '12') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs12: url,
                                answer12: answerC1[1].slice(3)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #12. Please review the data below.\n**Cosmetic #12** [URL]: \`${url}\`\n**Answer #12** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs12 = url;
                            data.answer12 = answerC1[1].slice(3);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #12. Please review the data below.\n**Cosmetic #12** [URL]: \`${data.attachs12}\`\n**Answer #12** [N-CS]: \`${data.answer12}\``)
                        }
                    });


                } else if (argsNum[1] == '13') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs13: url,
                                answer13: answerC1[1].slice(3)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #13. Please review the data below.\n**Cosmetic #13** [URL]: \`${url}\`\n**Answer #13** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs13 = url;
                            data.answer13 = answerC1[1].slice(3);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #13. Please review the data below.\n**Cosmetic #13** [URL]: \`${data.attachs13}\`\n**Answer #13** [N-CS]: \`${data.answer13}\``)
                        }
                    });

                } else if (argsNum[1] == '14') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs14: url,
                                answer14: answerC1[1].slice(3)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #14. Please review the data below.\n**Cosmetic #14** [URL]: \`${url}\`\n**Answer #14** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs14 = url;
                            data.answer14 = answerC1[1].slice(3);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #14. Please review the data below.\n**Cosmetic #14** [URL]: \`${data.attachs14}\`\n**Answer #14** [N-CS]: \`${data.answer14}\``)
                        }
                    });

                } else if (argsNum[1] == '15') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs15: url,
                                answer15: answerC1[1].slice(3)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #15. Please review the data below.\n**Cosmetic #15** [URL]: \`${url}\`\n**Answer #15** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs15 = url;
                            data.answer15 = answerC1[1].slice(3);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #15. Please review the data below.\n**Cosmetic #15** [URL]: \`${data.attachs15}\`\n**Answer #15** [N-CS]: \`${data.answer15}\``)
                        }
                    });

                } else if (argsNum[1] == '16') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs16: url,
                                answer16: answerC1[1].slice(3)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #16. Please review the data below.\n**Cosmetic #16** [URL]: \`${url}\`\n**Answer #16** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs16 = url;
                            data.answer16 = answerC1[1].slice(3);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #16. Please review the data below.\n**Cosmetic #16** [URL]: \`${data.attachs16}\`\n**Answer #16** [N-CS]: \`${data.answer16}\``)
                        }
                    });

                } else if (argsNum[1] == '17') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs17: url,
                                answer17: answerC1[1].slice(3)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #17. Please review the data below.\n**Cosmetic #17** [URL]: \`${url}\`\n**Answer #17** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs17 = url;
                            data.answer17 = answerC1[1].slice(3);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #17. Please review the data below.\n**Cosmetic #17** [URL]: \`${data.attachs17}\`\n**Answer #17** [N-CS]: \`${data.answer17}\``)
                        }
                    });

                } else if (argsNum[1] == '18') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs18: url,
                                answer18: answerC1[1].slice(3)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #18. Please review the data below.\n**Cosmetic #18** [URL]: \`${url}\`\n**Answer #18** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs18 = url;
                            data.answer18 = answerC1[1].slice(3);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #18. Please review the data below.\n**Cosmetic #18** [URL]: \`${data.attachs18}\`\n**Answer #18** [N-CS]: \`${data.answer18}\``)
                        }
                    });

                } else if (argsNum[1] == '19') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs19: url,
                                answer19: answerC1[1].slice(3)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #19. Please review the data below.\n**Cosmetic #19** [URL]: \`${url}\`\n**Answer #19** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs19 = url;
                            data.answer19 = answerC1[1].slice(3);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #19. Please review the data below.\n**Cosmetic #19** [URL]: \`${data.attachs19}\`\n**Answer #19** [N-CS]: \`${data.answer19}\``)
                        }
                    });

                } else if (argsNum[1] == '20') {
                    ATT.findOne({
                        guildID: message.guild.id,
                    }, (err, data) => {
                        if (err) return console.log(err)
                        if (!data) {
                            const newATTData = new ATT({
                                guildID: message.guild.id,
                                attachs20: url,
                                answer20: answerC1[1].slice(3)
                            });
                            newATTData.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #20. Please review the data below.\n**Cosmetic #20** [URL]: \`${url}\`\n**Answer #20** [N-CS]: \`${answerC1[1]}\``)
                        } else {
                            data.attachs20 = url;
                            data.answer20 = answerC1[1].slice(3);
                            data.save().catch(err => console.log(err))
                            message.channel.send(`**[ℹ️] ${message.author.username}**, image saved as question #20. Please review the data below.\n**Cosmetic #20** [URL]: \`${data.attachs20}\`\n**Answer #20** [N-CS]: \`${data.answer20}\``)
                        }
                    });
                }
            });
        }
    }
}