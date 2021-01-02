import { Database, MongoClient } from "https://deno.land/x/mongo@v0.13.0/mod.ts";
import { Guild } from "../../deps.ts";
import { BaseSchema, GuildSchema } from "../types/guild.ts";
import { LogSetting, LogType } from "../utils/constants/log.ts";

const client = new MongoClient();
let db: Database;

export function sqlConnect() {
  client.connectWithUri(Deno.env.get("DATABASE")!);
  return db = client.database("instinct");
}

export function sqlLoadGuild(guild: Guild) {
  const guilds = db.collection<GuildSchema>("guilds");

  return new Promise((resolve, reject) => {
    guilds.findOne({ id: guild.id })
      .then((result) => {
        if (result) return resolve(result);

        insertGuild(guild)
          .then((result) => resolve(<GuildSchema> result))
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });
}

function insertGuild(guild: Guild) {
  const guilds = db.collection<GuildSchema>("guilds");

  const schema: GuildSchema = {
    id: guild.id,
    logs: {
      enabled: false,
      setting: LogSetting.SIMPLE,
      detailed: Object.values(LogType).reduce((types: Record<string, BaseSchema>, type) => {
        const schema: BaseSchema = {
          enabled: true,
        };

        types[type] = schema;
        return types;
      }, {}),
    },
  };

  return new Promise((resolve, reject) => {
    guilds.insertOne(schema)
      .then((result) => {
        schema._id = { $oid: result.$oid };
        resolve(schema);
      })
      .catch((error) => reject(error));
  });
}
