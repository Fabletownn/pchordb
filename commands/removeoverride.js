const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'removeoverride',
    description: '[MODERATION] This will remove specified member/role\'s override permissions in all channels under the \`I TALK GENERAL\` and \`I TALK FORTNITE\` categories. <[setPrefix]removeoverride <@member> // <@role> // <member ID> // <role ID>>',
    execute(message) {
        message.delete();
        var toGrant = message.mentions.users.first();
        var toGrantR = message.mentions.roles.first();
        const toID = message.content.split("ride ");
        const grantID = toID[1];
        
        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        if (grantID === message.guild.id) {
            return message.channel.send(`**[😄] ${message.author.username}**, please either: mention a member or role __OR__ provide a member's ID or role to remove permission overrides for.`).then(m => m.delete({
                timeout: 10000
            }));
        }

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

        if (!grantID) return message.channel.send(`**[😄] ${message.author.username}**, please either: mention a member or role __OR__ provide a member's ID or role to remove permission overrides for.`).then(m => m.delete({
            timeout: 10000
        }));

        if (!generalChannel) return;

        if (toGrant) {
            if (!message.guild.member(toGrant.id)) {
                return message.channel.send(`**[👤] ${message.author.username}**, please ensure you're providing a proper mention/ID of a **valid** role/member.`).then(m => m.delete({
                    timeout: 10000
                }));
            }

            const grantedEmbed = new Discord.MessageEmbed()
                .setDescription(`Removed permission overrides of <@${toGrant.id}> in channels under the \`I TALK GENERAL\` and \`I TALK FORTNITE\` categories.\n\n*(This action has been recorded in the Audit Logs.)*`)
                .setColor('ff0000')

            try {
                generalChannel.permissionOverwrites.get(toGrant.id).delete();
                general2Channel.permissionOverwrites.get(toGrant.id).delete();
                gamesLFGChannel.permissionOverwrites.get(toGrant.id).delete();
                animeChannel.permissionOverwrites.get(toGrant.id).delete();
                mediaChannel.permissionOverwrites.get(toGrant.id).delete();
                memesChannel.permissionOverwrites.get(toGrant.id).delete();
                introsChannel.permissionOverwrites.get(toGrant.id).delete();
                artChannel.permissionOverwrites.get(toGrant.id).delete();
                stwChannel.permissionOverwrites.get(toGrant.id).delete();
                hubChannel.permissionOverwrites.get(toGrant.id).delete();
                leaksChannel.permissionOverwrites.get(toGrant.id).delete();
                fashionChannel.permissionOverwrites.get(toGrant.id).delete();
                lockerChannel.permissionOverwrites.get(toGrant.id).delete();
                unpopularOpinionsChannel.permissionOverwrites.get(toGrant.id).delete();
                shopOpinionsChannel.permissionOverwrites.get(toGrant.id).delete();

                message.channel.send(grantedEmbed).then(m => m.delete({
                    timeout: 10000
                }));
            } catch (err) {
                return message.channel.send(`**[⚠️] ${message.author.username}**, no permission overwrite found.`).then(m => m.delete({
                    timeout: 5000
                }));
            }
        } else if (toGrantR) {
            const grantedEmbed = new Discord.MessageEmbed()
                .setDescription(`Removed permission overrides of <@${toGrantR.id}> in channels under the \`I TALK GENERAL\` and \`I TALK FORTNITE\` categories.\n\n*(This action has been recorded in the Audit Logs.)*`)
                .setColor('ff0000')

            try {
                generalChannel.permissionOverwrites.get(toGrantR.id).delete();
                general2Channel.permissionOverwrites.get(toGrantR.id).delete();
                gamesLFGChannel.permissionOverwrites.get(toGrantR.id).delete();
                animeChannel.permissionOverwrites.get(toGrantR.id).delete();
                mediaChannel.permissionOverwrites.get(toGrantR.id).delete();
                memesChannel.permissionOverwrites.get(toGrantR.id).delete();
                introsChannel.permissionOverwrites.get(toGrantR.id).delete();
                artChannel.permissionOverwrites.get(toGrantR.id).delete();
                stwChannel.permissionOverwrites.get(toGrantR.id).delete();
                hubChannel.permissionOverwrites.get(toGrantR.id).delete();
                leaksChannel.permissionOverwrites.get(toGrantR.id).delete();
                fashionChannel.permissionOverwrites.get(toGrantR.id).delete();
                lockerChannel.permissionOverwrites.get(toGrantR.id).delete();
                unpopularOpinionsChannel.permissionOverwrites.get(toGrantR.id).delete();
                shopOpinionsChannel.permissionOverwrites.get(toGrantR.id).delete();

                message.channel.send(grantedEmbed).then(m => m.delete({
                    timeout: 10000
                }));
            } catch (err) {
                return message.channel.send(`**[⚠️] ${message.author.username}**, no permission overwrite found.`).then(m => m.delete({
                    timeout: 5000
                }));
            }
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
                try {
                    const removeEmbed = new Discord.MessageEmbed()
                        .setDescription(`Removed permission overrides of <@&${grantID}> in channels under the \`I TALK GENERAL\` and \`I TALK FORTNITE\` categories.\n\n*(This action has been recorded in the Audit Logs.)*`)
                        .setColor('ff0000')

                    generalChannel.permissionOverwrites.get(grantID).delete();
                    general2Channel.permissionOverwrites.get(grantID).delete();
                    gamesLFGChannel.permissionOverwrites.get(grantID).delete();
                    animeChannel.permissionOverwrites.get(grantID).delete();
                    mediaChannel.permissionOverwrites.get(grantID).delete();
                    memesChannel.permissionOverwrites.get(grantID).delete();
                    introsChannel.permissionOverwrites.get(grantID).delete();
                    artChannel.permissionOverwrites.get(grantID).delete();
                    stwChannel.permissionOverwrites.get(grantID).delete();
                    hubChannel.permissionOverwrites.get(grantID).delete();
                    leaksChannel.permissionOverwrites.get(grantID).delete();
                    fashionChannel.permissionOverwrites.get(grantID).delete();
                    lockerChannel.permissionOverwrites.get(grantID).delete();
                    unpopularOpinionsChannel.permissionOverwrites.get(grantID).delete();
                    shopOpinionsChannel.permissionOverwrites.get(grantID).delete();

                    message.channel.send(removeEmbed).then(m => m.delete({
                        timeout: 10000
                    }));
                } catch (err) {
                    return message.channel.send(`**[⚠️] ${message.author.username}**, no permission overwrite found.`).then(m => m.delete({
                        timeout: 5000
                    }));
                }
            } else if (message.guild.member(grantID)) {
                try {
                    const removeEmbed = new Discord.MessageEmbed()
                        .setDescription(`Removed permission overrides of <@${grantID}> in channels under the \`I TALK GENERAL\` and \`I TALK FORTNITE\` categories.\n\n*(This action has been recorded in the Audit Logs.)*`)
                        .setColor('ff0000')

                    generalChannel.permissionOverwrites.get(grantID).delete();
                    general2Channel.permissionOverwrites.get(grantID).delete();
                    gamesLFGChannel.permissionOverwrites.get(grantID).delete();
                    animeChannel.permissionOverwrites.get(grantID).delete();
                    mediaChannel.permissionOverwrites.get(grantID).delete();
                    memesChannel.permissionOverwrites.get(grantID).delete();
                    introsChannel.permissionOverwrites.get(grantID).delete();
                    artChannel.permissionOverwrites.get(grantID).delete();
                    stwChannel.permissionOverwrites.get(grantID).delete();
                    hubChannel.permissionOverwrites.get(grantID).delete();
                    leaksChannel.permissionOverwrites.get(grantID).delete();
                    fashionChannel.permissionOverwrites.get(grantID).delete();
                    lockerChannel.permissionOverwrites.get(grantID).delete();
                    unpopularOpinionsChannel.permissionOverwrites.get(grantID).delete();
                    shopOpinionsChannel.permissionOverwrites.get(grantID).delete();

                    message.channel.send(removeEmbed).then(m => m.delete({
                        timeout: 10000
                    }));
                } catch (err) {
                    return message.channel.send(`**[⚠️] ${message.author.username}**, no permission overwrite found.`).then(m => m.delete({
                        timeout: 5000
                    }));
                }
            } else {
                return message.channel.send(`**[👤] ${message.author.username}**, please ensure you're providing a proper mention/ID of a **valid** role/member.`).then(m => m.delete({
                    timeout: 10000
                }));
            }
        }
    }
}