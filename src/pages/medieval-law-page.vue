<script setup>
    import Header from "../components/header.vue";
    import bogatyr from "../assets/images/bogatyr.svg";
    import yakuza from "../assets/images/yakuza.svg";
</script>

<template>
     <Header/>
     <main>
        <section class="w-11/12 max-w-[1200px] flex flex-wrap flex-col lg:flex-row mx-auto my-12 lg:my-20">
            <div class="w-full lg:w-3/5 h-1/2 sm:h-3/5 lg:h-fit lg:mb-56 flex flex-wrap flex-col sm:flex-row gap-4 sm:gap-8">
                <span ref="wayBtn" class="subtitle text-nowrap helvetica-500 h-fit w-fit px-[clamp(16px,3.25vw,20px)] py-[clamp(4px,1.5vw,10px)] rounded-[clamp(10px,2.5vw,16px)] text-center bg-[#101fb3] text-white dark:bg-[#FF4800]">памятка</span>
                <h3 class="subtitle helvetica-400 h-fit my-auto dark:text-white">Россия: право сквозь века</h3>
                <h1 class="title helvetica-700 -mt-2 lg:h-1/6 max-w-[550px] dark:text-white">Средневековое право</h1>
            </div>
            <div class="w-full lg:w-2/5 min-w-80 min-h-[310px] sm:min-h-[285px] -mt-3 relative overflow-y-hidden lg:overflow-y-visible -z-10">  
                <img :src="bogatyr" alt="богатырь" className="bogatyr-pos h-[clamp(280px,55vw,540px)] object-contain absolute z-10"/>
                <img :src="yakuza" alt="якудза" className="yakuza-pos h-[clamp(315px,60vw,580px)] object-contain absolute"/>
            </div>
            <div class="w-full -translate-y-4 bg-white h-fit rounded-[clamp(20px,5vw,50px)] p-[clamp(24px,4vw,50px)]">
                <p class="w-full helvetica-400 line-height subtitle">
                    За четыре века Русь превратилась из «лоскутного одеяла» маленьких враждующих княжеств в централизованную монархию. Настолько же длинный путь прошла ее правовая система — от разрозненных обычаев до обширного всенародно принятого Соборного уложения.
                </p>
            </div>
        </section>
     </main>
</template>

<style scoped>
    .yakuza-pos{
        top: -3vw;
        right: -2.5vw;
    }

    .bogatyr-pos{
        right: 29.5vw;
        top: 30px;
    }

    @media (min-width: 450px) {
        .bogatyr-pos{right: 20vw;}
    }

    @media (min-width: 640px) {
        .bogatyr-pos{top: 0; right: 19vw;}
        .yakuza-pos{right: -21px; top: -30px;}
    }

    @media (min-width: 1024px) {
        .bogatyr-pos{right: 36%; top: -70px;}
        .yakuza-pos{top: -125px; right: -10px;}
    }

    @media (min-width: 1280px) {
        .bogatyr-pos{top:45px;}
        .yakuza-pos{top: -10px; right: 0;}
    }
</style>