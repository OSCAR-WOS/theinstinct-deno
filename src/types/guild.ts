import { LogSetting, LogType } from "../utils/constants/log.ts";

interface WebhookSchema {
  id: string;
  token: string;
}

export interface BaseSchema {
  channel?: string;
  webhook?: WebhookSchema;
  enabled: boolean;
}

interface LogSchema extends BaseSchema {
  setting: LogSetting;
  detailed: Record<LogType, BaseSchema>;
}

export interface GuildSchema {
  _id?: { $oid: string };
  id: string;
  logs: LogSchema;
  files?: BaseSchema;
  cases?: BaseSchema;
  blogs?: BaseSchema;
}
