<template>
    <div class="img-modal">
        <div class="backdrop" @click.self="closeModal">
            <div class="modal-window">
                <div class="close-wrapper" @click="closeModal">
                    <n-icon :size="40" :component="CloseCircleOutline"/>
                </div>
                <div class="left-right">
                    <div class="left">
                        <img :src="props.image.display_photo_url" alt="image" />
                        <table>
                            <tr>
                                <td class="key">Score: </td>
                                <td class="val score">{{ props.image.points }} ({{ props.image.total_points_percentage }}%) </td>
                            </tr>
                            <tr v-if="props.type === sourceString">
                                <td class="key">Image resolution: </td>
                                <td class="val">{{ props.image.resolution[0] }} x {{ props.image.resolution[1] }}</td>
                            </tr>
                            <tr>
                                <td class="key">Website: </td>
                                <td class="val">{{ props.image.website_name }}</td>
                            </tr>
                            <tr>
                                <td class="key">Domain: </td>
                                <td class="val">{{ props.image.domain }}</td>
                            </tr>
                            <tr>
                                <td class="key">URL: </td>
                                <td class="val">
                                    <!-- <a :href="props.image.website_url" target="_blank">{{ props.image.website_url }}</a> -->
                                    <a :href="props.image.website_url" target="_blank">Click to redirect</a>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="right">
                        <!-- <div class="img-container" v-for="image in imageUrl" :key="image.id"> -->
                        <h2>Points</h2>
                        <h3 v-if="noPointsGiven">No points given</h3>
                        
                        <div class="modules" v-for="(moduleName, index) in Object.keys(props.image.point_modules_detected)" :key="index">
                            <div class="module-header">
                                <h3>{{ props.image.point_modules_detected[moduleName].name }} </h3>
                                <n-switch size="small" v-model:value="showDetails[moduleName]">   
                                    <template #checked>
                                        Hide
                                    </template>

                                    <template #unchecked>
                                        Details
                                    </template>
                                </n-switch>
                            </div>
                            <n-collapse-transition v-show="showDetails[moduleName]">
                                <div v-show="showDetails[moduleName]">
                                    <span class="header-points"> ({{ props.image.point_modules_detected[moduleName].points }} points) </span>
                                    <p> {{props.image.point_modules_detected[moduleName].description}}</p>
                                </div>
                            </n-collapse-transition>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, computed, watch } from 'vue'
import { NButton, NIcon, NSwitch, NCollapseTransition } from 'naive-ui'
import { CloseCircleOutline } from '@vicons/ionicons5'

const emit = defineEmits(['closeModal'])

const props = defineProps(['image', 'type'])

const postedString = ref("posted")
const sourceString = ref("source")
const similiarString = ref("similiar")

const closeModal = () => {
    emit('closeModal')
}

const show = ref(false)

const showDetails = ref<{ [moduleName: string]: boolean }>({})

onMounted(() => {
    for (const point_module in props.image.point_modules_detected) {
        showDetails.value[point_module] = false
    }
    console.log("type: " + props.type.value)
})


const noPointsGiven = computed(() => {
  return Object.keys(props.image.point_modules_detected).length === 0
})

</script>


<style scoped>

img {
    max-width: 400px;
    max-height: 400px;
}

.module-header {
    display: flex;
    align-items: center;
    justify-content: space-between
}

.header-points {
    color: var(--primary-color);
    font-weight: normal;
}

.score {
    color: var(--primary-color);
    font-weight: bold;
    text-shadow: 0 0 1px var(--primary-color);
}

table {
    font-size: 20px;
}

td {
    max-width: 500px;
    /* put td up */
    vertical-align: top;
    max-height: 200px;
}

.val {
    text-align: left;

}

.key {
    font-weight: bold;
    text-align: right;
}

.left, .right {
    width: 50%;
    height: 100%;
    padding: 10px;
}

.left {
    border-right: thick solid grey;
}

.left-right {
    display: flex;
    justify-content: space-between;
    height: 100%;
    align-items: flex-start;
}

.close-wrapper {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.close-wrapper:hover {
    color: red;
}

.modal-window {
    background-color: white;
    width: 1000px;
    height: 600px;
    z-index: 101;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    padding: 20px;
}

.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
}

</style>