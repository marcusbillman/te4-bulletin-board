<script setup>
import { defineProps } from 'vue';

defineProps(['body', 'type']);
</script>

<template>
  <div class="card">
    <p v-if="type !== 'image'">{{ body }}</p>
    <vue-qrcode v-if="type === 'link'" :value="body"></vue-qrcode>
    <img v-if="type === 'image'" :src="body" alt="Image" />
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
