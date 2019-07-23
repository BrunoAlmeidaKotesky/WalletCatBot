const Discord = require("discord.js");
const fs = require("fs");
const axios = require('axios');
const botconfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        };
    }
    let prefix = prefixes[message.guild.id].prefixes;
    
    let moedaEmbed = new Discord.RichEmbed()
    .setColor("#00FFFF")
    .setDescription(`Exemplo: ${prefix}$ <moeda>\n\nMoedas disponíveis: USD, CAD`)
    .setFooter("Você não informou uma moeda corretamente.");


    axios.get('https://economia.awesomeapi.com.br/all')
        .then(response => {


            let highUSD = response.data.USD.high;
            let lowUSD = response.data.USD.low;
            let highCAD = response.data.CAD.high;
            let lowCAD = response.data.CAD.low;
            let atualizadoUSD = response.data.USD.create_date;
            let atualizadoCAD = response.data.USD.create_date;

            let [coinType] = args;

            if (!coinType) return message.channel.send(moedaEmbed);
            

            if (coinType == "USD") {
                message.delete();

                let sEmbed = new Discord.RichEmbed()
                    .setColor("#00FFFF")
                    .setFooter(`Última atualização em (${atualizadoUSD}).`)
                    .setDescription(`**A cotação média do dólar p/real hoje está entre: R$: ${lowUSD} / ${highUSD}**`)
                message.channel.sendEmbed(sEmbed);
                console.log(coinType);
            }
            if (coinType == "CAD") {
                message.delete();

                let sEmbed = new Discord.RichEmbed()
                    .setColor("#00FFFF")
                    .setFooter(`Última atualização em (${atualizadoCAD}).`)
                    .setDescription(`**A cotação média do dólar canadanse p/real hoje está entre: R$: ${lowCAD} / ${highCAD}**`)
                message.channel.sendEmbed(sEmbed);
                console.log(coinType);
            }







        })
        .catch(error => {
            console.log(error);
        });


}


module.exports.help = {
    name: "$",
    aliases: ["money"],
    accessableby: "Members",
    description: "Mostra a cotação atual do dólar."

}