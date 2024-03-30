<script setup lang="ts">
</script>

<template>
    <div class="main-nav-wrapper">
        <nav>
            <div class="nav-wrapper">
                <div class="nav-item nav-logo">
                    <h2 class="full-logo">Fraud Detector</h2>
                    <h2 class="short-logo">FD</h2>
                </div>

                    <div class="nav-content">
                        <div class="nav-item">
                            <router-link to="/">
                                <span class="nav-button">Home</span>
                            </router-link>
                        </div>
                        <div class="nav-item">
                            <router-link to="/about">
                                <span class="nav-button">About</span>
                            </router-link>
                        </div>
                        <div class="nav-item">
                            <router-link to="/supported_portals">
                                <span class="nav-button">Supported portals</span>
                            </router-link>
                        </div>
                    </div>


            </div>
        </nav>
    </div>
</template>

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
    /* background-color: white; */
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

@media (max-width: 768px) {
    .full-logo { display: none; }
    .short-logo { display: block; }
    .main-nav-wrapper {
        position: sticky;
    }
}
</style>