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
    <ul class="messages">
      <li v-for="message in messages" :key="message.id">
        <MessageCard :body="message.body" :type="message.type" />
      </li>
    </ul>
  </div>
</template>

<style>
.messages {
  font-size: 2rem;
  word-break: break-word;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
  gap: 2rem;
  margin: 2rem;
}
</style>
