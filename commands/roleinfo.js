const Discord = require("discord.js");

module.exports = {
    name: 'roleinfo',
    description: '[GENERAL] This will give information about the mentioned role, or the given role ID. <[setPrefix]roleinfo <role ID>>',
    execute(message) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;

        if (!message.mentions.roles.first() && !message.content.split(" ")[1]) return message.channel.send(`**[❌] ${message.author.username}**, please ensure you're giving providing a role ID for me to give information about.`);
        if (!message.mentions.roles.first() && !message.guild.roles.cache.get(message.content.split(" ")[1])) return message.channel.send(`**[❌] ${message.author.username}**, please ensure you're providing a valid role ID: role ID wasn't found.`);

        let mentionable;
        let hoisted;

        if (message.guild.roles.cache.get(message.content.split(" ")[1])) {
            if (message.guild.roles.cache.get(message.content.split(" ")[1]).mentionable) {
                mentionable = "Yes"
            } else {
                mentionable = "No";
            }

            if (message.guild.roles.cache.get(message.content.split(" ")[1]).hoist) {
                hoisted = "Yes"
            } else {
                hoisted = "No";
            }

            const roleEmbed = new Discord.MessageEmbed()
                .setAuthor(`Role Info`, message.author.displayAvatarURL({
                    dynamic: true
                }))
                .setDescription(`Information about <@&${message.content.split(" ")[1]}>:`)
                .addField(`Role ID`, message.guild.roles.cache.get(message.content.split(" ")[1]).id, true)
                .addField(`HEX Code`, message.guild.roles.cache.get(message.content.split(" ")[1]).hexColor, true)
                .addField(`No. Members`, message.guild.roles.cache.get(message.content.split(" ")[1]).members.size, true)
                .addField(`Position`, message.guild.roles.cache.get(message.content.split(" ")[1]).position, true)
                .addField(`Hoisted`, hoisted, true)
                .addField(`Mentionable`, mentionable, true)
                .addField(`Permissions`, message.guild.roles.cache.get(message.content.split(" ")[1]).permissions.toArray().join(", ").replace(/_/g, " ").toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()).replace(/Tts/g, "TTS").replace(/Vad/g, "VAD") || `None.`)
                .setColor(message.guild.roles.cache.get(message.content.split(" ")[1]).hexColor)

            message.channel.send({
                embed: roleEmbed
            });
        } else {
            return message.channel.send(`**[❌] ${message.author.username}**, please ensure you're giving me a role to give information about!`).then(m => m.delete({ timeout: 10000 }));
        }
    }
}