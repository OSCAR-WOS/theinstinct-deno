import { Collection } from "./deps.ts";
import { CustomEvents } from "./src/types/events.ts";
import { GuildSchema } from "./src/types/guild.ts";

export const botCache = {
  eventHandlers: {} as CustomEvents,
  guilds: new Collection<string, GuildSchema>(),
};
