import { Discord, On, Client } from "@typeit/discord";
import * as DS from "discord.js";
import { token } from "./token.json";
import "reflect-metadata";
import { IBotCommand,IConstructorCommand } from './typings/interfaces';
import * as fs from 'fs';

let commands: IConstructorCommand[] = [];

@Discord
export class AppDiscord {

  private static _client: Client;
  private _prefix: string = "+";


  static async initialLoad(){
    await this.start();
    await this.loadCommands();
  }
  static  loadCommands() {
     fs.readdir("src/commands/", (err, files) => {
      let file = files.filter(f => f.split(".").pop() === "ts")
      if (file.length <= 0) {
        console.log("Couldn't findv commands in markdown.");
        return;
      }

      file.forEach((f) =>{
        let props:IConstructorCommand = require(`./commands/${f}`).default;
        commands.push(props);    
      });
    });

      /*for (const cmdName of cmds) {
      const commandsClass = require(`${commandPath}/${cmdName}`).default;
      console.log(commandsClass);
      const command = new commandsClass() as IBotCommand;
      commands.push(command);
    }*/
  }

  static start() {
    this._client = new Client();
    // In the login method, you must specify the glob string to load your classes (for the framework).
    // In this case that's not necessary because the entry point of your application is this file.
    this._client.login(token, this.loadCommands);  // glob string to load the classes
  }

  // When the "message" event is triggered, this method is called with a specific payload (related to the event)
  @On("message")
  async handleCommand(msg: DS.Message) {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(this._prefix))
      throw new Error('Erro: ');


    let command = msg.content.split(' ')[0].replace(this._prefix, '');
    let args = msg.content.split(' ').slice(1);
    for (const commandClass of commands) {
      // Attempts to execute code but will be ready to catch errors
      try {
        // Check if our command class is correct
        console.log(typeof commandClass)
        let cmd = new commandClass(command);
        if (!cmd.isCommand(command)) continue;
        // Pauses execution whilst we run the commands code
        await cmd.runCommand(args, msg, AppDiscord._client);
      }
      catch (Error) {
        console.log(Error);
      }
    }
  }

  @On("ready")
  async onReady() {
    //console.log(`Bot pronto! ${AppDiscord._client.user.username}`);
    try {
      let link = await AppDiscord._client.generateInvite(["ADMINISTRATOR"]);
      console.log(`Convite: ${link}`)
    }
    catch (e) { console.log(e.stack) };

    /*antispam(AppDiscord._client, {
     warnBuffer: 7, // Maximum ammount of messages allowed to send in the interval time before getting warned.
     maxBuffer: 9, // Maximum amount of messages allowed to send in the interval time before getting banned.
     interval: 2500, // Amount of time in ms users can send the maxim amount of messages(maxBuffer) before getting banned. 
     warningMessage: "Para de Spammar!", // Message users receive when warned. (message starts with '@User, ' so you only need to input continue of it.) 
     banMessage: "Foi banido por spammar!", // Message sent in chat when user is banned. (message starts with '@User, ' so you only need to input continue of it.) 
     maxDuplicatesWarning: 7,// Maximum amount of duplicate messages a user can send in a timespan before getting warned.
     maxDuplicatesBan: 10, // Maximum amount of duplicate messages a user can send in a timespan before getting banned.
     deleteMessagesAfterBanForPastDays: 1, // Deletes the message history of the banned user in x days.
     exemptRoles: ["Moderator"], // Name of roles (case sensitive) that are exempt from spam filter.
     exemptUsers: [] // The Discord tags of the users (e.g: MrAugu#9016) (case sensitive) that are exempt from spam filter.
   });*/
  }
}

// Start your app
AppDiscord.initialLoad();

