<template>
  <div id="app">
    <suspense>
      <template #default>
        <div id="nav"></div>
        <router-view />
      </template>
      <template #fallback>loading...</template>
    </suspense>
  </div>
</template>
<script>
import { defineComponent, provide, onMounted } from "vue";
import { RoomKey, provideRoom } from "./composable/room";

export default defineComponent({
  name: "Rooms",
  components: {},
  setup() {
    //provide(RoomKey, await provideRoom());
    // onMounted(async () => {
    //   console.log("app mounted");
    //   provide(RoomKey, await provideRoom());
    // });
  }
});
</script>

<style>
body {
  font-family: "Open Sans", sans-serif;
}
</style>
