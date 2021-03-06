<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import io from 'socket.io-client';
import MessageCard from '@/components/MessageCard.vue';

const serverAddress = import.meta.env.VITE_API_URL || 'http://localhost:1234';
const sendPageUrl = location.href.replace('/board', '');

const route = useRoute();
const boardId = route.params.boardId;

const messages = ref([]);
const pinnedMessages = computed(() => {
  return messages.value.filter((message) => message.pinned);
});

const thresholdDate = ref(null);
updateThresholdDate();
setInterval(() => {
  updateThresholdDate();
}, 1000);
const recentNonPinnedMessages = computed(() =>
  messages.value.filter((message) => {
    const messageCreationDate = new Date(message.createdAt);
    return !message.pinned && messageCreationDate > thresholdDate.value;
  })
);

const allSortedMessages = computed(() => [
  ...pinnedMessages.value,
  ...recentNonPinnedMessages.value,
]);

const board = ref({});
(async function fetchBoard(boardId) {
  const res = await fetch(`${serverAddress}/api/v1/boards/${boardId}`);
  let data = await res.json();

  // API gives error if board doesn't exist
  if (data.error) alert(data.error);

  board.value = data;
  messages.value = board.value.messages;
})(boardId);

// Web socket stuff
const socket = io(`${serverAddress}`);
socket.on('message', (message) => {
  messages.value.unshift(message);
});
socket.on('delete', (messageId) => {
  messages.value = messages.value.filter((message) => message.id != messageId);
});

// Header clock
const date = ref(new Date());
const formattedTime = computed(() => {
  const hours = padWithZero(date.value.getHours());
  const minutes = padWithZero(date.value.getMinutes());
  const seconds = padWithZero(date.value.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
});
const formattedDate = computed(() => {
  return date.value.toLocaleDateString();
});
setInterval(() => {
  date.value = new Date();
}, 1000);

function updateThresholdDate() {
  const minute = 1000 * 60;
  thresholdDate.value = Date.now() - 10 * minute;
}
const padWithZero = (number) => (number < 10 ? `0${number}` : number);

// Delete message
function handleMessageDelete(message) {
  const userConfirmed = confirm(
    `Do you want to delete this message?\n${message.body}`
  );
  if (!userConfirmed) return;
  fetch(`${serverAddress}/api/v1/messages/${message.id}`, {
    method: 'DELETE',
  });
}
</script>

<template>
  <div class="page">
    <header class="header">
      <div class="header__left">
        <h1 class="header__heading">{{ board.id }}</h1>
      </div>
      <div class="header__center">
        <p class="header__time">{{ formattedTime }}</p>
        <p class="header__date">{{ formattedDate }}</p>
      </div>
      <div class="header__right">
        <a :href="sendPageUrl" class="header__instruction">Add to board</a>
        <vue-qrcode
          :value="sendPageUrl"
          :options="{
            scale: 2,
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
    <main class="container container--wide">
      <ul class="messages">
        <transition-group name="list">
          <li v-for="message in allSortedMessages" :key="message.id">
            <MessageCard @delete="handleMessageDelete" :message="message" />
          </li>
        </transition-group>
      </ul>
    </main>
  </div>
</template>

<style>
.header {
  display: flex;
  justify-content: space-between;
  background: #240b9a;
  color: white;
  padding: 1rem;
}

.header__left {
  width: 100%;
  display: flex;
  align-items: center;
}

.header__heading {
  font-size: 1.5rem;
}

.header__center {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header__time {
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 0.1em;
}

.header__right {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
}

.header__instruction {
  font-size: 1.5rem;
}

.messages {
  font-size: 2rem;
  word-break: break-word;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
  gap: 2rem;
}

@media (max-width: 50rem) {
  .header__center {
    display: none;
  }
  .header__qrcode {
    display: none;
  }
}

@media (max-width: 35rem) {
  .header__left {
    display: none;
  }
  .messages {
    grid-template-columns: 1fr;
  }
}

.list-enter-from,
.list-leave-to {
  transform: rotate(-15deg) scale(0);
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s;
}

.list-move {
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}
</style>
