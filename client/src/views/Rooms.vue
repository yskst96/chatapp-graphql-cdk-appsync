<template>
  <div>ROOMS</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { API, graphqlOperation } from "aws-amplify";
import { listRooms } from "@/graphql/queries";

export default defineComponent({
  name: "Rooms",
  components: {},
  async setup() {
    try {
      const rooms = await API.graphql(graphqlOperation(listRooms));
      console.log(rooms);
    } catch (e) {
      console.log("e", e);
    }
  }
});
</script>
