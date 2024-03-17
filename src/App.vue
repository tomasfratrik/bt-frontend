<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
import { NBackTop } from 'naive-ui'
</script>

<template>
  <main>
    <n-back-top :right="100" />
    <Nav />
    <RouterView />
  </main>
</template>

<style scoped>
main {
  /* background-color: #e6e9ec; */
  /* height: 100%; */
  /* height: ; */
}


</style>
