const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'greact',
    description: '[MODERATION] This will grant ADD_REACTION permissions to specified member/role in all channels under the \`I TALK GENERAL\` and \`I TALK FORTNITE\` categories. <[setPrefix]greact <@member> // <@role> // <member ID> // <role ID>>',
    execute(message, args) {
        message.delete();
        var toGrant = message.mentions.users.first();
        var toGrantR = message.mentions.roles.first();
        const toID = message.content.split("greact ");
        const grantID = toID[1];
        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;


        const generalChannel = message.guild.channels.cache.get('780270187702255636');
        const general2Channel = message.guild.channels.cache.get('780270197910929410');
        const gamesLFGChannel = message.guild.channels.cache.get('780270206290362380');
        const animeChannel = message.guild.channels.cache.get('780270215179141140');
        const mediaChannel = message.guild.channels.cache.get('780270223294332998');
        const memesChannel = message.guild.channels.cache.get('780487088378216469');
        const introsChannel = message.guild.channels.cache.get('780487101254074369');
        const artChannel = message.guild.channels.cache.get('780487112113651742');
        const stwChannel = message.guild.channels.cache.get('780487174222643310');
        const hubChannel = message.guild.channels.cache.get('780487182372569148');
        const leaksChannel = message.guild.channels.cache.get('780487189963210790');
        const fashionChannel = message.guild.channels.cache.get('780487198218649611');
        const lockerChannel = message.guild.channels.cache.get('780487206224920599');
        const unpopularOpinionsChannel = message.guild.channels.cache.get('780487216383131669');
        const shopOpinionsChannel = message.guild.channels.cache.get('780487230309007360');

        if (!grantID) return message.channel.send(`**[😄] ${message.author.username}**, please either: mention a member or role __OR__ provide a member's ID or role to grant \`ADD_REACTIONS\` permissions to.`).then(m => m.delete({
            timeout: 10000
        }));

        if (!generalChannel) return message.channel.send(`Wrong guild. Smh.`)

        if (toGrant) {
            if (!message.guild.member(toGrant.id)) {
                return message.channel.send(`**[👤] ${message.author.username}**, please ensure you're providing a proper mention/ID of a **valid** role/member.`).then(m => m.delete({
                    timeout: 10000
                }));
            }

            const grantedEmbed = new Discord.MessageEmbed()
                .setDescription(`Granted reaction permissions to <@${toGrant.id}> in channels under the \`I TALK GENERAL\` and \`I TALK FORTNITE\` categories.\n\n*(This action has been recorded in the Audit Logs; run \`+rreact\` to revoke this permission.)*`)
                .setColor('6dff48')

            generalChannel.updateOverwrite(toGrant.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            general2Channel.updateOverwrite(toGrant.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            gamesLFGChannel.updateOverwrite(toGrant.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            animeChannel.updateOverwrite(toGrant.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            mediaChannel.updateOverwrite(toGrant.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            memesChannel.updateOverwrite(toGrant.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            introsChannel.updateOverwrite(toGrant.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            artChannel.updateOverwrite(toGrant.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            stwChannel.updateOverwrite(toGrant.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            hubChannel.updateOverwrite(toGrant.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            leaksChannel.updateOverwrite(toGrant.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            fashionChannel.updateOverwrite(toGrant.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            lockerChannel.updateOverwrite(toGrant.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            unpopularOpinionsChannel.updateOverwrite(toGrant.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            shopOpinionsChannel.updateOverwrite(toGrant.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);

            message.channel.send(grantedEmbed).then(m => m.delete({
                timeout: 10000
            }));
        } else if (toGrantR) {
            generalChannel.updateOverwrite(toGrantR.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            general2Channel.updateOverwrite(toGrantR.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            gamesLFGChannel.updateOverwrite(toGrantR.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            animeChannel.updateOverwrite(toGrantR.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            mediaChannel.updateOverwrite(toGrantR.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            memesChannel.updateOverwrite(toGrantR.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            introsChannel.updateOverwrite(toGrantR.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            artChannel.updateOverwrite(toGrantR.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            stwChannel.updateOverwrite(toGrantR.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            hubChannel.updateOverwrite(toGrantR.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            leaksChannel.updateOverwrite(toGrantR.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            fashionChannel.updateOverwrite(toGrantR.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            lockerChannel.updateOverwrite(toGrantR.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            unpopularOpinionsChannel.updateOverwrite(toGrantR.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);
            shopOpinionsChannel.updateOverwrite(toGrantR.id, {
                ADD_REACTIONS: true,
            }, `Channel permission changed by ${message.author.tag}.`);

            const grantedEmbed = new Discord.MessageEmbed()
                .setDescription(`Granted reaction permissions to <@&${toGrantR.id}> in channels under the \`I TALK GENERAL\` and \`I TALK FORTNITE\` categories.\n\n*(This action has been recorded in the Audit Logs; run \`+rreact\` to revoke this permission.)*`)
                .setColor('6dff48')

            message.channel.send(grantedEmbed).then(m => m.delete({
                timeout: 10000
            }));
        } else if (grantID) {
            if (grantID.length !== 18) {
                return message.channel.send(`**[👤] ${message.author.username}**, please ensure you're providing a proper mention/ID of a **valid** role/member.`).then(m => m.delete({
                    timeout: 10000
                }));
            }
            if (!message.guild.roles.cache.find(role => role.id === grantID) && !message.guild.member(grantID)) {
                return message.channel.send(`**[👤] ${message.author.username}**, please ensure you're providing a proper mention/ID of a **valid** role/member.`).then(m => m.delete({
                    timeout: 10000
                }));
            }
            if (message.guild.roles.cache.find(role => role.id === grantID)) {
                generalChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                general2Channel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                gamesLFGChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                animeChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                mediaChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                memesChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                introsChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                artChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                stwChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                hubChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                leaksChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                fashionChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                lockerChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                unpopularOpinionsChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                shopOpinionsChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);

                const grantedEmbed = new Discord.MessageEmbed()
                    .setDescription(`Granted reaction permissions to <@&${grantID}> in channels under the \`I TALK GENERAL\` and \`I TALK FORTNITE\` categories.\n\n*(This action has been recorded in the Audit Logs; run \`+rreact\` to revoke this permission.)*`)
                    .setColor('6dff48')

                message.channel.send(grantedEmbed).then(m => m.delete({
                    timeout: 10000
                }));
            } else if (message.guild.member(grantID)) {
                generalChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                general2Channel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                gamesLFGChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                animeChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                mediaChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                memesChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                introsChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                artChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                stwChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                hubChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                leaksChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                fashionChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                lockerChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                unpopularOpinionsChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);
                shopOpinionsChannel.updateOverwrite(grantID, {
                    ADD_REACTIONS: true,
                }, `Channel permission changed by ${message.author.tag}.`);

                const grantedEmbed = new Discord.MessageEmbed()
                    .setDescription(`Granted reaction permissions to <@${grantID}> in channels under the \`I TALK GENERAL\` and \`I TALK FORTNITE\` categories.\n\n*(This action has been recorded in the Audit Logs; run \`+rreact\` to revoke this permission.)*`)
                    .setColor('6dff48')

                message.channel.send(grantedEmbed).then(m => m.delete({
                    timeout: 10000
                }));
            } else {
                return message.channel.send(`**[👤] ${message.author.username}**, please ensure you're providing a proper mention/ID of a **valid** role/member.`).then(m => m.delete({
                    timeout: 10000
                }));
            }
        }
    }
}