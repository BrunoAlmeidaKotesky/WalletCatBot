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
        .setDescription(`Exemplo: ${prefix}$ <moeda>\n\nMoedas disponíveis: USD, CAD, EUR, GBP, ARS, BTC, LTC, JPY, CHF, AUD, CNY, ILS, ETH, XRP`)
        .setFooter("Você não informou a moeda corretamente.");


    axios.get('https://economia.awesomeapi.com.br/all')
        .then(response => {

            let highUSD = response.data.USD.high, lowUSD = response.data.USD.low,
                highCAD = response.data.CAD.high, lowCAD = response.data.CAD.low,
                highEUR = response.data.EUR.high, lowEUR = response.data.EUR.low,
                highGBP = response.data.GBP.high, lowGBP = response.data.GBP.low,
                highARS = response.data.ARS.high, lowARS = response.data.ARS.low,
                highBTC = response.data.BTC.high, lowBTC = response.data.BTC.low,
                highLTC = response.data.LTC.high, lowLTC = response.data.LTC.low,
                highJPY = response.data.JPY.high, lowJPY = response.data.JPY.low,
                highCHF = response.data.CHF.high, lowCHF = response.data.CHF.low,
                highAUD = response.data.AUD.high, lowAUD = response.data.AUD.low,
                highCNY = response.data.CNY.high, lowCNY = response.data.CNY.low,
                highILS = response.data.ILS.high, lowILS = response.data.ILS.low,
                highETH = response.data.ETH.high, lowETH = response.data.ETH.low,
                highXRP = response.data.XRP.high, lowXRP = response.data.XRP.low,
                
                atualizadoUSD = response.data.USD.create_date,
                atualizadoCAD = response.data.CAD.create_date,
                atualizadoEUR = response.data.EUR.create_date,
                atualizadoGBP = response.data.GBP.create_date,
                atualizadoARS = response.data.ARS.create_date,
                atualizadoBTC = response.data.BTC.create_date,
                atualizadoLTC = response.data.LTC.create_date,
                atualizadoJPY = response.data.JPY.create_date,
                atualizadoCHF = response.data.CHF.create_date,
                atualizadoAUD = response.data.AUD.create_date,
                atualizadoCNY = response.data.CNY.create_date,
                atualizadoILS = response.data.ILS.create_date,
                atualizadoETH = response.data.ETH.create_date,
                atualizadoXRP = response.data.XRP.create_date

           let [coinType] = args;

            if (!coinType) return message.channel.send(moedaEmbed);

            switch (coinType) {
                case "USD":
                    message.delete();
                    let sEmbed1 = new Discord.RichEmbed()
                        .setColor("#00FFFF")
                        .setFooter(`Última atualização em (${atualizadoUSD}).`)
                        .setDescription(`💰 **A cotação média do Dólar p/real hoje está entre: R$: ${lowUSD} / ${highUSD}**`)
                    message.channel.sendEmbed(sEmbed1);
                    
                    break;
                case "CAD":
                    message.delete();
                    let sEmbed2 = new Discord.RichEmbed()
                        .setColor("#00FFFF")
                        .setFooter(`Última atualização em (${atualizadoCAD}).`)
                        .setDescription(`💰 **A cotação média do Dólar canadanse p/real hoje está entre: R$: ${lowCAD} / ${highCAD}**`)
                    message.channel.sendEmbed(sEmbed2);
                    
                    break;
                case "EUR":
                    message.delete();
                    let sEmbed3 = new Discord.RichEmbed()
                        .setColor("#00FFFF")
                        .setFooter(`Última atualização em (${atualizadoEUR}).`)
                        .setDescription(`💰 **A cotação média do Euro p/real hoje está entre: R$: ${lowEUR} / ${highEUR}**`)
                    message.channel.sendEmbed(sEmbed3);
                    
                    break;
                case "GBP":
                    message.delete();
                    let sEmbed4 = new Discord.RichEmbed()
                        .setColor("#00FFFF")
                        .setFooter(`Última atualização em (${atualizadoGBP}).`)
                        .setDescription(`💰 **A cotação média da Libra Esterlina p/real hoje está entre: R$: ${lowGBP} / ${highGBP}**`)
                    message.channel.sendEmbed(sEmbed4);
                    
                    break;
                case "ARS":
                    message.delete();
                    let sEmbed5 = new Discord.RichEmbed()
                        .setColor("#00FFFF")
                        .setFooter(`Última atualização em (${atualizadoARS}).`)
                        .setDescription(`💰 **A cotação média do Peso Argentino p/real hoje está entre: R$: ${lowARS} / ${highARS}**`)
                    message.channel.sendEmbed(sEmbed5);
                    
                    break;
                case "BTC":
                    message.delete();
                    let sEmbed6 = new Discord.RichEmbed()
                        .setColor("#00FFFF")
                        .setFooter(`Última atualização em (${atualizadoBTC}).`)
                        .setDescription(`💰 **A cotação média do Bitcoin p/real hoje está entre: R$: ${lowBTC} / ${highBTC}**`)
                    message.channel.sendEmbed(sEmbed6);
                    
                    break;
                case "LTC":
                    message.delete();
                    let sEmbed7 = new Discord.RichEmbed()
                        .setColor("#00FFFF")
                        .setFooter(`Última atualização em (${atualizadoLTC}).`)
                        .setDescription(`💰 **A cotação média do Litecoin p/real hoje está entre: R$: ${lowLTC} / ${highLTC}**`)
                    message.channel.sendEmbed(sEmbed7);
                    
                    break;
                case "CHF":
                    message.delete();
                    let sEmbed8 = new Discord.RichEmbed()
                        .setColor("#00FFFF")
                        .setFooter(`Última atualização em (${atualizadoCHF}).`)
                        .setDescription(`💰 **A cotação média do Franco Suiço p/real hoje está entre: R$: ${lowCHF} / ${highCHF}**`)
                    message.channel.sendEmbed(sEmbed8);
                    
                    break;
                case "JPY":
                    message.delete();
                    let sEmbed9 = new Discord.RichEmbed()
                        .setColor("#00FFFF")
                        .setFooter(`Última atualização em (${atualizadoJPY}).`)
                        .setDescription(`💰 **A cotação média do Iene Japonês p/real hoje está entre: R$: ${lowJPY} / ${highJPY}**`)
                    message.channel.sendEmbed(sEmbed9);
                    
                    break;
                case "AUD":
                    message.delete();
                    let sEmbed10 = new Discord.RichEmbed()
                        .setColor("#00FFFF")
                        .setFooter(`Última atualização em (${atualizadoAUD}).`)
                        .setDescription(`💰 **A cotação média do Dólar Australiano p/real hoje está entre: R$: ${lowAUD} / ${highAUD}**`)
                    message.channel.sendEmbed(sEmbed10);
                    
                    break;
                case "CNY":
                    message.delete();
                    let sEmbed11 = new Discord.RichEmbed()
                        .setColor("#00FFFF")
                        .setFooter(`Última atualização em (${atualizadoCNY}).`)
                        .setDescription(`💰 **A cotação média do Yuan Chinês p/real hoje está entre: R$: ${lowCNY} / ${highCNY}**`)
                    message.channel.sendEmbed(sEmbed11);
                    
                    break;
                case "ILS":
                    message.delete();
                    let sEmbed12 = new Discord.RichEmbed()
                        .setColor("#00FFFF")
                        .setFooter(`Última atualização em (${atualizadoILS}).`)
                        .setDescription(`💰 **A cotação média do Novo Shekel Israelense p/real hoje está entre: R$: ${lowILS} / ${highILS}**`)
                    message.channel.sendEmbed(sEmbed12);
                    
                    break;
                case "ETH":
                    message.delete();
                    let sEmbed13 = new Discord.RichEmbed()
                        .setColor("#00FFFF")
                        .setFooter(`Última atualização em (${atualizadoETH}).`)
                        .setDescription(`💰 **A cotação média do Ethereum p/real hoje está entre: R$: ${lowETH} / ${highETH}**`)
                    message.channel.sendEmbed(sEmbed13);
                    
                    break;
                case "XRP":
                    message.delete();
                    let sEmbed14 = new Discord.RichEmbed()
                        .setColor("#00FFFF")
                        .setFooter(`Última atualização em (${atualizadoXRP}).`)
                        .setDescription(`💰 **A cotação média do Ripple p/real hoje está entre: R$: ${lowXRP} / ${highXRP}**`)
                    message.channel.sendEmbed(sEmbed14);
                    
                    break;
                
        
                default: let moedaEmbed2 = new Discord.RichEmbed()
                .setColor("#00FFFF")
                .setDescription(`Exemplo: ${prefix}$ <moeda>\n\nMoedas disponíveis: USD, CAD, EUR, GBP, ARS, BTC, LTC, JPY, CHF, AUD, CNY, ILS, ETH, XRP`)
                .setFooter("Você não informou a moeda corretamente."); 
                message.channel.sendEmbed(moedaEmbed2);
                    break;
            }
        }).catch(error => {
            console.log(error);
        });
}

module.exports.help = {
    name: "$",
    aliases: ["money"],
    accessableby: "Members",
    description: "Mostra a cotação atual do dólar."

}