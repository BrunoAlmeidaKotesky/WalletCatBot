const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let target = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!target) return message.channel.send("Por favor informe qual usuário.");
    let reason = args.slice(1).join(" ");
    
    if (!reason) return message.channel.send(`Por favor informe qual o motivo de estar reportando **${target.user.username}**.`).then(m => m.delete(70000));

    let reportChannel = "reports";
    let PChannel = message.guild.channels.find(x => x.name === reportChannel);
    if (!PChannel) return message.channel.send(`O canal de reports não foi criado ainda, criaremos um agora.`).then(m => m.delete(12000)).then(
        message.guild.createChannel("reports").then(channel => {
            channel.setTopic("Canal gerado por Wallet Cat")
        }).then(m => {
            m.overwritePermissions(message.guild.id, {
                VIEW_CHANNEL: false
            })

            m.overwritePermissions(message.author.id, {
                VIEW_CHANNEL: true
            })
            

        }));

    else {
        message.channel.send("Seu report foi enviado ao staff, obrigado.").then(m => m.delete(12000))
        PChannel.send(`**${message.author.tag}** reportou: **${target.user.tag}** Motivo: **${reason}**.`).then(async msg => {
            await msg.react("❌");
            await msg.react("✅");

        });
    }
}

module.exports.help = {
    name: "report",
    aliases: ["warn", "x9"],
    description: "Reporta um usuário para ser avaliado pel staff do servidor.",
    accessableby: "Membros",
}