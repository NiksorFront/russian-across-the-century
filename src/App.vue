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
      <a href="#" class="text-xs md:text-base lg:text-xl text-blue-700 helvetica-500 text-nowrap">анимационные лекции </a>
      <p class="text-xs md:text-base lg:text-xl helvetica-500 whitespace-pre"> | памятки</p>
    </div>
  </header>
  <main>
    <section class="flex w-11/12 max-w-[1200px] h-[720px] sm:h-[800px] lg:h-[700px] flex-wrap mx-auto mt-[35px] gap-9 sm:gap-4 lg:gap-0 lg:flex-row-reverse">
      <div class="w-full h-1/2 lg:h-full sm:h-3/5 bg-slate-300 lg:w-2/5">
        <p>тут будет анимашка</p>
      </div>
      <div class="w-full lg:w-3/5 h-1/2 sm:h-3/5 lg:h-fit lg:my-auto flex flex-wrap flex-col lg:flex-row gap-4 sm:gap-8 lg:gap-0 lg:space-y-12 lg:translate-y-6">
        <h1 class="title helvetica-700 lg:h-1/6 lg:ml-3">Россия: право сквозь века</h1>
        <h3 class="subtitle helvetica-500 h-fit w-2/3 lg:w-3/5 lg:ml-3">Как менялось право в России: от древности до наших дней</h3>
        <a class="button text-nowrap helvetica-500 h-fit w-fit lg:w-1/4 px-4 lg:px-6 text-center lg:mx-auto lg:box-content bg-blue-700 sm:pb-1 rounded-xl sm:rounded-3xl text-white lg:-translate-x-6">в путь!</a>
      </div>
    </section>
    
  </main>

  <img :src="bgWhite" class="fixed top-0 left-0 w-screen h-screen object-cover -z-10"/>
</template>

<style scoped>
  .title{
    font-size: clamp(42px, 9vw, 64px);
    line-height: clamp(40px, 9vw, 64px);
  }

  .subtitle{
    font-size: clamp(16px, 4vw, 27px);
    line-height: clamp(20px, 4vw, 33px);
  }

  .button{
    font-size: clamp(19px, 5vw, 50px);
    line-height: clamp(32px, 6vw, 50px);
  }

  @media(min-width: 1280px){
    .title{
      font-size: 90px;
      line-height: 90px;
    }

    .button{
      font-size: 50px;
      line-height: 66px;
    }
  }
</style>
