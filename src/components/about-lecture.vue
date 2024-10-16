<script setup>
    const {number, title, description, modalContent, videoUrl, routeMemo} = defineProps(["number", "title", "description", "modalContent", "videoUrl", "routeMemo"])
    import Modal from "../components/modal.vue";
    import {ref} from "vue";
    
    const stateModal = ref(false);
    const openModal = () => {stateModal.value = true}; // Логика открытия модалки с подробной информацией о лекции
</script>

<template>
    <section class="w-11/12 max-w-[1200px] bg-white min-h-[475px] sm:h-[auto] mx-auto my-12 rounded-[clamp(20px,5vw,50px)] p-[clamp(24px,4vw,48px)] flex flex-wrap gap-6 lg:flex-nowrap lg:flex-row lg:justify-between">
      <div class="w-full lg:w-1/2 flex flex-col gap-4">
        <p class="textik helvetica-500 bg-[#b8cafb] py-[clamp(1px,1vw,5px)] px-[clamp(2px,2vw,20px)] w-max rounded-xl lg:rounded-3xl dark:bg-[#FFE576]">
          лекция {{number}}
        </p>
        <h2 class="helvetica-700 title-2">
          {{title}}
        </h2>
        <p class="helvetica-400 textik ">
          {{ description }}
        </p>
        <a class="helvetica-400 underline cursor-pointer text-[clamp(14px,3vw,20px)] leading-3 mt-auto z-10" @click="openModal">
          Подробнее
        </a>
      </div>

      <div class="w-full lg:w-1/2 flex flex-col gap-4 justify-between lg:pl-10 ">
        <div class="block h-4/5 min-h-[170px] text-center bg-gray-200 rounded-[clamp(5px,3vw,50px)] cursor-pointer">
          Блок с видео {{ videoUrl }}
        </div>
        <router-link :to="routeMemo" class="helvetica-400 h-[5%] text-[clamp(20px,5vw,27px)] leading-[clamp(12px,2vw,35px)] underline rounded-lg cursor-pointer lg:pl-7">
          Памятка о лекции
        </router-link>
      </div>
    </section>
    <Modal v-if="stateModal === true" :content="modalContent" :closeModal="() => stateModal = false"/>
</template>

<style scoped>
  .subtitle{
    font-size: clamp(16px, 4vw, 27px);
    line-height: clamp(22px, 4vw, 33px);
  }

  .textik{
    font-size: clamp(16px,4vw,20px);
  }
</style>