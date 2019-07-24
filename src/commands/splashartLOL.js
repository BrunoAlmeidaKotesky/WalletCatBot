const fs = module.require('fs');
const Discord = module.require('discord.js');
const ms = require('ms');
const axios = require('axios');
module.exports.run = async (bot, message, args) => {
    let [champArt, skin, location] = args;
     const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }
    let artCap = capitalize(champArt);

    axios.get(`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${artCap}_0.jpg`).then(response=>{

        
          
       /* console.log(response.data.data.Anivia);
        let champion = response.data.data;
        console.log(champion.Anivia.title);*/
     message.channel.send(`Campeão: ${capitalize(champArt)} com a skin:`, {
        file: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${artCap}_${skin}.jpg`});
console.log(capitalize(champArt));

})
 .catch(error => {
    console.log(error);
     message.channel.send("Falha na busca do campeão, certifique-se de que escolheu o campeão corretamente");
});

    if(!champArt )
    return   message.channel.send("Você não especificou um campeão");
    if(!skin )
    return message.channel.send("Insira o ID de skin <0-9>.");
}
module.exports.help = {
name: "splashart",
aliases: ["lolimg","splashart","champart"],
description: "",
accessableby:"",
}