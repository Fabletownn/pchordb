const Discord = require('discord.js');
const Client = require('fortnite');
const fortnite = new Client(process.env.FT_apiKey);

module.exports = {
    name: 'fortnite',
    description: '[FUN] This will search for the Fortnite Statistics of any given EPIC account by username. This information is taken from Fortnite Tracker. Only EPIC usernames with no spaces may be searched for right now. <[setPrefix]fortnite <EPIC username> (<platform>)>',
    async execute(message, args) {
		message.delete();
		
		let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '789937524763000832') return;

		let messageArgs = message.content.split(" ");
		
        let fortniteUsername = messageArgs[1];
        let fortnitePlatform = messageArgs[2];

        if (!fortniteUsername) return message.channel.send(`**[<:statsChordSixString:788870454035087370>] ${message.author.username}**, please input an EPIC username to look up Fortnite statistics for.`).then(m => m.delete({
            timeout: 10000
        }));

        message.channel.send(`Fetching..`).then(msg => {
            if (!fortnitePlatform || fortnitePlatform.toLowerCase() === "pc") {
                let data = fortnite.user(fortniteUsername, "pc").then(data => {
                    if (!data.username || data.username === undefined) return msg.edit(`**[<:statsChordSixString:788870454035087370>] ${message.author.username}**, that username was not found within the Fortnite Tracker database.\nPlease ensure you're providing EPIC usernames and not PSN or XBox Tags.\n\n*(Unfortunately for right now, EPIC usernames with spaces cannot be looked up).*`).then(m => m.delete({
                        timeout: 10000
                    }));

                    msg.react(`<:statsChordLifetime:788889424086958110>`);
                    msg.react(`<:pcPLACEHOLDER:786598522001817630>`);
                    msg.react(`<:statsChordSolos:788852207641821224>`);
                    msg.react(`<:statsChordDuos:788889424725147648>`);
                    msg.react(`<:statsChordSquads:788889423911190540>`);

                    const lifetimeFilter = (reaction, user) => reaction.emoji.name === 'statsChordLifetime' && user.id === message.author.id;
                    const soloFilter = (reaction, user) => reaction.emoji.name === 'statsChordSolos' && user.id === message.author.id;
                    const duoFilter = (reaction, user) => reaction.emoji.name === 'statsChordDuos' && user.id === message.author.id;
                    const squadFilter = (reaction, user) => reaction.emoji.name === 'statsChordSquads' && user.id === message.author.id;

                    let dataStatistics = data.stats;
                    let lifetimeStats = dataStatistics.lifetime;

                    let userMatches = lifetimeStats.matches;
                    let userWins = lifetimeStats.wins;
                    let userKills = lifetimeStats.kills;
                    let userKD = lifetimeStats.kd;
                    let userTop5 = lifetimeStats.top_5;
                    let userTop3 = lifetimeStats.top_3;

                    const lifetimeEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Fortnite Statistics | Lifetime`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTitle(`${data.username} | ${data.platform}`)
                        .addField(`<:statsChordLove:788852443462893579> Matches Played`, userMatches.toLocaleString(), true)
                        .addField(`<:statsChordVictory:788889424284876821> Matches Won`, userWins.toLocaleString(), true)
                        .addField(`<:statsChordBullseye:788852208619094036> Kill Count`, userKills.toLocaleString(), true)
                        .addField(`<:statsChordPotion:788853249682964520> K/D Ratio`, userKD, true)
                        .addField(`<:statsChord1HP:788852565206761544> Placed Top 3`, userTop3.toLocaleString(), true)
                        .addField(`<:statsChordGG:788852921545654282> Placed Top 5`, userTop5.toLocaleString(), true)
                        .setColor(message.member.displayColor || 'eb4bc9')
                        .setThumbnail('https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/1052/2019/08/13071156/fortnite-logo.jpg')
                        .setFooter(`FORTNITE User ${data.id}`)

                    msg.edit(`Press on the reactions corresponding to the mode statistics you'd like to view.\n<:statsChordLifetime:788889424086958110>: Lifetime Statistics <:statsChordSolos:788852207641821224>: Solos Statistics <:statsChordDuos:788889424725147648>: Duos Statistics <:statsChordSquads:788889423911190540>: Squads Statistics`, {
                        embed: lifetimeEmbed
                    });

                    let soloStats = dataStatistics.solo;

                    let userMatchesS = soloStats.matches;
                    let userWinsS = soloStats.wins;
                    let userKillsS = soloStats.kills;
                    let userKDS = soloStats.kd;
                    let userTop5S = soloStats.top_5;
                    let userTop3S = soloStats.top_3;
                    let userScoreS = soloStats.score;

                    const soloEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Fortnite Statistics | Solos`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTitle(`${data.username} | ${data.platform}`)
                        .addField(`<:statsChordLove:788852443462893579> Matches Played`, userMatchesS.toLocaleString(), true)
                        .addField(`<:statsChordVictory:788889424284876821> Matches Won`, userWinsS.toLocaleString(), true)
                        .addField(`<:statsChordBullseye:788852208619094036> Kill Count`, userKillsS.toLocaleString(), true)
                        .addField(`<:statsChordPotion:788853249682964520> K/D Ratio`, userKDS, true)
                        .addField(`<:statsChord1HP:788852565206761544> Placed Top 3`, userTop3S.toLocaleString(), true)
                        .addField(`<:statsChordGG:788852921545654282> Placed Top 5`, userTop5S.toLocaleString(), true)
                        .addField(`<:statsChordFiery:788908057102123018> Score`, userScoreS.toLocaleString(), true)
                        .setColor(message.member.displayColor || 'eb4bc9')
                        .setThumbnail('https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/1052/2019/08/13071156/fortnite-logo.jpg')
                        .setFooter(`FORTNITE User ${data.id}`)

                    let duoStats = dataStatistics.duo;

                    let userMatchesD = duoStats.matches;
                    let userWinsD = duoStats.wins;
                    let userKillsD = duoStats.kills;
                    let userKDD = duoStats.kd;
                    let userTop5D = duoStats.top_5;
                    let userTop3D = duoStats.top_3;
                    let userScoreD = duoStats.score;

                    const duoEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Fortnite Statistics | Duos`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTitle(`${data.username} | ${data.platform}`)
                        .addField(`<:statsChordLove:788852443462893579> Matches Played`, userMatchesD.toLocaleString(), true)
                        .addField(`<:statsChordVictory:788889424284876821> Matches Won`, userWinsD.toLocaleString(), true)
                        .addField(`<:statsChordBullseye:788852208619094036> Kill Count`, userKillsD.toLocaleString(), true)
                        .addField(`<:statsChordPotion:788853249682964520> K/D Ratio`, userKDD, true)
                        .addField(`<:statsChord1HP:788852565206761544> Placed Top 3`, userTop3D.toLocaleString(), true)
                        .addField(`<:statsChordGG:788852921545654282> Placed Top 5`, userTop5D.toLocaleString(), true)
                        .addField(`<:statsChordFiery:788908057102123018> Score`, userScoreD.toLocaleString(), true)
                        .setColor(message.member.displayColor || 'eb4bc9')
                        .setThumbnail('https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/1052/2019/08/13071156/fortnite-logo.jpg')
                        .setFooter(`FORTNITE User ${data.id}`)

                    let squadStats = dataStatistics.squad;

                    let userMatchesQ = squadStats.matches;
                    let userWinsQ = squadStats.wins;
                    let userKillsQ = squadStats.kills;
                    let userKDQ = squadStats.kd;
                    let userTop5Q = squadStats.top_5;
                    let userTop3Q = squadStats.top_3;
                    let userScoreQ = squadStats.score;

                    const squadEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Fortnite Statistics | Squads`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTitle(`${data.username} | ${data.platform}`)
                        .addField(`<:statsChordLove:788852443462893579> Matches Played`, userMatchesQ.toLocaleString(), true)
                        .addField(`<:statsChordVictory:788889424284876821> Matches Won`, userWinsQ.toLocaleString(), true)
                        .addField(`<:statsChordBullseye:788852208619094036> Kill Count`, userKillsQ.toLocaleString(), true)
                        .addField(`<:statsChordPotion:788853249682964520> K/D Ratio`, userKDQ, true)
                        .addField(`<:statsChord1HP:788852565206761544> Placed Top 3`, userTop3Q.toLocaleString(), true)
                        .addField(`<:statsChordGG:788852921545654282> Placed Top 5`, userTop5Q.toLocaleString(), true)
                        .addField(`<:statsChordFiery:788908057102123018> Score`, userScoreQ.toLocaleString(), true)
                        .setColor(message.member.displayColor || 'eb4bc9')
                        .setThumbnail('https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/1052/2019/08/13071156/fortnite-logo.jpg')
                        .setFooter(`FORTNITE User ${data.id}`)

                    const lifetimeReaction = msg.createReactionCollector(lifetimeFilter, {
                        time: 600000
                    });
                    const soloReaction = msg.createReactionCollector(soloFilter, {
                        time: 600000
                    });
                    const duoReaction = msg.createReactionCollector(duoFilter, {
                        time: 600000
                    });
                    const squadReaction = msg.createReactionCollector(squadFilter, {
                        time: 600000
                    });

                    lifetimeReaction.on('collect', r => {
                        msg.edit(`Press on the reactions corresponding to the mode statistics you'd like to view.\n<:statsChordLifetime:788889424086958110>: Lifetime Statistics <:statsChordSolos:788852207641821224>: Solos Statistics <:statsChordDuos:788889424725147648>: Duos Statistics <:statsChordSquads:788889423911190540>: Squads Statistics`, {
                            embed: lifetimeEmbed
                        });
                        const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
                        try {
                            for (const reaction of userReactions.values()) {
                                reaction.users.remove(message.author.id);
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }
                    });

                    soloReaction.on('collect', r => {
                        msg.edit(`Press on the reactions corresponding to the mode statistics you'd like to view.\n<:statsChordLifetime:788889424086958110>: Lifetime Statistics <:statsChordSolos:788852207641821224>: Solos Statistics <:statsChordDuos:788889424725147648>: Duos Statistics <:statsChordSquads:788889423911190540>: Squads Statistics`, {
                            embed: soloEmbed
                        });
                        const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
                        try {
                            for (const reaction of userReactions.values()) {
                                reaction.users.remove(message.author.id);
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }
                    });

                    duoReaction.on('collect', r => {
                        msg.edit(`Press on the reactions corresponding to the mode statistics you'd like to view.\n<:statsChordLifetime:788889424086958110>: Lifetime Statistics <:statsChordSolos:788852207641821224>: Solos Statistics <:statsChordDuos:788889424725147648>: Duos Statistics <:statsChordSquads:788889423911190540>: Squads Statistics`, {
                            embed: duoEmbed
                        });
                        const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
                        try {
                            for (const reaction of userReactions.values()) {
                                reaction.users.remove(message.author.id);
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }
                    });

                    squadReaction.on('collect', r => {
                        msg.edit(`Press on the reactions corresponding to the mode statistics you'd like to view.\n<:statsChordLifetime:788889424086958110>: Lifetime Statistics <:statsChordSolos:788852207641821224>: Solos Statistics <:statsChordDuos:788889424725147648>: Duos Statistics <:statsChordSquads:788889423911190540>: Squads Statistics`, {
                            embed: squadEmbed
                        });
                        const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
                        try {
                            for (const reaction of userReactions.values()) {
                                reaction.users.remove(message.author.id);
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }
                    });
                }).catch(err => {
                    console.log(err);
                    return msg.edit(`**[<:statsChordSixString:788870454035087370>] ${message.author.username}**, that username was not found within the Fortnite Tracker database.\nPlease ensure you're providing EPIC usernames and not PSN or XBox Tags.\n\n*(Unfortunately for right now, EPIC usernames with spaces cannot be looked up).*`).then(m => m.delete({
                        timeout: 10000
                    }));
                });
            } else if (fortnitePlatform.toLowerCase() === "xbl") {
                let data = fortnite.user(fortniteUsername, "xbl").then(data => {
                    if (!data.username || data.username === undefined) return msg.edit(`**[<:statsChordSixString:788870454035087370>] ${message.author.username}**, that username was not found within the Fortnite Tracker database.\nPlease ensure you're providing EPIC usernames and not PSN or XBox Tags.\n\n*(Unfortunately for right now, EPIC usernames with spaces cannot be looked up).*`).then(m => m.delete({
                        timeout: 10000
                    }));

                    msg.react(`<:statsChordLifetime:788889424086958110>`);
                    msg.react(`<:pcPLACEHOLDER:786598522001817630>`);
                    msg.react(`<:statsChordSolos:788852207641821224>`);
                    msg.react(`<:statsChordDuos:788889424725147648>`);
                    msg.react(`<:statsChordSquads:788889423911190540>`);

                    const lifetimeFilter = (reaction, user) => reaction.emoji.name === 'statsChordLifetime' && user.id === message.author.id;
                    const soloFilter = (reaction, user) => reaction.emoji.name === 'statsChordSolos' && user.id === message.author.id;
                    const duoFilter = (reaction, user) => reaction.emoji.name === 'statsChordDuos' && user.id === message.author.id;
                    const squadFilter = (reaction, user) => reaction.emoji.name === 'statsChordSquads' && user.id === message.author.id;

                    let dataStatistics = data.stats;
                    let lifetimeStats = dataStatistics.lifetime;

                    let userMatches = lifetimeStats.matches;
                    let userWins = lifetimeStats.wins;
                    let userKills = lifetimeStats.kills;
                    let userKD = lifetimeStats.kd;
                    let userTop5 = lifetimeStats.top_5;
                    let userTop3 = lifetimeStats.top_3;

                    const lifetimeEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Fortnite Statistics | Lifetime`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTitle(`${data.username} | ${data.platform}`)
                        .addField(`<:statsChordLove:788852443462893579> Matches Played`, userMatches.toLocaleString(), true)
                        .addField(`<:statsChordVictory:788889424284876821> Matches Won`, userWins.toLocaleString(), true)
                        .addField(`<:statsChordBullseye:788852208619094036> Kill Count`, userKills.toLocaleString(), true)
                        .addField(`<:statsChordPotion:788853249682964520> K/D Ratio`, userKD, true)
                        .addField(`<:statsChord1HP:788852565206761544> Placed Top 3`, userTop3.toLocaleString(), true)
                        .addField(`<:statsChordGG:788852921545654282> Placed Top 5`, userTop5.toLocaleString(), true)
                        .setColor(message.member.displayColor || 'eb4bc9')
                        .setThumbnail('https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/1052/2019/08/13071156/fortnite-logo.jpg')
                        .setFooter(`FORTNITE User ${data.id}`)

                    msg.edit(`Press on the reactions corresponding to the mode statistics you'd like to view.\n<:statsChordLifetime:788889424086958110>: Lifetime Statistics <:statsChordSolos:788852207641821224>: Solos Statistics <:statsChordDuos:788889424725147648>: Duos Statistics <:statsChordSquads:788889423911190540>: Squads Statistics`, {
                        embed: lifetimeEmbed
                    });

                    let soloStats = dataStatistics.solo;

                    let userMatchesS = soloStats.matches;
                    let userWinsS = soloStats.wins;
                    let userKillsS = soloStats.kills;
                    let userKDS = soloStats.kd;
                    let userTop5S = soloStats.top_5;
                    let userTop3S = soloStats.top_3;
                    let userScoreS = soloStats.score;

                    const soloEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Fortnite Statistics | Solos`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTitle(`${data.username} | ${data.platform}`)
                        .addField(`<:statsChordLove:788852443462893579> Matches Played`, userMatchesS.toLocaleString(), true)
                        .addField(`<:statsChordVictory:788889424284876821> Matches Won`, userWinsS.toLocaleString(), true)
                        .addField(`<:statsChordBullseye:788852208619094036> Kill Count`, userKillsS.toLocaleString(), true)
                        .addField(`<:statsChordPotion:788853249682964520> K/D Ratio`, userKDS, true)
                        .addField(`<:statsChord1HP:788852565206761544> Placed Top 3`, userTop3S.toLocaleString(), true)
                        .addField(`<:statsChordGG:788852921545654282> Placed Top 5`, userTop5S.toLocaleString(), true)
                        .addField(`<:statsChordFiery:788908057102123018> Score`, userScoreS.toLocaleString(), true)
                        .setColor(message.member.displayColor || 'eb4bc9')
                        .setThumbnail('https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/1052/2019/08/13071156/fortnite-logo.jpg')
                        .setFooter(`FORTNITE User ${data.id}`)

                    let duoStats = dataStatistics.duo;

                    let userMatchesD = duoStats.matches;
                    let userWinsD = duoStats.wins;
                    let userKillsD = duoStats.kills;
                    let userKDD = duoStats.kd;
                    let userTop5D = duoStats.top_5;
                    let userTop3D = duoStats.top_3;
                    let userScoreD = duoStats.score;

                    const duoEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Fortnite Statistics | Duos`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTitle(`${data.username} | ${data.platform}`)
                        .addField(`<:statsChordLove:788852443462893579> Matches Played`, userMatchesD.toLocaleString(), true)
                        .addField(`<:statsChordVictory:788889424284876821> Matches Won`, userWinsD.toLocaleString(), true)
                        .addField(`<:statsChordBullseye:788852208619094036> Kill Count`, userKillsD.toLocaleString(), true)
                        .addField(`<:statsChordPotion:788853249682964520> K/D Ratio`, userKDD, true)
                        .addField(`<:statsChord1HP:788852565206761544> Placed Top 3`, userTop3D.toLocaleString(), true)
                        .addField(`<:statsChordGG:788852921545654282> Placed Top 5`, userTop5D.toLocaleString(), true)
                        .addField(`<:statsChordFiery:788908057102123018> Score`, userScoreD.toLocaleString(), true)
                        .setColor(message.member.displayColor || 'eb4bc9')
                        .setThumbnail('https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/1052/2019/08/13071156/fortnite-logo.jpg')
                        .setFooter(`FORTNITE User ${data.id}`)

                    let squadStats = dataStatistics.squad;

                    let userMatchesQ = squadStats.matches;
                    let userWinsQ = squadStats.wins;
                    let userKillsQ = squadStats.kills;
                    let userKDQ = squadStats.kd;
                    let userTop5Q = squadStats.top_5;
                    let userTop3Q = squadStats.top_3;
                    let userScoreQ = squadStats.score;

                    const squadEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Fortnite Statistics | Squads`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTitle(`${data.username} | ${data.platform}`)
                        .addField(`<:statsChordLove:788852443462893579> Matches Played`, userMatchesQ.toLocaleString(), true)
                        .addField(`<:statsChordVictory:788889424284876821> Matches Won`, userWinsQ.toLocaleString(), true)
                        .addField(`<:statsChordBullseye:788852208619094036> Kill Count`, userKillsQ.toLocaleString(), true)
                        .addField(`<:statsChordPotion:788853249682964520> K/D Ratio`, userKDQ, true)
                        .addField(`<:statsChord1HP:788852565206761544> Placed Top 3`, userTop3Q.toLocaleString(), true)
                        .addField(`<:statsChordGG:788852921545654282> Placed Top 5`, userTop5Q.toLocaleString(), true)
                        .addField(`<:statsChordFiery:788908057102123018> Score`, userScoreQ.toLocaleString(), true)
                        .setColor(message.member.displayColor || 'eb4bc9')
                        .setThumbnail('https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/1052/2019/08/13071156/fortnite-logo.jpg')
                        .setFooter(`FORTNITE User ${data.id}`)

                    const lifetimeReaction = msg.createReactionCollector(lifetimeFilter, {
                        time: 600000
                    });
                    const soloReaction = msg.createReactionCollector(soloFilter, {
                        time: 600000
                    });
                    const duoReaction = msg.createReactionCollector(duoFilter, {
                        time: 600000
                    });
                    const squadReaction = msg.createReactionCollector(squadFilter, {
                        time: 600000
                    });

                    lifetimeReaction.on('collect', r => {
                        msg.edit(`Press on the reactions corresponding to the mode statistics you'd like to view.\n<:statsChordLifetime:788889424086958110>: Lifetime Statistics <:statsChordSolos:788852207641821224>: Solos Statistics <:statsChordDuos:788889424725147648>: Duos Statistics <:statsChordSquads:788889423911190540>: Squads Statistics`, {
                            embed: lifetimeEmbed
                        });
                        const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
                        try {
                            for (const reaction of userReactions.values()) {
                                reaction.users.remove(message.author.id);
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }
                    });

                    soloReaction.on('collect', r => {
                        msg.edit(`Press on the reactions corresponding to the mode statistics you'd like to view.\n<:statsChordLifetime:788889424086958110>: Lifetime Statistics <:statsChordSolos:788852207641821224>: Solos Statistics <:statsChordDuos:788889424725147648>: Duos Statistics <:statsChordSquads:788889423911190540>: Squads Statistics`, {
                            embed: soloEmbed
                        });
                        const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
                        try {
                            for (const reaction of userReactions.values()) {
                                reaction.users.remove(message.author.id);
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }
                    });

                    duoReaction.on('collect', r => {
                        msg.edit(`Press on the reactions corresponding to the mode statistics you'd like to view.\n<:statsChordLifetime:788889424086958110>: Lifetime Statistics <:statsChordSolos:788852207641821224>: Solos Statistics <:statsChordDuos:788889424725147648>: Duos Statistics <:statsChordSquads:788889423911190540>: Squads Statistics`, {
                            embed: duoEmbed
                        });
                        const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
                        try {
                            for (const reaction of userReactions.values()) {
                                reaction.users.remove(message.author.id);
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }
                    });

                    squadReaction.on('collect', r => {
                        msg.edit(`Press on the reactions corresponding to the mode statistics you'd like to view.\n<:statsChordLifetime:788889424086958110>: Lifetime Statistics <:statsChordSolos:788852207641821224>: Solos Statistics <:statsChordDuos:788889424725147648>: Duos Statistics <:statsChordSquads:788889423911190540>: Squads Statistics`, {
                            embed: squadEmbed
                        });
                        const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
                        try {
                            for (const reaction of userReactions.values()) {
                                reaction.users.remove(message.author.id);
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }
                    });
                }).catch(err => {
                    console.log(err);
                    return msg.edit(`**[<:statsChordSixString:788870454035087370>] ${message.author.username}**, that username was not found within the Fortnite Tracker database.\nPlease ensure you're providing EPIC usernames and not PSN or XBox Tags.\n\n*(Unfortunately for right now, EPIC usernames with spaces cannot be looked up).*`).then(m => m.delete({
                        timeout: 10000
                    }));
                });
            } else if (fortnitePlatform === "psn") {
                let data = fortnite.user(fortniteUsername, "psn").then(data => {
                    if (!data.username || data.username === undefined) return msg.edit(`**[<:statsChordSixString:788870454035087370>] ${message.author.username}**, that username was not found within the Fortnite Tracker database.\nPlease ensure you're providing EPIC usernames and not PSN or XBox Tags.\n\n*(Unfortunately for right now, EPIC usernames with spaces cannot be looked up).*`).then(m => m.delete({
                        timeout: 10000
                    }));

                    msg.react(`<:statsChordLifetime:788889424086958110>`);
                    msg.react(`<:pcPLACEHOLDER:786598522001817630>`);
                    msg.react(`<:statsChordSolos:788852207641821224>`);
                    msg.react(`<:statsChordDuos:788889424725147648>`);
                    msg.react(`<:statsChordSquads:788889423911190540>`);

                    const lifetimeFilter = (reaction, user) => reaction.emoji.name === 'statsChordLifetime' && user.id === message.author.id;
                    const soloFilter = (reaction, user) => reaction.emoji.name === 'statsChordSolos' && user.id === message.author.id;
                    const duoFilter = (reaction, user) => reaction.emoji.name === 'statsChordDuos' && user.id === message.author.id;
                    const squadFilter = (reaction, user) => reaction.emoji.name === 'statsChordSquads' && user.id === message.author.id;

                    let dataStatistics = data.stats;
                    let lifetimeStats = dataStatistics.lifetime;

                    let userMatches = lifetimeStats.matches;
                    let userWins = lifetimeStats.wins;
                    let userKills = lifetimeStats.kills;
                    let userKD = lifetimeStats.kd;
                    let userTop5 = lifetimeStats.top_5;
                    let userTop3 = lifetimeStats.top_3;

                    const lifetimeEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Fortnite Statistics | Lifetime`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTitle(`${data.username} | ${data.platform}`)
                        .addField(`<:statsChordLove:788852443462893579> Matches Played`, userMatches.toLocaleString(), true)
                        .addField(`<:statsChordVictory:788889424284876821> Matches Won`, userWins.toLocaleString(), true)
                        .addField(`<:statsChordBullseye:788852208619094036> Kill Count`, userKills.toLocaleString(), true)
                        .addField(`<:statsChordPotion:788853249682964520> K/D Ratio`, userKD, true)
                        .addField(`<:statsChord1HP:788852565206761544> Placed Top 3`, userTop3.toLocaleString(), true)
                        .addField(`<:statsChordGG:788852921545654282> Placed Top 5`, userTop5.toLocaleString(), true)
                        .setColor(message.member.displayColor || 'eb4bc9')
                        .setThumbnail('https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/1052/2019/08/13071156/fortnite-logo.jpg')
                        .setFooter(`FORTNITE User ${data.id}`)

                    msg.edit(`Press on the reactions corresponding to the mode statistics you'd like to view.\n<:statsChordLifetime:788889424086958110>: Lifetime Statistics <:statsChordSolos:788852207641821224>: Solos Statistics <:statsChordDuos:788889424725147648>: Duos Statistics <:statsChordSquads:788889423911190540>: Squads Statistics`, {
                        embed: lifetimeEmbed
                    });

                    let soloStats = dataStatistics.solo;

                    let userMatchesS = soloStats.matches;
                    let userWinsS = soloStats.wins;
                    let userKillsS = soloStats.kills;
                    let userKDS = soloStats.kd;
                    let userTop5S = soloStats.top_5;
                    let userTop3S = soloStats.top_3;
                    let userScoreS = soloStats.score;

                    const soloEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Fortnite Statistics | Solos`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTitle(`${data.username} | ${data.platform}`)
                        .addField(`<:statsChordLove:788852443462893579> Matches Played`, userMatchesS.toLocaleString(), true)
                        .addField(`<:statsChordVictory:788889424284876821> Matches Won`, userWinsS.toLocaleString(), true)
                        .addField(`<:statsChordBullseye:788852208619094036> Kill Count`, userKillsS.toLocaleString(), true)
                        .addField(`<:statsChordPotion:788853249682964520> K/D Ratio`, userKDS, true)
                        .addField(`<:statsChord1HP:788852565206761544> Placed Top 3`, userTop3S.toLocaleString(), true)
                        .addField(`<:statsChordGG:788852921545654282> Placed Top 5`, userTop5S.toLocaleString(), true)
                        .addField(`<:statsChordFiery:788908057102123018> Score`, userScoreS.toLocaleString(), true)
                        .setColor(message.member.displayColor || 'eb4bc9')
                        .setThumbnail('https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/1052/2019/08/13071156/fortnite-logo.jpg')
                        .setFooter(`FORTNITE User ${data.id}`)

                    let duoStats = dataStatistics.duo;

                    let userMatchesD = duoStats.matches;
                    let userWinsD = duoStats.wins;
                    let userKillsD = duoStats.kills;
                    let userKDD = duoStats.kd;
                    let userTop5D = duoStats.top_5;
                    let userTop3D = duoStats.top_3;
                    let userScoreD = duoStats.score;

                    const duoEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Fortnite Statistics | Duos`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTitle(`${data.username} | ${data.platform}`)
                        .addField(`<:statsChordLove:788852443462893579> Matches Played`, userMatchesD.toLocaleString(), true)
                        .addField(`<:statsChordVictory:788889424284876821> Matches Won`, userWinsD.toLocaleString(), true)
                        .addField(`<:statsChordBullseye:788852208619094036> Kill Count`, userKillsD.toLocaleString(), true)
                        .addField(`<:statsChordPotion:788853249682964520> K/D Ratio`, userKDD, true)
                        .addField(`<:statsChord1HP:788852565206761544> Placed Top 3`, userTop3D.toLocaleString(), true)
                        .addField(`<:statsChordGG:788852921545654282> Placed Top 5`, userTop5D.toLocaleString(), true)
                        .addField(`<:statsChordFiery:788908057102123018> Score`, userScoreD.toLocaleString(), true)
                        .setColor(message.member.displayColor || 'eb4bc9')
                        .setThumbnail('https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/1052/2019/08/13071156/fortnite-logo.jpg')
                        .setFooter(`FORTNITE User ${data.id}`)

                    let squadStats = dataStatistics.squad;

                    let userMatchesQ = squadStats.matches;
                    let userWinsQ = squadStats.wins;
                    let userKillsQ = squadStats.kills;
                    let userKDQ = squadStats.kd;
                    let userTop5Q = squadStats.top_5;
                    let userTop3Q = squadStats.top_3;
                    let userScoreQ = squadStats.score;

                    const squadEmbed = new Discord.MessageEmbed()
                        .setAuthor(`Fortnite Statistics | Squads`, message.author.displayAvatarURL({
                            dynamic: true
                        }))
                        .setTitle(`${data.username} | ${data.platform}`)
                        .addField(`<:statsChordLove:788852443462893579> Matches Played`, userMatchesQ.toLocaleString(), true)
                        .addField(`<:statsChordVictory:788889424284876821> Matches Won`, userWinsQ.toLocaleString(), true)
                        .addField(`<:statsChordBullseye:788852208619094036> Kill Count`, userKillsQ.toLocaleString(), true)
                        .addField(`<:statsChordPotion:788853249682964520> K/D Ratio`, userKDQ, true)
                        .addField(`<:statsChord1HP:788852565206761544> Placed Top 3`, userTop3Q.toLocaleString(), true)
                        .addField(`<:statsChordGG:788852921545654282> Placed Top 5`, userTop5Q.toLocaleString(), true)
                        .addField(`<:statsChordFiery:788908057102123018> Score`, userScoreQ.toLocaleString(), true)
                        .setColor(message.member.displayColor || 'eb4bc9')
                        .setThumbnail('https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/1052/2019/08/13071156/fortnite-logo.jpg')
                        .setFooter(`FORTNITE User ${data.id}`)

                    const lifetimeReaction = msg.createReactionCollector(lifetimeFilter, {
                        time: 600000
                    });
                    const soloReaction = msg.createReactionCollector(soloFilter, {
                        time: 600000
                    });
                    const duoReaction = msg.createReactionCollector(duoFilter, {
                        time: 600000
                    });
                    const squadReaction = msg.createReactionCollector(squadFilter, {
                        time: 600000
                    });

                    lifetimeReaction.on('collect', r => {
                        msg.edit(`Press on the reactions corresponding to the mode statistics you'd like to view.\n<:statsChordLifetime:788889424086958110>: Lifetime Statistics <:statsChordSolos:788852207641821224>: Solos Statistics <:statsChordDuos:788889424725147648>: Duos Statistics <:statsChordSquads:788889423911190540>: Squads Statistics`, {
                            embed: lifetimeEmbed
                        });
                        const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
                        try {
                            for (const reaction of userReactions.values()) {
                                reaction.users.remove(message.author.id);
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }
                    });

                    soloReaction.on('collect', r => {
                        msg.edit(`Press on the reactions corresponding to the mode statistics you'd like to view.\n<:statsChordLifetime:788889424086958110>: Lifetime Statistics <:statsChordSolos:788852207641821224>: Solos Statistics <:statsChordDuos:788889424725147648>: Duos Statistics <:statsChordSquads:788889423911190540>: Squads Statistics`, {
                            embed: soloEmbed
                        });
                        const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
                        try {
                            for (const reaction of userReactions.values()) {
                                reaction.users.remove(message.author.id);
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }
                    });

                    duoReaction.on('collect', r => {
                        msg.edit(`Press on the reactions corresponding to the mode statistics you'd like to view.\n<:statsChordLifetime:788889424086958110>: Lifetime Statistics <:statsChordSolos:788852207641821224>: Solos Statistics <:statsChordDuos:788889424725147648>: Duos Statistics <:statsChordSquads:788889423911190540>: Squads Statistics`, {
                            embed: duoEmbed
                        });
                        const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
                        try {
                            for (const reaction of userReactions.values()) {
                                reaction.users.remove(message.author.id);
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }
                    });

                    squadReaction.on('collect', r => {
                        msg.edit(`Press on the reactions corresponding to the mode statistics you'd like to view.\n<:statsChordLifetime:788889424086958110>: Lifetime Statistics <:statsChordSolos:788852207641821224>: Solos Statistics <:statsChordDuos:788889424725147648>: Duos Statistics <:statsChordSquads:788889423911190540>: Squads Statistics`, {
                            embed: squadEmbed
                        });
                        const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
                        try {
                            for (const reaction of userReactions.values()) {
                                reaction.users.remove(message.author.id);
                            }
                        } catch (error) {
                            console.error('Failed to remove reactions.');
                        }
                    });
                }).catch(err => {
                    console.log(err);
                    return msg.edit(`**[<:statsChordSixString:788870454035087370>] ${message.author.username}**, that username was not found within the Fortnite Tracker database.\nPlease ensure you're providing EPIC usernames and not PSN or XBox Tags.\n\n*(Unfortunately for right now, EPIC usernames with spaces cannot be looked up).*`).then(m => m.delete({
                        timeout: 10000
                    }));
                });
            } else {
                return msg.edit(`**[<:statsChordSixString:788870454035087370>] ${message.author.username}**, that input (${fortnitePlatform}) was not recognized as a platform.\nPlease ensure you're either inputting \`pc\`, \`psn\` or \`xbl\` as a platform. EPIC usernames with spaces are not yet recognized.`).then(m => m.delete({ timeout: 10000 }));
            }
        });
    }
}