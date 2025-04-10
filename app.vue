<template>
  <NuxtLayout>
    <NuxtPage :keepalive="{max: 10}"></NuxtPage>
  </NuxtLayout>
</template>
<script setup lang="ts">
</script>
<style lang="scss">
html,
body {
  width: 100vw;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  font-size: 2vw;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
}

button {
  outline: none;
  border: 0;
  background: transparent;
}

p {
  margin: 0;
}

a,
a:hover,
a:active {
  outline: none;
  text-decoration: none;
  color: inherit; 
}

#__nuxt {
  --bgColor: #ebebf3;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--bgColor);
}


*::-webkit-scrollbar {
  width: 4px;
  border-radius: 99px;
}

*::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 99px;
}
</style>