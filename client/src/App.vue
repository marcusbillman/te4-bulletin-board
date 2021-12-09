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
  font-family: 'Readex Pro', sans-serif;
}

main {
  margin: 2rem 0;
}

.container {
  padding: 0 32px;
}

ul,
li {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

input:not([type='checkbox']),
textarea,
button {
  width: 100%;
  display: block;
  font: inherit;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  padding: 0.5em;
}
</style>
