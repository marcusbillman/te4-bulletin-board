<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import io from 'socket.io-client';
import MessageCard from '@/components/MessageCard.vue';

const router = useRouter();
const serverAddress = router.currentRoute.value.query.server;
const sendPageUrl = location.href.replace('/board', '');
if (location.href.includes('localhost')) {
  alert(
    "You have connected using localhost. The QR code won't work unless you use an actual IP address."
  );
}

const messages = ref([]);
const pinnedMessages = computed(() =>
  messages.value.filter((message) => message.pinned)
);

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

fetch(`//${serverAddress}:1234/api/v1/messages`)
  .then((res) => res.json())
  .then((data) => {
    messages.value = data;
  });

// Web socket stuff
const socket = io(`//${serverAddress}:1234`);
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
  fetch(`//${serverAddress}:1234/api/v1/messages/${message.id}`, {
    method: 'DELETE',
  });
}
</script>

<template>
  <div class="page">
    <header class="header">
      <div class="header__left">
        <h1 class="header__heading">TE4 Bulletin Board</h1>
      </div>
      <div class="header__center">
        <p class="header__time">{{ formattedTime }}</p>
        <p class="header__date">{{ formattedDate }}</p>
      </div>
      <div class="header__right">
        <p class="header__instruction">Add to board</p>
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
    <main class="container">
      <ul class="messages messages--pinned">
        <li v-for="message in pinnedMessages" :key="message.id">
          <MessageCard @delete="handleMessageDelete" :message="message" />
        </li>
      </ul>
      <div class="separator"></div>
      <ul class="messages">
        <li v-for="message in recentNonPinnedMessages" :key="message.id">
          <MessageCard @delete="handleMessageDelete" :message="message" />
        </li>
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
  padding: 2rem;
}

.header__left {
  display: flex;
  align-items: center;
  width: 100%;
}

.header__heading {
  font-size: 1.5rem;
}

.header__center {
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
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
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
}

.separator {
  height: 1px;
  background: #ccc;
  margin: 2rem 0;
}
</style>
