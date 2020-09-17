import { token } from "./tokens.json";
export type BotConfig = {
    token: string;
    prefix: string;
    enableReactions: boolean;
  }
  
  export let config: BotConfig = {
    token: token,
    prefix: "+",
    enableReactions: true
  }