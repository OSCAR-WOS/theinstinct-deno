import "https://deno.land/x/dotenv@v2.0.0/load.ts";

import { botCache, Intents, startBot } from "./deps.ts";
import { importDirectory } from "./src/utils/helpers.ts";
import { sqlConnect } from "./src/utils/sql.ts";

await Promise.all(
  [
    "./src/events",
    "./src/structures",
    "./src/controllers",
  ].map((path) => importDirectory(Deno.realPathSync(path))),
);

sqlConnect();

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