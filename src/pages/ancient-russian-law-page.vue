<script setup>
    import Header from "../components/header.vue";
    import bibaFull from "../assets/images/biba-full.svg";
    import historicalFigure from "../assets/images/historical-figure.svg";
    // import SliderWrapper from "../components/slider-wrapper.vue";
    import Slider from "../components/slider.vue";

    import image1 from "../assets/images/ancient-russian-law-page/1.jpg";
    import image2 from "../assets/images/ancient-russian-law-page/2.jpg";
    import image3 from "../assets/images/ancient-russian-law-page/3.jpg";

    import image4 from "../assets/images/ancient-russian-law-page/4.jpg";
    import image5 from "../assets/images/ancient-russian-law-page/5.jpg";
    import image6 from "../assets/images/ancient-russian-law-page/6.jpg";
    import image7 from "../assets/images/ancient-russian-law-page/7.jpg";

    import image8 from "../assets/images/ancient-russian-law-page/8.jpg";
    import image9 from "../assets/images/ancient-russian-law-page/9.jpg";
    import image10 from "../assets/images/ancient-russian-law-page/10.jpg";
    import image11 from "../assets/images/ancient-russian-law-page/11.jpg";
    import { onMounted } from "vue";

    const slides1 = [{title:"Как на Руси\nпоявилось государство?", image: image1, modalText:["Отправной точкой русской государственности считается призвание варягов — так на Руси называли выходцев из скандинавских племен. В 862 году некоторые славянские племена приглашают на княжение Рюрика, его братьев Синеуса и Трувора.", "Сторонники «норманнской» теории утверждают, что варяги сыграли решающую роль в формировании русской государственности. С этим согласны далеко не все исследователи, учитывая что сам Рюрик — фигура полулегендарная, о нем до сих пор довольно мало известно.", "Точная дата и даже век возникновения вечевых собраний неизвестны — ученые до сих пор об этом спорят."]}, 
                     {title:"В чьих руках\nбыла власть?", image: image2, modalText:["Жителям Древней Руси нужно было не только решать важные вопросы, но и защищаться от врагов. И никто не мог справиться с этим лучше, чем князья — профессиональные военные. Поэтому именно князья отвечали за порядок — причём как на границах государства, так и внутри него. За охрану территории они получали от населения что-то вроде зарплаты.", "Рюриковичи работали армией и полицией в одном лице, так что было логично поручить им задерживать и наказывать преступников. В итоге князья стали выполнять и роль суда."]}, 
                     {title:"Была ли на Руси\nдемократия?", image: image3, modalText:["Вече считается аналогом парламента в Древней Руси. С решениями этого органа приходилось считаться даже князьям. На вечевых собраниях прямым голосованием решались вопросы государственной важности: как торговать и собирать «налоги», кого пригласить на княжение и что делать с врагами. Некоторые исследователи считают, что в вече участвовала только знать, другие говорят, что на сход собирались все свободные жители, а третьи утверждают, что в каждой земле было по-разному.", "Точная дата и даже век возникновения вечевых собраний неизвестны — ученые до сих пор об этом спорят."]},]
                    //  {title:"", image: "", modalText:""}]
    const slides2 = [{title:"Где фиксировались\nзаконы?", image: image4, modalText:["Судебные решения князей вносились в сборники — так складывалось нечто вроде прецедентного права: записываем решение сейчас, чтобы в будущем опираться на него в аналогичной ситуации. Так князь поддерживал репутацию честного судьи, в том числе в глазах потомков."]}, 
                     {title:"А что насчет\nмеждународного права?", image: image5, modalText:["Договоры Руси с другими государствами, например с Византией, тоже легли в основу правовой системы Древней Руси. Эти документы относятся к X веку, некоторые из них сохранились в летописях. Один из таких документов — Закон Русский, который письменно закрепил правовые обычаи, ранее существовавшие только в устной форме."]}, 
                     {title:"Сила в Правде?", image: image6, modalText:["C правового кодекса князя Ярослава Мудрого (XI век) начала складываться Русская Правда — первый сборник законов Древней Руси. В основе Русской Правды лежат всё те же судебные решения по конкретным делам. Русская Правда закрепила основы судебного процесса. Например, то, что сейчас называется «формальной системой оценки доказательств»: нельзя просто объявить человека виновным — нужны объективные подтверждения в виде свидетельских показаний, улик, документов."]},
                     {title:"Случались ли\mреформы?", image: image7, modalText:["В XI веке сыновья Ярослава Мудрого не только «собирали» существующие законы, но и отказывались от устаревших норм. Они составили вторую часть Русской Правды, в которой, например, запретили кровную месть. В следующем столетии Русскую Правду вновь значительно переработали: в ней появилась ещё одна часть, Устав Владимира Мономаха."]},]
                    
    const slides3 = [{title:"А судьи кто?", image: image8, modalText:["Роль судей в большинстве уделов — почти самостоятельных феодальных государств Древней Руси — была возложена на князей. Их решения, собранные в уставы, кодексы и ту же Русскую Правду, работали как своего рода прецедентное право. В этой системе конкретное дело решается так, как решались похожие споры прошлом.", "Вече тоже могло выполнять роль суда, особенно если дело касалось преступлений против государства."]}, 
                     {title:"Как судили\nпо принципу талиона?", image: image9, modalText:["Справедливой в Древней Руси считалась кровная месть — это был распространенный обычай. Родственники убитого должны отомстить убийце — лишить жизни либо его самого, либо кого-то из его рода. В этом и заключался принцип талиона — буквальное прочтение ветхозаветной морали: «Око за око зуб за зуб»."]}, 
                     {title:"Насколько была\nсильна власть обычая?", image: image10, modalText:["В Древней Руси люди стремились сохранять обычай, так как это было понятной стратегией выживания. Обычаи во многом заменяли законы, но при этом могли быть довольно странными. Например, если кому-то удавалось поймать вора, то похищенное имущество нужно было привязать к нему. Для жителя Древней Руси в этом была своя логика: так любой прохожий мог увидеть, в чём заключалось преступление человека."]},
                     {title:"Что такое ордалии и\nпри чём тут «суд Божий»?", image: image11, modalText:["В общем смысле ордалии — это испытания случаем, который в представлении средневекового человека был выражением божественного промысла. Такие испытания могли принимать разные формы. Например, вас могли заставить взять рукой раскаленное железо, а потом по характеру ожогов устанавливать степень вины.", "На Руси главной формой ордалий было «поле» — поединок между сторонами. Эта процедура сохранялась вплоть до XVI века. «Поле» назначали во время судебного заседания: для этого требовалось согласие обеих сторон. Сражаться в «поле» могли и мужчины, и женщины. Выбор места, оружия, общий регламент определялись заранее. За соблюдением правил следили специальные судебные чиновники. Если кто-то из участников не приходил на поле, он считался проигравшим суд."]},]
    
    onMounted(() => window.scrollTo(0, 0));

</script>

<template>
     <Header/>
     <main>
        <section class="w-10/12 sm:w-11/12 max-w-[1200px] flex flex-wrap flex-col lg:flex-row mx-auto my-12 lg:my-20">
            <div class="w-full lg:w-3/5 h-1/2 sm:h-3/5 lg:h-fit lg:mb-56 flex flex-wrap flex-col sm:flex-row gap-4 sm:gap-8">
                <span ref="wayBtn" class="subtitle text-nowrap helvetica-500 h-fit w-fit px-[clamp(16px,3.25vw,20px)] py-[clamp(4px,1.5vw,10px)] rounded-[clamp(10px,2.5vw,16px)] text-center bg-[#101fb3] text-white dark:bg-[#FF4800]">памятка</span>
                <h3 class="subtitle helvetica-400 h-fit my-auto dark:text-white">Россия: право сквозь века</h3>
                <h1 class="title helvetica-700 -mt-2 lg:h-1/6 max-w-[550px] dark:text-white">Древнерусское право</h1>
            </div>
            <div class="w-full lg:w-2/5 min-h-[310px] sm:min-h-[285px] -mt-3 relative overflow-hidden lg:overflow-visible -z-10">  
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
        <section class="w-full max-w-[1280px] sm:mx-auto h-hit relative mt-[clamp(45px,7vw,90px)]">
            <Slider title="Государство и общество" :items="slides1"/>

            <Slider title="Правовая система" :items="slides2"/>
            
            <Slider title="Судебная система и судебный процесс" :items="slides3"/>

            <!-- <Slider title="Судебная система и судебный процесс" :items="slides3"/> -->
        </section>
     </main>
</template>

<style scoped>

    .historical-pos{
        top: 0;
        right: 2%;
    }

    .biba-pos{
        right: 35%;
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