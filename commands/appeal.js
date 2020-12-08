const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'appeal',
    description: '[GENERAL] This command is restricted to the Appeals guild & channel(s) only. It will allow a member to appeal their ban punishment. <[setPrefix]appeal <appeal message>>',
    execute(message, args) {
        if (message.guild.id !== '685876599199236173') return;
        if (message.channel.id !== '685885174025814049') return;

        let receivedR = message.guild.roles.cache.find(role => role.name === "Appeal Received");
        if (message.member.roles.cache.has(receivedR.id)) return message.delete();

        var appealMessageArguments = message.content.split("appeal ");
        var appealMessage = appealMessageArguments[1];

        if (!appealMessage && message.attachments.size === 0) return message.delete();

        if (message.attachments.size > 0) {
            const attachments = (message.attachments).array();
            const attachment = attachments[0];

            const nameArray = attachment.name.split('.');

            const fileType = nameArray[nameArray.length - 1]
            const fileTypes = ["png", "jpg", "gif", "txt"];

            if (!fileTypes.includes(fileType)) {
                message.delete();
                return message.author.send(`There was an issue with your attachment, therefore your appeal has not been sent. Your appeal message has been sent below (if submitted).\n\`\`\`${appealMessage || 'None submitted.'}\`\`\``)
            }
        }

        const appealEmbed = new Discord.MessageEmbed()
            .setTitle(`Appeal | Ban | ${message.author.tag}`)
            .setDescription(`${appealMessage || 'No appeal message was sent.\nPlease check attachment embeds below for any possible text or image files.'}`)
            .setColor(`ff0000`)
            .setFooter(`ID: ${message.author.id}`)

        message.guild.channels.cache.get(`738863576890081340`).send(appealEmbed).then(appealMSG => {
            appealMSG.react('✅').then(appealMSG.react('🚫'));

            message.member.roles.add('691372147112673441');
            message.author.send(`**[${new Date().toLocaleTimeString()}] ${message.author.username}**, you have successfully appealed your ban for the **I Talk Server**. All appeals are reviewed and voted on Saturday, so please be patient.\nYour appeal message was submitted as the following:\n\`\`\`${appealMessage || 'No appeal message was sent.'}\`\`\``);
        });

        if (message.attachments.size > 0) {
            message.delete({
                timeout: 2000
            });

            message.attachments.forEach(appealAttachment => {
                const attachments = (message.attachments).array();
                const attachment = attachments[0];

                const nameArray = attachment.name.split('.');

                const fileType = nameArray[nameArray.length - 1]
                const fileTypes = ["png", "jpg", "gif", "txt"];

                if (!fileTypes.includes(fileType)) {
                    return message.delete();
                } else {
                    const attachmentEmbed = new Discord.MessageEmbed()
                        .setTitle(`Additional Appeal Attachment(s) | ${message.author.tag}`)
                        .setDescription(`Attachment Link: [Press here to open](${appealAttachment.url}).\n\n**In case of a malicious link, here is the full link**: ${appealAttachment.url}`)
                        .setImage(appealAttachment.url)
                        .setColor(`c66523`)

                    message.guild.channels.cache.get(`738863576890081340`).send(attachmentEmbed);
                    message.author.send(`Attachment(s) provided with appeal:`, {
                        files: [appealAttachment.url]
                    });
                }
            });
        } else {
            message.delete();
        }
    }
}