<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import bibaSVG from "../assets/images/biba.svg";
import bobaSVG from "../assets/images/boba.svg";
import wellNowBecomeClearer1 from "../assets/images/dialog-2/well-now-become-clearer-1.svg";
import cleverAndComplicated2 from "../assets/images/dialog-2/clever-and-complicated-2.svg";
import itWasEasierWithBatons3 from "../assets/images/dialog-2/it-was-easier-with-batons-3.svg";


const sctin = ref(null);
const biba = ref(null);
const boba = ref(null);
const images = ref([]); // Создадим массив ссылок на картинки
const messages = ref(null);

const handleScroll = () => {
  const windowWidth = window.innerWidth;
  let scrollPercent = 0;


    const section = sctin.value;
    const masges = messages.value;
    const bibaEl = biba.value;
    const bobaEl = boba.value;
    // Получаем координаты секции относительно окна
    const sectionRect = section.getBoundingClientRect();
    const sectionTop = sectionRect.top;
    const sectionHeight = sectionRect.height;
    const windowHeight = window.innerHeight;
    //Определяем, когда скролл достигает компонента
    // if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
    //Вычисляем процент прокрутки всего компонента
    scrollPercent = Math.min(Math.max(1 - (sectionHeight + sectionTop - windowHeight) / sectionHeight, 0), 1);
    // bibaEl.classList.remove("hidden")
    // bobaEl.classList.remove("hidden")
    // Управление прозрачностью biba и boba
    if (scrollPercent > 0.375 && scrollPercent < 1) {
        bibaEl.style.opacity = Math.min(scrollPercent * 1.75, 1);
        bobaEl.style.opacity = Math.min(scrollPercent * 1.75, 1);
    } else {
        bibaEl.style.opacity = 0;
        bobaEl.style.opacity = 0;
    }
      
    masges.style.marginLeft = "auto";
    masges.style.marginRight = "auto";

    // Управление показом картинок
    const imgEls = images.value;
    if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
      bibaEl.classList.remove("hidden")
      bobaEl.classList.remove("hidden")
      // Первая картинка: 0.375 < scrollPercent < 0.600
      if (scrollPercent > 0.375 && scrollPercent < 0.600) {
          imgEls[0].style.opacity = 1;
          imgEls[0].style.scale = 1;
      } else {
          imgEls[0].style.opacity = 0;
          imgEls[0].style.scale = 0.75;
      }

      // Вторая картинка: 0.500 < scrollPercent < 0.600
      if (scrollPercent > 0.600 && scrollPercent < 0.85) {
          imgEls[1].style.opacity = 1;
          imgEls[1].style.scale = 1;
      } else {
          imgEls[1].style.opacity = 0;
          imgEls[1].style.scale = 0.75;
      }

      // Третья картинка: 0.600 < scrollPercent < 0.800
      if (scrollPercent > 0.675 && scrollPercent < 0.9) {
          imgEls[2].style.opacity = 1;
          imgEls[2].style.scale = 1;
      } else {
          imgEls[2].style.opacity = 0;
          imgEls[2].style.scale = 0.75;
      }
    }else{
      bibaEl.classList.add("hidden")
      bobaEl.classList.add("hidden")
    }
};

onMounted(() => {
  images.value = document.querySelectorAll(".image2"); // Сохраним ссылки на все изображения
  handleScroll(); // Чтобы картинки появлялись, если страница перезагружается
  window.addEventListener("scroll", handleScroll); // Подписываемся на событие скролла
});

// Очищаем событие скролла при размонтировании компонента
onBeforeUnmount(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <section ref="sctin" class="w-11/12 max-w-[1200px] sectionHeight sm:h-[500px] md:h-[1000px] lg:h-[1100px] xl:h-[1400px] mx-auto flex justify-around relative">
    <img ref="biba" :src="bibaSVG" class="w-[clamp(80px,16%,195px)] h-fit biba -rotate-6 sm:-rotate-12 lg:rotate-0 transition-opacity" />
    <div ref="messages" class="w-4/5 sm:w-3/5 lg:mx-auto sm:mt-40 md:mt-48 lg:mt-20 z-10">
        <img :src="wellNowBecomeClearer1" class="w-[95%] mt-10 sm:m-[2.5%] opacity-0 image2 image-dark-mode" />
        <img :src="cleverAndComplicated2" class="w-[76%] mt-20 sm:m-[2.5%] mr-auto opacity-0 image2" />
        <img :src="itWasEasierWithBatons3" class="w-[76%] m-[2.5%] mr-auto opacity-0 image2" />
    </div>
    <img ref="boba" :src="bobaSVG" class="w-[clamp(80px,16%,171px)] h-fit boba rotate-6 sm:rotate-12 lg:rotate-0 transition-opacity" />
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
    .image2 {
        transition: all 0.3s ease;
    }

    @media (prefers-color-scheme: dark) {
      .image-dark-mode {
        filter: sepia(97%) brightness(84%) saturate(190%) contrast(125%); 
      }
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
        .biba {right: 80%; top:56%}
        .boba {left: 79%; top:60%}
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
