<template>
    <n-drawer v-model:show="internalShow" style="width: 100%">
        <n-drawer-content>
            <template #header>
                <div>
                    <n-button @click="buttonClose" color="red" type="primary" size="large">Close</n-button>
                </div>
            </template>
            <main>
                <h1>Hello world</h1>
            </main>
        </n-drawer-content> 
    </n-drawer>
</template>


<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, watch } from 'vue'
import { NDrawer, NDrawerContent, NButton } from 'naive-ui'


const props = defineProps({
  showTutorial: Boolean 
})

const emit = defineEmits(['close'])

const internalShow = ref(false)

const buttonClose = () => {
    internalShow.value = false
}

onMounted (() => {
    internalShow.value = props.showTutorial
})

watch(() => props.showTutorial, (newValue) => {
    internalShow.value = newValue
})

watch(() => internalShow.value, (newValue) => {
    if (!newValue) {
        emit('close')
    }
})

</script>

<style scoped>
</style>
