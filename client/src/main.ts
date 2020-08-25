import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";
//import { RoomKey, provideRoom } from "@/composable/room";

Amplify.configure(awsconfig);

const app = createApp(App).use(router);

// app.provide(RoomKey, await provideRoom());

app.mount("#app");
