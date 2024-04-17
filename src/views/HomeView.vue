
<template>
  <main>
    <div class="main-wrapper">
      <Tabs class="tabs" @sendReport="handleReport"/>
    </div>

    <n-drawer v-model:show="showRawReport" style="width: 100%" >
      <!-- <n-drawer-content :style="{ width: '100%' }"> -->
      <n-drawer-content>
        <template #header>
          <div class="btn-copy">
            <n-button @click="copyReport" secondary size="large">
              Copy
              <template #icon>
                <n-icon size="20" :component="Clipboard"/>
              </template>
            </n-button>
          </div>
        </template>

        <div class="raw-report">
          <pre>{{ JSON.stringify(report, null, 2) }}</pre>
        </div>

        <template #footer>
          <div class="btn-close">
            <n-button @click="showRawReport = false" color="red" type="primary" size="large">Close</n-button>
          </div>
        </template>
      </n-drawer-content>
    </n-drawer>


    <div class="report-wrapper">
      <div v-if="showReport">
        <div class="report-header-wrapper">
          <div class="report-header">
            <div>
              <!-- empty div -->
            </div>
            <div>
              Report
            </div>
            <!-- <button> -->
            <n-button @click="showRawReport = true">

              RAW    
              <template #icon>
                <n-icon size="20" :component="Clipboard"/>
              </template>
            </n-button>
            <!-- </button> -->
          </div>
        </div>
        <n-tabs class="tabs-report" type="segment" size="medium" animated>
            <n-tab-pane name="Your" tab="Your image">
              <div class="report-items">
                <div class="" v-for="image in getValue(report, 'images.posted_images')" :key="image.position">
                  <ImgCard :type="postedString" :image="image"/>
                </div>
              </div>

            </n-tab-pane>
            <n-tab-pane name="source" tab="Source images">
              <div class="report-items">
                <div class="" v-for="portal in getValue(report, 'images.source_images')" :key="portal">
                  <ImgGroupCard :data="portal"/>
                </div>
              </div>

            </n-tab-pane>
            <n-tab-pane name="similar" tab="Similar images">
              <div class="report-items">
                <div class="" v-for="portal in getValue(report, 'images.similar_images')" :key="portal">
                  <ImgGroupCard :data="portal"/>
                </div>
              </div>


            </n-tab-pane>
        </n-tabs>



      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Vue from 'vue'
import Tabs from '@/components/Tabs.vue'
import { NTabs, NIcon, NTabPane, NDrawer, NDrawerContent, NButton } from 'naive-ui'
import { Clipboard } from '@vicons/ionicons5'
import { getValue } from '@/utils/utils'
import { showSuccessToast } from '@/utils/toast'
import { Images } from '@vicons/ionicons5';
import  { Share24Regular } from '@vicons/fluent'
import _ from 'lodash'


import ImgCard from '@/components/ImgCard.vue'
import ImgGroupCard from '@/components/ImgGroupCard.vue'


const report = ref<any>({})
const showReport = ref(false)
const showRawReport = ref(false)
const imageRef = ref(null);

const postedString = ref("posted")
const sourceString = ref("source")
const similiarString = ref("similiar")

const copyReport = () => {
  navigator.clipboard.writeText(JSON.stringify(report.value, null, 2))
  showSuccessToast('Report copied to clipboard')
  // showRawReport.value = false
}

const orderImages = () => {
  const sourceImages = getValue(report.value, 'images.source_images')
  const orderedSourceImages = _.orderBy(sourceImages, ['rank'], ['asc'])
  report.value.images.source_images = orderedSourceImages

  const similarImages = getValue(report.value, 'images.similar_images')
  const orderedSimilarImages = _.orderBy(similarImages, ['rank'], ['asc'])
  report.value.images.similar_images = orderedSimilarImages
} 

const handleReport = (r: any) => {
  report.value = r
  console.log(report.value)
  showReport.value = true
  orderImages()
}

</script>


<style scoped>

.tabs-report {
  max-width: var(--max-width);
  height: 100%;
  margin: 0 auto;
  font-family: var(--secondary-font);
}
.report-header-wrapper {
  max-width: var(--max-width);
  margin: 0 auto;
}

.report-header {
  padding: 10px;
  border: 2px solid #f0f0f0;
  border-radius: 10px;
  background-color: white;
  color: rgb(71, 71, 71);
  font-family: monospace;
  font-weight: bold;
  text-align: center;
  font-size: 1.7rem;
  margin-top: 20px;
  margin-bottom: 10px;
  position: relative;
}


.report-header button {
  top: 17px;
  right: 10px;
  position: absolute;
  background-color: white;
  border-radius: 3px;
  padding: 5px 10px;
  font-size: 0.8rem;
  font-family: var(--secondary-font);
  cursor: pointer;
  transition: all 0.2s;
}

.report-items {
  display: flex;
  gap: 20px;
  max-width: var(--max-width);
  flex-wrap: wrap;
  margin: 0 auto;
  justify-content: center;
}

.report-wrapper {
  margin-top: 50px;
  margin: 0 auto;
  width: 100%;
}

.main-wrapper {
  max-width: 700px;
  margin: 0 auto;
  margin-top: 50px;
}
.tabs{
  margin-top: 40px;
}

.btn-copy {
  padding: 10px;
}

</style>
