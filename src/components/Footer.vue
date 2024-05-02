<template>
    <div class="root-footer">
        <div class="footer-wrapper">
            <span>Ⓒ 2024 Tomáš Frátrik</span>
        </div>
    </div>
</template>



<script setup lang="ts">
</script>



<style scoped>
.footer-wrapper {
    /* background-color: #f0f0f0; */
    background-color: rgb(221, 221, 221);
    border-top: 1px solid grey;
    padding: 5px;
    text-align: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 900;
}

.footer-wrapper span {
    font-family: var(--secondary-font);
    color: rgb(85, 85, 85);
    font-size: 1.2rem;
}

@media (max-width: 768px) {
    .footer-wrapper {
        padding: 0;

    }

    .footer-wrapper span {
        font-size: 0.8rem;
    }
}

</style>