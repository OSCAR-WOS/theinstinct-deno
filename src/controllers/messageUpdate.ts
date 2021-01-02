import {
  controllers,
  eventHandlers,
  cacheHandlers,
  MessageCreateOptions
} from "../../deps.ts";

controllers.MESSAGE_UPDATE = function(data) {
  return new Promise((resolve, reject) => {
    if (data.t !== "MESSAGE_UPDATE") return reject();

    const payload = data.d as MessageCreateOptions;

    cacheHandlers.get("channels", payload.channel_id)
    .then((channel) => {
      if (!channel) return resolve();

      cacheHandlers.get("messages", payload.id)
      .then((cachedMessage) => {
        if (!cachedMessage) return;
        cachedMessage.content = payload.content;

        const oldMessage = {
          attachments: cachedMessage.attachments,
          content: cachedMessage.content,
          embeds: cachedMessage.embeds,
          editedTimestamp: cachedMessage.editedTimestamp,
          tts: cachedMessage.tts,
          pinned: cachedMessage.pinned,
        };

        if (!payload.edited_timestamp) return resolve();
        eventHandlers.messageUpdate?.(cachedMessage, oldMessage);
        resolve();
      })
      .catch((error) => reject(error));
    })
    .catch((error) => reject(error));
  })
}