<script setup>
import { ref } from 'vue';

const serverAddress = import.meta.env.API_URL || 'localhost:1234';
const boardPageUrl = location.href.replace('/?', '/board?');
if (location.href.includes('localhost')) {
  alert(
    "You have connected using localhost. Some features won't work unless you use an actual IP address."
  );
}

const messageAuthor = ref('');
const messageBodyRaw = ref('');
const messagePinned = ref(false);

async function handleSubmit(event) {
  const message = {
    body: messageBodyRaw.value,
    pinned: messagePinned.value,
    author: messageAuthor.value,
  };

  const response = await fetch(`//${serverAddress}/api/v1/messages`, {
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
      <h1>TE4 Bulletin Board</h1>
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
        <a :href="boardPageUrl" class="button button--secondary">Show board</a>
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
