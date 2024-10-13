<script setup>
    import Header from "../components/header.vue";
    import worker from "../assets/images/worker.svg"; //Рабочий
    import decided from "../assets/images/decided.svg"; //Решала
    import judge from "../assets/images/judge.svg"; //Судья
</script>

<template>
     <Header/>
     <main>
        <section class="w-11/12 max-w-[1200px] flex flex-wrap flex-col lg:flex-row mx-auto my-12 lg:my-20">
            <div class="w-full lg:w-3/5 h-1/2 sm:h-3/5 lg:h-fit lg:mb-56 xl:mb-52 flex flex-wrap flex-col sm:flex-row gap-4 sm:gap-8">
                <span ref="wayBtn" class="subtitle text-nowrap helvetica-500 h-fit w-fit px-[clamp(16px,3.25vw,20px)] py-[clamp(4px,1.5vw,10px)] rounded-[clamp(10px,2.5vw,16px)] text-center bg-[#101fb3] text-white dark:bg-[#FF4800]">памятка</span>
                <h3 class="subtitle helvetica-400 h-fit my-auto dark:text-white">Россия: право сквозь века</h3>
                <h1 class="title helvetica-700 -mt-2 lg:h-1/6 max-w-[550px] dark:text-white">Современное право</h1>
            </div>
            <div class="w-full lg:w-2/5 min-w-80 min-h-[310px] sm:min-h-[340px] -mt-3 relative overflow-hidden lg:overflow-visible -z-10">  
                <img :src="worker" alt="рабочий" className="worker-pos h-[clamp(300px,59vw,515px)] object-contain absolute z-10"/>
                <img :src="judge" alt="судья" className="judge-pos h-[clamp(300px,58vw,520px)] object-contain absolute z-10"/>
                <img :src="decided" alt="решала" className="decided-pos translate-x-1 h-[clamp(275px,55vw,475px)] object-contain absolute"/>
            </div>
            <div class="w-full -translate-y-4 bg-white lg:min-h-[360px] h-fit rounded-[clamp(20px,5vw,50px)] p-[clamp(24px,4vw,50px)]">
                <p class="w-full helvetica-400 line-height subtitle">
                    Более 30 лет назад Советский Союз прекратил свое существование, и Россия полностью сменила модель развития — в очередной раз за свою историю. Адаптируясь к резким изменениями государства и общества, правовая система корректировала одни механизмы на ходу, а другие буквально выстраивала с нуля. На базе собственного прошлого и мирового опыта российское право превратилось в разветвленную систему, которая сегодня влияет на нашу жизнь изо дня в день (даже если мы этого не замечаем).
                </p> 
                <!-- <p class="w-full helvetica-400 subtitle">
                    В этой памятке собрали главные факты из истории древнерусского права — ответы на «стыдные» вопросы о власти, правовых обычаях и судах.
                </p> -->
            </div>
        </section>
     </main>
</template>

<style scoped>
    .worker-pos{
        top: 25px;
        right: 36vw;
    }

    .judge-pos{
        right: 12vw;
        top: 70px;
    }

    .decided-pos{
        top: 25px;
        right: -6px;
    }



    @media (min-width: 640px) {
        .worker-pos{
            top: -10px;
            right: 28vw;
        }

        .judge-pos{
            right: 9vw;
            top: 37px;
        }

        .decided-pos{
            top: -10px;
            right: -5px;
        }
    }

    @media (min-width: 1024px) {
        .worker-pos{
            top: 12px;
            right: 16vw;
        }

        .judge-pos{
            right: 4vw;
            top: 80px;
        }

        .decided-pos{
            top: 25px;
            right: -25px;
        }
    }

    @media (min-width: 1280px) {
        .worker-pos{
            top: 0;
            right:57%;
        }

        .judge-pos{
            right: 29%;
            top: 57px;
        }

        .decided-pos{
            top: -5px;
            right: 14%;
        }
    }
</style>