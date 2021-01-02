import { botCache, cache } from "../../deps.ts";

botCache.eventHandlers.messageCreate = (message) => {
  // console.log(message);

  // if (!message || !message.guild.ready) return;

  /*for (const attachment of message.attachments) {
    const download = await fetch(attachment.url);
    const blob = await download.blob();

    message.channel?.send({ file: { blob, name: attachment.filename } });
  }
  */
};