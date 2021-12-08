<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import io from 'socket.io-client';
import MessageCard from '@/components/MessageCard.vue';

const router = useRouter();
const serverAddress = router.currentRoute.value.query.server;

const sendPageUrl = location.href.replace('/board', '');

// Populate messages with data from the database
const messages = ref([]);
fetch(`//${serverAddress}:1234/api/v1/messages`)
  .then((res) => res.json())
  .then((data) => {
    messages.value = data;
  });

// Web socket stuff
const socket = io(`//${serverAddress}:1234`);
socket.on('connect', (socket) => {
  console.log('Connected to server');
});
socket.on('message', (message) => {
  messages.value.unshift(message);
});
</script>

<template>
  <div class="page">
    <header class="header">
      <div class="header__left">
        <h1>TE4 Bulletin Board</h1>
      </div>
      <div class="header__right">
        <p class="header__instruction">Add stuff to this board</p>
        <vue-qrcode
          :value="sendPageUrl"
          :options="{
            scale: 3,
            margin: 0,
            color: {
              dark: '#ffffff',
              light: '#240b9a',
            },
          }"
          class="header__qrcode"
        ></vue-qrcode>
      </div>
    </header>
    <ul class="messages">
      <li v-for="message in messages" :key="message.id">
        <MessageCard :message="message" />
      </li>
    </ul>
  </div>
</template>

<style>
.header {
  display: flex;
  justify-content: space-between;
  background: #240b9a;
  color: white;
  padding: 2rem;
}

.header__left {
  display: flex;
  align-items: center;
}

.header__right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header__instruction {
  font-size: 1.5rem;
}

.messages {
  font-size: 2rem;
  word-break: break-word;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2rem;
  margin: 2rem;
}
</style>
