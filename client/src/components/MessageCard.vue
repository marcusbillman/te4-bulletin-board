<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['message']);
const emit = defineEmits(['delete']);

function handleClick() {
  emit('delete', props.message);
}
</script>

<template>
  <article
    @click="handleClick"
    class="card"
    :class="message.pinned ? 'card--pinned' : ''"
  >
    <div class="card__main">
      <p v-if="message.type !== 'image'" class="card__body">
        {{ message.body }}
      </p>
      <img
        v-if="message.type === 'image'"
        :src="message.body"
        alt="Image"
        class="card__img"
      />
    </div>
    <footer class="card__footer">
      <p class="card__author-date">
        {{ message.author }} •
        {{ new Date(message.createdAt).toLocaleString() }}
      </p>
      <vue-qrcode
        v-if="message.type === 'link'"
        :value="message.body"
        :options="{
          margin: 0,
        }"
        class="card__qrcode"
      ></vue-qrcode>
    </footer>
    <span class="material-icons">delete_forever</span>
  </article>
</template>

<style>
body {
  background: #ebebeb;
}

.card {
  position: relative;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  cursor: pointer;
  transition: background 0.2s;
}

.material-icons {
  color: #dd0890;
  font-size: 3rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 1;
}

.card:hover .material-icons {
  opacity: 1;
}

.card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: white;
  border-radius: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
  pointer-events: none;
}

.card:hover::after {
  opacity: 0.8;
}

.card--pinned {
  color: #dd0890;
  outline: 2px solid #dd0890;
  outline-offset: -2px;
}

.card__main {
  height: 100%;
  flex-grow: 1;
}

.card__img {
  width: 100%;
  height: 100%;
  max-height: 30vh;
  object-fit: scale-down;
}

.card__footer {
  display: flex;
  justify-content: space-between;
  align-items: end;
}

.card__author-date {
  font-size: 1rem;
  color: #616161;
}
</style>
