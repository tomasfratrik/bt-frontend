<template>
  <main>

    <div class="header">
      <p>Input URL of real estate   advertisement from supported portals</p>
      <p>See <router-link to="/supported_portals" class="link"> supported web portals</router-link> </p>
    </div>
        <n-drawer v-model:show="displayImages" style="width: 100%">
            <n-drawer-content :style="{ width: '100%' }">
              <loading v-model:active="isLoading"
                :can-cancel="false"
                :color="spinColor"
                :is-full-page="fullPage"/>

              <template #header>
                  Select image that best depicts the property
              </template>
                  <!-- <n-space> -->
                    <div class="img-container-wrapper">
                      <div class="img-container" v-for="image in imageUrl" :key="image.id">
                          <img @click="handleImageClick(image)" :src="image.url" alt="image" :class="{ active: image.selected }"/> 
                      </div>
                    </div>
                  <!-- </n-space> -->
              <template #footer>
                  <div class="btn-close">
                    <n-button @click="buttonClose" color="red" type="primary" size="large">Close</n-button>
                  </div>

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
            <!-- clear button -->
            <n-button style="margin-left: 10px;" @click="search_url = ''" :disabled="!search_url" >
              Clear
            </n-button>
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
import { serverAddress} from '@/utils/server'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import axios from 'axios'
import { showSuccessToast, showErrorToast, showInfoToast } from '@/utils/toast'

interface ImageInfo {
  id: number;
  selected: boolean;
  url: string;
}

const buttonClose = () => {
  displayImages.value = false
}

const isLoading = ref(false)
const fullPage = ref(false)
const spinColor = ref('#3eaf7c')

const emit = defineEmits(['sendData'])

const search_url = ref('')
const saved_search_url = ref('')
const displayImages = ref(false)
const imageUrl = ref<ImageInfo[]>([]);

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
    showInfoToast('Please wait until process finishes')
    isLoading.value = true
    const response = await axios.post(`${serverAddress}/grisa/upload`, {
      selected_url: selectedImage?.url,
      urls: imageUrl.value.map((img) => img.url)
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
    search_url.value = saved_search_url.value
  }
}

const handleClick = async () => {
  imageUrl.value = []
  btnIsDisabled.value = true
  searchLoading.value = true
  saved_search_url.value = search_url.value
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
    showSuccessToast('Images loaded successfully')
  } catch (error) {
    showErrorToast('Could not load images')
  }
  finally {
    searchLoading.value = false
  }
}
</script>



<style>

.btn-close {
  margin-right: 20px;
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
    align-items: center;
}

.img-container-wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
}

.img-container img {
    width: 200px;
    height: 200px;
    opacity: 0.7;
    transition: border 0.2s ease;
    border: 5px solid transparent;
}

.img-container .active {
    opacity: 1;
    border: 5px solid var(--primary-color);
    border-radius: 5px;
}

</style>