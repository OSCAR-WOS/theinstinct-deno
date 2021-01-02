import {
  Activity,
  Application,
  Attachment,
  Channel,
  Embed,
  Guild,
  GuildMember,
  Member,
  MessageContent,
  MessageCreateOptions,
  MessageSticker,
  OldMessage,
  Reaction,
  Reference,
  Role,
  UserPayload,
} from "../../deps.ts";


declare module "../../deps.ts" {
  interface Message {
    id: string;
    channelID: string;
    guildID: string;
    author: UserPayload;
    content: string;
    timestamp: number;
    editedTimestamp?: number;
    tts: boolean;
    mentionsEveryone: boolean;
    mentions: string[];
    mentionRoleIDs: string[];
    mentionChannelIDs: string[];
    attachments: Attachment[];
    embeds: Embed[];
    reactions?: Reaction[];
    nonce?: number | string;
    pinned: boolean;
    webhook_id?: string;
    type: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    activity?: Activity;
    applications?: Application;
    messageReference?: Reference;
    flags?: 1 | 2 | 4 | 8 | 16;
    stickers?: MessageSticker[];
    referencedMessageID?: MessageCreateOptions | null;
    changes: OldMessage[];

    // GETTERS
    channel?: Channel;
    guild?: Guild;
    member?: Member;
    guildMember?: GuildMember;
    link: string;
    mentionedRoles: (Role | undefined)[];
    mentionedChannels: (Channel | undefined)[];
    mentionedMembers: (Member | undefined)[];

    // METHODS
    delete(reason?: string, delayMilliseconds?: number): Promise<unknown>;
    edit(content: string | MessageContent): Promise<Message>;
    pin(): Promise<void>;
    addReaction(reaction: string): Promise<unknown>;
    addReactions(reactions: string[], ordered?: boolean): Promise<void>;
    reply(content: string | MessageContent): Promise<Message>;
    send(content: string | MessageContent): Promise<Message>;
    alert(
      content: string | MessageContent,
      timeout?: number,
      reason?: string,
    ): Promise<void>;
    alertReply(
      content: string | MessageContent,
      timeout?: number,
      reason?: string,
    ): Promise<unknown>;
    removeAllReactions(): Promise<unknown>;
    // deno-lint-ignore no-explicit-any
    removeReactionEmoji(reaction: string): Promise<any>;
    // deno-lint-ignore no-explicit-any
    removeReaction(reaction: string): Promise<any>;
  }
}