<template>
  <main>

    <div class="header">
      <p>Input URL of advertisement from supported website</p>
      <p>See <router-link to="/supported_portals"> supported web portals</router-link> </p>
    </div>

        <!-- <n-drawer v-model:show="displayImages" :width="512"> -->
        <n-drawer v-model:show="displayImages" style="width: 90%">
            <n-drawer-content :style="{ width: '100%' }">
              <loading v-model:active="isLoading"
                :can-cancel="false"
                :color="spinColor"
                :is-full-page="fullPage"/>

              <template #header>
                  Select image that best depicts the property
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
                    <n-button :disabled="btnIsDisabled" 
                      @click="searchImageClick" 
                      type="primary" 
                      :style="{ width:'100%' }"
                      bloc
                      size="large">
                      Search
                    </n-button>
                  </div>
              </template>
            </n-drawer-content>
        </n-drawer>

        <n-input-group style="display: flex; justify-content: center;">
            <n-input placeholder="Enter URL..." :style="{ width: '100%' }" v-model:value="search_url" />
            <n-button :disabled="!search_url" :loading="searchLoading" type="primary" @click="handleClick">
                Search
            </n-button>
        </n-input-group>
  </main>
</template>


<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import { NInput, NSpace, NIcon, NButton, 
        NInputGroup, NDrawer, NDrawerContent, NImage, NImageGroup  } from 'naive-ui'
import  { GlobeSearch20Filled } from '@vicons/fluent'
import { Search } from '@vicons/ionicons5'
import { showErrorToast } from '@/utils/toast'
import { serverAddress} from '@/utils/server'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import axios from 'axios'

interface ImageInfo {
  id: number;
  selected: boolean;
  url: string;
}

const isLoading = ref(false)
const fullPage = ref(false)
const spinColor = ref('#3eaf7c')

// const props = defineProps(['emit']); // Assuming that you pass the emit function as a prop
const emit = defineEmits(['sendData'])

const search_url = ref('')
const displayImages = ref(false)
const imageUrl = ref<ImageInfo[]>([]);


// watch(() => props.showTutorial, (newValue) => {
//     internalShow.value = newValue
// })
const handleImageClick = (image: ImageInfo) => {
  imageUrl.value.forEach((img) => {
    img.selected = false
  })
  image.selected = true
  btnIsDisabled.value = false
}

const btnIsDisabled = ref(true)
const searchLoading = ref(false)

const disabledBtn = () => {
  return imageUrl.value.find((img) => img.selected) === undefined
}

const searchImageClick = async () => {
  const selectedImage = imageUrl.value.find((img) => img.selected)
  try {
    isLoading.value = true
    const response = await axios.post(`${serverAddress}/grisa/upload`, {
      url: selectedImage?.url
    })
    const data = response.data;
    if (data.error) {
      showErrorToast(data.error)
      return
    }
    emit('sendData', data)
  } catch (error) {
    console.error('ERROR:' + error)
  }
  finally {
    displayImages.value = false
    isLoading.value = false
  }
}

const handleClick = async () => {
  imageUrl.value = []
  btnIsDisabled.value = true
  searchLoading.value = true
  try {
    const response = await axios.post(`${serverAddress}/get_images_from_url`, {
      url: search_url.value
    })

    const data = response.data;
    if (data.error) {
      showErrorToast(data.error)
      return
    } else if (data.image_urls.length === 0) {
      showErrorToast('No images found on the page')
      return 
    }

    for (let i = 0; i < data.image_urls.length; i++) {
      imageUrl.value.push({ id: i, selected: false, url: data.image_urls[i] });
    }

    displayImages.value = true
  } catch (error) {
    console.error('ERROR:' + error)
  }
  finally {
    searchLoading.value = false
  }
}
</script>



<style>

.header a {
  color: var(--primary-color);
  /* text-decoration: none; */

}

.header {
  margin-top: 20px;
  margin-bottom: 20px;
  color: var(--grey-color-font);
}

main {
  font-family: var(--primary-font);
  text-transform: none;
  font-size: 1.1rem;
}

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
    opacity: 0.7;
    transition: border 0.2s ease;
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