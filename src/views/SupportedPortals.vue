<template>
    <div class="sp">
        <main>
            <h2>These are portals we currently support</h2>
            <p>Copy link from particullar advertisement, if unsure check our tutorial</p>
            <n-table :bordered="false" :single-line="false">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Redirect to portal</th>
                    <th>Country</th>
                    <th>Tutorial</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="portal in portals" :key="portal.name">
                        <td>{{ portal.name }}</td>

                        <td> <a class="link" :href="portal.link" target="_blank">Link</a></td>
                        <td>{{ portal.country }}</td>
                        <td>
                            <n-button type="primary" @click="toggleTutorial(portal)">
                                Show Tutorial
                            </n-button>
                        </td>
                        <component :is="getComponentForPortal(portal)" 
                                    :showTutorial="portal.showTutorial"
                                    @close="toggleTutorial(portal)"
                                    />
                    </tr>
                </tbody>
            </n-table>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { NTable, NButton } from 'naive-ui'
import  RealityCZ  from '@/components/tutorials/RealityCZ.vue'
import  NehnutelnostiSK  from '@/components/tutorials/NehnutelnostiSK.vue'

function getComponentForPortal(portal: any) {
  return portal.component
}

function toggleTutorial(portal: any) {
  portal.showTutorial = !portal.showTutorial
}

const portals = ref([
    {
        name: 'reality.cz',
        component: markRaw(RealityCZ),
        tld: 'cz',
        link: 'https://www.reality.cz/',
        country: 'Czech republic',
        showTutorial: false,
    },
    {
        name: 'nehnutelnosti.sk',
        component: markRaw(NehnutelnostiSK),
        tld: 'sk',
        link: 'https://www.nehnutelnosti.sk/',
        country: 'Slovakia',
        showTutorial: false,
    }
])

</script>

<style scoped>
th {
    font-weight: 600;
}

h2 {
    margin-top: 20px;
    margin-bottom: 20px;
}
main {
    max-width: 1400px;
    margin: 0 auto;
}

</style>