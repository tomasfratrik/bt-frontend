<template>
    <div class="main-nav-wrapper">
        <nav>
            <div class="hamburger-nav">
                <router-link to="/">
                    <h2 class="short-logo">FH</h2>
                </router-link>
                <!-- <n-icon class="Menu-icon" size="40" onClick="toggleNav" :component="Menu"/> -->
                <n-icon class="Menu-icon" size="40" @click="toggleNav" :component="Menu"/>
            </div>
            <div class="nav-wrapper">
                <div class="nav-item nav-logo">
                    <router-link to="/">
                        <h2 class="full-logo">Fraud Helper</h2>
                    </router-link>
                </div>

                <div class="nav-content" v-if="showNav">
                    <div class="nav-item">
                        <router-link to="/">
                            <div class="nav-button" @click="toggleNav" >Home</div>
                        </router-link>
                    </div>
                    <div class="nav-item">
                        <router-link to="/about">
                            <div class="nav-button" @click="toggleNav" >About</div>
                        </router-link>
                    </div>
                    <div class="nav-item">
                        <router-link to="/supported_portals">
                            <div class="nav-button" @click="toggleNav" >Supported portals</div>
                        </router-link>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { NIcon } from 'naive-ui'
import { Menu } from '@vicons/ionicons5'

const showNav = ref(true)

const toggleNav = () => {
    if (window.innerWidth <= 768){
        showNav.value = !showNav.value
    }
}

onMounted(() => {
    handleResize(); // Call initially to set the initial state
    window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});

const handleResize = () => {
    showNav.value = window.innerWidth > 768;
}
</script>

<style scoped>


.nav-button {
    transition: all 0.2s;

}

.nav-button:hover {
    text-shadow: 0 0 10px white;
}

.nav-item {
    transition: all 0.2s;
}

.nav-item:hover {
    /* transform: scale(1.1); */
    color: var(--primary-color);
}

h2 {
    font-size: 2rem;
    font-weight: bold;
    color: white;
}

a {
    color: var(--primary-color);
    color: white;
    text-decoration: none;
}


nav {
    font-family: var(--secondary-font);
    text-transform: uppercase;
}

.main-nav-wrapper {
    width: 100%;
    background-color: var(--primary-color);
    padding: 0;
    margin: 0;
}
.nav-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    margin: 0 30px;
    padding: 7px;
}
.nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
}


.nav-logo {
    font-size: 1.5rem;
    font-weight: bold;
}

.short-logo {
    display: none;
}

.hamburger-nav {
    display: none;
    justify-content: space-between;
    align-items: center;
    padding: 3px 20px;
    background-color: var(--primary-color);
    color: white;
}

.Menu-icon {
    color: white;
    transition: all 0.2s;
}

.Menu-icon:hover {
    text-shadow: 0 0 10px white;
    color: rgb(17, 65, 48);
}

@media (max-width: 768px) {
    .full-logo { display: none; }

    .short-logo { display: block; }

    .main-nav-wrapper {
        position: sticky;
        top: 0;
        z-index: 100;
    }

    .nav-logo {
        display: none;

    }
    .nav-content {
        display: block;
        width: 100%;
    }

    .nav-wrapper {
        display: block;
        margin: 0;
        padding: 0;
    }

    .hamburger-nav {
        display: flex;
        border-bottom: 2px solid white;
    }

    .nav-button {
        width: 100%;
        height: 50px;
        /* text-align: center; */
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.15s;
    }
    .nav-button:hover {
        background-color: rgb(17, 65, 48);
        color: white;
    }
}
</style>