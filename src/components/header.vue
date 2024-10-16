<script setup>
    import allianceLegal from "../assets/images/Alliance-Legal.svg";
    import synchronization from "../assets/images/synchronization.svg";
    import line from "../assets/images/line.svg";
</script>

<template>
    <header class="flex w-10/12 sm:w-11/12 max-w-[1200px] h-fit flex-wrap gap-5 mx-auto my-[35px] sm:my-[70px] xl:mb-[35px] justify-between">
        <div class="flex justify-between w-full max-w-[135px] sm:max-w-[260px]">
        <a href="https://online.synchronize.ru/" target="_blank" class="my-0.5 sm:my-1.5"> 
            <img :src="synchronization" alt="Синхронизация" class="w-11 sm:w-20 lg:w-[91px] object-contain dark:invert" />
        </a>
        <img :src="line" alt="line" class="h-7 sm:h-full object-contain pl-2 dark:invert" />
        <a href="https://al-cg.com/" target="_blank" class="my-0 sm:my-1"> 
            <img :src="allianceLegal" alt="Alliance Legal" class="w-11 sm:w-20 lg:w-[91px] object-contain dark:invert" />
        </a>
        </div>
        
        <div class="flex items-center mr-10 dark:opacity-50">
        <router-link to="/" ref="animationBtn" class="text-xs md:text-base lg:text-xl text-blue-700 dark:text-white helvetica-500 text-nowrap cursor-pointer z-10">
            анимационные лекции
        </router-link>
        <p class="text-xs md:text-base lg:text-xl helvetica-500 whitespace-pre text-black dark:text-white"> | памятки</p>
        </div>
    </header>
</template>