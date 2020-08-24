<template>
  <div>
    <div class="room-title">{{ `Chat Room(${roomId})` }}</div>
    <div class="chat-container">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div>
          <span>{{ message.owner }}：</span>{{ message.content }}
        </div>
      </div>
    </div>
    <div class="message-container">
      <textarea cols="50" rows="10" v-model="currentMessage"></textarea>
      <div class="send-button-panel">
        <button class="send-button" @click="sendMessage">SEND</button>
      </div>
    </div>
    <div class="button-panel">
      <button class="signout-button" @click="signOut">SIGN OUT</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted } from "vue";
import { API, Auth } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";

import { useRoute, useRouter } from "vue-router";
import { ListMessagesForRoom } from "@/graphql/queries";
import { onCreateMessageByRoomId } from "@/graphql/subscriptions";
import { createMessage } from "@/graphql/mutations";
import { Observable, ZenObservable } from "zen-observable-ts";
import { Message } from "@/types/Chat";

export default defineComponent({
  name: "Chat",
  components: {},
  async setup() {
    // useRouterとかは非同期処理(await)の前に呼び出す必要がある。内部でinjectを使ってるかららしい
    // https://github.com/vuejs/vue-router-next/issues/257
    const route = useRoute();
    const router = useRouter();

    const roomId = route.params.id;

    // eslint-disable-next-line prefer-const
    let subscription: ZenObservable.Subscription;

    onUnmounted(() => {
      if (subscription && subscription.unsubscribe) subscription.unsubscribe();
    });

    // query messageの一覧を取得
    const messageData = (await API.graphql({
      query: ListMessagesForRoom,
      variables: {
        roomId,
        sortDirection: "ASC"
      }
    })) as GraphQLResult<{ listMessagesForRoom: { items: Message[] } }>;
    const initMessages = messageData.data?.listMessagesForRoom.items;

    const messages = ref(initMessages);

    // messageの更新をsubscribe
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
        messages.value?.push(subData.value.data.onCreateMessageByRoomId);
      }
    });

    const currentMessage = ref("");

    //create message mutation
    const sendMessage = async () => {
      if (!currentMessage.value) return;

      //他のinput項目はresolver側で埋めている
      const input = { content: currentMessage.value, roomId };

      await API.graphql({
        query: createMessage,
        variables: {
          input
        }
      });

      currentMessage.value = "";
    };

    const signOut = async () => {
      await Auth.signOut();
      router.push("/");
    };

    return { roomId, messages, currentMessage, sendMessage, signOut };
  }
});
</script>
<style scoped>
.room-title {
  font-weight: bold;
}

.chat-container {
  background-color: #f0f0f0;
}
.message-container {
  margin-top: 20px;
}
.send-button-panel {
  width: 20vw;
}

.send-button-panel .send-button {
  background: #42b983;
  border: none;
  color: #fff;
  cursor: pointer;
  height: 50px;
  font-size: 1.2em;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
  transition: background 0.3s ease-in-out;
  width: 100%;
}

.send-button:hover {
  background: #27d888;
}

.button-panel {
  margin: 2em 0 0;
  width: 20vw;
}

.button-panel .signout-button {
  background: #a0a1a1;
  border: none;
  color: #fff;
  cursor: pointer;
  height: 50px;
  font-size: 1.2em;
  letter-spacing: 0.05em;
  text-align: center;
  text-transform: uppercase;
  transition: background 0.3s ease-in-out;
  width: 100%;
}

.signout-button:hover {
  background: #878888;
}
</style>
