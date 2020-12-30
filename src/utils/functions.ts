import { cache, botCache } from "../../deps.ts";

export function loadGuild(guild: string) {
  return new Promise((resolve, reject) => {
    try {
      cache.guilds.get(guild);
    } catch (err) {
      reject(err);
    }
  })
}
