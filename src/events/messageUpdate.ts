import { botCache } from "../../deps.ts";

botCache.eventHandlers.messageUpdate = (message, oldMessage) => {
  if (!message.changes) message.changes = [];
  message.changes.push(oldMessage);

  console.log(message.changes);
}