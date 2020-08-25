import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import SignIn from "../views/SignIn.vue";
import Rooms from "../views/Rooms.vue";
import Chat from "@/views/Chat.vue";
import Inject from "@/views/Inject.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "SignIn",
    component: SignIn
  },
  {
    path: "/rooms",
    name: "Rooms",
    component: Rooms
  },
  {
    path: "/chat/:id",
    name: "Chat",
    component: Chat
  },
  {
    path: "/inject",
    name: "Inject",
    component: Inject
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
