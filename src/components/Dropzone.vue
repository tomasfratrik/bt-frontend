<template>
    <!-- <n-button 
        :disabled="!fileListLength" 
        style="margin-bottom: 12px;"
        class="search-button"
        @click="handleClick"
        >

        Search
    </n-button> -->
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
                Click or drag a file to this area to upload
            </n-text>
        </n-upload-dragger>
    </n-upload>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NUpload, NIcon, NP, NText, NUploadDragger, NButton } from 'naive-ui'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import type { UploadInst, UploadFileInfo } from 'naive-ui'
import { showErrorToast } from '@/utils/toast'
import { serverAddress } from '@/utils/server'
import axios from 'axios'


export default defineComponent({
    components: {
        NUpload,
        NIcon,
        NP,
        NText,
        NUploadDragger,
        NButton,
        ArchiveIcon
    },
    setup () {
        const fileListLengthRef = ref(0)
        const fileListDisabled = ref(false)
        const uploadRef = ref<UploadInst | null>(null)
        const uploadedImages = ref<UploadFileInfo[]>([])
        const result = ref('')

        const handleChange = (data: { fileList: UploadFileInfo[] }) => {
            fileListLengthRef.value = data.fileList.length
            uploadedImages.value = data.fileList
            uploadImg()
        }

        const uploadImg = async () => {

            const fileObject = uploadedImages.value[0];

            const file = fileObject.file;
            const formData = new FormData();
            const blob = file as Blob;
            formData.append('file', blob);


            try {
                const response = await axios.post(`${serverAddress}/grisa/upload`, formData);
                const data = response.data

                clearFileList()
                if (data.error) {
                    showErrorToast(data.error)
                    return
                }
                console.log(data)
          
            } catch (error) {
                console.error('ERROR:' + error);
                clearFileList()
            }
        }

        const clearFileList = () => {
            uploadedImages.value = []
            fileListLengthRef.value = 0
            uploadRef.value?.clear()
        }

        return {
            upload: uploadRef,
            fileListLength: fileListLengthRef,
            handleChange,
            uploadImg,
            fileListDisabled,
            clearFileList,
            uploadedImages
        }
    }
})

</script>

<style scoped>
.search-button {
    width: 100%;
}

.search-button:hover {
    /* color: var(--primary-color);
    border-color: var(--primary-color); */
}
</style>