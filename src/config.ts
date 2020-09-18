export type BotConfig = {
    token: string;
    prefix: string;
    enableReactions: boolean;
  }
  
  export let config: BotConfig = {
    token: process.env.TOKEN,
    prefix: "+",
    enableReactions: true
  }