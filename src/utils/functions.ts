import { Guild } from "../../deps.ts";
import { GuildSchema } from "../types/guild.ts";
import { sqlLoadGuild } from "../utils/sql.ts";

export function loadGuild(guild: Guild) {
  return new Promise((resolve, reject) => {
    sqlLoadGuild(guild)
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
}
