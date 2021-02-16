import {GuildMember, TextChannel, DMChannel,GroupDMChannel, Message, User} from 'discord.js';

type Channels = TextChannel | DMChannel | GroupDMChannel;

export default class DiscordHelper {

    public static verifyUserPerm(guildMember: GuildMember): boolean {
        return (guildMember.hasPermission('MANAGE_MESSAGES') || guildMember.hasPermission('ADMINISTRATOR'));
    }

    public static async getUserMessage(botMessage: string, channel: Channels, user: User) {
        const botMsg = await channel.send(botMessage);
        const filter = (message: Message) => message.author.id === user.id;
        const userResponses = await botMsg.channel.awaitMessages(filter, { max: 1 });
        const userResponse = userResponses?.first()?.content;
        return userResponse;
    }
}