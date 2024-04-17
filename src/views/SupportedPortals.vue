<template>
    <div class="sp">
        <main>
            <h2>These are portals we currently support</h2>
            <p>Copy link from particullar advertisement, if unsure check our tutorial</p>
            <n-table :bordered="false" :single-line="false">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Url</th>
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
                            <n-button type="primary" circle @click="toggleTutorial(portal)">
                                <template #icon>
                                    <n-icon size="30">
                                        <book-20-filled />
                                    </n-icon>
                                </template>
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
import { NTable, NButton, NIcon } from 'naive-ui'
import { Book20Filled } from '@vicons/fluent'
// import { Book } from ''
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
table {
    font-family:monospace; 
}

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
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: var(--grey-color-font);
}

</style>