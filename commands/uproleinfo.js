const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'roleinfo',
    description: '[MODERATION] Will send the entire list of embeds regarding Role Information in chat. Please use at your own discretion: it is **LONG**. <[setPrefix]roleinfo>',
    execute(message, args) {
        message.delete();

        if (message.guild.id !== "614193406838571085") return;
        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        let roleChannel = message.guild.channels.cache.get("781814866779570236");
        if (!roleChannel) return message.channel.send(`Channel not found.`).then(m => m.delete({
            timeout: 10000
        }));

        const roleEmbed1 = {
            "fields": [{
                "name": "__Information__",
                "value": "- You gain 15-25 XP per minute of talking. Spamming won't grant any more XP, and will only lead to a punishment.\n- You can check your current level by typing in `!rank` in <#615594300108963867>. The server leaderboard can be accessed by using the `!levels` command in <#615594300108963867>. \n\n_ _",
                "inline": false
            }, {
                "name": "__Permissions__",
                "value": "`Level 10`\n- Access to <#673259309555253290>.\n- Image Permissions in \n\\> <#761997427111886908> \n\\> <#616739992798232624>\n\\> <#693169647217803316>\n\\> <#614550170478051349>\n\\> <#757307092263501975>\n\\> <#703294596914085989>\n\\> <#614563325556162572>\n\\> <#714511122157404231>\n`Level 20`\nNickname Permissions\n`Level 30`\n- Access to <#710916484427415602>\n- Priority to participate in Fortnite Customs\n`Level 40`\n- Access to <#711435929537085450>\n`Level 50`\n- Livestream Permissions in the <#664593167420489730> Voice Channel.\n`Level 60`\n- Reaction Permissions in all channels under the `I TALK GENERAL` and `I TALK FORTNITE` channel categories.",
                "inline": false
            }],
            "title": "Level Roles",
            "description": "`Level 1`: <@&615590333300080640>\n`Level 5`: <@&615583350819913750>\n`Level 10`: <@&615583518793400321>\n`Level 15`: <@&615583627534794762>\n`Level 20`: <@&615583720828829706>\n`Level 25`: <@&615583787660869635>\n`Level 30`: <@&615583961942327316>\n`Level 35`: <@&615584030804672512>\n`Level 40`: <@&615584087054483456>\n`Level 45`: <@&615584213307097118>\n`Level 50`: <@&615584329929850900>\n`Level 55`: <@&615584451837296707>\n`Level 60`: <@&615584518849429512>\n`Level 65`: <@&615584610557886475>\n`Level 70`: <@&615584694683172894>\n`Level 75`: <@&615584779148066876>\n`Level 80`: <@&615584884706115586>\n`Level 85`: <@&615584949394866194>\n`Level 90`: <@&615585052654436370>\n`Level 95`: <@&683365440575242368>\n`Level 100`: <@&615585157595791475>\n\n_ _",
            "color": 2359049
        }

        const roleEmbed2 = {
            "fields": [{
                "name": "__Information__",
                "value": "- The roles will only be granted to you while your Server Boost/Twitch Subscription is active. Once your Server Boost or Twitch Subscription runs out, you will lose the role and the permissions attached with it.\n- To obtain the <@&802243800458068028> role, make sure your Twitch Account is connected with your Discord Account. \n`Settings --> Connections`\n\n_ _",
                "inline": false
            }, {
                "name": "__Permissions__",
                "value": "- Access to <#652578641343152148>.\n- Early access to <#673259309555253290>.\n- Early access to Nickname Permissions.\n- Priority to participate in Fortnite Customs.\n- Early access to Livestream Permissions in the <#664593167420489730> Voice Channel.\n- Early Access to Reaction Permissions in all channels under the `I TALK GENERAL` and `I TALK FORTNITE` channel categories.",
                "inline": false
            }],
            "title": "Supporter Roles",
            "description": "<@&615597085202317325> - Automatically granted upon boosting the server.\n<@&802243800458068028> - Automatically granted to members with an active Twitch Subscription to __[itsitalk](https://twitch.tv/itsitalk)__. \n\n_ _",
            "color": 2359049
        }

        const roleEmbed3 = {
            "fields": [{
                "name": "__Information__",
                "value": "- These roles are handed out by <@152597531824619521> himself. Asking or begging for these roles will only reduce your chances to obtain the role. \n- Abusing any of the permissions granted with these roles may lead to the role being revoked.\n\n_ _",
                "inline": false
            }, {
                "name": "__Permissions__",
                "value": "- Image Permissions in all channels under the `I TALK GENERAL` and `I TALK FORTNITE` channel categories.\n- Early access to <#673259309555253290>.\n- Early access to Nickname Permissions.\n- Early access to Livestream Permissions in the <#664593167420489730> Voice Channel.\n- Early Access to Reaction Permissions in all channels under the `I TALK GENERAL` and `I TALK FORTNITE` channel categories.",
                "inline": false
            }],
            "title": "Exclusive Roles",
            "description": "<@&614573090332082176> - Influential members in the community or the server.\n<@&614196285574086854> - Friends of <@152597531824619521>.\n<@&695693793218789488> - Artists who designed the Server Icon/Banner/Emojis.\n<@&772176660958281737> - Given out every week under <#772175886031650827>.\n\n_ _",
            "color": 2359049
        }

        const roleEmbed4 = {
            "fields": [{
                "name": "__Information__",
                "value": "- As these roles are tied with Events hosted in the server, they are restricted to members Level 10 and above.\n- To obtain the role, simply click on the reaction. Unreact to revoke the role.\n",
                "inline": false
            }],
            "title": "Self Assign Roles",
            "description": "[Accessible at Level 10 through <#673259309555253290>].\n\n<@&731217324765479053> - Access to Fortnite Customs **(Requires Yunite Verification)**.\n<@&731216383861456917>/<@&731216410239565844> - Receive pings when a Moderator hosts lobbies.\n<@&752951520479412294> - Access to Customs for Other Games.\n<@&731212776936308777> - Access to Server Events.\n\n_ _",
            "color": 2359049
        }

        const roleEmbed5 = {
            "fields": [{
                "name": "__Information__",
                "value": "- You can select **one** out of the 40 role colors at a given moment of time.\n- The first 30 members to reach Level 50 got a customised role: these custom roles are no longer handed out under <#711435929537085450>.",
                "inline": false
            }],
            "title": "Color Roles",
            "description": "[Accessible at Level 40 through <#711435929537085450>].\n\nChoose a role color between 40 different roles!\n\n_ _",
            "color": 2359049
        }

        const roleEmbed6 = {
            "title": "Event Winner Roles",
            "color": 2359049,
            "fields": [{
                "name": "Winners",
                "value": "<@&708699777226899507>\n<@&728185818510000180>\n<@&790619688086011905>\n<@&794277061345804338>",
                "inline": true
            },
            {
                "name": "Runner Ups",
                "value": "<@&708699987088900097>\n<@&728185982662475786>\n<@&790619720549793812>\n<@&794634607542665226>",
                "inline": true
            },
            {
                "name": "2nd Runner Ups",
                "value": "<@&708700113148575837>\n<@&728186069123727390>\n<@&790619723242536961>\n<@&794634828627836938>",
                "inline": true
            },
            {
                "name": "Tournament Qualifiers",
                "value": "<@&706196460437241916>\n<@&728185556051165274>\n<@&789590423492493403>\n<@&794634335788728321>"
            },
            {
                "name": "General Event Roles",
                "value": "<@&708383263927828542>- Given to winners of Fortnite Customs hosted on the server.\n<@&663882877343367194> - Given to winners of Fortnite Fashion Shows hosted on the server.\n<@&771395161129353248> - Winners of Fortnite Customs during the I Talk Christmas Event.\n<@&626803737595478046> - Given to winners of the <#626803019887018034> Minigame."
            }
            ]
        }

        const roleEmbed7 = {
            "fields": [{
                "name": "__Information__",
                "value": "- Members can file a <@575252669443211264> with the requirements to obtain the roles.\n- <@&655191803858780180> is granted out by Moderators, and is not a role you can apply for.\n- Abusing the permissions granted with the role may lead to the role being revoked.",
                "inline": false
            }],
            "title": "Permission Roles",
            "description": "<@&678294533552865299> - Permissions to talk/share images in <#621834479228682250>.\n```\n[Requirements: Submitting an OC artwork of yours.]\n```\n<@&683367565384220769> - Image Permissions in <#618196499343474712>.\n```\n[Requirements: Submitting proof of being PL 100 or above in Fortnite: Save the World]\n```\n<@&690601467605680148> - Image Permissions in <#683373679832334376>.\n```\n[Requirements - Submitting images/clips of a Fortnite: Creative creation of yours.]\n```\n<@&655191803858780180> - Access to <#778502488844140574>.\n```\n[Randomly granted to active Members MEE6 Level 30+]\n```\n\n_ _",
            "color": 2359049
        }

        /*message.channel.send({
            embed: roleEmbed1
        }).then(() => {
            message.channel.send({
                embed: roleEmbed2
            }).then(() => {
                message.channel.send({
                    embed: roleEmbed3
                }).then(() => {
                    message.channel.send({
                        embed: roleEmbed4
                    }).then(() => {
                        message.channel.send({
                            embed: roleEmbed7
                        }).then(() => {
                            message.channel.send({
                                embed: roleEmbed5
                            }).then(() => {
                                message.channel.send({
                                    embed: roleEmbed6
                                });
                            });
                        });
                    });
                });
            });
        });*/

        roleChannel.messages.fetch("794852020871626772").then(embedOne => {
            embedOne.edit({ embed: roleEmbed1 });
        }).catch(err => {
            roleChannel.send({ embed: roleEmbed1 });
            return console.log(err);
        });

        roleChannel.messages.fetch("794852021244133386").then(embedTwo => {
            embedTwo.edit({ embed: roleEmbed2 });
        }).catch(err => {
            roleChannel.send({ embed: roleEmbed2 });
            return console.log(err);
        });

        roleChannel.messages.fetch("794852021428682773").then(embedThree => {
            embedThree.edit({ embed: roleEmbed3 });
        }).catch(err => {
            roleChannel.send({ embed: roleEmbed3 });
            return console.log(err);
        });

        roleChannel.messages.fetch("794852021538390018").then(embedFour => {
            embedFour.edit({ embed: roleEmbed4 });
        }).catch(err => {
            roleChannel.send({ embed: roleEmbed4 });
            return console.log(err);
        });

        roleChannel.messages.fetch("794852037304123393").then(embedFive => {
            embedFive.edit({ embed: roleEmbed5 });
        }).catch(err => {
            roleChannel.send({ embed: roleEmbed5 });
            return console.log(err);
        });

        roleChannel.messages.fetch("794852037758025728").then(embedSix => {
            embedSix.edit({ embed: roleEmbed6 });
        }).catch(err => {
            roleChannel.send({ embed: roleEmbed6 });
            return console.log(err);
        });

        roleChannel.messages.fetch("794852036956520468").then(embedSeven => {
            embedSeven.edit({ embed: roleEmbed7 });
        }).catch(err => {
            roleChannel.send({ embed: roleEmbed7 });
            return console.log(err);
        });
    }
}