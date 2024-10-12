<script setup>
    import Header from "../components/header.vue";
    import curlyPerson from "../assets/images/curly.svg";
    import thinkingPerson from "../assets/images/thinking.svg";
</script>

<template>
     <Header/>
     <main>
        <section class="w-11/12 max-w-[1200px] flex flex-wrap flex-col lg:flex-row mx-auto my-12 lg:my-20">
            <div class="w-full lg:w-3/5 h-1/2 sm:h-3/5 lg:h-fit lg:mb-32 flex flex-wrap flex-col sm:flex-row gap-4 sm:gap-8">
                <span ref="wayBtn" class="subtitle text-nowrap helvetica-500 h-fit w-fit px-[clamp(16px,3.25vw,20px)] py-[clamp(4px,1.5vw,10px)] rounded-[clamp(10px,2.5vw,16px)] text-center bg-[#101fb3] text-white dark:bg-[#FF4800]">памятка</span>
                <h3 class="subtitle helvetica-400 h-fit my-auto dark:text-white">Россия: право сквозь века</h3>
                <h1 class="title helvetica-700 -mt-2 lg:h-1/6 max-w-[550px] dark:text-white">Право в Российской империи</h1>
            </div>
            <div class="w-full lg:w-2/5 min-w-80 min-h-[270px] sm:min-h-[285px] -mt-3 relative overflow-y-hidden lg:overflow-y-visible -z-10">  
                <img :src="thinkingPerson" alt="задумчевый парень" className="thinking-pos h-[clamp(285px,59vw,540px)] object-contain absolute"/>
                <img :src="curlyPerson" alt="кудрявый чел" className="curly-pos h-[clamp(285px,56vw,510px)] object-contain absolute"/>
            </div>
            <div class="w-full -translate-y-4 bg-white h-fit rounded-[clamp(20px,5vw,50px)] p-[clamp(24px,4vw,50px)]">
                <p class="w-full helvetica-400 line-height subtitle">
                    Став империей при Петре I, Россия обратилась к европейской модели развития и — по крайней мере на уровне высших сословий — сменила бороды на парики, взяв курс на просвещенный абсолютизм. Хотя на протяжении следующих двух столетий российская монархия оставалась самодержавной, внутри ее правовой системы успели созреть такие институты и принципы, которыми мы пользуемся до сих пор.
                </p>
            </div>
        </section>
     </main>
</template>

<style scoped>
    .curly-pos{
        top: -4vw;
        right: 0;
    }

    .thinking-pos{
        right: 29.5vw;
        top: 10px;
    }

    @media (min-width: 450px) {
        .thinking-pos{right: 20vw;}
    }

    @media (min-width: 640px) {
        .thinking-pos{top: -10px; right: 16vw;}
        .curly-pos{right: -26px; top: -30px;}
    }

    @media (min-width: 1024px) {
        .thinking-pos{right: 45%; top: 0;}
        .curly-pos{top: -10px; right:28px}
    }
</style>