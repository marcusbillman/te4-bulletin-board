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
    <h1>TE4 Bulletin Board</h1>
    <form @submit.prevent="handleSubmit">
      <textarea
        v-model="messageBodyRaw"
        class="textarea"
        name="body"
        id="textarea"
        cols="30"
        rows="10"
        placeholder="Text message, web link or image link"
      ></textarea>
      <button type="submit" class="button">Add to board</button>
    </form>
  </div>
</template>

<style>
.textarea {
  width: 100%;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  padding: 1em;
  margin: 2rem 0;
}

.button {
  font: inherit;
  font-weight: 700;
  width: 100%;
  display: block;
  color: white;
  background: #240b9a;
  border: none;
  padding: 1em;
  border-radius: 0.5rem;
}
</style>
