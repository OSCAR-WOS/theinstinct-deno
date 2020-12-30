import { botCache } from "../../deps.ts";

botCache.eventHandlers.messageCreate = async (message) => {
  for (const attachment of message.attachments) {
    const download = await fetch(attachment.url);
    const blob = await download.blob();

    message.channel?.send({file: {blob, name: attachment.filename}});
  }
}