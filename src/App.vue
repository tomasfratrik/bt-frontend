/**
 * My Vue Component
 * 
 * This is the main component of the application
 * 
 * @author Tomas Fratrik
 */

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import { NBackTop } from 'naive-ui'
</script>

<template>
  <main>
    <n-back-top :right="100" :bottom="60" />
    <Nav></Nav>
    <div class="content">
      <RouterView />
      <Footer></Footer>
    </div>
  </main>
</template>

<style scoped>

</style>
