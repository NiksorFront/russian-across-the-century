<script setup>
    import { defineProps } from 'vue';
    const {content} = defineProps(["content"]);

    console.log(content)
</script>

<template>
    <!-- скорее всего придётся кастылить -->
    <Teleport to="body">
        <div class="fixed top-0 left-0 w-screen h-screen flex z-10 background-modal">
            <div class="w-[clamp(200px,20vw,532px)] min-h-48 flex m-auto rounded-[clamp(20px,5vw,50px)] p-[clamp(24px,4vw,48px)] bg-white">
                {{content}}

            </div>
        </div>
    </Teleport>
</template>

<style scoped>
    .background-modal{
        backdrop-filter: blur(3.75px);
        background-color: rgba(0, 0, 0, .45);
    }
</style>