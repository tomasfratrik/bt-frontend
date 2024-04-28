<template>
    <loading v-model:active="isLoading"
        :can-cancel="false"
        :color="spinColor"
        :is-full-page="fullPage"/>
    <n-upload 
        ref="upload"
        :default-upload="false"
        @change="handleChange"
        :disabled="fileListDisabled"
        :show-file-list="false"
        directory-dnd
        :max="1"
        >
        <n-upload-dragger>
            <div style="margin-bottom: 12px">
                <n-icon size="48" :depth="3">
                    <archive-icon />
                </n-icon>
            </div>
            <n-text style="font-size: 16px">
                Click or drag a png/jpg image into this area to upload
            </n-text>
        </n-upload-dragger>
    </n-upload>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import { NUpload, NIcon, NP, NText, NUploadDragger, NButton } from 'naive-ui'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import type { UploadInst, UploadFileInfo } from 'naive-ui'
import { showErrorToast } from '@/utils/toast'
import { serverAddress } from '@/utils/server'
import Loading from 'vue-loading-overlay';
import axios from 'axios'

const emit = defineEmits(['sendData'])

const fileListLength = ref(0)
const fileListDisabled = ref(false)
const upload = ref<UploadInst | null>(null)
const uploadedImages = ref<UploadFileInfo[]>([])
const isLoading = ref(false)
const fullPage = ref(false)
const spinColor = ref('#3eaf7c')

const handleChange = (data: { fileList: UploadFileInfo[] }) => {
    fileListLength.value = data.fileList.length
    uploadedImages.value = data.fileList
    uploadImg()
}

const uploadImg = async () => {
    const fileObject = uploadedImages.value[0];
    const file = fileObject.file;
    const formData = new FormData();
    const blob = file as Blob;
    formData.append('file', blob);
    isLoading.value = true

    try {
        const response = await axios.post(`${serverAddress}/grisa/upload`, formData);
        const data = response.data

        clearFileList()
        if (data.error) {
            showErrorToast(data.error)
            return
        }
        console.log(data)
        emit('sendData', data)
    } catch (error) {
        console.error('ERROR:' + error);
        clearFileList()
    }
    finally {
        isLoading.value = false
    }
}

const clearFileList = () => {
    uploadedImages.value = []
    fileListLength.value = 0
    upload.value?.clear()
}

</script>


<style scoped>
.search-button {
    width: 100%;
}
</style>