import { MessageAttachment } from 'discord.js';

export type ActionTypes = 'ADD' | 'REMOVE' | 'LIST';
export type PossibileFileTypes = MessageAttachment | string | null;