<script setup>
import { defineProps } from 'vue';

defineProps(['message']);
</script>

<template>
  <article class="card" :class="message.pinned ? 'card--pinned' : ''">
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
  </article>
</template>

<style>
body {
  background: #ebebeb;
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  margin-bottom: 1rem;
}

.card--pinned {
  color: #dd0890;
}

.card__main {
  height: 100%;
  flex-grow: 1;
}

.card__img {
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: cover;
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
