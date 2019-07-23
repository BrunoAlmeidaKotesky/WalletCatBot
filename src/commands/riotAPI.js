const fs = module.require('fs');
const Discord = module.require('discord.js');
const ms = require('ms');
const axios = require('axios');

module.exports.run = async (bot, message, args) => {
    let config = {
        headers: {
            "X-Riot-Token": "RGAPI-f71f7e0d-8e20-4747-9e45-1c006e9ef66e",
        }
    }
    let [summonerNameArg, champion] = args;
    let SummonerName;
    let summonerLevel;
    let summonerId;
    let champPoints;
    let championID;

    axios.get(`https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerNameArg}`, config)


        .then(response =>{
            
           
                    SummonerName = response.data.name;
                    summonerLevel = response.data.summonerLevel;
                    summonerId = response.data.id;
                    
                    console.log(SummonerName)

                    axios.get(`https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/by-champion/${champion}`, config)
                        .then(response =>{
                    
                            champPoints = response.data.championPoints;
                            championID = response.data.championId;

                            message.channel.send(`Nome: **${SummonerName}** Pontos de ${championID}: **${champPoints}** \n\nLevel LoL: **${summonerLevel}** ID: **${summonerId}**`);
                        
                            console.log(summonerId);
        })
           
         }).catch(error => {
            console.log(error);});
        


    


}











module.exports.help = {
    name: "lol",
    aliases: ["summoner"],
    description: "n",
    accessableby: "a",
}