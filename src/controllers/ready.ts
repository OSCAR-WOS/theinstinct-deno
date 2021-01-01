import { cache, controllers, eventHandlers, structures, ReadyPayload, initialMemberLoadQueue, setBotID, delay, allowNextShard } from "../../deps.ts";

controllers.READY = async function (data, id) {
  if (data.t !== "READY") return;

  const payload = data.d as ReadyPayload;
  setBotID(payload.user.id);
  eventHandlers.shardReady?.(id);

  if (payload.shard && id === payload.shard[1] - 1) {
    cache.isReady = true;
    eventHandlers.ready?.();

    for (const [guildID, members] of initialMemberLoadQueue.entries()) {
      await Promise.all(
        members.map((member) => structures.createMember(member, guildID)),
      );
    }
  }

  await delay(5000);
  allowNextShard();
}