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

body {
  font-family: 'Readex Pro', sans-serif;
  overflow-y: scroll;
}

main {
  margin: 2rem 0;
}

.container {
  width: 100%;
  padding: 0 1rem;
}

.container:not(.container--wide) {
  max-width: 50rem;
  margin-inline: auto;
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
  font-size: 1.2rem;
  border-radius: 0.5rem;
  padding: 0.5em;
}

a {
  text-decoration: none;
  color: inherit;
}
</style>
