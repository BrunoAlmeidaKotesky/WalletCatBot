import { MessageAttachment } from 'discord.js';

export type ActionTypes = 'ADD' | 'REMOVE';
export type PossibileFileTypes = MessageAttachment | string | null;