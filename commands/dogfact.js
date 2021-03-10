const request = require('superagent');

module.exports = {
    name: 'dogfact',
    description: '[FUN] This will generate and provide a random dog fact. <[setPrefix]dogfact>',
    execute(message) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;

        request.get('https://dog-api.kinduff.com/api/facts').end((err, res) => {
            if (!err && res.status === 200) {
                message.channel.send(`**[🐶] ${message.author.username}**, here's your random dog fact.\n"${res.body.facts[0]}"`);
            } else {
                console.log(`REST call failed: ${err}`);
            }
        });
    }
}