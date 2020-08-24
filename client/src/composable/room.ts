import { InjectionKey, reactive } from "vue";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { listRooms } from "@/graphql/queries";
import { Room } from "@/types/Chat";

type RoomCompositionType = {
  roomList: Room[];
};

export const RoomKey: InjectionKey<RoomCompositionType> = Symbol("RoomKey");

// asyncな関数はprovide/injectと一緒に使えない...
export async function useRoom() {
  const res = (await API.graphql(
    graphqlOperation(listRooms, { limit: 1000 })
  )) as GraphQLResult<{ listRooms: { items: Room[] } }>;
  console.log(res);

  const initRooms = res.data?.listRooms.items || [];

  const roomList = reactive(initRooms);

  return { roomList };
}
