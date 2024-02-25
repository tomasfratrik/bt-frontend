<template>
    <h4>Input URL of advertisement from supported sites</h4>

        <!-- <n-drawer v-model:show="displayImages" :width="512"> -->
        <n-drawer v-model:show="displayImages" style="width: 90%">
            <n-drawer-content>
            <template #header>
                Select image by clicking on it
            </template>
            
                <n-space>
                <!-- <div class="img-container" v-for="image in imageUrl" :key=""> -->
                <div class="img-container" v-for="image in imageUrl" :key="image.id">
                    <!-- <n-image width="150" height="150" :src="image"/>  -->
                    <img @click="handleImageClick(image)" :src="image.url" alt="image" :class="{ active: image.selected }"/> 
                </div>
                </n-space>

            <template #footer>
                <div>
                    <n-button @click="searchImageClick" type="primary" size="large">Search</n-button>
                </div>
            </template>
            </n-drawer-content>
        </n-drawer>

        <n-input-group style="display: flex; justify-content: center;">
            <n-input placeholder="Enter URL..." :style="{ width: '100%' }" v-model:value="search_url" />
            <n-button type="primary" @click="handleClick">
                Search
            </n-button>
        </n-input-group>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { NInput, NSpace, NIcon, NButton, 
        NInputGroup, NDrawer, NDrawerContent, NImage, NImageGroup  } from 'naive-ui'
import  { GlobeSearch20Filled } from '@vicons/fluent'
import { Search } from '@vicons/ionicons5'
import { showErrorToast } from '@/utils/toast'
import { serverAddress} from '@/utils/server'
import axios from 'axios'

interface ImageInfo {
  id: number;
  selected: boolean;
  url: string; // Assuming the URL is of type string
}

export default defineComponent({
  components: {
    Search,
    GlobeSearch20Filled,
    NIcon,
    NInput,
    NInputGroup,
    NSpace,
    NDrawer,
    NDrawerContent,
    NImage,
    NImageGroup,
    NButton,
  },
    setup() {
        const search_url = ref('')
        const imageUrl = ref<ImageInfo[]>([]);
        const displayImages = ref(false)

        const handleImageClick = (image: ImageInfo) => {
            imageUrl.value.forEach((img) => {
                img.selected = false
            })
            image.selected = true
        }

        const searchImageClick = async () => {
            const selectedImage = imageUrl.value.find((img) => img.selected)
            // if (selectedImage) {
            //     console.log(selectedImage.url)
            // }
            try {
                const response = await axios.post(`${serverAddress}/grisa/upload`, {
                    url: selectedImage?.url
                })
                const data = response.data;
                if (data.error) {
                    showErrorToast(data.error)
                    return
                }
                console.log(data.text)
            } catch (error) {
                console.error('ERROR:' + error)
            }
        }

        const handleClick = async () => {
            try {
                const response = await axios.post(`${serverAddress}/get_images_from_url`, {
                    url: search_url.value
                })
                
                const data = response.data;
                if (data.error) {
                    showErrorToast(data.error)
                    return
                }
                else if (data.image_urls.length === 0) {
                    showErrorToast('No images found on the page')
                    return
                }
                

                for (let i = 0; i < data.image_urls.length; i++) {
                    // imageUrl = [{id: selected: false, url: data.image_urls[i]}, ...]
                    imageUrl.value.push({id: i, selected: false, url: data.image_urls[i]});
                }
     

                // imageUrls.value = data.image_urls
                displayImages.value = true
                // console.log(data.image_urls)

            } catch (error) {
                console.error('ERROR:' + error)
            }

        }
        return {
            Search,
            GlobeSearch20Filled,
            search_url,
            displayImages,
            imageUrl,
            handleImageClick,
            searchImageClick,
            handleClick,
        }
    }

})
</script>

<style>
.input-wrapper {
    display: flex;
    justify-content: center;
    /* justify-content: space-between; */
    align-items: center;
    /* margin-top: 20px; */
    /* max-width: 100%; */

}

.img-container img {
    /* max-width: 150px;
    max-height: 150px; */
    width: 150px;
    height: 150px;
    /* object-fit: cover; */
    opacity: 0.8;
    transition: border 0.3s ease;
    border: 5px solid transparent;
}
/* .animated {
} */

.img-container .active {
    opacity: 1;
    border: 5px solid var(--primary-color);
    border-radius: 5px;
}

</style>