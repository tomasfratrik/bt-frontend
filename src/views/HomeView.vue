
<template>
  <main>
    <div class="main-wrapper">
      <Tabs class="tabs" @sendReport="handleReport"/>
    </div>

    <div class="report-wrapper">
      <div v-if="showReport">
        <h1 class="report-header">Report</h1>

        <div class="report-header">
          <h3>Your images</h3>
        </div>
        <div class="report-items">
          <div class="" v-for="image in getValue(report, 'images.posted_images')" :key="image.position">
            <ImgCard :type="postedString" :image="image"/>
          </div>
        </div>

        <div class="report-header">
          <h3>Source images</h3>
        </div>
        <div class="report-items">
          <div class="" v-for="image in getValue(report, 'images.source_images')" :key="image.position">
            <ImgCard :type="sourceString" :image="image"/>
          </div>
        </div>

        <div class="report-header">
          <h3>Similiar images</h3>
        </div>
        <div class="report-items">
          <div class="" v-for="image in getValue(report, 'images.similar_images')" :key="image.position">
            <ImgCard :type="similiarString" :image="image"/>
          </div>
        </div>

      </div>
    </div>

  </main>
</template>

<script setup lang="ts">
import Tabs from '@/components/Tabs.vue'
import { Images } from '@vicons/ionicons5';
import  { Share24Regular } from '@vicons/fluent'
import _ from 'lodash'
import { ref } from 'vue'

import ImgCard from '@/components/ImgCard.vue'


const report = ref<any>({})
const showReport = ref(false)
const imageRef = ref(null);

const postedString = ref("posted")
const sourceString = ref("source")
const similiarString = ref("similiar")

// Utility function to safely access nested properties

const handleReport = (r: any) => {
  report.value = r
  console.log(report.value)
  showReport.value = true
}

const getValue = (object: any, string: string, defaultValue =  '') => {
  return _.get(object, string, defaultValue)
}
</script>


<style scoped>

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

  max-height: 1000px;
  overflow-y: scroll;
  border: 5px solid grey;
  border-radius: 20px;
  border-style: double;
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
