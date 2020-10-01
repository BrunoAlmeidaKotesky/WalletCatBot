import { createCanvas, Image, loadImage, Canvas } from 'canvas';
import { Attachment } from 'discord.js';
import { CommandContext } from '../CommandsCtx';
import { ICommand } from '../typings/interfaces';

let canvas = createCanvas(600, 600);
let ctx = canvas.getContext('2d');

export class MemeGenerator implements ICommand {
    public commandNames = ["meme"];

    async run({ args, message, command }: CommandContext): Promise<void> {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) message.channel.send("Você não tem permissão para gerenciar mensagens.");
        try {
            if (message.attachments) {
                const attachment = message.attachments.array()[0];
                if (!attachment.filename.endsWith('.png') && !attachment.filename.endsWith('.jpg')) message.channel.send("Seu arquivo deve estar em png ou jpg");

                let bottomTextIdx = args.findIndex(t => t.startsWith('-bot')) + 1;
                let bottomText = args[bottomTextIdx];
                let topTextIdx = args.findIndex(t => t.startsWith('-top')) + 1;
                let topText = args[topTextIdx];
                let fontSizeIdx = args.findIndex(t => t.startsWith('-size'));
                let fontSize = fontSizeIdx >= 0 ? args[fontSizeIdx]+1: undefined;
                let fontTypeIdx = args.findIndex(t => t.startsWith('-font'));
                let fontType = fontTypeIdx >= 0 ? args[fontTypeIdx] + 1: undefined;

                const canvas = createCanvas(600, 600);
                const ctx = canvas.getContext('2d');
                const background = await loadImage(attachment.url);
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

                if (topText) {
                    let fSize = fontSize ?? '68px';
                    let fType = fontType ?? 'Impact';
                    ctx.font = fSize + fType;
                    ctx.fillStyle = 'white';
                    ctx.strokeStyle = 'black';
                    ctx.textBaseline = "top";
                    ctx.strokeText(topText, 180, 10);
                    ctx.fillText(topText, 180, 10);
                    ctx.measureText
                }
                if (bottomText) {
                    let fSize = fontSize ?? '68px';
                    let fType = fontType ?? 'Impact';
                    console.log(fSize, fType);
                    ctx.font = fSize + fType;
                    ctx.fillStyle = 'white';
                    ctx.strokeStyle = 'black';
                    ctx.textBaseline = 'bottom';
                    ctx.strokeText(bottomText, 180, 550);
                    ctx.fillText(bottomText, 180, 550);
                }

                const newAttatch = new Attachment(canvas.toBuffer(), attachment.filename);
                message.channel.send(newAttatch);

            }
            else {
                message.channel.send("Você deve enviar um arquivo em png ou jpg");
            }

        }
        catch (e) { console.error(e); }

    }

    private wrapText(context: typeof ctx, text: string, x: number, y:number, maxWidth: number, lineHeight: number, fontSize?: string, fontType?: string) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.strokeText(line, x, y);
        context.fillText(line, x, y);
        context.font = `${fontSize} ${fontType}` ?? '28pt Impact';
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.lineJoin = 'round';
    }
      

    getHelpMessage = (commandPrefix: string) => `Modo de uso: ${commandPrefix}meme\n Arquivo em .jpg ou .png e mensagem`;


    hasPermissionToRun = (parsedUserCommand: CommandContext) => true;

}
