import * as Discord from 'discord.js';
import { Message } from 'discord.js';
import { IBotCommand } from 'typings/interfaces';

export default abstract class BaseClass implements IBotCommand{
    constructor (public command: string){}
    public help(msg: string) {return msg};
    public isCommand=(cmd: string):boolean => cmd === this.command;
    abstract runCommand(args: string[], message: Message, client: Discord.Client): void;
}
