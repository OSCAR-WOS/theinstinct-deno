import {
  addReaction,
  addReactions,
  cache,
  createNewProp,
  deleteMessageByID,
  editMessage,
  Message,
  MessageContent,
  MessageCreateOptions,
  pin,
  removeAllReactions,
  removeReaction,
  removeReactionEmoji,
  sendMessage,
  structures,
} from "../../deps.ts";

const baseMessage: Partial<Message> = {
  get channel() {
    return cache.channels.get(this.channelID!);
  },
  get guild() {
    if (!this.guildID) return undefined;
    return cache.guilds.get(this.guildID);
  },
  get member() {
    if (!this.author?.id) return undefined;
    return cache.members.get(this.author?.id);
  },
  get guildMember() {
    if (!this.guildID) return undefined;
    return this.member?.guilds.get(this.guildID);
  },
  get link() {
    return `https://discord.com/channels/${this.guildID
      || "@me"}/${this.channelID}/${this.id}`;
  },
  get mentionedRoles() {
    // TODO: add getters for Guild structure, that will fix this error
    return this.mentionRoleIDs?.map((id) => this.guild?.roles.get(id)) || [];
  },
  get mentionedChannels() {
    return this.mentionChannelIDs?.map((id) => cache.channels.get(id)) || [];
  },
  get mentionedMembers() {
    return this.mentions?.map((id) => cache.members.get(id)) || [];
  },

  // METHODS
  delete(reason: string, delayMilliseconds: number) {
    return deleteMessageByID(
      this.channelID!,
      this.id!,
      reason,
      delayMilliseconds,
    );
  },
  edit(content: string | MessageContent) {
    return editMessage(this as Message, content);
  },
  pin() {
    return pin(this.channelID!, this.id!);
  },
  addReaction(reaction: string) {
    return addReaction(this.channelID!, this.id!, reaction);
  },
  addReactions(reactions: string[], ordered: boolean) {
    return addReactions(this.channelID!, this.id!, reactions, ordered);
  },
  reply(content: string | MessageContent) {
    const contentWithMention = typeof content === "string"
      ? { content, mentions: { repliedUser: true }, replyMessageID: this.id }
      : {
        ...content,
        mentions: { ...(content.mentions || {}), repliedUser: true },
        replyMessageID: this.id,
      };

    return sendMessage(this.channelID!, contentWithMention);
  },
  send(content: string | MessageContent) {
    return sendMessage(this.channelID!, content);
  },
  alert(content: string | MessageContent, timeout = 10, reason = "") {
    return sendMessage(this.channelID!, content).then((response) => {
      response.delete(reason, timeout * 1000).catch(console.error);
    });
  },
  alertReply(content: string | MessageContent, timeout = 10, reason = "") {
    return this.reply!(content).then((response) => response.delete(reason, timeout * 1000).catch(console.error));
  },
  removeAllReactions() {
    return removeAllReactions(this.channelID!, this.id!);
  },
  removeReactionEmoji(reaction: string) {
    return removeReactionEmoji(this.channelID!, this.id!, reaction);
  },
  removeReaction(reaction: string) {
    return removeReaction(this.channelID!, this.id!, reaction);
  },
};

export function createMessage(data: MessageCreateOptions) {
  const {
    guild_id: guildID,
    channel_id: channelID,
    mentions_everyone: mentionsEveryone,
    mention_channels: mentionChannelIDs,
    mention_roles: mentionRoleIDs,
    webhook_id: webhookID,
    message_reference: messageReference,
    edited_timestamp: editedTimestamp,
    referenced_message: referencedMessageID,
    member,
    ...rest
  } = data;

  const restProps: Record<string, ReturnType<typeof createNewProp>> = {};
  for (const key of Object.keys(rest)) {
    // deno-lint-ignore no-explicit-any
    restProps[key] = createNewProp((rest as any)[key]);
  }

  const message = Object.create(baseMessage, {
    ...restProps,
    referencedMessageID: createNewProp(referencedMessageID),
    channelID: createNewProp(channelID),
    guildID: createNewProp(guildID || ""),
    mentions: createNewProp(data.mentions.map((m) => m.id)),
    mentionsEveryone: createNewProp(mentionsEveryone),
    mentionRoleIDs: createNewProp(mentionRoleIDs),
    mentionChannelIDs: createNewProp(mentionChannelIDs?.map((m) => m.id) || []),
    webhookID: createNewProp(webhookID),
    messageReference: createNewProp(messageReference),
    timestamp: createNewProp(Date.parse(data.timestamp)),
    editedTimestamp: createNewProp(
      editedTimestamp ? Date.parse(editedTimestamp) : undefined,
    ),
  });

  return message;
}

structures.createMessage = createMessage;