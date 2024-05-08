/**
 * My Vue Component
 * 
 * This component is the main view of the application. It is responsible for displaying the report
 * 
 * @author Tomas Fratrik
 */

<template>
  <main>
    <div class="main-wrapper">
      <Tabs class="tabs" @sendReport="handleReport"/>
    </div>

    <n-drawer v-model:show="showRawReport" style="width: 100%" >
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
          <pre>{{ JSON.stringify(origReport, null, 2) }}</pre>
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
            <div class="country-select">
              <CountrySelect :selectedCountry="selectedCountry" 
                             :change="changeCountryAutomatically"
                             @change="changeCountry">
              </CountrySelect> 
              <div @click="resetCountry" class="country-reset">
                <n-popover trigger="hover">
                  <template #trigger>
                    <n-icon size="20" :component="Reload"/>
                  </template>
                    <span class="info">Reset country to original origin</span>
                </n-popover>
              </div>
              <div class="country-info">
                <n-popover trigger="click">
                  <template #trigger>
                    <n-icon size="20" :component="Information"/>
                  </template>
                  <div class="info">
                    <span>Based on evaluation we estimated original country of advertisement to be 
                      <span v-for="(country, tld) in originalCountries" :key="tld">
                        {{ country }} 
                        <span> </span>
                      </span>
                    </span><br>
                    <span>But you can change this value, to see results as if it originated from that country</span>
                  </div>
                </n-popover>
              </div>
            </div>
            <div class="report-header-full">
              Report
            </div>
            <n-button @click="showRawReport = true">

              RAW    
              <template #icon>
                <n-icon size="20" :component="Clipboard"/>
              </template>
            </n-button>
          </div>
          <div class="countries-info" v-if="Object.keys(report.baseline.tld).length > 1">
            <n-alert title="Origin countries are now set to:" type="info">
              <span v-for="(country, tld) in originalCountries" :key="tld">
                {{ country }} 
                <span> </span>
              </span>
            </n-alert>
          </div>
        </div>
        <n-tabs class="tabs-report" type="segment" size="medium" animated>
 
            <n-tab-pane name="Your" tab="Your image">
              <div v-if="uploadType == 'url'" class="report-items">
                <div class="" v-for="image in getValue(report, 'images.posted_images')" :key="image.position">
                  <ImgCard :type="postedString" :image="image"/>
                </div>
              </div>
              <div v-else>
                <p>You posted image, not advertisement.</p>
                <p>No result will be shown in this category.</p>
              </div>
            </n-tab-pane>

            <n-tab-pane name="source" tab="Source images">
              <p>Images were found while looking at the source of your posted image.</p>
              <div class="report-items">
                <template v-for="portal in getValue(report, 'images.source_images')" :key="portal">
                  <ImgGroupCard type="source" :threshold="0" :data="portal"/>
                </template>
              </div>

            </n-tab-pane>
            <n-tab-pane name="similar" tab="Similar images">
              <p>Images that are similiar. You can change the similarity index to filter them</p>
              <h3 class="similarity-header">Similarity - {{ ssimThresholdPercentage }} %</h3>
                <n-space vertical>
                  <n-slider v-model:value="ssimThresholdPercentage" :step="1" />
                  <n-input-number class="similarity-input" v-model:value="ssimThresholdPercentage" size="small" />
                </n-space>
                <div class="report-items">
                  <template v-for="portal in getValue(report, 'images.similar_images')" :key="portal">
                    <ImgGroupCard type="similar" :count="calculateCount(portal)" v-if="showGroupCard(portal)" :threshold="ssimThreshold" :data="portal"/>
                  </template>
                </div>
              </n-tab-pane>
          </n-tabs>
      </div>
    </div>

  </main>
</template>



<script setup lang="ts">
import _ from 'lodash'
import { computed, ref, watch } from 'vue'
import axios from 'axios'
import { NTabs, NIcon, NTabPane, 
         NDrawer, NDrawerContent, NButton, NAlert,
         NInputNumber, NSlider, NSpace, NPopover } from 'naive-ui'
import { Clipboard } from '@vicons/ionicons5'
import { Information } from '@vicons/ionicons5'
import { Reload } from '@vicons/ionicons5'
import { getValue } from '@/utils/utils'
import { serverAddress } from '@/utils/server'
import { tldCountries } from '@/utils/tldCountries'
import { showErrorToast, showSuccessToast } from '@/utils/toast'
import { showInfoToastLong } from '@/utils/toast'
import ImgCard from '@/components/ImgCard.vue'
import ImgGroupCard from '@/components/ImgGroupCard.vue'
import Tabs from '@/components/Tabs.vue'
import CountrySelect from '@/components/CountrySelect.vue'


const report = ref<any>({})
const origReport = ref<any>({})
const firstReport = ref<any>({})
const showReport = ref(false)
const newReport = ref(false)
const showRawReport = ref(false)
const ssimThreshold = ref(0)
const ssimThresholdPercentage = ref(0)
const selectedCountry = ref('')
const originalCountries = ref<any>({})
const originalReportID = ref('')

const postedString = ref("posted")
const changeCountryAutomatically = ref(true)
const currentlyResetting = ref(false)


const getDefaultCountry = (report: any) => {
  const tld = Object.keys(report.baseline.tld)[0]
  return tld
}


// Handle reseting of country
const resetCountry = async () => {
  const countries = <any>{}
  currentlyResetting.value = true

  for (const tld in originalCountries.value) {
    countries[tld] = tldCountries[tld as keyof typeof tldCountries];
  }
  try {
    const response = await axios.post(`${serverAddress}/grisa/set/country`, 
        { 
          report: origReport.value,
          country: countries,
        }
    )

    origReport.value = response.data
    report.value = JSON.parse(JSON.stringify(response.data))
    changeCountryAutomatically.value = false

    /**
     * CurrentlyResestt is set to false defaulty by changeCountry
     * But if we reset country to the same country (press reset button twice)
     * then the changeCountry function will not be called and we need to set it to false
     * manualy
     */
    if(selectedCountry.value === getDefaultCountry(report.value)) {
      currentlyResetting.value = false
    }

    selectedCountry.value = getDefaultCountry(report.value)
    showSuccessToast('Country origin reset sucessfully')
  }
  catch (error) {
    console.log(error)
    showErrorToast('Error while resetting country')
  }
  orderImages()
}

// Auto triggers when value of selectedCountry is changed
const changeCountry = async (tld: string) => {
  // Because it auto triggers, there are cases where we don't want
  // to change country
  if (currentlyResetting.value) {
    currentlyResetting.value = false
    return
  }

  if(newReport.value) {
    newReport.value = false
    return
  }

  const country = Object.fromEntries([[tld, tldCountries[tld as keyof typeof tldCountries]]])

  try {
    const response = await axios.post(`${serverAddress}/grisa/set/country`, 
        { 
          report: origReport.value,
          country: country,
        }
    )

    origReport.value = response.data
    report.value = JSON.parse(JSON.stringify(response.data))
    changeCountryAutomatically.value = true
    selectedCountry.value = tld
    showSuccessToast('Origin country changed')
  }
  catch (error) {
    console.log(error)
    showErrorToast('Error while changing country')
  }
  orderImages()
}

const uploadType = computed(() => {
  return getValue(report.value, 'upload_type')
})
// count of ads within group
const calculateCount = (portal: any) => {
  const count = portal.images.filter((image: any) => image.ssim >= ssimThreshold.value).length
  return count
}
// show if ssim is above threshold
const showGroupCard = (portal: any) => {
  const show = portal.images.some((image: any) => image.ssim >= ssimThreshold.value)
  return show
}
// if ssim is changed, update threshold
watch(ssimThresholdPercentage, (newValue, oldValue) => {
  ssimThreshold.value = newValue / 100
});

const copyReport = () => {
  navigator.clipboard.writeText(JSON.stringify(report.value, null, 2))
  showSuccessToast('Report copied to clipboard')
}

const orderImages = () => {
  const sourceImages = getValue(report.value, 'images.source_images')
  const orderedSourceImages = _.orderBy(sourceImages, ['rank'], ['asc'])
  report.value.images.source_images = orderedSourceImages

  const similarImages = getValue(report.value, 'images.similar_images')
  const orderedSimilarImages = _.orderBy(similarImages, ['rank'], ['asc'])
  report.value.images.similar_images = orderedSimilarImages
} 

const getCountryFromTLD = (tld: string) => {
  return tldCountries[tld as keyof typeof tldCountries]
}

// ******************
// REPORT INCOMING
// - main function to handle new report
// ******************
const handleReport = (r: any) => {
  origReport.value = r
  report.value = JSON.parse(JSON.stringify(r))
  firstReport.value = report.value 
  newReport.value = true // for changeCountry to return if new report is incoming 

  // set original countries (for reset button)
  originalCountries.value = {}
  for (const tld in report.value.baseline.tld) {
    originalCountries.value[tld] = tldCountries[tld as keyof typeof tldCountries];
  }

  /**
   * Same case as in resetCountry function
   * newReport is changes to false by changCountry defaulty
   * but if we change coutry from '' then this function is not triggered
   * and therefore we have to do it manually
   */
  if (selectedCountry.value === '') {
    newReport.value = false
  }

  selectedCountry.value = getDefaultCountry(report.value)

  ssimThreshold.value = report.value.ssim_threshold
  ssimThresholdPercentage.value = ssimThreshold.value * 100

  // log report
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

.similarity-header {
  font-family: var(--secondary-font);
  font-size: 1.2rem;
  margin-bottom: 10px;
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
  top: 14px;
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

.country-select {
  position: absolute;
  top: 14px;
  left: 10px;
  display: flex;
}


.country-select .country-info {
  border: 1px solid #C5C5C5;
  border-radius: 3px;
  height: 34px;
  width: 34px;
  display: flex;  
  justify-content: center;
  align-items: center;
  background-color: var(--secondary-color);
  color:white;
  cursor: pointer;
  transition: all 0.2s;
}

.country-info:hover {
  background-color: var(--primary-color);
}

.country-reset {
  border: 1px solid #C5C5C5;
  border-radius: 3px;
  height: 34px;
  width: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
}

.country-reset:hover {
  background-color: #f0f0f0;
}

.country-info .info {
  margin-bottom: 15px;
}

.countries-info {
  margin-bottom: 10px;
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
  margin-bottom: 50px;
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

.similarity-input {
  border-radius: 10px;
  display: none;
}

@media (max-width: 768px) {
  .similarity-input {
    display: block;
  }

  .report-header-full {
    display: none;
  }
  .report-header{
    height: 70px;
  }

}

@media (max-width: 900px) {
  .info {
    max-width: 300px;
  }
}

@media (max-width: 420) {
  .info {
    max-width: 200px;
  }
}

@media(max-width: 410px) {
  .info {
    max-width: 150px;
  }
}

@media(max-width: 380px) {
  .report-header button {
    display: none
  }
}
</style>
