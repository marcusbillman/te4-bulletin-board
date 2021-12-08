<script setup>
import { defineProps } from 'vue';

defineProps(['message']);
</script>

<template>
  <div class="card">
    <p v-if="message.type !== 'image'">{{ message.body }}</p>
    <vue-qrcode
      v-if="message.type === 'link'"
      :value="message.body"
    ></vue-qrcode>
    <img v-if="message.type === 'image'" :src="message.body" alt="Image" />
  </div>
</template>

<style>
.card {
  height: 100%;
  max-height: 30rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fafafa;
  margin-bottom: 1rem;
}

img {
  width: 100%;
  height: auto;
  max-height: 100%;
  object-fit: cover;
}
</style>
