<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const serverAddress = router.currentRoute.value.query.server;

const messageBodyRaw = ref('');
const messagePinned = ref(false);

async function handleSubmit(event) {
  const message = {
    body: messageBodyRaw.value,
    pinned: messagePinned.value,
  };

  await fetch(`//${serverAddress}:1234/api/v1/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  messageBodyRaw.value = '';
  messagePinned.value = false;
}
</script>

<template>
  <div class="page">
    <main class="container">
      <h1>TE4 Bulletin Board</h1>
      <form @submit.prevent="handleSubmit" class="form">
        <textarea
          v-model="messageBodyRaw"
          class="textarea"
          name="body"
          id="messageBody"
          cols="30"
          rows="10"
          placeholder="Text message, web link or image link"
        ></textarea>
        <div>
          <input
            v-model="messagePinned"
            type="checkbox"
            name="pinned"
            id="messagePinned"
            class="checkbox"
          />
          <label for="messagePinned">Pin your message to the top</label>
        </div>
        <button type="submit" class="button">Add to board</button>
      </form>
    </main>
  </div>
</template>

<style>
.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.textarea {
  width: 100%;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  padding: 1em;
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

.checkbox {
  margin-right: 1em;
}
</style>
