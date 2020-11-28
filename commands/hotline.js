const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'hotline',
    description: '[GENERAL] This will provide you Suicide Prevention Hotlines, websites, and phone numbers to provide for those in need. You are able to add "-d" or "dm" anywhere in the command to have it personally DM\'d to you. <[setPrefix]hotline>',
    execute(message, args) {
        message.delete();
        if (message.content.includes('dm') || message.content.includes('-d')) {
            return message.author.send(`Suicide Hotlines provide help to those in need. **Please contact** a hotline if you need support yourself or need help supporting somebody in need. If you're concerned about somebody, please encourage them to contact a hotline.\n**National Suicide Prevention Lifeline**: http://www.suicidepreventionlifeline.org/\n**Phone Number**: 1-800-273-TALK (8225)\n\n**Lifeline Crisis Chat**: http://www.suicidepreventionlifeline.org/gethelp/lifelinechat.aspx`);
        }
        message.channel.send(`Suicide Hotlines provide help to those in need. **Please contact** a hotline if you need support yourself or need help supporting somebody in need. If you're concerned about somebody, please encourage them to contact a hotline.\n**National Suicide Prevention Lifeline**: http://www.suicidepreventionlifeline.org/\n**Phone Number**: 1-800-273-TALK (8225)\n\n**Lifeline Crisis Chat**: http://www.suicidepreventionlifeline.org/gethelp/lifelinechat.aspx\n*For future reference, you can always run this command and add "dm" OR "-d" to have this sent to DMs personally.*`);
    }
}