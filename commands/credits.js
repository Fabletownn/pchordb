const Discord = require("discord.js")
const client = new Discord.Client();

module.exports = {
    name: 'credits',
    description: '[MODERATION] This will send the embeds for Server Credits in the channel this command is performed in. <[setPrefix]credits>',
    execute(message) {
        message.delete();

        if (!message.member.roles.cache.has("614196214078111745") && !message.member.roles.cache.has("685878871748378644") && !message.member.roles.cache.has("797145089297350736") && !message.member.roles.cache.has("614195872347062273")) return;

        let creditsChannel = message.guild.channels.cache.get("771606110389927946");
        if (!creditsChannel) return message.channel.send(`Channel not found. (?)`).then(m => m.delete({
            timeout: 10000
        }));

        const creditsEmbed1 = {
            "title": "Server Artwork",
            "color": 2359049,
            "fields": [{
                    "name": "Server Icon",
                    "value": "<@145527685349769216>\n__[Twitter](https://twitter.com/Ta5tyy2)__",
                    "inline": true
                },
                {
                    "name": "Server Banner",
                    "value": "<@308763936847560704>\n__[Twitter](https://twitter.com/RuffianFN)__",
                    "inline": true
                },
                {
                    "name": "Server Trailers",
                    "value": "<@241687257931710467>\n__[Twitter](https://twitter.com/FinnTheCoookie)__",
                    "inline": true
                }
            ],
            "image": {
                "url": "https://cdn.discordapp.com/attachments/614500763997175824/794258994042372096/ITFBannerNOtWIDE.png"
            },
            "thumbnail": {
                "url": "https://cdn.discordapp.com/attachments/793520398137688154/793523562018242601/ServerIcon.png"
            }
        }

        const creditsEmbed2 = {
            "title": "Emojis",
            "description": "<:zzITFUpvote:778318625328332810> <:zzITFDownvote:778318624552779776> <:zITFZombie:778318625316143124> <:zITFTune:685513111767482434> <:zITFToxic:667854587566358535> <:zITFTired:667854619128365089> <:zITFThink:778318625454293042> <:zITFSweat:778318625470808134> <:zITFRage:667854648861917184> <:zITFPride:778318624922009663> <:zITFPat:667854679375478808> <:zITFNotes:667854738448187403> <:zITFMoyai:778318625101709312> <:zITFLurk:680882483474202722> <:zITFLUL:778318625047052309> <:zITFLove:667854944602292224> <:zITFLore:680882084465868812> <:zITFHype:680882437894701083> <:zITFHuh:667855460346363906> <:zITFHighFive:667854796933562421> <:zITFHey:680882398421844007> <:zITFGoth:680882266221969539> <:zITFGift:680882229676736556> <:zITFGG:667854871579590696> <:zITFGaming:778318624163102723> <:zITFFlushed:778318624972734486> <:zITFFlowers:778318624783335444> <:zITFDance:778318624523288656> <:zITFDab:680882199376953419> <:zITFCry:667854893645561872> <:zITFCringe:680882165994487861> <:zITFBurrito:680882130699550738> <:zITFBits:680882039335157890> <:yyITFDead:667855083412652042> <:yTrogLove:778318624280674375> <:yScarletDefenderLove:778318623915769947> <:yRoyaleBomberLove:778318624209240154> <:yNickLove:798240179894222859> <:yMezmerLove:778318624330874941> <:yLimelightLove:778318624040550461> <:yEtherLove:778318624221954088> <:yDreadOmenLove:800578240866942977> <:yDozerLove:800578240808615947> <:yCrystalLove:778318624032555039>\n\n_ _",
            "color": 2359049,
            "fields": [{
                "name": "Artist",
                "value": "Wildwik\n__[Twitter](https://twitter.com/wildwik)__"
            }]
        }

        const creditsEmbed3 = {
            "title": "Blob Emojis",
            "description": "<:blobyes:772869345675575336> <:blobwave:772869345004748832> <:blobsip:772869345427980338> <:blobsadrain:772869345398226954> <:blobpopcorn:772869345210269756> <:blobnomcookie:772869346044543017> <:blobno:772869345575567380> <:blobhyperthink:778326357984804894> <:blobheart:772869346141143041> <:blobheadphones:772869345353007154> <:blobglare:772869345298743336> <:blobgift:772869345524056146> <:blobfacepalm:772869346468954122> <:blobartist:772869345452752987> <a:athinkingwithblobs:772869346334081074> <a:aphotoblob:772869353783296000> <a:abongoblob:772869344916013096> <a:ablobwobroll:772869352063762442> <a:ablobrage:772869353578299462> <a:ablobparty:772869357608632360> <a:abloblurk:772869350797213706> <a:ablobhype:772869339006107708> <a:ablobglarezoom:772869353552085002> <a:ablobenjoy:772869352608366592> <a:ablobdundundun:772869352025227285> <a:ablobcongarollbounce:772869354609573909> <a:ablobbounce:772869334137569302> <a:ablobblewobble:772869331386236949> <a:ablobbass:772869352214757387> <a:ablobattention:772869331096043580>",
            "color": 2359049,
            "fields": [{
                "name": "_ _",
                "value": "Blob Emoji are licensed under the Apache License 2.0.\nAll blob emojis used in this server are from the official servers, and can be downloaded here: https://blobs.gg/blobs.zip.\n\nWebsite: https://blobs.gg/."
            }]
        }

        message.channel.send(`**${message.author.username}**, updating the <#771606110389927946> channel.`).then(progMsg => {
            creditsChannel.messages.fetch("794852020871626772").then(embedOne => {
                embedOne.edit({ embed: creditsEmbed1 });
                progMsg.edit(`Updated first message in channel.`);
            }).catch(err => {
                creditsChannel.send({ embed: creditsEmbed1 });
                progMsg.edit(`I couldn't find the first message, so I sent one in the channel.`);
                return console.log(err);
            });
    
            creditsChannel.messages.fetch("794852021244133386").then(embedTwo => {
                embedTwo.edit({ embed: creditsEmbed2 });
                progMsg.edit(`Updated second message.`);
            }).catch(err => {
                creditsChannel.send({ embed: creditsEmbed3 });
                progMsg.edit(`I couldn't find the second message, so I sent one in the channel.`);
                return console.log(err);
            });
    
            creditsChannel.messages.fetch("794852021428682773").then(embedThree => {
                embedThree.edit({ embed: creditsEmbed3 });
                progMsg.edit(`Updated third message.`);
            }).catch(err => {
                creditsChannel.send({ embed: creditsEmbed3 });
                progMsg.edit(`I couldn't find the third message, so I sent one in the channel.`);
                return console.log(err);
            });
        });
    }
}