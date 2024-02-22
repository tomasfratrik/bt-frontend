<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
</script>

<template>
  <main>
    <Nav />
    <RouterView />
  </main>
</template>

<style scoped>
main {
  background-color: #e6e9ec;
  height: 100vh;
}


</style>
