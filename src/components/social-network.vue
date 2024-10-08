<script setup>
    const props = defineProps(["title", "description", "btnText", "url"])
</script>

<template>
    <div class="w-11/12 max-w-[1200px] bg-white min-h-[186px] sm:h-[auto] mx-auto my-5 rounded-[clamp(20px,5vw,50px)] py-[clamp(20px,3vw,42px)] px-[clamp(20px,3vw,50px)] flex flex-wrap gap-3 sm:gap-6 lg:flex-nowrap lg:flex-row lg:justify-between">
      <div class="w-full lg:w-1/2 flex flex-col gap-4">
        <h2 class="helvetica-700 title-3">
          {{title}}
        </h2>
        <p class="helvetica-400 textik leading-[clamp(22px,3vw,28px)]">
          {{ description }}
        </p>
      </div>

      <a :href="url" target="_blank" class="w-full h-fit lg:w-fit lg:ml-auto lg:my-auto px-8 py-2.5 sm:py-3.5 helvetica-700 bg-[#101fb3] text-white text-center text-nowrap text-[clamp(14px,2.5vw,27px)] rounded-[clamp(10px,2vw,30px)] cursor-pointer">
          {{btnText}}
      </a>
    </div>
</template>

<style scoped>

</style>