const request = require('superagent');

module.exports = {
    name: 'catfact',
    description: '[FUN] This will generate and provide a random cat fact. <[setPrefix]catfact>',
    execute(message) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '615594300108963867') return;

        request.get('https://catfact.ninja/fact').end((err, res) => {
            if (!err && res.status === 200) {
                message.channel.send(`**[🐱] ${message.author.username}**, here's your random cat fact.\n"${res.body.fact}"`).then(m => m.delete({
                    timeout: 15000
                }));
            } else {
                console.log(`REST call failed: ${err}`);
            }
        });
    }
}