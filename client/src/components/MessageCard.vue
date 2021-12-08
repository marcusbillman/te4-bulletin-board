<script setup>
import { defineProps } from 'vue';

defineProps(['message']);
</script>

<template>
  <article class="card">
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
      <p class="card__date">
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
  max-height: 30rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  margin-bottom: 1rem;
}

.card__main {
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

.card__date {
  font-size: 1rem;
  color: #616161;
}
</style>
