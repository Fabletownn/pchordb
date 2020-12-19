const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
    name: 'userinfo',
    description: '[GENERAL] This will provide information about either you, or a mentioned user. <[setPrefix]userinfo (<@member>)>',
    execute(message) {
        message.delete();

        var mentionedUser = message.mentions.users.first();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        let administratorR = message.guild.roles.cache.find(role => role.name === "Administrator");
        let itfR = message.guild.roles.cache.find(role => role.name === "I Talk Fortnite");

        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '789937524763000832') return;

        if (!mentionedUser) {
            if (message.member.roles.cache.has(itfR.id)) {
                const ownerInfoEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Information | ${message.author.tag}`)
                    .addField(`Joined Server`, `📆 ${message.member.joinedAt.toUTCString().substr(0, 16)}\n🕛 ${message.member.joinedAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`Joined Discord`, `📆 ${message.author.createdAt.toUTCString().substr(0, 16)}\n🕛 ${message.author.createdAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`User Status`, `Server Owner`)
                    .addField(`Roles`, `${message.member.roles.cache.map(roleList => `${roleList}`).join(' ')}`)
                    .setFooter(`User ID: ${message.author.id}`)
                    .setColor(message.member.displayColor)
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(`Displaying user information for **${message.author.tag}**:`, {
                    embed: ownerInfoEmbed
                }).then(m => m.delete({
                    timeout: 30000
                }));
            } else
            if (message.member.roles.cache.has(administratorR.id)) {
                const administratorInfoEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Information | ${message.author.tag}`)
                    .addField(`Joined Server`, `📆 ${message.member.joinedAt.toUTCString().substr(0, 16)}\n🕛 ${message.member.joinedAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`Joined Discord`, `📆 ${message.author.createdAt.toUTCString().substr(0, 16)}\n🕛 ${message.author.createdAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`User Status`, `Server Administrator`)
                    .addField(`Roles`, `${message.member.roles.cache.map(roleList => `${roleList}`).join(' ')}`)
                    .setFooter(`User ID: ${message.author.id}`)
                    .setColor(message.member.displayColor)
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(`Displaying user information for **${message.author.tag}**:`, {
                    embed: administratorInfoEmbed
                }).then(m => m.delete({
                    timeout: 30000
                }));
            } else
            if (message.member.roles.cache.has(moderatorR.id)) {
                const moderatorInfoEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Information | ${message.author.tag}`)
                    .addField(`Joined Server`, `📆 ${message.member.joinedAt.toUTCString().substr(0, 16)}\n🕛 ${message.member.joinedAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`Joined Discord`, `📆 ${message.author.createdAt.toUTCString().substr(0, 16)}\n🕛 ${message.author.createdAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`User Status`, `Server Moderator`)
                    .addField(`Roles`, `${message.member.roles.cache.map(roleList => `${roleList}`).join(' ')}`)
                    .setFooter(`User ID: ${message.author.id}`)
                    .setColor(message.member.displayColor)
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(`Displaying user information for **${message.author.tag}**:`, {
                    embed: moderatorInfoEmbed
                }).then(m => m.delete({
                    timeout: 30000
                }));
            } else {
                const memberInfoEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Information | ${message.author.tag}`)
                    .addField(`Joined Server`, `📆 ${message.member.joinedAt.toUTCString().substr(0, 16)}\n🕛 ${message.member.joinedAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`Joined Discord`, `📆 ${message.author.createdAt.toUTCString().substr(0, 16)}\n🕛 ${message.author.createdAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`User Status`, `Server Member`)
                    .addField(`Roles`, `${message.member.roles.cache.map(roleList => `${roleList}`).join(' ')}`)
                    .setFooter(`User ID: ${message.author.id}`)
                    .setColor(message.member.displayColor)
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(`Displaying user information for **${message.author.tag}**:`, {
                    embed: memberInfoEmbed
                }).then(m => m.delete({
                    timeout: 30000
                }));
            }
        } else if (mentionedUser) {
            var mentionedMember = message.guild.member(mentionedUser);

            if (mentionedMember.roles.cache.has(itfR.id)) {
                const ownerInfoEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Information | ${mentionedUser.tag}`)
                    .addField(`Joined Server`, `📆 ${mentionedMember.joinedAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedMember.joinedAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`Joined Discord`, `📆 ${mentionedUser.createdAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedUser.createdAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`User Status`, `Server Owner`)
                    .addField(`Roles`, `${mentionedMember.roles.cache.map(roleList => `${roleList}`).join(' ')}`)
                    .setFooter(`User ID: ${mentionedUser.id}`)
                    .setColor(mentionedMember.displayColor)
                    .setThumbnail(mentionedUser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(`Displaying user information for **${mentionedUser.tag}**:`, {
                    embed: ownerInfoEmbed
                }).then(m => m.delete({
                    timeout: 30000
                }));
            } else
            if (mentionedMember.roles.cache.has(administratorR.id)) {
                const administratorInfoEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Information | ${mentionedUser.tag}`)
                    .addField(`Joined Server`, `📆 ${mentionedMember.joinedAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedMember.joinedAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`Joined Discord`, `📆 ${mentionedUser.createdAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedUser.createdAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`User Status`, `Server Administrator`)
                    .addField(`Roles`, `${mentionedMember.roles.cache.map(roleList => `${roleList}`).join(' ')}`)
                    .setFooter(`User ID: ${mentionedUser.id}`)
                    .setColor(mentionedMember.displayColor)
                    .setThumbnail(mentionedUser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(`Displaying user information for **${mentionedUser.tag}**:`, {
                    embed: administratorInfoEmbed
                }).then(m => m.delete({
                    timeout: 30000
                }));
            } else
            if (mentionedMember.roles.cache.has(moderatorR.id)) {
                const moderatorInfoEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Information | ${mentionedUser.tag}`)
                    .addField(`Joined Server`, `📆 ${mentionedMember.joinedAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedMember.joinedAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`Joined Discord`, `📆 ${mentionedUser.createdAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedUser.createdAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`User Status`, `Server Moderator`)
                    .addField(`Roles`, `${mentionedMember.roles.cache.map(roleList => `${roleList}`).join(' ')}`)
                    .setFooter(`User ID: ${mentionedUser.id}`)
                    .setColor(mentionedMember.displayColor)
                    .setThumbnail(mentionedUser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(`Displaying user information for **${mentionedUser.tag}**:`, {
                    embed: moderatorInfoEmbed
                }).then(m => m.delete({
                    timeout: 30000
                }));
            } else {
                const memberInfoEmbed = new Discord.MessageEmbed()
                    .setTitle(`User Information | ${mentionedUser.tag}`)
                    .addField(`Joined Server`, `📆 ${mentionedMember.joinedAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedMember.joinedAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`Joined Discord`, `📆 ${mentionedUser.createdAt.toUTCString().substr(0, 16)}\n🕛 ${mentionedUser.createdAt.toUTCString().substr(16, 50)}`, true)
                    .addField(`User Status`, `Server Member`)
                    .addField(`Roles`, `${mentionedMember.roles.cache.map(roleList => `${roleList}`).join(' ')}`)
                    .setFooter(`User ID: ${mentionedUser.id}`)
                    .setColor(mentionedMember.displayColor)
                    .setThumbnail(mentionedUser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTimestamp()

                message.channel.send(`Displaying user information for **${mentionedUser.tag}**:`, {
                    embed: memberInfoEmbed
                }).then(m => m.delete({
                    timeout: 30000
                }));
            }
        } else {
            message.channel.send(`**[❌] ${message.author.username}**, an error occurred trying to fetch User Data.`).then(m => m.delete({
                timeout: 5000
            }));
        }
    }
}