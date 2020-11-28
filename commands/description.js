const Discord = require("discord.js")
const client = new Discord.Client();
const fs = require("fs")

module.exports = {
    name: 'description',
    description: '[MODERATION] This will fetch the command description from within the code. Moderator restricted only for now. <[setPrefix]description <command name>>',
    execute(message, args) {
        message.delete();

        let moderatorR = message.guild.roles.cache.find(role => role.name === "Moderator");
        if (!message.member.roles.cache.has(moderatorR.id)) return;

        let commandNameP = message.content.split(" ");
        let commandName = commandNameP[1];

        client.commands = new Discord.Collection();
        const commandFiles = fs.readdirSync('./').filter(file => file.endsWith('.js'));

        if (!commandName) return message.channel.send(`**[❗] ${message.author.username}, please enter a command name to view the description listed for it.\nCommands are categorized as such: \`GENERAL\`, \`MODERATION\`, \`PROMPT\`, \`ONE-STEP\`.`).then(m => m.delete({
            timeout: 10000
        }));
        for (const file of commandFiles) {
            try {
                const command = require(`./${commandName}.js`);
                message.channel.send(`**[📃] ${message.author.username}**, the description for the command \`${commandName}\` is:\n"${command.description}".`).then(m => m.delete({
                    timeout: 30000
                }));
            } catch (err) {
                return message.channel.send(`**[❗] ${message.author.username}**, there were no entries found for \`${commandName}\`.\n*(If this is a command but is not being listed as such, you may be using an alias name. Since these descriptions are ripped from the code directory, it may not register aliases. Original command names can be found in the 'Alias Commands' category of the help command.)*`).then(m => m.delete({
                    timeout: 10000
                }));
            }
        }
    }
}