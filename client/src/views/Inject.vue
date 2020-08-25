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
import { defineComponent, ref, onMounted, Ref } from "vue";
import { useRoom } from "../composable/room";
import { Room } from "../types/Chat";

export default defineComponent({
  name: "Inject",
  components: {},
  setup() {
    const rooms: Ref<Room[]> = ref([]);

    onMounted(() => {
      console.log("inject mounted");
      rooms.value = useRoom().roomList;
    });

    return { rooms };
  }
});
</script>
