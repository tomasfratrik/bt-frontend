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
                <!-- <div class="header-domain">
                    <h2>{{ props.data.domain }}</h2>
                </div> -->
                <div class="back-wrapper" @click="closeGroupModal">
                    <h2>{{ props.data.domain }}</h2>
                </div>
            </template>
            <!-- Content -->
            <div class="img-cards-wrapper">
                <div class="img-card" v-for="image in props.data.images" :key="image.id">
                    <ImgCard scale="small" @closeGroupModal="closeGroupModal" :image="image" :type="props.data.type" />
                </div>
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

const props = defineProps(['data', 'internalShow'])
const emit = defineEmits(['close'])

const closeGroupModal = () => {
    emit('close')
}


</script>

<style scoped>

.back-wrapper {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: white;
    padding: 10px;
}



.header-domain {
    display: absolute;
    top: 10px;
    left: 10px;
    background-color: white;
    padding: 10px;
    border-radius: 10px;
}
/* 
.header-wrapper {
    background-color: blue;
    width: 100%;
    height: 100%;
} */

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
