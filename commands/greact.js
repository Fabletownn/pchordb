const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'greact',
    description: '[MODERATION] This will grant ADD_REACTION permissions to specified member/role in all channels under the \`I TALK GENERAL\` and \`I TALK FORTNITE\` categories. <[setPrefix]greact <@member> // <@role> // <member ID> // <role ID>>',
    execute(message) {
        message.delete();
        var toGrant = message.mentions.users.first();
        var toGrantR = message.mentions.roles.first();
        const toID = message.content.split("greact ");
        const grantID = toID[1];

        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        const generalChannel = message.guild.channels.cache.get('614193406842765375');
        const general2Channel = message.guild.channels.cache.get('710916484427415602');
        const gamesLFGChannel = message.guild.channels.cache.get('761997427111886908');
        const animeChannel = message.guild.channels.cache.get('616739992798232624 ');
        const mediaChannel = message.guild.channels.cache.get('693169647217803316');
        const memesChannel = message.guild.channels.cache.get('614550170478051349');
        const introsChannel = message.guild.channels.cache.get('757307092263501975');
        const artChannel = message.guild.channels.cache.get('621834479228682250');
        const stwChannel = message.guild.channels.cache.get('618196499343474712');
        const hubChannel = message.guild.channels.cache.get('683373679832334376');
        const leaksChannel = message.guild.channels.cache.get('703294596914085989');
        const fashionChannel = message.guild.channels.cache.get('614563325556162572');
        const lockerChannel = message.guild.channels.cache.get('714511122157404231');
        const unpopularOpinionsChannel = message.guild.channels.cache.get('723586295083040769');
        const shopOpinionsChannel = message.guild.channels.cache.get('614506784798801940');

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