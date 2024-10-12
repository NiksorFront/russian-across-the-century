<script setup>
    import Header from "../components/header.vue";
    import bibaFull from "../assets/images/biba-full.svg";
    import historicalFigure from "../assets/images/historical-figure.svg";
</script>

<template>
     <Header/>
     <main>
        <section class="w-11/12 max-w-[1200px] flex flex-wrap flex-col lg:flex-row mx-auto my-12 lg:my-20">
            <div class="w-full lg:w-3/5 h-1/2 sm:h-3/5 lg:h-fit lg:mb-56 flex flex-wrap flex-col sm:flex-row gap-4 sm:gap-8">
                <span ref="wayBtn" class="subtitle text-nowrap helvetica-500 h-fit w-fit px-[clamp(16px,3.25vw,20px)] py-[clamp(4px,1.5vw,10px)] rounded-[clamp(10px,2.5vw,16px)] text-center bg-[#101fb3] text-white dark:bg-[#FF4800]">памятка</span>
                <h3 class="subtitle helvetica-400 h-fit my-auto dark:text-white">Россия: право сквозь века</h3>
                <h1 class="title helvetica-700 -mt-2 lg:h-1/6 max-w-[550px] dark:text-white">Древнерусское право</h1>
            </div>
            <div class="w-full lg:w-2/5 min-w-80 min-h-[310px] sm:min-h-[285px] -mt-3 relative overflow-y-hidden lg:overflow-y-visible -z-10">  
                <img :src="bibaFull" alt="биба в полный рост" className="biba-pos h-[clamp(320px,50vw,440px)] lg:h-[clamp(440px,43vw,525px)] object-contain absolute z-10"/>
                <img :src="historicalFigure" alt="историческая фигура" className="historical-pos translate-x-1 h-[clamp(650px,98vw,820px)] lg:h-[clamp(820px,80vw,1005px)] object-contain absolute"/>
            </div>
            <div class="w-full -translate-y-4 bg-white min-h-[475px] lg:min-h-[390px] h-fit rounded-[clamp(20px,5vw,50px)] p-[clamp(24px,4vw,50px)]">
                <p class="w-full helvetica-400 line-height subtitle">
                    Правовые отношения появились на Руси очень давно — вместе с зачатками государственности и самыми ранними общественными институтами. Но обычаи и законы той эпохи были очень специфическими по меркам современности. Например, кровная месть считалась нормой, к вору привязывали украденное, а судебные споры решали с оружием в руках.
                    <br><br>
                    В этой памятке собрали главные факты из истории древнерусского права — ответы на «стыдные» вопросы о власти, правовых обычаях и судах.
                </p>
                <!-- <p class="w-full helvetica-400 subtitle">
                    В этой памятке собрали главные факты из истории древнерусского права — ответы на «стыдные» вопросы о власти, правовых обычаях и судах.
                </p> -->
            </div>
        </section>
     </main>
</template>

<style scoped>
    .historical-pos{
        top: 0;
        right: 1vw;
    }

    .biba-pos{
        right: 33vw;
        top: 53px;
    }

    @media (min-width: 400px) {
        .biba-pos{right: 25vw;}
    }

    @media (min-width: 640px) {
        .biba-pos{right: 1.5vw; top: 47px;}
        .historical-pos{right: 15vw;}
    }

    @media (min-width: 1024px) {
        .biba-pos{right: 0; top: 74px;}
        .historical-pos{top: -12px; right: 8.1vw;}
    }

    @media (min-width: 1280px) {
        .biba-pos{right: 13.6%; top:93px;}
        .historical-pos{top: 10px; right: 43%;}
    }
</style>