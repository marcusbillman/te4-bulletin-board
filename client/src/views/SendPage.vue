<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const serverAddress = router.currentRoute.value.query.server;

const messageBodyRaw = ref('');

async function handleSubmit(event) {
  const message = {
    body: messageBodyRaw.value,
  };

  await fetch(`//${serverAddress}:1234/api/v1/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  messageBodyRaw.value = '';
}
</script>

<template>
  <div class="page">
    <h1>Send</h1>
    <form @submit.prevent="handleSubmit">
      <textarea
        v-model="messageBodyRaw"
        name="body"
        id="textarea"
        cols="30"
        rows="10"
      ></textarea>
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<style></style>
