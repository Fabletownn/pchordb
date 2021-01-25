const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'eventstart',
    description: '[MODERATION] This will announce an event, opening the Events channel starting with those MEE6 Level 30+, and opening it up to the Server Events role (MEE6 Level 10+) after 15 minutes. <[setPrefix]eventstart>',
    execute(message) {
        message.delete();

        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        const eventsVoiceChat = message.guild.channels.cache.get('786791282915147846');
        message.channel.send(`**[👾] ${message.author.username}**, the proccess of overwriting channel permissions has occurred.\n*(It takes time due to Discord's ratelimits, so please be patient.)*`).then(m => m.delete({ timeout: 15000 }));

        eventsVoiceChat.updateOverwrite('615583961942327316', {
            CONNECT: true,
        }, `An event was run by ${message.author.tag}.`);

        eventsVoiceChat.updateOverwrite('615584030804672512', {
            CONNECT: true,
        }, `An event was run by ${message.author.tag}.`);

        eventsVoiceChat.updateOverwrite('615584087054483456', {
            CONNECT: true,
        }, `An event was run by ${message.author.tag}.`);

        eventsVoiceChat.updateOverwrite('615584213307097118', {
            CONNECT: true,
        }, `An event was run by ${message.author.tag}.`);

        eventsVoiceChat.updateOverwrite('615584329929850900', {
            CONNECT: true,
        }, `An event was run by ${message.author.tag}.`);

        eventsVoiceChat.updateOverwrite('615584451837296707', {
            CONNECT: true,
        }, `An event was run by ${message.author.tag}.`);

        eventsVoiceChat.updateOverwrite('615584518849429512', {
            CONNECT: true,
        }, `An event was run by ${message.author.tag}.`);

        eventsVoiceChat.updateOverwrite('615584610557886475', {
            CONNECT: true,
        }, `An event was run by ${message.author.tag}.`);

        eventsVoiceChat.updateOverwrite('615584694683172894', {
            CONNECT: true,
        }, `An event was run by ${message.author.tag}.`);

        eventsVoiceChat.updateOverwrite('615584779148066876', {
            CONNECT: true,
        }, `An event was run by ${message.author.tag}.`);

        eventsVoiceChat.updateOverwrite('615584884706115586', {
            CONNECT: true,
        }, `An event was run by ${message.author.tag}.`);

        eventsVoiceChat.updateOverwrite('615584949394866194', {
            CONNECT: true,
        }, `An event was run by ${message.author.tag}.`);

        eventsVoiceChat.updateOverwrite('615585052654436370', {
            CONNECT: true,
        }, `An event was run by ${message.author.tag}.`);

        eventsVoiceChat.updateOverwrite('683365440575242368', {
            CONNECT: true,
        }, `An event was run by ${message.author.tag}.`);

        eventsVoiceChat.updateOverwrite('681109347790487563', {
            CONNECT: true,
        }, `An event was run by ${message.author.tag}.`).then(() => {
            const serverEventsChannel = message.guild.channels.cache.get('731380572189884436');
            
            serverEventsChannel.send(`The Server Event is starting! Voice Channel is open for members MEE6 Level 30 and above for the first 15 minutes. Hop in!`)
            serverEventsChannel.send(`<@&615583961942327316>\n<@&615584030804672512>\n<@&615584087054483456>\n<@&615584213307097118>\n<@&615584329929850900>\n<@&615584451837296707>\n<@&615584518849429512>\n<@&615584610557886475>\n<@&615584694683172894>\n<@&615584779148066876>\n<@&615584884706115586>\n<@&615584949394866194>\n<@&615585052654436370>\n<@&683365440575242368>\n<@&681109347790487563>`).then(m => m.delete());

            message.channel.send(`**[👾] ${message.author.username}**, the proccess of overwriting channel permissions has concluded. The 15 minute timer has started to allow members with Server Events to join.\n*(It takes time due to Discord's ratelimits, so please be patient.)*`).then(m => m.delete({ timeout: 15000 }));

            setTimeout(() => {
                eventsVoiceChat.updateOverwrite('615583961942327316', {
                    CONNECT: null,
                }, `An event was run by ${message.author.tag}.`);
        
                eventsVoiceChat.updateOverwrite('615584030804672512', {
                    CONNECT: null,
                }, `An event was run by ${message.author.tag}.`);
        
                eventsVoiceChat.updateOverwrite('615584087054483456', {
                    CONNECT: null,
                }, `An event was run by ${message.author.tag}.`);
        
                eventsVoiceChat.updateOverwrite('615584213307097118', {
                    CONNECT: null,
                }, `An event was run by ${message.author.tag}.`);
        
                eventsVoiceChat.updateOverwrite('615584329929850900', {
                    CONNECT: null,
                }, `An event was run by ${message.author.tag}.`);
        
                eventsVoiceChat.updateOverwrite('615584451837296707', {
                    CONNECT: null,
                }, `An event was run by ${message.author.tag}.`);
        
                eventsVoiceChat.updateOverwrite('615584518849429512', {
                    CONNECT: null,
                }, `An event was run by ${message.author.tag}.`);
        
                eventsVoiceChat.updateOverwrite('615584610557886475', {
                    CONNECT: null,
                }, `An event was run by ${message.author.tag}.`);
        
                eventsVoiceChat.updateOverwrite('615584694683172894', {
                    CONNECT: null,
                }, `An event was run by ${message.author.tag}.`);
        
                eventsVoiceChat.updateOverwrite('615584779148066876', {
                    CONNECT: null,
                }, `An event was run by ${message.author.tag}.`);
        
                eventsVoiceChat.updateOverwrite('615584884706115586', {
                    CONNECT: null,
                }, `An event was run by ${message.author.tag}.`);
        
                eventsVoiceChat.updateOverwrite('615584949394866194', {
                    CONNECT: null,
                }, `An event was run by ${message.author.tag}.`);
        
                eventsVoiceChat.updateOverwrite('615585052654436370', {
                    CONNECT: null,
                }, `An event was run by ${message.author.tag}.`);
        
                eventsVoiceChat.updateOverwrite('683365440575242368', {
                    CONNECT: null,
                }, `An event was run by ${message.author.tag}.`);
        
                eventsVoiceChat.updateOverwrite('681109347790487563', {
                    CONNECT: null,
                }, `An event was run by ${message.author.tag}.`);
                
                eventsVoiceChat.updateOverwrite('731212776936308777', {
                    CONNECT: true,
                }, `An event was run by ${message.author.tag}.`).then(() => {
                    serverEventsChannel.send(`VC is now open to all. Hop in!`);
                    serverEventsChannel.send(`<@&731212776936308777>`).then(m => m.delete());

                    message.channel.send(`**[👾] ${message.author.username}**, the Events channel has now been opened to all members MEE6 Level 10 and up. Have fun!`).then(m => m.delete({ timeout: 15000 }));
                });
            }, 900000);
        });
    }
}