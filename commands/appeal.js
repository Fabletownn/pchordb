const Discord = require("discord.js")
const https = require("https");
const fs = require("fs");

module.exports = {
    name: 'appeal',
    description: '[GENERAL] This command is restricted to the Appeals guild & channel(s) only. It will allow a member to appeal their ban punishment. <[setPrefix]appeal <appeal message>>',
    execute(message) {
        const client = message.client;

        if (message.guild.id !== '685876599199236173') return message.delete();
        if (message.channel.id !== '685885174025814049') return message.delete();

        let receivedR = message.guild.roles.cache.find(role => role.name === "Appeal Received");
        if (message.member.roles.cache.has(receivedR.id)) return message.delete();

        var appealMessageArguments = message.content.split("+appeal ");
        var appealMessage = appealMessageArguments[1];

        if (!appealMessage && message.attachments.size === 0) return message.delete();

        const filedEmbed = new Discord.MessageEmbed()
            .setAuthor(`Appeal Filed | ${message.author.tag}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setDescription(`${message.author} has filed an appeal and obtained the <@&691372147112673441> role.`)
            .setColor(15582289)
            .setFooter(`User ID: ${message.author.id}`)
            .setTimestamp()

        client.channels.cache.get("803199322379780117").send({
            embed: filedEmbed
        });

        const appealEmbed = new Discord.MessageEmbed()
            .setTitle(`Appeal | Ban | ${message.author.tag}`)
            .setDescription(`${appealMessage || 'No appeal message was sent.\nPlease check attachment embeds below for any possible text or image files.'}`)
            .setColor(`ff0000`)
            .setFooter(`User ID: ${message.author.id}`)

        client.channels.cache.get("738863576890081340").send({
            embed: appealEmbed
        }).then(appealMSG => {
            appealMSG.react(`<:zzITFUpvote:778318625328332810>`).then(appealMSG.react(`<:zzITFDownvote:778318624552779776>`));

            message.member.roles.add('691372147112673441');
            message.author.send(`**[${new Date().toLocaleTimeString()}] ${message.author.username}**, you have successfully appealed your ban for the **I Talk Server**. All appeals are reviewed and voted on Saturday, so please be patient.\nYour appeal message was submitted as the following:\n\`\`\`${appealMessage || 'No appeal message was sent.'}\`\`\``);
        });

        if (message.attachments.size > 0) {
            message.delete({
                timeout: 2000
            });

            message.attachments.forEach(appealAttachment => {
                if (!appealAttachment.name.endsWith("png") && !appealAttachment.name.endsWith("jpg") && !appealAttachment.name.endsWith("gif") && !appealAttachment.name.endsWith("txt")) return message.author.send(`There was an issue with your attachment: therefore, it has not been sent in.`);

                const file = fs.createWriteStream(`APPEAL_${message.author.username}${message.author.discriminator}_${appealAttachment.name}`);
                const request = https.get(appealAttachment.url, function (response) {
                    response.pipe(file);
                });

                setTimeout(() => {
                    const appealImage = new Discord.MessageAttachment(`./APPEAL_${message.author.username}${message.author.discriminator}_${appealAttachment.name}`);

                    const attachmentEmbed = new Discord.MessageEmbed()
                        .setTitle(`Additional Appeal Attachment(s) | ${message.author.tag}`)
                        .setDescription(`Above are the attachment(s) submitted with this member's appeal.\n*(If there is no appeal message, there may be a text file to read).*`)
                        .attachFiles(appealImage)
                        .setColor(`c66523`)

                    client.channels.cache.get("738863576890081340").send({
                        embed: attachmentEmbed
                    }).then(() => {
                        message.author.send(`Attachment(s) sent with appeal:`, {
                            files: [appealImage]
                        });
                    });
                }, 3000)
            });
        } else {
            message.delete();
        }
    }
}