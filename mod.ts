import "https://deno.land/x/dotenv@v2.0.0/load.ts";

import { importDirectory } from "./src/utils/helpers.ts";
import { botCache, startBot, Intents } from "./deps.ts";

await Promise.all(
  [
    "./src/events",
    "./src/controllers",
  ].map((path) => importDirectory(Deno.realPathSync(path)))
);

try {
  await startBot({
    token: Deno.env.get("TOKEN")!,
    intents: [Intents.GUILDS, Intents.GUILD_MESSAGES],
    eventHandlers: botCache.eventHandlers,
  });
} catch (e) {
  console.log(e);
  Deno.exit();
}
