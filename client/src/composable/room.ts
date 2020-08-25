import { InjectionKey, reactive, inject } from "vue";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { listRooms } from "@/graphql/queries";
import { Room } from "@/types/Chat";

type RoomCompositionType = {
  roomList: Room[];
};

export const RoomKey: InjectionKey<RoomCompositionType> = Symbol("RoomKey");

// asyncな関数はprovide/injectと一緒に使えない...
export function useRoom() {
  const store = inject(RoomKey);
  if (!store) {
    throw new Error(`room is not provided`);
  }
  console.log("use room");

  return store;
}

export async function provideRoom() {
  const res = (await API.graphql(
    graphqlOperation(listRooms, { limit: 1000 })
  )) as GraphQLResult<{ listRooms: { items: Room[] } }>;
  console.log(res);

  const initRooms = res.data?.listRooms.items || [];

  const roomList = reactive(initRooms);
  console.log("provided");

  return { roomList };
}
