<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import io from 'socket.io-client';
import MessageCard from '@/components/MessageCard.vue';

const router = useRouter();
console.log(router.currentRoute.value.query.server);
const serverAddress = router.currentRoute.value.query.server;

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
  messages.value.push(message);
});
</script>

<template>
  <div class="page">
    <h1>Board</h1>
    <div class="messages">
      <ul>
        <li v-for="message in messages" :key="message.id">
          <MessageCard :body="message.body" :type="message.type" />
        </li>
      </ul>
    </div>
  </div>
</template>

<style></style>
