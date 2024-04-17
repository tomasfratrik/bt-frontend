<template>
    <n-drawer v-model:show="internalShow" style="width: 100%">
        <n-drawer-content>
            <template #header>
                <div>
                    <!-- <n-button @click="buttonClose" color="red" type="primary" size="large">Close</n-button> -->
                    <n-button @click="buttonClose" color="red" type="primary" size="large">Close</n-button>
                </div>
            </template>
            <main>
                <h1>Reality</h1>
                <div class="issues">
                    <h2>Known issues</h2>
                    <ul>
                        <li> None </li>
                    </ul>
                </div>
                
                <div class="tutorial">
                    <h2>Tutorial</h2>
                    <p> Go to <a href="https://www.reality.cz" target="_blank">reality.cz</a> 
                        from this site you can pick any property, and display it so it looks like on the picture below.
                    </p>
                </div>
                <img src="./assets/reality_cz.png" alt="Reality.cz" >
                <div class="sources">
                    <h2>Used sources</h2>
                    <ul>
                        <li> <a href="https://www.reality.cz/prodej/byty/mesto-Brno/YKL-009582/?c=3" target="_blank">Displayed photo</a> </li>
                    </ul>
                </div>
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

a {
    color: rgb(20, 155, 90);
    text-decoration: none;
}

.tutorial p {
    font-size: 1.3em;
    font-weight: 500;
    font-family: Arial, sans-serif;
     
}

.sources ul {
    list-style-type: circle;
    margin-left: 20px;
}


ul {
    list-style-type: none;
}
ul li {
    font-size: 1.2em;
}

h2 {
    margin-top: 20px;
     
}

main {
    padding: 20px;
}

img {
    max-width: 100%;
    max-height: 100%;
}
</style>
