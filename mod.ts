import "https://deno.land/x/dotenv@v2.0.0/load.ts";
import { botCache, startBot, Intents } from "./deps.ts";
import { importDirectory } from "./src/utils/helpers.ts";

await Promise.all(
  [
    "./src/events",
  ].map((path) => importDirectory(Deno.realPathSync(path)))
);

startBot({
  token: Deno.env.get("TOKEN")!,
  intents: [Intents.GUILDS, Intents.GUILD_MESSAGES],
  eventHandlers: botCache.eventHandlers,
});
