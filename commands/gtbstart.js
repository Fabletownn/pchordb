/*
This code block right here is eye-sore and a half.
I made this months ago, so have fun reading this out if you choose to.
Looking back at this, I'm glad of the progress I've made as a coder & hobbyist.

OMEGALUL
*/

const Discord = require("discord.js");
const client = new Discord.Client();
const mongoose = require("mongoose");
const gameStatus = [];
const gameChannel = [];
const timeout = [];

let questResp = ["Name the cosmetic.", "What do you see?", "What's the name of this cosmetic?", "Take a shot; name the cosmetic."]
const respo = questResp[Math.floor(Math.random() * questResp.length)];

const ATT = require("../models/attachs.js");
const PNT = require("../models/points.js");

module.exports = {
    name: 'gtb-start',
    description: '[GTB] This will initiate/start a Guess The Blank game. <[setPrefix]gtb-start>',
    execute(message) {
        let champR = message.guild.roles.cache.find(role => role.name === "Guess The Blank Champion");
        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        if (gameStatus.includes(message.guild.id)) {
            message.delete();
            return message.channel.send(`[⚠️] There is already a current **Guess The Blank** game being hosted in <#${gameChannel}>.`).then(m => m.delete({ timeout: 5000 }))
        }
        if (timeout.includes(message.author.id)) {
            return;
        }

        ATT.findOne({
            guildID: message.guild.id,
        }, (err, data) => {
            if (err) return console.log(err);

            try {
                gameStatus.push(message.guild.id);
                gameChannel.push(message.channel.id);
                message.delete();
                message.channel.send('**[🎮]** Chat has been locked as **Guess The Blank** begins in 25 seconds. Get those fingers ready!\n**[⚠️]** Your answers do not have to be perfect. Using punctuation, spaces and/or capitals will not mess up your answers (e.g. if the answer is "`Bite Mark`", "`bitEMArk.`" would still be marked correct).\n\nPlayers with the **Guess The Blank Champion** role may still participate; however, points will not be awarded to said player if answered correctly.\nConnection speeds may affect how you may see answers being clocked in. Those that are marked correct is what the bot deems to be "first" and "last".\n**For speed reasons, the URLs will be posted in chat instead of the file. If not already, please go over to User Settings > Text & Images > Show Website Preview Info From Links Pasted In Chat : ON**\n\nIf you feel as if you deserved a point for an answer that did not get marked correct, you are free to ask a staff member to manually grant points to you.')

                setTimeout(function() {
                    message.channel.updateOverwrite(message.guild.id, {
                        SEND_MESSAGES: true,
                    }, `GUESS THE BLANK: Initiated by ${message.author.username}#${message.author.discriminator} | [${new Date().toLocaleTimeString()}]`);

                    // LEVEL 1
                    message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs1));
                    const LV1 = m => (m.content.toLowerCase().startsWith(data.answer1.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer1.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                    message.channel.awaitMessages(LV1, {
                            max: 2,
                            time: 9999999,
                            errors: ['time']
                        })
                        .then(collected => {
                            const L1R1 = collected.first().author.id
                            const L1R2 = collected.last().author.id
                            collected.first().react('✅')
                            collected.last().react('✅')

                            PNT.findOne({
                                userID: L1R1
                            }, (err, data) => {
                                if (err) console.log(err);
                                if (!data) {
                                    const newPNT = new PNT({
                                        serverID: message.guild.id,
                                        userID: L1R1,
                                        name: collected.first().author.username,
                                        points: 1,
                                        lb: "all"
                                    })
                                    newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                } else {
                                    data.points += 1;
                                    data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                }
                            });

                            PNT.findOne({
                                userID: L1R2
                            }, (err, data) => {
                                if (err) console.log(err);
                                if (!data) {
                                    const newPNT = new PNT({
                                        serverID: message.guild.id,
                                        userID: L1R2,
                                        name: collected.last().author.username,
                                        points: 1,
                                        lb: "all"
                                    })
                                    newPNT.save().catch(err => console.log(err));
                                } else {
                                    data.points += 1;
                                    data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                }
                            });

                            message.channel.send(`[🎮] The correct answer was **${data.answer1}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                            message.channel.updateOverwrite(message.guild.id, {
                                SEND_MESSAGES: false,
                            }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);

                            // LEVEL END
                            setTimeout(function() {
                                message.channel.updateOverwrite(message.guild.id, {
                                    SEND_MESSAGES: true,
                                }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                // LEVEL 2
                                message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs2));
                                const LV2 = m => (m.content.toLowerCase().startsWith(data.answer2.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer2.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                message.channel.awaitMessages(LV2, {
                                        max: 2,
                                        time: 9999999,
                                        errors: ['time']
                                    })
                                    .then(collected => {
                                        const L2R1 = collected.first().author.id
                                        const L2R2 = collected.last().author.id
                                        collected.first().react('✅')
                                        collected.last().react('✅')
                                        PNT.findOne({
                                            userID: L2R1
                                        }, (err, data) => {
                                            if (err) console.log(err);
                                            if (!data) {
                                                const newPNT = new PNT({
                                                    serverID: message.guild.id,
                                                    userID: L2R1,
                                                    name: collected.first().author.username,
                                                    points: 1,
                                                    lb: "all"
                                                })
                                                newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                            } else {
                                                data.points += 1;
                                                data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                            }
                                        });

                                        PNT.findOne({
                                            userID: L2R2
                                        }, (err, data) => {
                                            if (err) console.log(err);
                                            if (!data) {
                                                const newPNT = new PNT({
                                                    serverID: message.guild.id,
                                                    userID: L2R2,
                                                    name: collected.last().author.username,
                                                    points: 1,
                                                    lb: "all"
                                                })
                                                newPNT.save().catch(err => console.log(err));
                                            } else {
                                                data.points += 1;
                                                data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                            }
                                        });

                                        message.channel.send(`[🎮] The correct answer was **${data.answer2}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                        message.channel.updateOverwrite(message.guild.id, {
                                            SEND_MESSAGES: false,
                                        }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                        // LEVEL END
                                        setTimeout(function() {
                                            message.channel.updateOverwrite(message.guild.id, {
                                                SEND_MESSAGES: true,
                                            }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                            // LEVEL 3
                                            message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs3));
                                            const LV3 = m => (m.content.toLowerCase().startsWith(data.answer3.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer3.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                            message.channel.awaitMessages(LV3, {
                                                    max: 2,
                                                    time: 9999999,
                                                    errors: ['time']
                                                })
                                                .then(collected => {
                                                    const L3R1 = collected.first().author.id
                                                    const L3R2 = collected.last().author.id
                                                    collected.first().react('✅')
                                                    collected.last().react('✅')
                                                    PNT.findOne({
                                                        userID: L3R1
                                                    }, (err, data) => {
                                                        if (err) console.log(err);
                                                        if (!data) {
                                                            const newPNT = new PNT({
                                                                serverID: message.guild.id,
                                                                userID: L3R1,
                                                                name: collected.first().author.username,
                                                                points: 1,
                                                                lb: "all"
                                                            })
                                                            newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                        } else {
                                                            data.points += 1;
                                                            data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                        }
                                                    });

                                                    PNT.findOne({
                                                        userID: L3R2
                                                    }, (err, data) => {
                                                        if (err) console.log(err);
                                                        if (!data) {
                                                            const newPNT = new PNT({
                                                                serverID: message.guild.id,
                                                                userID: L3R2,
                                                                name: collected.last().author.username,
                                                                points: 1,
                                                                lb: "all"
                                                            })
                                                            newPNT.save().catch(err => console.log(err));
                                                        } else {
                                                            data.points += 1;
                                                            data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                        }
                                                    });

                                                    message.channel.send(`[🎮] The correct answer was **${data.answer3}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                                    message.channel.updateOverwrite(message.guild.id, {
                                                        SEND_MESSAGES: false,
                                                    }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                                    // LEVEL END
                                                    setTimeout(function() {
                                                        message.channel.updateOverwrite(message.guild.id, {
                                                            SEND_MESSAGES: true,
                                                        }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                                        // LEVEL 4
                                                        message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs4));
                                                        const LV4 = m => (m.content.toLowerCase().startsWith(data.answer4.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer4.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                                        message.channel.awaitMessages(LV4, {
                                                                max: 2,
                                                                time: 9999999,
                                                                errors: ['time']
                                                            })
                                                            .then(collected => {
                                                                const L4R1 = collected.first().author.id
                                                                const L4R2 = collected.last().author.id
                                                                collected.first().react('✅')
                                                                collected.last().react('✅')
                                                                PNT.findOne({
                                                                    userID: L4R1
                                                                }, (err, data) => {
                                                                    if (err) console.log(err);
                                                                    if (!data) {
                                                                        const newPNT = new PNT({
                                                                            serverID: message.guild.id,
                                                                            userID: L4R1,
                                                                            name: collected.first().author.username,
                                                                            points: 1,
                                                                            lb: "all"
                                                                        })
                                                                        newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                    } else {
                                                                        data.points += 1;
                                                                        data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                    }
                                                                });

                                                                PNT.findOne({
                                                                    userID: L4R2
                                                                }, (err, data) => {
                                                                    if (err) console.log(err);
                                                                    if (!data) {
                                                                        const newPNT = new PNT({
                                                                            serverID: message.guild.id,
                                                                            userID: L4R2,
                                                                            name: collected.last().author.username,
                                                                            points: 1,
                                                                            lb: "all"
                                                                        })
                                                                        newPNT.save().catch(err => console.log(err));
                                                                    } else {
                                                                        data.points += 1;
                                                                        data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                    }
                                                                });

                                                                message.channel.send(`[🎮] The correct answer was **${data.answer4}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                                                message.channel.updateOverwrite(message.guild.id, {
                                                                    SEND_MESSAGES: false,
                                                                }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                                                // LEVEL END
                                                                setTimeout(function() {
                                                                    message.channel.updateOverwrite(message.guild.id, {
                                                                        SEND_MESSAGES: true,
                                                                    }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                                                    // LEVEL 5
                                                                    message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs5));
                                                                    const LV5 = m => (m.content.toLowerCase().startsWith(data.answer5.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer5.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                                                    message.channel.awaitMessages(LV5, {
                                                                            max: 2,
                                                                            time: 9999999,
                                                                            errors: ['time']
                                                                        })
                                                                        .then(collected => {
                                                                            const L5R1 = collected.first().author.id
                                                                            const L5R2 = collected.last().author.id
                                                                            collected.first().react('✅')
                                                                            collected.last().react('✅')
                                                                            PNT.findOne({
                                                                                userID: L5R1
                                                                            }, (err, data) => {
                                                                                if (err) console.log(err);
                                                                                if (!data) {
                                                                                    const newPNT = new PNT({
                                                                                        serverID: message.guild.id,
                                                                                        userID: L5R1,
                                                                                        name: collected.first().author.username,
                                                                                        points: 1,
                                                                                        lb: "all"
                                                                                    })
                                                                                    newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                } else {
                                                                                    data.points += 1;
                                                                                    data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                }
                                                                            });

                                                                            PNT.findOne({
                                                                                userID: L5R2
                                                                            }, (err, data) => {
                                                                                if (err) console.log(err);
                                                                                if (!data) {
                                                                                    const newPNT = new PNT({
                                                                                        serverID: message.guild.id,
                                                                                        userID: L5R2,
                                                                                        name: collected.last().author.username,
                                                                                        points: 1,
                                                                                        lb: "all"
                                                                                    })
                                                                                    newPNT.save().catch(err => console.log(err));
                                                                                } else {
                                                                                    data.points += 1;
                                                                                    data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                }
                                                                            });

                                                                            message.channel.send(`[🎮] The correct answer was **${data.answer5}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                                                            message.channel.updateOverwrite(message.guild.id, {
                                                                                SEND_MESSAGES: false,
                                                                            }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                                                            // LEVEL END
                                                                            setTimeout(function() {
                                                                                message.channel.updateOverwrite(message.guild.id, {
                                                                                    SEND_MESSAGES: true,
                                                                                }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                                                                // LEVEL 6
                                                                                message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs6));
                                                                                const LV6 = m => (m.content.toLowerCase().startsWith(data.answer6.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer6.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                                                                message.channel.awaitMessages(LV6, {
                                                                                        max: 2,
                                                                                        time: 9999999,
                                                                                        errors: ['time']
                                                                                    })
                                                                                    .then(collected => {
                                                                                        const L6R1 = collected.first().author.id
                                                                                        const L6R2 = collected.last().author.id
                                                                                        collected.first().react('✅')
                                                                                        collected.last().react('✅')
                                                                                        PNT.findOne({
                                                                                            userID: L6R1
                                                                                        }, (err, data) => {
                                                                                            if (err) console.log(err);
                                                                                            if (!data) {
                                                                                                const newPNT = new PNT({
                                                                                                    serverID: message.guild.id,
                                                                                                    userID: L6R1,
                                                                                                    name: collected.first().author.username,
                                                                                                    points: 1,
                                                                                                    lb: "all"
                                                                                                })
                                                                                                newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                            } else {
                                                                                                data.points += 1;
                                                                                                data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                            }
                                                                                        });

                                                                                        PNT.findOne({
                                                                                            userID: L6R2
                                                                                        }, (err, data) => {
                                                                                            if (err) console.log(err);
                                                                                            if (!data) {
                                                                                                const newPNT = new PNT({
                                                                                                    serverID: message.guild.id,
                                                                                                    userID: L6R2,
                                                                                                    name: collected.last().author.username,
                                                                                                    points: 1,
                                                                                                    lb: "all"
                                                                                                })
                                                                                                newPNT.save().catch(err => console.log(err));
                                                                                            } else {
                                                                                                data.points += 1;
                                                                                                data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                            }
                                                                                        });

                                                                                        message.channel.send(`[🎮] The correct answer was **${data.answer6}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                                                                        message.channel.updateOverwrite(message.guild.id, {
                                                                                            SEND_MESSAGES: false,
                                                                                        }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                                                                        // LEVEL END
                                                                                        setTimeout(function() {
                                                                                            message.channel.updateOverwrite(message.guild.id, {
                                                                                                SEND_MESSAGES: true,
                                                                                            }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                                                                            // LEVEL 7
                                                                                            message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs7));
                                                                                            const LV7 = m => (m.content.toLowerCase().startsWith(data.answer7.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer7.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                                                                            message.channel.awaitMessages(LV7, {
                                                                                                    max: 2,
                                                                                                    time: 9999999,
                                                                                                    errors: ['time']
                                                                                                })
                                                                                                .then(collected => {
                                                                                                    const L7R1 = collected.first().author.id
                                                                                                    const L7R2 = collected.last().author.id
                                                                                                    collected.first().react('✅')
                                                                                                    collected.last().react('✅')
                                                                                                    PNT.findOne({
                                                                                                        userID: L7R1
                                                                                                    }, (err, data) => {
                                                                                                        if (err) console.log(err);
                                                                                                        if (!data) {
                                                                                                            const newPNT = new PNT({
                                                                                                                serverID: message.guild.id,
                                                                                                                userID: L7R1,
                                                                                                                name: collected.first().author.username,
                                                                                                                points: 1,
                                                                                                                lb: "all"
                                                                                                            })
                                                                                                            newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                        } else {
                                                                                                            data.points += 1;
                                                                                                            data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                        }
                                                                                                    });

                                                                                                    PNT.findOne({
                                                                                                        userID: L7R2
                                                                                                    }, (err, data) => {
                                                                                                        if (err) console.log(err);
                                                                                                        if (!data) {
                                                                                                            const newPNT = new PNT({
                                                                                                                serverID: message.guild.id,
                                                                                                                userID: L7R2,
                                                                                                                name: collected.last().author.username,
                                                                                                                points: 1,
                                                                                                                lb: "all"
                                                                                                            })
                                                                                                            newPNT.save().catch(err => console.log(err));
                                                                                                        } else {
                                                                                                            data.points += 1;
                                                                                                            data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                        }
                                                                                                    });
                                                                                                    message.channel.send(`[🎮] The correct answer was **${data.answer7}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                                                                                    message.channel.updateOverwrite(message.guild.id, {
                                                                                                        SEND_MESSAGES: false,
                                                                                                    }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                                                                                    // LEVEL END
                                                                                                    setTimeout(function() {
                                                                                                        message.channel.updateOverwrite(message.guild.id, {
                                                                                                            SEND_MESSAGES: true,
                                                                                                        }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                                                                                        // LEVEL 8
                                                                                                        message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs8));
                                                                                                        const LV8 = m => (m.content.toLowerCase().startsWith(data.answer8.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer8.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                                                                                        message.channel.awaitMessages(LV8, {
                                                                                                                max: 2,
                                                                                                                time: 9999999,
                                                                                                                errors: ['time']
                                                                                                            })
                                                                                                            .then(collected => {
                                                                                                                const L8R1 = collected.first().author.id
                                                                                                                const L8R2 = collected.last().author.id
                                                                                                                collected.first().react('✅')
                                                                                                                collected.last().react('✅')
                                                                                                                PNT.findOne({
                                                                                                                    userID: L8R1
                                                                                                                }, (err, data) => {
                                                                                                                    if (err) console.log(err);
                                                                                                                    if (!data) {
                                                                                                                        const newPNT = new PNT({
                                                                                                                            serverID: message.guild.id,
                                                                                                                            userID: L8R1,
                                                                                                                            name: collected.first().author.username,
                                                                                                                            points: 1,
                                                                                                                            lb: "all"
                                                                                                                        })
                                                                                                                        newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                    } else {
                                                                                                                        data.points += 1;
                                                                                                                        data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                    }
                                                                                                                });

                                                                                                                PNT.findOne({
                                                                                                                    userID: L8R2
                                                                                                                }, (err, data) => {
                                                                                                                    if (err) console.log(err);
                                                                                                                    if (!data) {
                                                                                                                        const newPNT = new PNT({
                                                                                                                            serverID: message.guild.id,
                                                                                                                            userID: L8R2,
                                                                                                                            name: collected.last().author.username,
                                                                                                                            points: 1,
                                                                                                                            lb: "all"
                                                                                                                        })
                                                                                                                        newPNT.save().catch(err => console.log(err));
                                                                                                                    } else {
                                                                                                                        data.points += 1;
                                                                                                                        data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                    }
                                                                                                                });
                                                                                                                message.channel.send(`[🎮] The correct answer was **${data.answer8}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                                                                                                message.channel.updateOverwrite(message.guild.id, {
                                                                                                                    SEND_MESSAGES: false,
                                                                                                                }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                                                                                                // LEVEL END
                                                                                                                setTimeout(function() {
                                                                                                                    message.channel.updateOverwrite(message.guild.id, {
                                                                                                                        SEND_MESSAGES: true,
                                                                                                                    }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                                                                                                    // LEVEL 9
                                                                                                                    message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs9));
                                                                                                                    const LV9 = m => (m.content.toLowerCase().startsWith(data.answer9.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer9.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                                                                                                    message.channel.awaitMessages(LV9, {
                                                                                                                            max: 2,
                                                                                                                            time: 9999999,
                                                                                                                            errors: ['time']
                                                                                                                        })
                                                                                                                        .then(collected => {
                                                                                                                            const L9R1 = collected.first().author.id
                                                                                                                            const L9R2 = collected.last().author.id
                                                                                                                            collected.first().react('✅')
                                                                                                                            collected.last().react('✅')
                                                                                                                            PNT.findOne({
                                                                                                                                userID: L9R1
                                                                                                                            }, (err, data) => {
                                                                                                                                if (err) console.log(err);
                                                                                                                                if (!data) {
                                                                                                                                    const newPNT = new PNT({
                                                                                                                                        serverID: message.guild.id,
                                                                                                                                        userID: L9R1,
                                                                                                                                        name: collected.first().author.username,
                                                                                                                                        points: 1,
                                                                                                                                        lb: "all"
                                                                                                                                    })
                                                                                                                                    newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                } else {
                                                                                                                                    data.points += 1;
                                                                                                                                    data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                }
                                                                                                                            });

                                                                                                                            PNT.findOne({
                                                                                                                                userID: L9R2
                                                                                                                            }, (err, data) => {
                                                                                                                                if (err) console.log(err);
                                                                                                                                if (!data) {
                                                                                                                                    const newPNT = new PNT({
                                                                                                                                        serverID: message.guild.id,
                                                                                                                                        userID: L9R2,
                                                                                                                                        name: collected.last().author.username,
                                                                                                                                        points: 1,
                                                                                                                                        lb: "all"
                                                                                                                                    })
                                                                                                                                    newPNT.save().catch(err => console.log(err));
                                                                                                                                } else {
                                                                                                                                    data.points += 1;
                                                                                                                                    data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                }
                                                                                                                            });
                                                                                                                            message.channel.send(`[🎮] The correct answer was **${data.answer9}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                                                                                                            message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                SEND_MESSAGES: false,
                                                                                                                            }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                                                                                                            // LEVEL END
                                                                                                                            setTimeout(function() {
                                                                                                                                message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                    SEND_MESSAGES: true,
                                                                                                                                }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                // LEVEL 10
                                                                                                                                message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs10));
                                                                                                                                const LV10 = m => (m.content.toLowerCase().startsWith(data.answer10.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer10.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                                                                                                                message.channel.awaitMessages(LV10, {
                                                                                                                                        max: 2,
                                                                                                                                        time: 9999999,
                                                                                                                                        errors: ['time']
                                                                                                                                    })
                                                                                                                                    .then(collected => {
                                                                                                                                        const L10R1 = collected.first().author.id
                                                                                                                                        const L10R2 = collected.last().author.id
                                                                                                                                        collected.first().react('✅')
                                                                                                                                        collected.last().react('✅')
                                                                                                                                        PNT.findOne({
                                                                                                                                            userID: L10R1
                                                                                                                                        }, (err, data) => {
                                                                                                                                            if (err) console.log(err);
                                                                                                                                            if (!data) {
                                                                                                                                                const newPNT = new PNT({
                                                                                                                                                    serverID: message.guild.id,
                                                                                                                                                    userID: L10R1,
                                                                                                                                                    name: collected.first().author.username,
                                                                                                                                                    points: 1,
                                                                                                                                                    lb: "all"
                                                                                                                                                })
                                                                                                                                                newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                            } else {
                                                                                                                                                data.points += 1;
                                                                                                                                                data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                            }
                                                                                                                                        });

                                                                                                                                        PNT.findOne({
                                                                                                                                            userID: L10R2
                                                                                                                                        }, (err, data) => {
                                                                                                                                            if (err) console.log(err);
                                                                                                                                            if (!data) {
                                                                                                                                                const newPNT = new PNT({
                                                                                                                                                    serverID: message.guild.id,
                                                                                                                                                    userID: L10R2,
                                                                                                                                                    name: collected.last().author.username,
                                                                                                                                                    points: 1,
                                                                                                                                                    lb: "all"
                                                                                                                                                })
                                                                                                                                                newPNT.save().catch(err => console.log(err));
                                                                                                                                            } else {
                                                                                                                                                data.points += 1;
                                                                                                                                                data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                            }
                                                                                                                                        });
                                                                                                                                        message.channel.send(`[🎮] The correct answer was **${data.answer10}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                                                                                                                        message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                            SEND_MESSAGES: false,
                                                                                                                                        }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                        // LEVEL END
                                                                                                                                        setTimeout(function() {
                                                                                                                                            message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                SEND_MESSAGES: true,
                                                                                                                                            }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                            // LEVEL 11
                                                                                                                                            message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs11));
                                                                                                                                            const LV11 = m => (m.content.toLowerCase().startsWith(data.answer11.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer11.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                                                                                                                            message.channel.awaitMessages(LV11, {
                                                                                                                                                    max: 2,
                                                                                                                                                    time: 9999999,
                                                                                                                                                    errors: ['time']
                                                                                                                                                })
                                                                                                                                                .then(collected => {
                                                                                                                                                    const L11R1 = collected.first().author.id
                                                                                                                                                    const L11R2 = collected.last().author.id
                                                                                                                                                    collected.first().react('✅')
                                                                                                                                                    collected.last().react('✅')
                                                                                                                                                    PNT.findOne({
                                                                                                                                                        userID: L11R1
                                                                                                                                                    }, (err, data) => {
                                                                                                                                                        if (err) console.log(err);
                                                                                                                                                        if (!data) {
                                                                                                                                                            const newPNT = new PNT({
                                                                                                                                                                serverID: message.guild.id,
                                                                                                                                                                userID: L11R1,
                                                                                                                                                                name: collected.first().author.username,
                                                                                                                                                                points: 1,
                                                                                                                                                                lb: "all"
                                                                                                                                                            })
                                                                                                                                                            newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                        } else {
                                                                                                                                                            data.points += 1;
                                                                                                                                                            data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                        }
                                                                                                                                                    });

                                                                                                                                                    PNT.findOne({
                                                                                                                                                        userID: L11R2
                                                                                                                                                    }, (err, data) => {
                                                                                                                                                        if (err) console.log(err);
                                                                                                                                                        if (!data) {
                                                                                                                                                            const newPNT = new PNT({
                                                                                                                                                                serverID: message.guild.id,
                                                                                                                                                                userID: L11R2,
                                                                                                                                                                name: collected.last().author.username,
                                                                                                                                                                points: 1,
                                                                                                                                                                lb: "all"
                                                                                                                                                            })
                                                                                                                                                            newPNT.save().catch(err => console.log(err));
                                                                                                                                                        } else {
                                                                                                                                                            data.points += 1;
                                                                                                                                                            data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                        }
                                                                                                                                                    });
                                                                                                                                                    message.channel.send(`[🎮] The correct answer was **${data.answer11}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                                                                                                                                    message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                        SEND_MESSAGES: false,
                                                                                                                                                    }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                    // LEVEL END
                                                                                                                                                    setTimeout(function() {
                                                                                                                                                        message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                            SEND_MESSAGES: true,
                                                                                                                                                        }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                        // LEVEL 12
                                                                                                                                                        message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs12));
                                                                                                                                                        const LV12 = m => (m.content.toLowerCase().startsWith(data.answer12.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer12.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                                                                                                                                        message.channel.awaitMessages(LV12, {
                                                                                                                                                                max: 2,
                                                                                                                                                                time: 9999999,
                                                                                                                                                                errors: ['time']
                                                                                                                                                            })
                                                                                                                                                            .then(collected => {
                                                                                                                                                                const L12R1 = collected.first().author.id
                                                                                                                                                                const L12R2 = collected.last().author.id
                                                                                                                                                                collected.first().react('✅')
                                                                                                                                                                collected.last().react('✅')
                                                                                                                                                                PNT.findOne({
                                                                                                                                                                    userID: L12R1
                                                                                                                                                                }, (err, data) => {
                                                                                                                                                                    if (err) console.log(err);
                                                                                                                                                                    if (!data) {
                                                                                                                                                                        const newPNT = new PNT({
                                                                                                                                                                            serverID: message.guild.id,
                                                                                                                                                                            userID: L12R1,
                                                                                                                                                                            name: collected.first().author.username,
                                                                                                                                                                            points: 1,
                                                                                                                                                                            lb: "all"
                                                                                                                                                                        })
                                                                                                                                                                        newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                    } else {
                                                                                                                                                                        data.points += 1;
                                                                                                                                                                        data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                    }
                                                                                                                                                                });

                                                                                                                                                                PNT.findOne({
                                                                                                                                                                    userID: L12R2
                                                                                                                                                                }, (err, data) => {
                                                                                                                                                                    if (err) console.log(err);
                                                                                                                                                                    if (!data) {
                                                                                                                                                                        const newPNT = new PNT({
                                                                                                                                                                            serverID: message.guild.id,
                                                                                                                                                                            userID: L12R2,
                                                                                                                                                                            name: collected.last().author.username,
                                                                                                                                                                            points: 1,
                                                                                                                                                                            lb: "all"
                                                                                                                                                                        })
                                                                                                                                                                        newPNT.save().catch(err => console.log(err));
                                                                                                                                                                    } else {
                                                                                                                                                                        data.points += 1;
                                                                                                                                                                        data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                    }
                                                                                                                                                                });
                                                                                                                                                                message.channel.send(`[🎮] The correct answer was **${data.answer12}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                                                                                                                                                message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                    SEND_MESSAGES: false,
                                                                                                                                                                }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                                // LEVEL END
                                                                                                                                                                setTimeout(function() {
                                                                                                                                                                    message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                        SEND_MESSAGES: true,
                                                                                                                                                                    }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                                    // LEVEL 13
                                                                                                                                                                    message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs13));
                                                                                                                                                                    const LV13 = m => (m.content.toLowerCase().startsWith(data.answer13.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer13.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                                                                                                                                                    message.channel.awaitMessages(LV13, {
                                                                                                                                                                            max: 2,
                                                                                                                                                                            time: 9999999,
                                                                                                                                                                            errors: ['time']
                                                                                                                                                                        })
                                                                                                                                                                        .then(collected => {
                                                                                                                                                                            const L13R1 = collected.first().author.id
                                                                                                                                                                            const L13R2 = collected.last().author.id
                                                                                                                                                                            collected.first().react('✅')
                                                                                                                                                                            collected.last().react('✅')
                                                                                                                                                                            PNT.findOne({
                                                                                                                                                                                userID: L13R1
                                                                                                                                                                            }, (err, data) => {
                                                                                                                                                                                if (err) console.log(err);
                                                                                                                                                                                if (!data) {
                                                                                                                                                                                    const newPNT = new PNT({
                                                                                                                                                                                        serverID: message.guild.id,
                                                                                                                                                                                        userID: L13R1,
                                                                                                                                                                                        name: collected.first().author.username,
                                                                                                                                                                                        points: 1,
                                                                                                                                                                                        lb: "all"
                                                                                                                                                                                    })
                                                                                                                                                                                    newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                } else {
                                                                                                                                                                                    data.points += 1;
                                                                                                                                                                                    data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                }
                                                                                                                                                                            });

                                                                                                                                                                            PNT.findOne({
                                                                                                                                                                                userID: L13R2
                                                                                                                                                                            }, (err, data) => {
                                                                                                                                                                                if (err) console.log(err);
                                                                                                                                                                                if (!data) {
                                                                                                                                                                                    const newPNT = new PNT({
                                                                                                                                                                                        serverID: message.guild.id,
                                                                                                                                                                                        userID: L13R2,
                                                                                                                                                                                        name: collected.last().author.username,
                                                                                                                                                                                        points: 1,
                                                                                                                                                                                        lb: "all"
                                                                                                                                                                                    })
                                                                                                                                                                                    newPNT.save().catch(err => console.log(err));
                                                                                                                                                                                } else {
                                                                                                                                                                                    data.points += 1;
                                                                                                                                                                                    data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                }
                                                                                                                                                                            });
                                                                                                                                                                            message.channel.send(`[🎮] The correct answer was **${data.answer13}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                                                                                                                                                            message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                                SEND_MESSAGES: false,
                                                                                                                                                                            }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                                            // LEVEL END
                                                                                                                                                                            setTimeout(function() {
                                                                                                                                                                                message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                                    SEND_MESSAGES: true,
                                                                                                                                                                                }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                                                // LEVEL 14
                                                                                                                                                                                message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs14));
                                                                                                                                                                                const LV14 = m => (m.content.toLowerCase().startsWith(data.answer14.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer14.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                                                                                                                                                                message.channel.awaitMessages(LV14, {
                                                                                                                                                                                        max: 2,
                                                                                                                                                                                        time: 9999999,
                                                                                                                                                                                        errors: ['time']
                                                                                                                                                                                    })
                                                                                                                                                                                    .then(collected => {
                                                                                                                                                                                        const L14R1 = collected.first().author.id
                                                                                                                                                                                        const L14R2 = collected.last().author.id
                                                                                                                                                                                        collected.first().react('✅')
                                                                                                                                                                                        collected.last().react('✅')
                                                                                                                                                                                        PNT.findOne({
                                                                                                                                                                                            userID: L14R1
                                                                                                                                                                                        }, (err, data) => {
                                                                                                                                                                                            if (err) console.log(err);
                                                                                                                                                                                            if (!data) {
                                                                                                                                                                                                const newPNT = new PNT({
                                                                                                                                                                                                    serverID: message.guild.id,
                                                                                                                                                                                                    userID: L14R1,
                                                                                                                                                                                                    name: collected.first().author.username,
                                                                                                                                                                                                    points: 1,
                                                                                                                                                                                                    lb: "all"
                                                                                                                                                                                                })
                                                                                                                                                                                                newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                            } else {
                                                                                                                                                                                                data.points += 1;
                                                                                                                                                                                                data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                            }
                                                                                                                                                                                        });

                                                                                                                                                                                        PNT.findOne({
                                                                                                                                                                                            userID: L14R2
                                                                                                                                                                                        }, (err, data) => {
                                                                                                                                                                                            if (err) console.log(err);
                                                                                                                                                                                            if (!data) {
                                                                                                                                                                                                const newPNT = new PNT({
                                                                                                                                                                                                    serverID: message.guild.id,
                                                                                                                                                                                                    userID: L14R2,
                                                                                                                                                                                                    name: collected.last().author.username,
                                                                                                                                                                                                    points: 1,
                                                                                                                                                                                                    lb: "all"
                                                                                                                                                                                                })
                                                                                                                                                                                                newPNT.save().catch(err => console.log(err));
                                                                                                                                                                                            } else {
                                                                                                                                                                                                data.points += 1;
                                                                                                                                                                                                data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                            }
                                                                                                                                                                                        });
                                                                                                                                                                                        message.channel.send(`[🎮] The correct answer was **${data.answer14}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                                                                                                                                                                        message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                                            SEND_MESSAGES: false,
                                                                                                                                                                                        }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                                                        // LEVEL END
                                                                                                                                                                                        setTimeout(function() {
                                                                                                                                                                                            message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                                                SEND_MESSAGES: true,
                                                                                                                                                                                            }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                                                            // LEVEL 15
                                                                                                                                                                                            message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs15));
                                                                                                                                                                                            const LV15 = m => (m.content.toLowerCase().startsWith(data.answer15.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer15.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                                                                                                                                                                            message.channel.awaitMessages(LV15, {
                                                                                                                                                                                                    max: 2,
                                                                                                                                                                                                    time: 9999999,
                                                                                                                                                                                                    errors: ['time']
                                                                                                                                                                                                })
                                                                                                                                                                                                .then(collected => {
                                                                                                                                                                                                    const L15R1 = collected.first().author.id
                                                                                                                                                                                                    const L15R2 = collected.last().author.id
                                                                                                                                                                                                    collected.first().react('✅')
                                                                                                                                                                                                    collected.last().react('✅')
                                                                                                                                                                                                    PNT.findOne({
                                                                                                                                                                                                        userID: L15R1
                                                                                                                                                                                                    }, (err, data) => {
                                                                                                                                                                                                        if (err) console.log(err);
                                                                                                                                                                                                        if (!data) {
                                                                                                                                                                                                            const newPNT = new PNT({
                                                                                                                                                                                                                serverID: message.guild.id,
                                                                                                                                                                                                                userID: L15R1,
                                                                                                                                                                                                                name: collected.first().author.username,
                                                                                                                                                                                                                points: 1,
                                                                                                                                                                                                                lb: "all"
                                                                                                                                                                                                            })
                                                                                                                                                                                                            newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                        } else {
                                                                                                                                                                                                            data.points += 1;
                                                                                                                                                                                                            data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                        }
                                                                                                                                                                                                    });

                                                                                                                                                                                                    PNT.findOne({
                                                                                                                                                                                                        userID: L15R2
                                                                                                                                                                                                    }, (err, data) => {
                                                                                                                                                                                                        if (err) console.log(err);
                                                                                                                                                                                                        if (!data) {
                                                                                                                                                                                                            const newPNT = new PNT({
                                                                                                                                                                                                                serverID: message.guild.id,
                                                                                                                                                                                                                userID: L15R2,
                                                                                                                                                                                                                name: collected.last().author.username,
                                                                                                                                                                                                                points: 1,
                                                                                                                                                                                                                lb: "all"
                                                                                                                                                                                                            })
                                                                                                                                                                                                            newPNT.save().catch(err => console.log(err));
                                                                                                                                                                                                        } else {
                                                                                                                                                                                                            data.points += 1;
                                                                                                                                                                                                            data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                        }
                                                                                                                                                                                                    });
                                                                                                                                                                                                    message.channel.send(`[🎮] The correct answer was **${data.answer15}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                                                                                                                                                                                    message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                                                        SEND_MESSAGES: false,
                                                                                                                                                                                                    }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                                                                    // LEVEL END
                                                                                                                                                                                                    setTimeout(function() {
                                                                                                                                                                                                        message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                                                            SEND_MESSAGES: true,
                                                                                                                                                                                                        }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                                                                        // LEVEL 16
                                                                                                                                                                                                        message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs16));
                                                                                                                                                                                                        const LV16 = m => (m.content.toLowerCase().startsWith(data.answer16.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer16.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                                                                                                                                                                                        message.channel.awaitMessages(LV16, {
                                                                                                                                                                                                                max: 2,
                                                                                                                                                                                                                time: 9999999,
                                                                                                                                                                                                                errors: ['time']
                                                                                                                                                                                                            })
                                                                                                                                                                                                            .then(collected => {
                                                                                                                                                                                                                const L16R1 = collected.first().author.id
                                                                                                                                                                                                                const L16R2 = collected.last().author.id
                                                                                                                                                                                                                collected.first().react('✅')
                                                                                                                                                                                                                collected.last().react('✅')
                                                                                                                                                                                                                PNT.findOne({
                                                                                                                                                                                                                    userID: L16R1
                                                                                                                                                                                                                }, (err, data) => {
                                                                                                                                                                                                                    if (err) console.log(err);
                                                                                                                                                                                                                    if (!data) {
                                                                                                                                                                                                                        const newPNT = new PNT({
                                                                                                                                                                                                                            serverID: message.guild.id,
                                                                                                                                                                                                                            userID: L16R1,
                                                                                                                                                                                                                            name: collected.first().author.username,
                                                                                                                                                                                                                            points: 1,
                                                                                                                                                                                                                            lb: "all"
                                                                                                                                                                                                                        })
                                                                                                                                                                                                                        newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                        data.points += 1;
                                                                                                                                                                                                                        data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                });

                                                                                                                                                                                                                PNT.findOne({
                                                                                                                                                                                                                    userID: L16R2
                                                                                                                                                                                                                }, (err, data) => {
                                                                                                                                                                                                                    if (err) console.log(err);
                                                                                                                                                                                                                    if (!data) {
                                                                                                                                                                                                                        const newPNT = new PNT({
                                                                                                                                                                                                                            serverID: message.guild.id,
                                                                                                                                                                                                                            userID: L16R2,
                                                                                                                                                                                                                            name: collected.last().author.username,
                                                                                                                                                                                                                            points: 1,
                                                                                                                                                                                                                            lb: "all"
                                                                                                                                                                                                                        })
                                                                                                                                                                                                                        newPNT.save().catch(err => console.log(err));
                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                        data.points += 1;
                                                                                                                                                                                                                        data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                });
                                                                                                                                                                                                                message.channel.send(`[🎮] The correct answer was **${data.answer16}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                                                                                                                                                                                                message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                                                                    SEND_MESSAGES: false,
                                                                                                                                                                                                                }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                                                                                // LEVEL END
                                                                                                                                                                                                                setTimeout(function() {
                                                                                                                                                                                                                    message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                                                                        SEND_MESSAGES: true,
                                                                                                                                                                                                                    }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                                                                                    // LEVEL 17
                                                                                                                                                                                                                    message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs17));
                                                                                                                                                                                                                    const LV17 = m => (m.content.toLowerCase().startsWith(data.answer17.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer17.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                                                                                                                                                                                                    message.channel.awaitMessages(LV17, {
                                                                                                                                                                                                                            max: 2,
                                                                                                                                                                                                                            time: 9999999,
                                                                                                                                                                                                                            errors: ['time']
                                                                                                                                                                                                                        })
                                                                                                                                                                                                                        .then(collected => {
                                                                                                                                                                                                                            const L17R1 = collected.first().author.id
                                                                                                                                                                                                                            const L17R2 = collected.last().author.id
                                                                                                                                                                                                                            collected.first().react('✅')
                                                                                                                                                                                                                            collected.last().react('✅')
                                                                                                                                                                                                                            PNT.findOne({
                                                                                                                                                                                                                                userID: L17R1
                                                                                                                                                                                                                            }, (err, data) => {
                                                                                                                                                                                                                                if (err) console.log(err);
                                                                                                                                                                                                                                if (!data) {
                                                                                                                                                                                                                                    const newPNT = new PNT({
                                                                                                                                                                                                                                        serverID: message.guild.id,
                                                                                                                                                                                                                                        userID: L17R1,
                                                                                                                                                                                                                                        name: collected.first().author.username,
                                                                                                                                                                                                                                        points: 1,
                                                                                                                                                                                                                                        lb: "all"
                                                                                                                                                                                                                                    })
                                                                                                                                                                                                                                    newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                    data.points += 1;
                                                                                                                                                                                                                                    data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                            });

                                                                                                                                                                                                                            PNT.findOne({
                                                                                                                                                                                                                                userID: L17R2
                                                                                                                                                                                                                            }, (err, data) => {
                                                                                                                                                                                                                                if (err) console.log(err);
                                                                                                                                                                                                                                if (!data) {
                                                                                                                                                                                                                                    const newPNT = new PNT({
                                                                                                                                                                                                                                        serverID: message.guild.id,
                                                                                                                                                                                                                                        userID: L17R2,
                                                                                                                                                                                                                                        name: collected.last().author.username,
                                                                                                                                                                                                                                        points: 1,
                                                                                                                                                                                                                                        lb: "all"
                                                                                                                                                                                                                                    })
                                                                                                                                                                                                                                    newPNT.save().catch(err => console.log(err));
                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                    data.points += 1;
                                                                                                                                                                                                                                    data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                                                }
                                                                                                                                                                                                                            });
                                                                                                                                                                                                                            message.channel.send(`[🎮] The correct answer was **${data.answer17}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                                                                                                                                                                                                            message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                                                                                SEND_MESSAGES: false,
                                                                                                                                                                                                                            }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                                                                                            // LEVEL END
                                                                                                                                                                                                                            setTimeout(function() {
                                                                                                                                                                                                                                message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                                                                                    SEND_MESSAGES: true,
                                                                                                                                                                                                                                }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                                                                                                // LEVEL 18
                                                                                                                                                                                                                                message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs18));
                                                                                                                                                                                                                                const LV18 = m => (m.content.toLowerCase().startsWith(data.answer18.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer18.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                                                                                                                                                                                                                message.channel.awaitMessages(LV18, {
                                                                                                                                                                                                                                        max: 2,
                                                                                                                                                                                                                                        time: 9999999,
                                                                                                                                                                                                                                        errors: ['time']
                                                                                                                                                                                                                                    })
                                                                                                                                                                                                                                    .then(collected => {
                                                                                                                                                                                                                                        const L18R1 = collected.first().author.id
                                                                                                                                                                                                                                        const L18R2 = collected.last().author.id
                                                                                                                                                                                                                                        collected.first().react('✅')
                                                                                                                                                                                                                                        collected.last().react('✅')
                                                                                                                                                                                                                                        PNT.findOne({
                                                                                                                                                                                                                                            userID: L18R1
                                                                                                                                                                                                                                        }, (err, data) => {
                                                                                                                                                                                                                                            if (err) console.log(err);
                                                                                                                                                                                                                                            if (!data) {
                                                                                                                                                                                                                                                const newPNT = new PNT({
                                                                                                                                                                                                                                                    serverID: message.guild.id,
                                                                                                                                                                                                                                                    userID: L18R1,
                                                                                                                                                                                                                                                    name: collected.first().author.username,
                                                                                                                                                                                                                                                    points: 1,
                                                                                                                                                                                                                                                    lb: "all"
                                                                                                                                                                                                                                                })
                                                                                                                                                                                                                                                newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                data.points += 1;
                                                                                                                                                                                                                                                data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                        PNT.findOne({
                                                                                                                                                                                                                                            userID: L18R2
                                                                                                                                                                                                                                        }, (err, data) => {
                                                                                                                                                                                                                                            if (err) console.log(err);
                                                                                                                                                                                                                                            if (!data) {
                                                                                                                                                                                                                                                const newPNT = new PNT({
                                                                                                                                                                                                                                                    serverID: message.guild.id,
                                                                                                                                                                                                                                                    userID: L18R2,
                                                                                                                                                                                                                                                    name: collected.last().author.username,
                                                                                                                                                                                                                                                    points: 1,
                                                                                                                                                                                                                                                    lb: "all"
                                                                                                                                                                                                                                                })
                                                                                                                                                                                                                                                newPNT.save().catch(err => console.log(err));
                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                data.points += 1;
                                                                                                                                                                                                                                                data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                        message.channel.send(`[🎮] The correct answer was **${data.answer18}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                                                                                                                                                                                                                        message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                                                                                            SEND_MESSAGES: false,
                                                                                                                                                                                                                                        }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                                                                                                        // LEVEL END
                                                                                                                                                                                                                                        setTimeout(function() {
                                                                                                                                                                                                                                            message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                                                                                                SEND_MESSAGES: true,
                                                                                                                                                                                                                                            }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                                                                                                            // LEVEL 19
                                                                                                                                                                                                                                            message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs19));
                                                                                                                                                                                                                                            const LV19 = m => (m.content.toLowerCase().startsWith(data.answer19.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer19.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                                                                                                                                                                                                                            message.channel.awaitMessages(LV19, {
                                                                                                                                                                                                                                                    max: 2,
                                                                                                                                                                                                                                                    time: 9999999,
                                                                                                                                                                                                                                                    errors: ['time']
                                                                                                                                                                                                                                                })
                                                                                                                                                                                                                                                .then(collected => {
                                                                                                                                                                                                                                                    const L19R1 = collected.first().author.id
                                                                                                                                                                                                                                                    const L19R2 = collected.last().author.id
                                                                                                                                                                                                                                                    collected.first().react('✅')
                                                                                                                                                                                                                                                    collected.last().react('✅')
                                                                                                                                                                                                                                                    PNT.findOne({
                                                                                                                                                                                                                                                        userID: L19R1
                                                                                                                                                                                                                                                    }, (err, data) => {
                                                                                                                                                                                                                                                        if (err) console.log(err);
                                                                                                                                                                                                                                                        if (!data) {
                                                                                                                                                                                                                                                            const newPNT = new PNT({
                                                                                                                                                                                                                                                                serverID: message.guild.id,
                                                                                                                                                                                                                                                                userID: L19R1,
                                                                                                                                                                                                                                                                name: collected.first().author.username,
                                                                                                                                                                                                                                                                points: 1,
                                                                                                                                                                                                                                                                lb: "all"
                                                                                                                                                                                                                                                            })
                                                                                                                                                                                                                                                            newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                            data.points += 1;
                                                                                                                                                                                                                                                            data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                    });

                                                                                                                                                                                                                                                    PNT.findOne({
                                                                                                                                                                                                                                                        userID: L19R2
                                                                                                                                                                                                                                                    }, (err, data) => {
                                                                                                                                                                                                                                                        if (err) console.log(err);
                                                                                                                                                                                                                                                        if (!data) {
                                                                                                                                                                                                                                                            const newPNT = new PNT({
                                                                                                                                                                                                                                                                serverID: message.guild.id,
                                                                                                                                                                                                                                                                userID: L19R2,
                                                                                                                                                                                                                                                                name: collected.last().author.username,
                                                                                                                                                                                                                                                                points: 1,
                                                                                                                                                                                                                                                                lb: "all"
                                                                                                                                                                                                                                                            })
                                                                                                                                                                                                                                                            newPNT.save().catch(err => console.log(err));
                                                                                                                                                                                                                                                        } else {
                                                                                                                                                                                                                                                            data.points += 1;
                                                                                                                                                                                                                                                            data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                    message.channel.send(`[🎮] The correct answer was **${data.answer19}**.\nThe next round will begin in 15 seconds. Please be patient.\n<:pcPLACEHOLDER:786598522001817630>`);
                                                                                                                                                                                                                                                    message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                                                                                                        SEND_MESSAGES: false,
                                                                                                                                                                                                                                                    }, `GUESS THE BLANK: Round End | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                                                                                                                    // LEVEL END
                                                                                                                                                                                                                                                    setTimeout(function() {
                                                                                                                                                                                                                                                        message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                                                                                                            SEND_MESSAGES: true,
                                                                                                                                                                                                                                                        }, `GUESS THE BLANK: Round Start | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                                                                                                                        // LEVEL 20 / FINAL
                                                                                                                                                                                                                                                        message.channel.send(`[🎮] ${respo}`).then(message.channel.send(data.attachs20));
                                                                                                                                                                                                                                                        const LV20 = m => (m.content.toLowerCase().startsWith(data.answer20.toLowerCase()) || m.content.toLowerCase().startsWith(data.answer20.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, ""))) && !m.member.roles.cache.has(champR.id);
                                                                                                                                                                                                                                                        message.channel.awaitMessages(LV20, {
                                                                                                                                                                                                                                                                max: 2,
                                                                                                                                                                                                                                                                time: 9999999,
                                                                                                                                                                                                                                                                errors: ['time']
                                                                                                                                                                                                                                                            })
                                                                                                                                                                                                                                                            .then(collected => {
                                                                                                                                                                                                                                                                const L20R1 = collected.first().author.id
                                                                                                                                                                                                                                                                const L20R2 = collected.last().author.id
                                                                                                                                                                                                                                                                collected.first().react('✅')
                                                                                                                                                                                                                                                                collected.last().react('✅')
                                                                                                                                                                                                                                                                PNT.findOne({
                                                                                                                                                                                                                                                                    userID: L20R1
                                                                                                                                                                                                                                                                }, (err, data) => {
                                                                                                                                                                                                                                                                    if (err) console.log(err);
                                                                                                                                                                                                                                                                    if (!data) {
                                                                                                                                                                                                                                                                        const newPNT = new PNT({
                                                                                                                                                                                                                                                                            serverID: message.guild.id,
                                                                                                                                                                                                                                                                            userID: L20R1,
                                                                                                                                                                                                                                                                            name: collected.first().author.username,
                                                                                                                                                                                                                                                                            points: 1,
                                                                                                                                                                                                                                                                            lb: "all"
                                                                                                                                                                                                                                                                        })
                                                                                                                                                                                                                                                                        newPNT.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                        data.points += 1;
                                                                                                                                                                                                                                                                        data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                PNT.findOne({
                                                                                                                                                                                                                                                                    userID: L20R2
                                                                                                                                                                                                                                                                }, (err, data) => {
                                                                                                                                                                                                                                                                    if (err) console.log(err);
                                                                                                                                                                                                                                                                    if (!data) {
                                                                                                                                                                                                                                                                        const newPNT = new PNT({
                                                                                                                                                                                                                                                                            serverID: message.guild.id,
                                                                                                                                                                                                                                                                            userID: L20R2,
                                                                                                                                                                                                                                                                            name: collected.last().author.username,
                                                                                                                                                                                                                                                                            points: 1,
                                                                                                                                                                                                                                                                            lb: "all"
                                                                                                                                                                                                                                                                        })
                                                                                                                                                                                                                                                                        newPNT.save().catch(err => console.log(err));
                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                        data.points += 1;
                                                                                                                                                                                                                                                                        data.save().catch(err => message.reply(`An error occurred. Please contact Farah ASAP.\n\`\`\`${err}\`\`\``));
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                });
                                                                                                                                                                                                                                                                message.channel.send(`[🎮] This marks the end of **Guess The Blank**. Thank you all for participating.\nA staff member may run the \`-end\` command to show leaderboards and further instruction. Chat will be opened for 2 minutes for additional conversations.`);
                                                                                                                                                                                                                                                                message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                                                                                                                    SEND_MESSAGES: true,
                                                                                                                                                                                                                                                                }, `GUESS THE BLANK: Game End | 2 MINUTE CHAT TIME`);

                                                                                                                                                                                                                                                                setTimeout(function() {
                                                                                                                                                                                                                                                                    message.channel.updateOverwrite(message.guild.id, {
                                                                                                                                                                                                                                                                        SEND_MESSAGES: false,
                                                                                                                                                                                                                                                                    }, `GUESS THE BLANK: Chat Time & Game End | [${new Date().toLocaleTimeString()}]`);
                                                                                                                                                                                                                                                                    message.channel.send(`**[⚠️]** Chat has been locked.`);
                                                                                                                                                                                                                                                                }, 120000)


                                                                                                                                                                                                                                                            })
                                                                                                                                                                                                                                                    }, 15000);
                                                                                                                                                                                                                                                })
                                                                                                                                                                                                                                        }, 15000);
                                                                                                                                                                                                                                    })

                                                                                                                                                                                                                            }, 15000);
                                                                                                                                                                                                                        })
                                                                                                                                                                                                                }, 15000);
                                                                                                                                                                                                            })
                                                                                                                                                                                                    }, 15000);
                                                                                                                                                                                                })
                                                                                                                                                                                        }, 15000);
                                                                                                                                                                                    })
                                                                                                                                                                            }, 15000);
                                                                                                                                                                        })
                                                                                                                                                                }, 15000);
                                                                                                                                                            })
                                                                                                                                                    }, 15000);
                                                                                                                                                })
                                                                                                                                        }, 15000);
                                                                                                                                    });
                                                                                                                            }, 15000);
                                                                                                                        });
                                                                                                                }, 15000);
                                                                                                            });
                                                                                                    }, 15000);
                                                                                                });
                                                                                        }, 15000);
                                                                                    })
                                                                            }, 15000);
                                                                        })
                                                                }, 15000);
                                                            });
                                                    }, 15000);
                                                })

                                        }, 15000);
                                    })
                            }, 15000);
                        })
                        .catch(collected => console.log(`${collected.size}`));
                }, 25000)

            } catch (err) {
                message.reply(`An error occurred. Please contact Farah ASAP:\n\`\`\`\n${err}\`\`\``)
            }
        });
    }
}