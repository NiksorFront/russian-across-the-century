<script setup>
    import Header from "../components/header.vue";
    import gopnikOne from "../assets/images/gopnik-one.svg";
    import gopnikTwo from "../assets/images/gopnik-two.svg";
</script>

<template>
     <Header/>
     <main>
        <section class="w-11/12 max-w-[1200px] flex flex-wrap flex-col lg:flex-row mx-auto my-12 lg:my-20">
            <div class="w-full lg:w-3/5 h-1/2 sm:h-3/5 lg:h-fit lg:mb-40 xl:mb-28 flex flex-wrap flex-col sm:flex-row gap-4 sm:gap-8">
                <span ref="wayBtn" class="subtitle text-nowrap helvetica-500 h-fit w-fit px-[clamp(16px,3.25vw,20px)] py-[clamp(4px,1.5vw,10px)] rounded-[clamp(10px,2.5vw,16px)] text-center bg-[#101fb3] text-white dark:bg-[#FF4800]">памятка</span>
                <h3 class="subtitle helvetica-400 h-fit my-auto dark:text-white">Россия: право сквозь века</h3>
                <h1 class="title helvetica-700 -mt-2 lg:h-1/6 max-w-[550px] dark:text-white">Право в советской России</h1>
            </div>
            <div class="w-full lg:w-2/5 min-w-80 min-h-[270px] sm:min-h-[285px] -mt-3 relative overflow-y-hidden lg:overflow-y-visible -z-10 xl:-translate-y-8">  
                <img :src="gopnikOne" alt="интеллигентный советский гопник" className="gopnik-pos h-[clamp(285px,59vw,540px)] object-contain absolute z-10"/>
                <img :src="gopnikTwo" alt="советский гопарь" className="intellectual-pos h-[clamp(285px,56vw,510px)] object-contain absolute"/>
            </div>
            <div class="w-full -translate-y-4 bg-white h-fit rounded-[clamp(20px,5vw,50px)] p-[clamp(24px,4vw,50px)]">
                <p class="w-full helvetica-400 line-height subtitle">
                    С 1917 года Россия прошла через крупнейшие военные конфликты, сменила несколько конституций и пережила десятки реформ, менявших сами основы государственного и общественного устройства. Все это нашло отражение в истории советского права, от первых большевистских декретов до горбачевской «перестройки».
                </p>
            </div>
        </section>
     </main>
</template>

<style scoped>
    .intellectual-pos{
        top: -2vw;
        right: 0;
    }

    .gopnik-pos{
        right: 29.5vw;
        top: 15px;
    }

    @media (min-width: 450px) {
        .gopnik-pos{right: 20vw;}
    }

    @media (min-width: 640px) {
        .gopnik-pos{top: 20px; right: 17vw;}
        .intellectual-pos{right: -26px; top: -10px;}
    }

    @media (min-width: 1024px) {
        .gopnik-pos{right: 40%; top: -10px;}
        .intellectual-pos{top: 0; right:0}
    }

    @media (min-width: 1280px) {
        .gopnik-pos{right: 53%; top: 30px;}
        .intellectual-pos{top: -20px; right:10%}
    }
</style>