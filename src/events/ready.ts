import { cache, botCache } from "../../deps.ts";

botCache.eventHandlers.ready = function () {
  for (const guild of cache.guilds.values()) {
    // test
  }

  console.log("ready");
}