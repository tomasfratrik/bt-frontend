<script setup lang="ts">
</script>

<template>
    <div class="main-nav-wrapper">
        <nav>
            <div class="nav-wrapper">
                <div class="nav-item nav-logo">
                    <h2>Fraud Detector</h2>
                </div>
                <div class="nav-content">
                    <div class="nav-item">
                        <router-link to="/">Home</router-link>
                    </div>
                    <div class="nav-item">
                        <router-link to="/about">About</router-link>
                    </div>
                    <div class="nav-item">
                        detected
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped>
.main-nav-wrapper {
    width: 100%;
    background-color: white;
    padding: 0;
    margin: 0;
}
.nav-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    margin: 0 30px;
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
</style>