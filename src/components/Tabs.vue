<template>
    <div class="tabs-wrapper">
        <n-tabs type="segment" size="large" animated>
            <n-tab-pane name="URL" tab="URL">
                <UrlInput @sendData="handleIncomingData"/>
            </n-tab-pane>
            <n-tab-pane name="Image" tab="Image">
                <Dropzone @sendData="handleIncomingData " />
            </n-tab-pane>
        </n-tabs>
    </div>
</template>

<script setup lang="ts">
import { ref, defineComponent } from 'vue'
import { NTabs, NTabPane } from 'naive-ui'
import Dropzone from '@/components/Dropzone.vue'
import UrlInput from '@/components/UrlInput.vue'

const emit = defineEmits(['sendReport'])

const handleIncomingData = (report: any) => {
    emit('sendReport', report)
}

</script>
  
<style scoped>
.tabs-wrapper {
    margin: 0 auto;
    width: 100%;
    max-width: 800px;
    padding: 20px;
    /* background-color: #f0f0f0; */
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: var(--secondary-font);
    text-transform: uppercase;
    font-size: 1.2rem;

}
/* Change color of selected tab to blue */
.tab-pane {
    /* color: blue; */
    /* background-color: #f0f0f0;
    height: 200px; */
    background-color: blue;
    color: red;
}
</style>
  