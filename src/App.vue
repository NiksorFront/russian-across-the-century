<script setup>
  import { RouterView } from 'vue-router';
  import bgWhite from "./assets/images/bg-white.jpg"
  import {ref, onMounted} from "vue";
  // Переменная для хранения текущей темы
  const darkMode = ref(false);

  onMounted(() => {
    // Проверяем системную тему
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      darkMode.value = true; // Установить 'dark', если система в тёмной теме
    } else {
      darkMode.value = false; // Установить 'light', если система в светлой теме
    }
  })
</script>

<template>
  <RouterView/>
  <img :src="bgWhite" class="fixed top-0 left-0 w-screen h-screen object-cover -z-20 dark:invert-[.94]" />
</template>

<style>

</style>
