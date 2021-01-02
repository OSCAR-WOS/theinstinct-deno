export enum LogSetting {
  SIMPLE = "simple",
  DETAILED = "detailed",
}

export enum LogType {
  MESSAGE_UPDATE = "message_create",
  MESSAGE_DELETE = "message_delete",
  MESSAGE_BULK_DELETE = "message_bulk_delete",
  JOIN = "join",
  LEAVE = "leave",
  KICK = "kick",
  BAN = "ban",
  UNBAN = "unban",
  USERNAME_UPDATE = "username_update",
  NICKNAME_UPDATE = "nickname_update",
}

export enum Webhook {
  FILES = "Files",
  LOGS = "Logs",
  BLOGS = "Bot Logs",
}
