const Discord = require("discord.js")
const client = new Discord.Client();
const ms = require("parse-ms");
var cooldownVar = "";

module.exports = {
    name: 'assistance',
    description: '[ONE-STEP] This will request assistance from staff members. Please only use this in urgent situations. Misusage of this command will lead to punishment. <[setPrefix]assistance>',
    execute(message, args) {
        let timeout = 120000;
        message.delete();

        if (timeout - (Date.now() - cooldownVar) > 0) {
            let time = ms(timeout - (Date.now() - cooldownVar));
            return message.channel.send(`This command is on cooldown. You're able to use this command in ${time.minutes} minute(s) and ${time.seconds} seconds.`).then(m => m.delete({
                timeout: 10000
            }));
        }

        cooldownVar = Date.now();
        message.channel.send(`<@&672857887894274058> <@&614196214078111745>\nAssistance has been requested!\n`);
    }
}