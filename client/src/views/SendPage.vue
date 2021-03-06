<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const serverAddress = import.meta.env.VITE_API_URL || 'http://localhost:1234';
const route = useRoute();
const boardId = route.params.boardId;

const messageAuthor = ref('');
const messageBodyRaw = ref('');
const messagePinned = ref(false);

async function handleSubmit(event) {
  const message = {
    body: messageBodyRaw.value,
    pinned: messagePinned.value,
    author: messageAuthor.value,
    boardId,
  };

  const response = await fetch(`${serverAddress}/api/v1/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  const data = await response.json();
  if (response.status >= 400 && response.status < 600) {
    alert(data.error);
    return;
  }
  messageBodyRaw.value = '';
  messagePinned.value = false;
}
</script>

<template>
  <div class="page">
    <main class="container">
      <h1>Add message to {{ boardId }}</h1>
      <form @submit.prevent="handleSubmit" class="form">
        <div>
          <label for="messageAuthor">Your name</label>
          <input
            v-model="messageAuthor"
            type="text"
            name="author"
            id="messageAuthor"
            placeholder="Leave blank for random name"
          />
        </div>
        <div>
          <label for="messageBody">Message</label>
          <textarea
            v-model="messageBodyRaw"
            class="textarea"
            name="body"
            id="messageBody"
            rows="3"
            placeholder="Text or web/image link. Max 250 characters."
            maxlength="250"
          ></textarea>
        </div>
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
        <a :href="`/${boardId}/board`" class="button button--secondary"
          >Show board</a
        >
      </form>
    </main>
  </div>
</template>

<style>
.form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
}

label {
  display: inline-block;
  margin-bottom: 0.5em;
}

.textarea {
  width: 100%;
  resize: vertical;
}

.button {
  display: inline-flex;
  justify-content: center;
  font: inherit;
  font-weight: 700;
  color: white;
  background: #240b9a;
  border: none;
  padding: 1em;
  border-radius: 0.5rem;
  cursor: pointer;
}

.button--secondary {
  background: white;
  color: #240b9a;
}

.checkbox {
  margin-right: 1em;
}
</style>
