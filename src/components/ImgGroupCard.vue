/**
 * My Vue Component
 * 
 * This is the card component that displays the image group
 * 
 * @author Tomas Fratrik
 */

<template>
    <div class="img-group-card">
        <div class="card-wrapper">
            <ImgGroupModal :threshold="props.threshold" :internalShow="showGroupModal" @close="closeGroupModal" :data="props.data"/>
            <div class="upper">
                <!-- <div class="redirect-wrapper" @click="openWebsite">
                    <n-icon :size="40" :component="Share24Regular"/>
                </div> -->
                <div v-if="props.type == 'similar'" class="count">
                    <h5>{{ props.count }}x</h5>
                </div>
                <div v-else class="count">
                    <h5>{{ props.data.count }}x</h5>
                </div>
                <div class="score-bar">
                            <!-- type="circle"
                            :stroke-width="10"
                            :color="getColorFromPercentage(image.total_points_percentage)"
                            :percentage="image.total_points_percentage" -->
                    <n-progress
                        type="circle"
                        :color = "getColorFromPercentage(props.data.images[0].total_points_percentage)"
                        :stroke-width="15"
                        :percentage="props.data.images[0].total_points_percentage"
                        :show-indicator="false"
                    />
                </div>
                <img :src="props.data.images[0].display_photo_url" alt="image" />
            </div>
            <div class="lower">
                <div class="center-wrapper">
                    <h2 class="website-name">{{ props.data.domain }}</h2>
                    <n-button strong secondary type="success" @click="toggleGroupModal">
                        Show Group
                    </n-button>
                </div>
            </div>
        </div>
    </div>
</template>



<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, watch } from 'vue'
import { NProgress, NButton } from 'naive-ui'
import ImgGroupModal from '@/components/ImgGroupModal.vue'
import { getColorFromPercentage } from '@/utils/utils'

const props = defineProps(['portal', 'data', 'threshold', 'count', 'type'])

const showGroupModal = ref(false)

const toggleGroupModal = () => {
    showGroupModal.value = !showGroupModal.value
}
const closeGroupModal = () => {
    showGroupModal.value = false
}

</script>



<style scoped>

.lower .website-name {
    margin: 0;
    font-size: 15px;
}

.center-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 10px;
}

button {
    width: 100%;
}

.upper img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}


.count {
    position: absolute;
    color: black;
    top: 10px;
    left: 10px;
    font-family: 'Roboto Mono', monospace;
    background-color: white;
    border-radius: 5px;
    font-size: 25px;
    z-index: 3;
    padding: 5px 10px;
}

.score-bar {
    position: absolute;
    background-color: rgb(8, 35, 22);
    border-radius: 100%;
    width: 50px;
    height: 50px;
    top: 8px;
    right: 10px;
    z-index: 1;
    display: flex;
    transition: all 0.3s;
}

.card-wrapper {
    min-width: 240px;
    max-width: 270px;
    width: 260px;
    position: relative;
    border-radius: 15px;
    margin: 10px;
    background-color: white;
}

</style>