import { botCache, cache } from "../../deps.ts";
import { loadGuild } from "../utils/functions.ts";

botCache.eventHandlers.ready = async function() {
  for (const guild of cache.guilds.values()) {
    try {
      console.log(guild.name);
      console.log(await loadGuild(guild));
    } catch (e) {
      console.error(e);
    }
  }

  console.log(
    `Ready to serve in ${cache.channels.size} channels on ${cache.guilds.size} guilds, for a total of ${cache.members.size} users`,
  );
};
