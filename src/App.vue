<script setup>
  import bgDark from "./assets/images/bg-dark.jpg";
  import bgWhite from "./assets/images/bg-white.jpg"
  import allianceLegal from "./assets/images/Alliance-Legal.svg";
  import synchronization from "./assets/images/synchronization.svg";
  import line from "./assets/images/line.svg";
</script>

<template>
  <header class="flex w-11/12 max-w-[1200px] h-full flex-wrap gap-5 mx-auto mt-[35px] sm:mt-[70px] justify-between">
    <div class="flex justify-between w-full max-w-[135px] sm:max-w-[260px]">
      <img :src="synchronization" alt="Synchronization" class="w-11 sm:w-20 lg:w-[91px] object-contain" />
      <img :src="line" alt="line" class="h-7 sm:h-full object-contain pl-2" />
      <img :src="allianceLegal" alt="Alliance Legal" class="w-11 sm:w-20 lg:w-[91px] object-contain" />
    </div>
   
    <div class="flex items-center mr-10">
      <a href="#" class="text-xs md:text-base lg:text-xl text-blue-500 helvetica-500 text-nowrap">анимационные лекции </a>
      <p class="text-xs md:text-base lg:text-xl helvetica-500 whitespace-pre"> | памятки</p>
    </div>
  </header>
  <main>
    
  </main>

  <img :src="bgWhite" class="fixed top-0 left-0 w-screen h-screen object-cover -z-10"/>
</template>

<style scoped>

</style>
