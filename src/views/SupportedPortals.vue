<template>
    <div class="sp">
        <main>
            <h2>These are portals we currently support</h2>
            <p>Copy link from particullar advertisement, if unsure check our tutorial</p>
            <p>If you want a particular portal to be supported, write to <b>us</b></p>
            <n-table :bordered="false" :single-line="false">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>tld</th>
                    <th>Country</th>
                    <th>Tutorial</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="portal in portals" :key="portal.name">
                        <td>{{ portal.name }}</td>
                        <td>{{ portal.tld }}</td>
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
import  Reality  from '@/components/tutorials/reality.vue'

function getComponentForPortal(portal: any) {
  return portal.component
}

function toggleTutorial(portal: any) {
  portal.showTutorial = !portal.showTutorial
}

const portals = ref([
    {
        name: 'reality',
        component: markRaw(Reality),
        tld: 'cz',
        country: 'Czech republic',
        showTutorial: false,
    },
    {
        name: 'test',
        tld: 'sk',
        country: 'japan',
        showTutorial: false,
    }
])

</script>

<style scoped>
h2 {
    margin-top: 20px;
    margin-bottom: 20px;
}
main {
    max-width: 1400px;
    margin: 0 auto;
}

</style>