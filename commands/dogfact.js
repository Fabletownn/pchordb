const request = require('superagent');

module.exports = {
    name: 'dogfact',
    description: '[GENERAL] This will generate and provide a random dog fact. <[setPrefix]dogfact>',
    execute(message) {
        message.delete();
        
        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id) && message.channel.id !== '780027707622424607') return;

        request.get('https://dog-api.kinduff.com/api/facts').end((err, res) => {
            if (!err && res.status === 200) {
                message.channel.send(`**[🐶] ${message.author.username}**, here's your random dog fact.\n"${res.body.facts[0]}"`).then(m => m.delete({
                    timeout: 15000
                }));
            } else {
                console.log(`REST call failed: ${err}`);
            }
        });
    }
}