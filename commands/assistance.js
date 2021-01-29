const Discord = require("discord.js")
const client = new Discord.Client();
const ms = require("parse-ms");
var cooldownVar = "";

module.exports = {
    name: 'assistance',
    description: '[GENERAL] This will request assistance from staff members. Please only use this in urgent situations. Misusage of this command will lead to punishment. <[setPrefix]assistance>',
    execute(message) {
        message.delete();

        let timeout = 120000;

        if (timeout - (Date.now() - cooldownVar) > 0) {
            let time = ms(timeout - (Date.now() - cooldownVar));
            return message.channel.send(`**[🌬️] ${message.author.username}**, due to risk of traffic or spam, this command is on cooldown. You'll be able to use this command in **${time.minutes} minute(s)** and **${time.seconds} seconds**.`).then(m => m.delete({
                timeout: 10000
            }));
        }

        if (message.guild.id === "797142251712151583") {
            cooldownVar = Date.now();
            return message.channel.send(`<@&797809139836911666> <@&797145089297350736>\nAssistance has been requested!`);
        } else if (message.guild.id === "614193406838571085") {
            cooldownVar = Date.now();
            message.channel.send(`<@&672857887894274058> <@&614196214078111745>\nAssistance has been requested!`);
        }
    }
}