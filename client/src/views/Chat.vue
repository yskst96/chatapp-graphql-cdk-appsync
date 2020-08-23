<template>
  <div>
    <div class="room-title">{{ `Chat Room(${roomId})` }}</div>
    <div>{{ messages }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from "vue";
import { API } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";

import { useRoute } from "vue-router";
import { ListMessagesForRoom } from "@/graphql/queries";
import { onCreateMessageByRoomId } from "@/graphql/subscriptions";
import { Observable, ZenObservable } from "zen-observable-ts";
import { Message } from "@/types/Chat";

export default defineComponent({
  name: "Chat",
  components: {},
  async setup() {
    const route = useRoute();
    const roomId = route.params.id;

    // eslint-disable-next-line prefer-const
    let subscription: ZenObservable.Subscription;

    onUnmounted(() => {
      if (subscription && subscription.unsubscribe) subscription.unsubscribe();
    });

    const messageData = (await API.graphql({
      query: ListMessagesForRoom,
      variables: {
        roomId,
        sortDirection: "ASC"
      }
    })) as GraphQLResult<{ listMessagesForRoom: { items: Message[] } }>;
    const initMessages = messageData.data?.listMessagesForRoom.items;

    const messages = ref(initMessages);

    const observable = (await API.graphql({
      query: onCreateMessageByRoomId,
      variables: {
        roomId: roomId
      }
    })) as Observable<{
      value: { data: { onCreateMessageByRoomId: Message } };
    }>;

    subscription = observable.subscribe({
      next: subData => {
        console.log("sub", subData.value.data.onCreateMessageByRoomId.content);
        messages.value?.push(subData.value.data.onCreateMessageByRoomId);
      }
    });
    console.log(observable);

    return { roomId, messages };
  }
});
</script>
<style scoped>
.room-title {
  font-weight: bold;
}
</style>
