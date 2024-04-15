
<template>
  <main>
    <div class="main-wrapper">
      <Tabs class="tabs" @sendReport="handleReport"/>
    </div>


    <div class="report-wrapper">
      <div v-if="showReport">
        <h1 class="report-header">Report</h1>
        <n-tabs class="tabs-report" type="segment" size="small" animated>
            <n-tab-pane name="Your" tab="Your image">
              <div class="report-header">
                <h3>Your image</h3>
              </div>
              <div class="report-items">
                <div class="" v-for="image in getValue(report, 'images.posted_images')" :key="image.position">
                  <ImgCard :type="postedString" :image="image"/>
                </div>
              </div>

            </n-tab-pane>
            <n-tab-pane name="source" tab="Source images">
              <div class="report-header">
                <h3>Source images</h3>
              </div>
              <div class="report-items">
                <!-- <div class="" v-for="image in getValue(report, 'images.source_images')" :key="image.position">
                  <ImgGroupCard :type="sourceString" :image="image"/>
                </div> -->
                <div class="" v-for="portal in getValue(report, 'images.source_images')" :key="portal">
                  <!-- if portal has only 1 item do imgcard else img group card -->
                  <div v-if="portal.images.length === 1">
                    <ImgCard :type="sourceString" :image="portal.images[0]"/>
                  </div>
                  <div v-else>
                    <ImgGroupCard :data="portal"/>
                  </div>
                </div>
              </div>

            </n-tab-pane>
            <n-tab-pane name="similar" tab="Similar images">
              <div class="report-header">
                <h3>Similiar images</h3>
                <!-- <input type="number" v-model="similarityThreshold" placeholder="Similarity threshold" min="0" max="100" step="1"> -->
              </div>
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
import Tabs from '@/components/Tabs.vue'
import { NTabs, NTabPane } from 'naive-ui'
import { getValue } from '@/utils/utils'
import { Images } from '@vicons/ionicons5';
import  { Share24Regular } from '@vicons/fluent'
import _ from 'lodash'
import { ref } from 'vue'

import ImgCard from '@/components/ImgCard.vue'
import ImgGroupCard from '@/components/ImgGroupCard.vue'


const report = ref<any>({})
const showReport = ref(false)
const imageRef = ref(null);

const postedString = ref("posted")
const sourceString = ref("source")
const similiarString = ref("similiar")

const similarityThreshold = ref(0)
// Utility function to safely access nested properties

const handleReport = (r: any) => {
  report.value = r
  console.log(report.value)
  showReport.value = true
}

// const getValue = (object: any, string: string, defaultValue =  '') => {
//   return _.get(object, string, defaultValue)
// }
</script>


<style scoped>

.tabs-report {
  max-width: var(--max-width);
  margin: 0 auto;
  font-family: var(--secondary-font);
}
.report-header {
  width: var(--max-width);
  margin: 0 auto;
}

.report-items {
  display: flex;
  gap: 20px;
  /* max-width: 90%; */
  width: var(--max-width);
  /* wrap overflow */
  flex-wrap: wrap;
  margin: 0 auto;

  /* max-height: 1000px;
  overflow-y: scroll;
  border: 5px solid grey;
  border-radius: 20px;
  border-style: double; */
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


</style>
