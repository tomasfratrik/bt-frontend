<script setup lang="ts">
import Tabs from '@/components/Tabs.vue'
</script>

<template>
  <main>
    <div class="main-wrapper">
      <Tabs class="tabs" />
    </div>
  </main>
</template>


<style scoped>
.main-wrapper {
  max-width: 700px;
  margin: 0 auto;
  margin-top: 50px;
}
.tabs{
  margin-top: 40px;
}


</style>
