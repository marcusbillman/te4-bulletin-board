<script setup>
import { defineProps } from 'vue';

defineProps(['body', 'type']);
</script>

<template>
  <div class="card">
    <p>{{ body }}</p>
    <vue-qrcode v-if="type === 'link'" :value="body"></vue-qrcode>
  </div>
</template>

<style>
.card {
  height: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fafafa;
  margin-bottom: 1rem;
}
</style>
