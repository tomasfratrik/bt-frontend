<template>
    <div class="tabs-wrapper">
        <!-- <n-tabs v-model:selectedTab="selectedTab" type="segment" animated :theme-overrides="tabsThemeOverrides"> -->
        <!-- <n-tabs :size='tabsSize' type="segment" animated :theme-overrides="tabsThemeOverrides"> -->
        <n-tabs type="segment" animated>
            <!-- <n-tabs type="segment"> -->
            <n-tab-pane name="URL" tab="URL">
                wonderwall
            </n-tab-pane>
            <n-tab-pane name="Image" tab="Image">
                <Dropzone />
            </n-tab-pane>
        </n-tabs>
    </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue'
import { NTabs, NTabPane } from 'naive-ui'
import Dropzone from '../components/Dropzone.vue'


const selectedTab = ref('oasis')

const tabsThemeOverrides = {
    size: 'large'
}
//   const tabsSize = ref('large')
const paneClass = 'tab-pane'
</script>
  
<style scoped>
/* Change color of selected tab to blue */
.tab-pane {
    /* color: blue; */
    /* background-color: #f0f0f0;
    height: 200px; */
    background-color: blue;
    color: red;
}
</style>
  