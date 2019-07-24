const fs = module.require('fs');
const Discord = module.require('discord.js');
const ms = require('ms');
const axios = require('axios');

module.exports.run = async (bot, message, args) => {
    
    let config = {
        headers: {
            "X-Riot-Token": "RGAPI-00e2ff30-d02d-4abe-80f9-9569dc2f2b2c",
        }
    }
    let [summonerNameArg, champion] = args;
    let SummonerName;
    let summonerLevel;
    let summonerId;
    let champPoints;
    let championID;
    let Championname;
    axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerNameArg}`, config)


        .then(response =>{
            
            
                    SummonerName = response.data.name;
                    summonerLevel = response.data.summonerLevel;
                    summonerId = response.data.id;
                    
                    switch (champion)
                    {
                        
                        case("Aatrox"): 
                        case("aatrox"): 
                            champion = 266;
                            Championname = "Aatrox";
                                break;
                        case("Ahri"): 
                        case("ahri"): 
                            champion = 103;
                            Championname = "Ahri";
                                break;
                        case("Akali"): 
                        case("akali"): 
                            champion = 84;
                            Championname = "Akali";
                                break;
                        case("Alistar"): 
                        case("alistar"): 
                            champion = 12;
                            Championname = "Alistar";
                                break;
                        case("Anivia"): 
                        case("anivia"): 
                            champion = 34;
                            Championname = "Anivia";
                                break;
                        case("Ammumu"): 
                        case("ammumu"): 
                            champion = 32;
                            Championname = "Ammumu";
                                break;
                        case("Annie"): 
                        case("annie"): 
                            champion = 1;
                            Championname = "Annie";
                                break;
                        default: message.channel.send("Campeão não encontrado").then(m => m.delete(5000));
                        
                    }


                    axios.get(`https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/by-champion/${champion}`, config)
                        .then(response =>{
                    
                            champPoints = response.data.championPoints;
                            championID = response.data.championId;

                            message.channel.send(`Nome de invacador: **${SummonerName}** Pontos de ${Championname}: **${champPoints}** \n\nLevel LoL: **${summonerLevel}**`);
                        
                            console.log(summonerId);
        }).catch(error => {
            console.log(error);
            });
        
         }).catch(error => {
            message.channel.send("Invocador não encontrado na sua região.").then(m => m.delete(5000));
            console.log(error);});
}


module.exports.help = {
    name: "champP",
    aliases: ["summoner","championpoints","lolSP"],
    description: "IN DEV",
    accessableby: "Members",
}