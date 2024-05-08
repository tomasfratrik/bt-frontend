/**
 * My Vue Component
 * 
 * This component is a select input for selecting a country
 * 
 * @author Tomas Fratrik
 */

<template>
    <div class="countrySelect">
        <main>
            <div class="select-wrapper">
                <div class="select">
                    <n-select
                        v-model:value="sc"
                        filterable
                        placeholder="Please select a country"
                        :options="countries"
                    />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { NSelect } from 'naive-ui'
import { tldCountries } from '@/utils/tldCountries'

interface Country {
    label: string;
    value: string;
}

const emit = defineEmits(['change'])
const props = defineProps(['selectedCountry', 'change'])
const sc = ref(props.selectedCountry)

// watch if value cahgnes
watch(() => sc.value, (newValue) => {
    emit('change', newValue)
})

watch (() => props.selectedCountry, (newValue) => {
    sc.value = newValue
})

const countries = ref<Country[]>([])

for (const [value, label] of Object.entries(tldCountries)) {
    countries.value.push({ label: label as string, value })
}

</script>

<style scoped>
.select-wrapper {
    max-width: 500px;
}
</style>