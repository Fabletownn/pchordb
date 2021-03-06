const Discord = require("discord.js");

module.exports = {
    name: 'eval',
    description: '[PRIVATE] Will execute the code given (only owner has access to this - this will **NEVER** be used in a malicious sense. If you need me to remove this in fear of said malicia, just DM Fable#0001! [528759471514845194]).',
    execute(message) {
        const client = message.client;
        const args = message.content.split(" ").slice(1);

        if (message.author.id !== "528759471514845194") return;
        if (!args) return;

        const clean = text => {
            if (typeof(text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }

        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), {
                code: "xl"
            });
        } catch (err) {
            message.channel.send(`\`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
}