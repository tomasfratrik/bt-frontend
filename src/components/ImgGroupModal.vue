/**
 * My Vue Component
 * 
 * This component is a modal that displays a group of images
 * 
 * @author Tomas Fratrik
 */

<template>
    <div class="img-group-modal">
        <n-modal v-model:show="props.internalShow">
            <n-card
            style="max-width: 900px; min-height: 700px; background-color: var(--bg-clr);"
            title=" "
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
            >
            <template #header-extra>
                <div class="close-wrapper" @click="closeGroupModal">
                    <n-icon :size="50" :component="CloseCircleOutline"/>
                </div>
                <div class="back-wrapper" @click="closeGroupModal">
                    <h2>{{ props.data.domain }}</h2>
                </div>
            </template>
            <p class="info">
                Some images might be sourced directly from the advertisement, with possibly higher resolution,
                while others, with possibly lower resolution, 
                could be from pages featuring multiple ads, including the same picture.
            </p>
            <div class="img-cards-wrapper">
                <template class="img-card" v-for="image in props.data.images" :key="image.id">
                    <div v-if="image.ssim >= props.threshold">
                        <ImgCard scale="large" @closeGroupModal="closeGroupModal" :image="image" :type="props.data.type" />
                    </div>
                </template>
            </div>
            </n-card>
        </n-modal>
    </div>
</template>



<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, watch } from 'vue'
import { NIcon, NButton, NModal, NCard } from 'naive-ui'
import { CloseCircleOutline } from '@vicons/ionicons5'
import ImgCard from '@/components/ImgCard.vue'

const props = defineProps(['data', 'internalShow', 'threshold'])
const emit = defineEmits(['close'])

const closeGroupModal = () => {
    emit('close')
}

</script>



<style scoped>

p.info {
    /* text-align: center; */
    font-size: 15px;
    margin-top: 20px;
    color: grey;
}

.back-wrapper {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: white;
    padding: 10px;
    /* toggle word wrapping */
    white-space: wrap;
    max-width: 340px;
}
@media (max-width: 420px) {
    .back-wrapper {
        max-width: 200px;
        font-size: 10px;
    } 
    p.info {
        margin-top: 25px;
    }
}

.header-domain {
    display: absolute;
    top: 10px;
    left: 10px;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
}

.img-cards-wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    overflow-y: scroll;
    max-height: 500px;
    margin-top: 20px;
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
</style>
