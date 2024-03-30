<template>
    <div class="ImgCard">
        <ImgModal :type="props.type" :image="props.image" v-if="showModal" @closeModal="closeModal" />
        <div class="card-wrapper">
            <div class="upper">
                <div class="redirect-wrapper" @click="openWebsite">
                    <n-icon :size="40" :component="Share24Regular"/>
                </div>
                <img :src="image.display_photo_url" alt="image" />
            </div>
            <div class="lower">
                <div class="center-wrapper">
                    <h2 class="website-name">{{ image.website_name }}</h2>
                    <h3>{{ image.ssim }}</h3>
                    <div class="score-bar">
                        <n-progress
                            type="line"
                            :show-indicator="false"
                            status="success"
                            :percentage="image.total_points_percentage"
                        />
                    </div>
                    <n-button strong secondary type="success" @click="toggleModal">
                        Detail
                    </n-button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
// Import ref from Vue
import { ref, defineProps } from 'vue';
import { NIcon, NProgress, NButton } from 'naive-ui'
import  { Share24Regular } from '@vicons/fluent'

import ImgModal from '@/components/ImgModal.vue'

const showModal = ref(false)
const toggleModal = () => {
    showModal.value = !showModal.value
}
const closeModal = () => {
    showModal.value = false
}

const props = defineProps(['image', 'type'])

const openWebsite = () => {
    const url = props.image.website_url
    window.open(url, '_blank')
}

</script>

<style scoped>

/* .card-wrapper .upper {
} */

.lower .website-name {
    /* text-align: center; */
    margin: 0;
    font-size: 20px;
}

.center-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    /* max-width: 90%;
    margin: auto; */
    padding: 10px;
}

.score-bar {
    width: 240px;
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


.redirect-wrapper {
    position: absolute;
    background-color: white;
    /* border-radius: 100%; */
    width: 50px;
    height: 50px;
    top: 10px;
    right: 10px;
    z-index: 1;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s;

}

.redirect-wrapper:hover {
    background-color: #f0f0f0;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
    color: rgb(0, 110, 255);
}

.card-wrapper {
    min-width: 240px;
    max-width: 270px;
    height: 330px;
    /* border: 1px solid #f0f0f0; */
    position: relative;
    border-radius: 15px;
    /* border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px; */
    margin: 10px;
    background-color: white;
}

</style>