<script setup>
import { ref } from 'vue';

const serverAddress = import.meta.env.VITE_API_URL || 'http://localhost:1234';
const boardId = ref('');

async function handleSubmit(event) {
  const shouldCreateBoard = !(await boardExists(boardId.value));
  if (shouldCreateBoard) {
    const userInput = confirm(
      `There's no board named ${boardId.value}. Do you want to create it?`
    );
    if (!userInput) return;
    postBoard(boardId.value);
  }
  window.location.href = `/${boardId.value}`;
}

async function boardExists(boardId) {
  const res = await fetch(`${serverAddress}/api/v1/boards/${boardId}`);
  let data = await res.json();

  // API gives error if board doesn't exist
  if (data.error) return false;
  return true;
}

async function postBoard(boardId) {
  const res = await fetch(`${serverAddress}/api/v1/boards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: boardId,
    }),
  });
  const data = await res.json();
  return data;
}
</script>

<template>
  <div class="page">
    <main class="container">
      <h1>Join a board</h1>
      <form @submit.prevent="handleSubmit" class="form">
        <div>
          <label for="boardId"
            >Board ID (shown in the top-left of the board screen)</label
          >
          <input
            v-model="boardId"
            type="text"
            name="boardId"
            id="boardId"
            placeholder="my-cool-board"
          />
        </div>
        <button type="submit" class="button">Join</button>
      </form>
    </main>
  </div>
</template>

<style></style>
