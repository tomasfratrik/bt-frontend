<template>
    <div class="ImgCard">
        <ImgModal @closeCurrentModal="closeCurrentModal" :internalShow="showModal" :type="props.type" :image="props.image" @closeModal="closeModal" />
        <!-- <div class="card-wrapper"> -->
        <div :class="{ 'card-wrapper-small': props.scale === 'small'  }" class="card-wrapper">
            <div class="upper">
                <div class="redirect-wrapper" @click="openWebsite">
                    <n-icon :size="40" :component="Share24Regular"/>
                </div>
                <img :src="image.display_photo_url" alt="image" />
            </div>
            <div class="lower">
                <!-- <div class="portal-name">
                    {{ props.image.domain }}
                </div> -->
                <div class="center-wrapper">
                    <div class="score-bar">
                        <n-progress
                            type="circle"
                            :stroke-width="10"
                            :color="getColorFromPercentage(image.total_points_percentage)"
                            :percentage="image.total_points_percentage"
                        />
                    </div>
                    <button class="btn-detail" @click="toggleModal">Detail</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
// Import ref from Vue
import { ref, defineProps, defineEmits } from 'vue';
import { NIcon, NProgress, NButton } from 'naive-ui'
import  { Share24Regular } from '@vicons/fluent'
import ImgModal from '@/components/ImgModal.vue'

import { getColorFromPercentage } from '@/utils/utils';
import type { get } from 'node_modules/axios/index.cjs';

const showModal = ref(false)
const toggleModal = () => {
    showModal.value = !showModal.value
}
const closeModal = () => {
    showModal.value = false
    emit('closeGroupModal')
}

const closeCurrentModal = () => {
    showModal.value = false
}

const props = defineProps(['image', 'type', 'scale'])

const emit = defineEmits(['closeGroupModal'])

const openWebsite = () => {
    const url = props.image.website_url
    window.open(url, '_blank')
}

</script>

<style scoped>

.portal-name {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: bold;
}

.lower .website-name {
    margin: 0;
    font-size: 20px;
}

.center-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    padding: 10px;
}

.score-bar {
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}

.card-wrapper-small .score-bar {
    width: 80px;
}


.redirect-wrapper {
    position: absolute;
    background-color: white;
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
    color: var(--primary-color);
}


.card-wrapper {
    min-width: 240px;
    max-width: 270px;
    width: 260px;
    height: 330px;
    position: relative;
    border-radius: 15px;
    margin: 10px;
    background-color: white;
}

.btn-detail {
    border: 1px solid grey;
    border-radius: 100px;
    background-color: transparent;
    color: var(--grey-color-font);
    font-size: 15px;
    padding: 2px 5px;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-detail:hover {
    border: 1px dashed var(--primary-color);
    color: var(--primary-color);

}

.card-wrapper button {
    width: 100px;
    height: 40px;
}

.card-wrapper-small {
    /* height: 280px; */
    width: 200px;
    height: 310px;
}
.upper img {
    width: 100%;
    height: 200px;
    object-fit: cover;

    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
}

.card-wrapper-small button {
    width: 100px;
    height: 60px;
}


</style>