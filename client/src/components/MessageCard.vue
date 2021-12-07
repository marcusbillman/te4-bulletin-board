<script setup>
import { defineProps } from 'vue';

defineProps(['body', 'type']);
</script>

<template>
  <div class="card">
    <p>{{ body }}</p>
  </div>
</template>

<style>
.card {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fafafa;
  margin-bottom: 1rem;
}
</style>
