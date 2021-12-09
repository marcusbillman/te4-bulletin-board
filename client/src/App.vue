<script setup></script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" id="main" />
    </keep-alive>
  </router-view>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Arial, sans-serif;
}

ul,
li {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

input,
textarea,
button {
  font: inherit;
}

.page {
  padding: 0 32px;
}
</style>
