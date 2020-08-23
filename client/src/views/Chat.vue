<template>
  <div>
    <div class="room-title">{{ `Chat Room(${roomId})` }}</div>
    <div>{{ messages }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";

import { useRouter, useRoute } from "vue-router";
import { ListMessagesForRoom } from "@/graphql/queries";
import { Message } from "@/types/Chat";

export default defineComponent({
  name: "Chat",
  components: {},
  async setup() {
    const route = useRoute();
    const roomId = route.params.id;

    const messageData = (await API.graphql({
      query: ListMessagesForRoom,
      variables: {
        roomId,
        sortDirection: "ASC"
      }
    })) as GraphQLResult<{ listMessagesForRoom: { items: Message[] } }>;
    const initMessages = messageData.data?.listMessagesForRoom.items;

    const messages = ref(initMessages);

    return { roomId, messages };
  }
});
</script>
<style scoped>
.room-title {
  font-weight: bold;
}
</style>
