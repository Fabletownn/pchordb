/*
For those looking at the GitHub Repository code, THIS CODE IS NOT MINE.
You have full permission to use this code as it does not belong to me, and the original creator allows you to use it.

Creator's GitHub Repository: https://github.com/Maxisthemoose/djs-tutorial/blob/master/Episode-7/commands/games/Connect4.js
YOU ARE ABLE TO USE THIS CODE AS IT DOES NOT BELONG TO ME.
*/
const Discord = require("discord.js");
const client = new Discord.Client();

const {
    Client,
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: 'connect4',
    description: '[GENERAL] This will allow a member to play Connect 4 with the mentioned member (if accepted). <[setPrefix]connect4 <@member>>',
    async execute(message, args) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;

        const challenger = message.member;
        const opponent = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!opponent || opponent === challenger || opponent.user.bot) return message.channel.send(`**[4️⃣] ${message.author.username}**, please make sure you're mentioning somebody you want to play Connect 4 with!`).then(m => m.delete({
            timeout: 5000
        }));

        const question = await message.channel.send(`**[4️⃣]**: **${opponent}**, would you like to play Connect 4 with **${message.author.tag}**? Please interact with the reactions accordingly.`);

        ["✅", "❌"].forEach(async el => await question.react(el));

        const filter = (reaction, user) => ["✅", "❌"].includes(reaction.emoji.name) && user.id === opponent.id;

        const response = await question.awaitReactions(filter, {
            max: 1
        });

        const reaction = response.first();

        if (reaction.emoji.name === "❌") return question.edit(`**[4️⃣] ${message.author.tag}**, looks like they didn't want to play.`).then(m => m.delete({
            timeout: 10000
        }));
        else {
            await question.delete();

            const board = [
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
                ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
            ];

            const renderBoard = (board) => {
                let tempString = "";
                for (const boardSection of board) {
                    tempString += `${boardSection.join("")}\n`;
                }

                tempString = tempString.concat("1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣");
                return tempString;
            }

            const initialState = renderBoard(board);

            const initial = new MessageEmbed()
                .setDescription(initialState)

            const gameMessage = await message.channel.send({
                embed: initial
            });
            
            message.channel.send(`Have fun the both of ya! This message will update accordingly to the game.\nPlease understand that if the games goes by too fast, Discord may ratelimit me, which will lead to longer response times.`).then(updateMsg => {
                ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣"].forEach(async el => gameMessage.react(el));

                const gameFilter = (reaction, user) => ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣"].includes(reaction.emoji.name) && (user.id === opponent.id || user.id === challenger.id);
    
                const gameCollector = gameMessage.createReactionCollector(gameFilter);
    
                const gameData = [{
                        member: challenger,
                        playerColor: "🔴"
                    },
                    {
                        member: opponent,
                        playerColor: "🟡"
                    }
                ];
    
                let player = 0;
    
    
                const checkFour = (a, b, c, d) => (a === b) && (b === c) && (c === d) && (a !== "⚪");
    
                const horizontalCheck = () => {
                    for (let i = 0; i < 6; i++) {
                        for (let j = 0; j < 4; j++) {
                            if (checkFour(board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3])) return [
                                board[i][j], board[i][j + 1], board[i][j + 2], board[i][j + 3]
                            ];
                        }
                    }
                }
    
                const verticalCheck = () => {
                    for (let j = 0; j < 7; j++) {
                        for (let i = 0; i < 3; i++) {
                            if (checkFour(board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j])) return [
                                board[i][j], board[i + 1][j], board[i + 2][j], board[i + 3][j]
                            ];
                        }
                    }
                }
    
                const diagonal1 = () => {
                    for (let col = 0; col < 4; col++) {
                        for (let row = 0; row < 3; row++) {
                            if (checkFour(board[row][col], board[row + 1][col + 1], board[row + 2][col + 2], board[row + 3][col + 3])) return [
                                board[row][col], board[row + 1][col + 1], board[row + 2], board[col + 2], board[row + 3][col + 3]
                            ]
                        }
                    }
                }
    
                const diagonal2 = () => {
                    for (let col = 0; col < 4; col++) {
                        for (let row = 5; row > 2; row--) {
                            if (checkFour(board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3])) return [
                                board[row][col], board[row - 1][col + 1], board[row - 2][col + 2], board[row - 3][col + 3]
                            ]
                        }
                    }
                }
    
                const tieCheck = () => {
                    let count = 0;
                    for (const el of board) {
                        for (const string of el) {
                            if (string !== "⚪") count++;
                        }
                    }
                    if (count === 42) return true;
                    else return false;
                }
    
                const checks = [horizontalCheck, verticalCheck, diagonal1, diagonal2];
    
                gameCollector.on("collect", (reaction, user) => {
    
                    if (user.id === gameData[player].member.id) {
                        const openSpaces = [];
    
                        const userReactions = gameMessage.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
                        try {
                            for (const reaction of userReactions.values()) {
                                if (user.id === message.author.id) {
                                    updateMsg.edit(`**[4️⃣]**: ${opponent}, it's your turn! [you are: 🟡]`)
                                } else {
                                    updateMsg.edit(`**[4️⃣]**: ${challenger}, it's your turn! [you are: 🔴]`)
                                }
                                reaction.users.remove(user.id);
                            }
                        } catch (error) {
                            console.error(error);
                        }


    
                        switch (reaction.emoji.name) {
                            case "1️⃣":
                                for (let i = 5; i > -1; i--) {
                                    if (board[i][0] === "⚪") openSpaces.push({
                                        i,
                                        j: 0
                                    });
                                }
                                if (openSpaces.length === 0) return;
                                else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                                break;
                            case "2️⃣":
                                for (let i = 5; i > -1; i--) {
                                    if (board[i][1] === "⚪") openSpaces.push({
                                        i,
                                        j: 1
                                    });
                                }
                                if (openSpaces.length === 0) return;
                                else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                                break;
                            case "3️⃣":
    
                                for (let i = 5; i > -1; i--) {
                                    if (board[i][2] === "⚪") openSpaces.push({
                                        i,
                                        j: 2
                                    });
                                }
                                if (openSpaces.length === 0) return;
                                else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                                break;
                            case "4️⃣":
    
                                for (let i = 5; i > -1; i--) {
                                    if (board[i][3] === "⚪") openSpaces.push({
                                        i,
                                        j: 3
                                    });
                                }
                                if (openSpaces.length === 0) return;
                                else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                                break;
                            case "5️⃣":
    
                                for (let i = 5; i > -1; i--) {
                                    if (board[i][4] === "⚪") openSpaces.push({
                                        i,
                                        j: 4
                                    });
                                }
                                if (openSpaces.length === 0) return;
                                else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                                break;
                            case "6️⃣":
    
                                for (let i = 5; i > -1; i--) {
                                    if (board[i][5] === "⚪") openSpaces.push({
                                        i,
                                        j: 5
                                    });
                                }
                                if (openSpaces.length === 0) return;
                                else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                                break;
                            case "7️⃣":
    
                                for (let i = 5; i > -1; i--) {
                                    if (board[i][6] === "⚪") openSpaces.push({
                                        i,
                                        j: 6
                                    });
                                }
                                if (openSpaces.length === 0) return;
                                else board[openSpaces[0].i][openSpaces[0].j] = gameData[player].playerColor;
                                break;
    
                        }
    
                        if (tieCheck()) {
                            const TieEmbed = new MessageEmbed()
                                .setDescription(renderBoard(board))
                            gameCollector.stop("Tie Game");
                            return gameMessage.edit(`**[🎌]**: 'Tis a tied game! GGs.`, {
                                embed: TieEmbed
                            }).then(m => m.delete({
                                timeout: 30000
                            }));
                        }
    
                        for (const func of checks) {
    
                            const data = func();
                            if (data) {
    
                                const WinEmbed = new MessageEmbed()
                                    .setDescription(renderBoard(board))
                                gameCollector.stop(`${gameData[player].member.id} won`);
                                return gameMessage.edit(`**[🏆]: ${gameData[player].member}** won this **Connect 4** game! GGs. <:zITFGG:667854871579590696>`, {
                                    embed: WinEmbed
                                }).then(m => m.delete({
                                    timeout: 30000
                                }));
                            }
                        }
    
                        player = (player + 1) % 2;
    
                        const newEmbed = new MessageEmbed()
                            .setDescription(renderBoard(board))
                        gameMessage.edit("", {
                            embed: newEmbed
                        });
                    }
                });
            });
        }

    }

}