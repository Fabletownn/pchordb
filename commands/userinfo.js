const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
    name: 'userinfo',
    description: '[GENERAL] This will provide information about either you, or a mentioned user. <[setPrefix]userinfo (<@member>)>',
    execute(message) {
        const client = message.client;
        message.delete();

        var mentionedUser = message.mentions.users.first() || client.users.cache.get(message.content.split(" ")[1]);

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        let administratorR = message.guild.roles.cache.find(role => role.name === "Administrator");
        let itfR = message.guild.roles.cache.find(role => role.name === "I Talk");

        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;

        if (!mentionedUser) {
            if (message.member.roles.cache.has(itfR.id)) {
                const ownerInfoEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Information | ${message.author.tag}`)
                    .addField(`Joined Server`, `📆 ${message.member.joinedAt.toUTCString().substr(0, 16)}\n🕛 ${message.member.joinedAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`Joined Discord`, `📆 ${message.author.createdAt.toUTCString().substr(0, 16)}\n🕛 ${message.author.createdAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`User Status`, `Server Owner`)
                    .addField(`Roles`, `${message.member.roles.cache.map(roleList => `${roleList}`).slice(0,-1).join(' ')}`)
                    .setFooter(`User ID: ${message.author.id}`)
                    .setColor(message.member.displayColor)
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(`Displaying user information for **${message.author.tag}**:`, {
                    embed: ownerInfoEmbed
                });
            } else
            if (message.member.roles.cache.has(administratorR.id)) {
                const administratorInfoEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Information | ${message.author.tag}`)
                    .addField(`Joined Server`, `📆 ${message.member.joinedAt.toUTCString().substr(0, 16)}\n🕛 ${message.member.joinedAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`Joined Discord`, `📆 ${message.author.createdAt.toUTCString().substr(0, 16)}\n🕛 ${message.author.createdAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`User Status`, `Server Administrator`)
                    .addField(`Roles`, `${message.member.roles.cache.map(roleList => `${roleList}`).slice(0,-1).join(' ')}`)
                    .setFooter(`User ID: ${message.author.id}`)
                    .setColor(message.member.displayColor)
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(`Displaying user information for **${message.author.tag}**:`, {
                    embed: administratorInfoEmbed
                });
            } else
            if (message.member.roles.cache.has(moderatorR.id)) {
                const moderatorInfoEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Information | ${message.author.tag}`)
                    .addField(`Joined Server`, `📆 ${message.member.joinedAt.toUTCString().substr(0, 16)}\n🕛 ${message.member.joinedAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`Joined Discord`, `📆 ${message.author.createdAt.toUTCString().substr(0, 16)}\n🕛 ${message.author.createdAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`User Status`, `Server Moderator`)
                    .addField(`Roles`, `${message.member.roles.cache.map(roleList => `${roleList}`).slice(0,-1).join(' ')}`)
                    .setFooter(`User ID: ${message.author.id}`)
                    .setColor(message.member.displayColor)
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(`Displaying user information for **${message.author.tag}**:`, {
                    embed: moderatorInfoEmbed
                });
            } else {
                const memberInfoEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Information | ${message.author.tag}`)
                    .addField(`Joined Server`, `📆 ${message.member.joinedAt.toUTCString().substr(0, 16)}\n🕛 ${message.member.joinedAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`Joined Discord`, `📆 ${message.author.createdAt.toUTCString().substr(0, 16)}\n🕛 ${message.author.createdAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`User Status`, `Server Member`, true)
                    .addField(`Roles`, `${message.member.roles.cache.map(roleList => `${roleList}`).slice(0,-1).join(' ')}`)
                    .setFooter(`User ID: ${message.author.id}`)
                    .setColor(message.member.displayColor)
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(`Displaying user information for **${message.author.tag}**:`, {
                    embed: memberInfoEmbed
                });
            }
        } else if (mentionedUser) {
            var mentionedMember = message.guild.member(mentionedUser);

            if (mentionedMember.roles.cache.has(itfR.id)) {
                const ownerInfoEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Information | ${mentionedUser.tag}`)
                    .addField(`Joined Server`, `📆 ${mentionedMember.joinedAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedMember.joinedAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`Joined Discord`, `📆 ${mentionedUser.createdAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedUser.createdAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`User Status`, `Server Owner`)
                    .addField(`Roles`, `${mentionedMember.roles.cache.map(roleList => `${roleList}`).slice(0,-1).join(' ')}`)
                    .setFooter(`User ID: ${mentionedUser.id}`)
                    .setColor(mentionedMember.displayColor)
                    .setThumbnail(mentionedUser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(`Displaying user information for **${mentionedUser.tag}**:`, {
                    embed: ownerInfoEmbed
                });
            } else
            if (mentionedMember.roles.cache.has(administratorR.id)) {
                const administratorInfoEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Information | ${mentionedUser.tag}`)
                    .addField(`Joined Server`, `📆 ${mentionedMember.joinedAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedMember.joinedAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`Joined Discord`, `📆 ${mentionedUser.createdAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedUser.createdAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`User Status`, `Server Administrator`)
                    .addField(`Roles`, `${mentionedMember.roles.cache.map(roleList => `${roleList}`).slice(0,-1).join(' ')}`)
                    .setFooter(`User ID: ${mentionedUser.id}`)
                    .setColor(mentionedMember.displayColor)
                    .setThumbnail(mentionedUser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(`Displaying user information for **${mentionedUser.tag}**:`, {
                    embed: administratorInfoEmbed
                });
            } else
            if (mentionedMember.roles.cache.has(moderatorR.id)) {
                const moderatorInfoEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Information | ${mentionedUser.tag}`)
                    .addField(`Joined Server`, `📆 ${mentionedMember.joinedAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedMember.joinedAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`Joined Discord`, `📆 ${mentionedUser.createdAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedUser.createdAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`User Status`, `Server Moderator`)
                    .addField(`Roles`, `${mentionedMember.roles.cache.map(roleList => `${roleList}`).slice(0,-1).join(' ')}`)
                    .setFooter(`User ID: ${mentionedUser.id}`)
                    .setColor(mentionedMember.displayColor)
                    .setThumbnail(mentionedUser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(`Displaying user information for **${mentionedUser.tag}**:`, {
                    embed: moderatorInfoEmbed
                });
            } else
            if (mentionedUser.bot) {
                const botInfoEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Information | ${mentionedUser.tag}`)
                    .addField(`Joined Server`, `📆 ${mentionedMember.joinedAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedMember.joinedAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`Joined Discord`, `📆 ${mentionedUser.createdAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedUser.createdAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`User Status`, `Bot`)
                    .addField(`Roles`, `${mentionedMember.roles.cache.map(roleList => `${roleList}`).slice(0,-1).join(' ')}`)
                    .setFooter(`User ID: ${mentionedUser.id}`)
                    .setColor(mentionedMember.displayColor)
                    .setThumbnail(mentionedUser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(`Displaying user information for **${mentionedUser.tag}**:`, {
                    embed: botInfoEmbed
                });
            } else {
                const memberInfoEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Information | ${mentionedUser.tag}`)
                    .addField(`Joined Server`, `📆 ${mentionedMember.joinedAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedMember.joinedAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`Joined Discord`, `📆 ${mentionedUser.createdAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedUser.createdAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`User Status`, `Server Member`)
                    .addField(`Roles`, `${mentionedMember.roles.cache.map(roleList => `${roleList}`).slice(0,-1).join(' ')}`)
                    .setFooter(`User ID: ${mentionedUser.id}`)
                    .setColor(mentionedMember.displayColor)
                    .setThumbnail(mentionedUser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(`Displaying user information for **${mentionedUser.tag}**:`, {
                    embed: memberInfoEmbed
                });
            }
        } else {
            message.channel.send(`**[❌] ${message.author.username}**, an error occurred trying to fetch User Data.`).then(m => m.delete({ timeout: 10000 }));
        }
    }
}