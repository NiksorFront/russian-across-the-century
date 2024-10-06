<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import bibaSVG from "../assets/images/biba.svg";
import bobaSVG from "../assets/images/boba.svg";
import howResolveDispute1 from "../assets/images/dialog-1/how-resolve-dispute-1.png";
import goOutFieldFight2 from "../assets/images/dialog-1/go-out-field-fight-2.svg";
import whatCenturyAreYouFrom3 from "../assets/images/dialog-1/what-century-are-you-from-3.svg";
import thereLawsNow4 from "../assets/images/dialog-1/there-laws-now-4.svg";
import whatIsLegislation5 from "../assets/images/dialog-1/what-is-legislation-5.svg";
import listenYouDarkHead6 from "../assets/images/dialog-1/listen-you-dark-head-6.svg";

const sctin = ref(null);
const biba = ref(null);
const boba = ref(null);
const images = ref([]); // Создадим массив ссылок на картинки

const handleScroll = () => {
  const section = sctin.value;
  const bibaEl = biba.value;
  const bobaEl = boba.value;
  
  // Получаем координаты секции относительно окна
  const sectionRect = section.getBoundingClientRect();
  const sectionTop = sectionRect.top;
  const sectionHeight = sectionRect.height;
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  let scrollPercent = 0;

  //Определяем, когда скролл достигает компонента
  if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
    console.log(Math.min(Math.max((1 - (sectionHeight + sectionTop - windowHeight) / sectionHeight)-0.5 , 0), 1));
    //Вычисляем процент прокрутки всего компонента
    if(windowWidth < 640){
        scrollPercent = Math.min(Math.max((1 - (sectionHeight + sectionTop - windowHeight) / sectionHeight) - 0.5, 0), 1);
    }else if(windowWidth < 1024){
        scrollPercent = Math.min(Math.max((1 - (sectionHeight + sectionTop - windowHeight) / sectionHeight) - 0.3 , 0), 1);
    }
    else{
        scrollPercent = Math.min(Math.max(1 - (sectionHeight + sectionTop - windowHeight) / sectionHeight, 0), 1);
    }

    // Управление прозрачностью biba и boba
    if (scrollPercent > 0.375 && scrollPercent < 1) {
      bibaEl.style.opacity = Math.min(scrollPercent * 1.75, 1);
      bobaEl.style.opacity = Math.min(scrollPercent * 1.75, 1);
    } else {
      bibaEl.style.opacity = 0;
      bobaEl.style.opacity = 0;
    }

    // Управление показом картинок
    const imgEls = images.value;

    // Первая картинка: 0.375 < scrollPercent < 0.600
    if (scrollPercent > 0.375 && scrollPercent < 0.600) {
      imgEls[0].style.opacity = 1;
      imgEls[0].style.scale = 1;
    } else {
      imgEls[0].style.opacity = 0;
      imgEls[0].style.scale = 0.75;
    }

    // Вторая картинка: 0.500 < scrollPercent < 0.600
    if (scrollPercent > 0.500 && scrollPercent < 0.600) {
      imgEls[1].style.opacity = 1;
      imgEls[1].style.scale = 1;
    } else {
      imgEls[1].style.opacity = 0.2;
      imgEls[1].style.scale = 0.75;
    }

    // Третья картинка: 0.600 < scrollPercent < 0.800
    if (scrollPercent > 0.600 && scrollPercent < 0.800) {
      imgEls[2].style.opacity = 1;
      imgEls[2].style.scale = 1;
    } else {
      imgEls[2].style.opacity = 0.2;
      imgEls[2].style.scale = 0.75;
    }

    // Четвертая картинка: 0.700 < scrollPercent < 0.800
    if (scrollPercent > 0.700 && scrollPercent < 0.800) {
      imgEls[3].style.opacity = 1;
      imgEls[3].style.scale = 1;
    } else {
      imgEls[3].style.opacity = 0.2;
      imgEls[3].style.scale = 0.75;
    }

    // Пятая картинка: 0.800 < scrollPercent < 0.900
    if (scrollPercent > 0.800 && scrollPercent < 0.900) {
      imgEls[4].style.opacity = 1;
      imgEls[4].style.scale = 1;
    } else {
      imgEls[4].style.opacity = 0.2;
      imgEls[4].style.scale = 0.75;
    }

    // Шестая картинка: 0.900 < scrollPercent < 0.975
    if (scrollPercent > 0.900 && scrollPercent < 1) {
      imgEls[5].style.opacity = 1;
      imgEls[5].style.scale = 1;
    } else {
      imgEls[5].style.opacity = 0.2;
      imgEls[5].style.scale = 0.75;
    }
  }
};

onMounted(() => {
  images.value = document.querySelectorAll(".image"); // Сохраним ссылки на все изображения
  handleScroll(); // Чтобы картинки появлялись, если страница перезагружается
  window.addEventListener("scroll", handleScroll); // Подписываемся на событие скролла
});

// Очищаем событие скролла при размонтировании компонента
onBeforeUnmount(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <section ref="sctin" class="w-11/12 max-w-[1200px] sectionHeight sm:h-[750px] md:h-[1300px] lg:h-[1500px] xl:h-[1800px] mx-auto flex justify-around relative">
    <img ref="biba" :src="bibaSVG" class="w-[clamp(80px,16%,195px)] h-fit biba -rotate-6 sm:-rotate-12 lg:rotate-0 opacity-0 transition-opacity duration-300" />
    <div class="w-2/3 sm:w-3/5 mx-auto sm:mt-40 md:mt-96 lg:mt-40 xl:mt-60 z-10">
      <img :src="howResolveDispute1" class="w-[95%] m-[2.5%] opacity-0 image" />
      <img :src="goOutFieldFight2" class="w-[95%] m-[2.5%] opacity-0 image" />
      <img :src="whatCenturyAreYouFrom3" class="w-[69%] mr-[2.5%] ml-auto opacity-0 image" />
      <img :src="thereLawsNow4" class="w-[95%] m-[2.5%] opacity-0 image" />
      <img :src="whatIsLegislation5" class="w-[76%] m-[2.5%] opacity-0 image" />
      <img :src="listenYouDarkHead6" class="w-[70%] mr-[2.5%] ml-auto opacity-0 image" />
    </div>
    <img ref="boba" :src="bobaSVG" class="w-[clamp(80px,16%,171px)] h-fit boba rotate-6 sm:rotate-12 lg:rotate-0 opacity-0 transition-opacity duration-300" />
  </section>
</template>

<style scoped>
    .biba {
        position: fixed;
        top: 46%;
        right: 76%;
    }
    .boba {
        position: fixed;
        top: 50%;
        left: 75%;
    }
    .image {
        transition: all 0.3s ease;
    }

    @keyframes scaleImage {
        0% {transform: scale(0.5);}
        100% {transform: scale(1);}
    }

    .sectionHeight{
        min-height: clamp(575px, 135vw, 800px);
        margin-top: clamp(20px, 18vw,160px);
    }

    @media(min-width:400px){
        .biba {right: 80%; top:40%}
        .boba {left: 79%; top:41%}
        .sectionHeight{margin-top: clamp(20px, 45vw, 400px);}
    }

    @media(min-width:640px){
        .biba {top: 46%;}
        .boba {top: 50%;}
        .sectionHeight{min-height: clamp(800px, 155vw, 1000px); margin-top: 0}
    }

    @media(min-width:1024px){
        .biba {right: 82%; top: 46%;}
        .boba {left: 81%; top: 50%;}
    }

    @media(min-width:1280px){
        .biba {right: calc(50vw + 400px);}
        .boba {left: calc(50vw + 400px);}
    }
</style>
