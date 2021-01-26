const weather = require('weather-js');
const Discord = require('discord.js');

module.exports = {
    name: 'weather',
    description: '[FUN] This will provide the live weather information for the location specified. <[setPrefix]weather <location>>',
    async execute(message) {
        message.delete();

        var location = message.content.split(`weather `)
        var theLocation = location[1];

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;

        if (!theLocation) {
            return message.channel.send(`**[🌧️] ${message.author.username}**, please input a **location** to check the weather for!`).then(m => m.delete({
                timeout: 5000
            }));
        }

        weather.find({
            search: theLocation,
            degreeType: "F"
        }, function (err, result) {
            if (err) return message.channel.send(`**[🌧️] ${message.author.username}**, location wasn't found. Please make sure that's a **valid location**.`).then(m => m.delete({
                timeout: 5000
            }));

            if (result === undefined || result.length === 0) return message.channel.send(`**[🌧️] ${message.author.username}**, location wasn't found. Please make sure that's a **valid location**.`).then(m => m.delete({
                timeout: 5000
            }));

            var current = result[0].current;
            var location = result[0].location;

            const weatherEmbed = new Discord.MessageEmbed()
                .setAuthor(`Weather Forecast for: "${current.observationpoint}."`)
                .setThumbnail(message.author.displayAvatarURL({
                    dynamic: true
                }))
                .addField('Timezone', `UTC${location.timezone}`, true)
                .addField('Degree Type', 'Fahrenheit', true)
                .addField('Temperature', `${current.temperature}°`, true)
                .addField('Wind', current.winddisplay, true)
                .addField('Feels like', `${current.feelslike}°`, true)
                .addField('Humidity', `${current.humidity}%`, true)
                .setColor('eb4bc9')

            message.channel.send({ embed: weatherEmbed }).then(m => m.delete({ timeout: 30000 }));
        });
    }
}