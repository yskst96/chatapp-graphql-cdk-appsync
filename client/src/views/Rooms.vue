<template>
  <div>
    <div>ROOMS</div>
    <div>
      <!-- veturがasync setupに対応していないためエラーになる -->
      <div v-for="(room, index) in rooms" :key="index">
        <router-link :to="`/chat/${room.id}`">{{ room.name }}</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { listRooms } from "@/graphql/queries";
import { Room } from "@/types/Chat";

export default defineComponent({
  name: "Rooms",
  components: {},
  async setup() {
    const res = (await API.graphql(
      graphqlOperation(listRooms, { limit: 1000 })
    )) as GraphQLResult<{ listRooms: { items: Room[] } }>;

    console.log(res);

    const initRooms = res.data?.listRooms.items || [];

    const rooms = ref(initRooms);

    return {
      rooms
    };
  }
});
</script>
