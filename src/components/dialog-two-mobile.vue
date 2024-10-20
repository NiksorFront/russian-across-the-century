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

const handleScroll = () => {
  const windowWidth = window.innerWidth;
  let scrollPercent = 0;

  const section = sctin.value;
    const bibaEl = biba.value;
    const bobaEl = boba.value;
    const imgEls = images.value;

    // Получаем координаты секции относительно окна
    const sectionRect = section.getBoundingClientRect();
    const sectionTop = sectionRect.top;
    const sectionHeight = sectionRect.height;
    const windowHeight = window.innerHeight;

    //Определяем, когда скролл достигает компонента
    if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
      bibaEl.classList.remove("hidden")
      bobaEl.classList.remove("hidden")
      imgEls.forEach(imgEl => imgEl.classList.remove("hidden"));
      //Вычисляем процент прокрутки всего компонента
      scrollPercent = Math.min(Math.max((1 - (sectionHeight + sectionTop - windowHeight) / sectionHeight) - 0.3 , 0), 1);

      // Управление прозрачностью biba и boba
      if (scrollPercent > 0.275 && scrollPercent < 0.875) {
        bibaEl.style.opacity = Math.min(scrollPercent * 2.5, 1);
        bobaEl.style.opacity = Math.min(scrollPercent * 2.5, 1);
      } else {
        bibaEl.style.opacity = 0;
        bobaEl.style.opacity = 0;
      }
    

      // Управление показом картинок
      
      // Первая картинка: 0.375 < scrollPercent < 0.600
      if (scrollPercent > 0.275 && scrollPercent < 0.600) {
        imgEls[0].style.opacity = 1;
        imgEls[0].style.scale = 1;
        bibaEl.style.opacity = 0;
      } else {
        imgEls[0].style.opacity = 0;
        imgEls[0].style.scale = 0.75;
      }

      // Третья картинка: 0.600 < scrollPercent < 0.800
      if (scrollPercent > 0.600 && scrollPercent < 0.875) {
        imgEls[1].style.opacity = 1;
        imgEls[1].style.scale = 1;
        imgEls[2].style.opacity = 1;
        imgEls[2].style.scale = 1;
        bobaEl.style.opacity = 0;
      } else {
        imgEls[1].style.opacity = 0;
        imgEls[1].style.scale = 0.75;
        imgEls[2].style.opacity = 0;
        imgEls[2].style.scale = 0.75;
      }
    }else{
      bibaEl.classList.add("hidden")
      bobaEl.classList.add("hidden")
      imgEls.forEach(imgEl => imgEl.classList.add("hidden"));
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
  <section ref="sctin" class="w-11/12 max-w-[1200px] sectionHeight mx-auto flex justify-around relative">
    <img ref="biba" :src="bibaSVG" class="w-[clamp(80px,16%,195px)] h-fit biba -rotate-6 sm:-rotate-12 lg:rotate-0 opacity-0 transition-opacity duration-300 hidden" />
    
    <img :src="wellNowBecomeClearer1" class="w-[clamp(100px,70vw,500px)] mt-10 top-[33%] right-[20vw] image2 image-dark-mode fixed hidden" />
    <div class="top-[30%] left-[21vw] fixed">
      <img :src="cleverAndComplicated2" class="w-[clamp(100px,58vw,500px)] image2 hidden" />
      <img :src="itWasEasierWithBatons3" class="w-[clamp(100px,58vw,500px)] image2 mt-1 sm:mt-3 hidden" />
    </div>

    <img ref="boba" :src="bobaSVG" class="w-[clamp(80px,16%,171px)] h-fit boba rotate-6 sm:rotate-12 lg:rotate-0 opacity-0 transition-opacity duration-300 hidden" />
  </section>
</template>

<style scoped>
   .biba {
        position: fixed;
        top: 40%;
        right: 76%;
    }
    .boba {
        position: fixed;
        top: 42%;
        left: 75%;
    }
    .image2{
        transition: all 0.3s ease;
        object-fit: contain;
        opacity: 0;
    }
    
    @media (prefers-color-scheme: dark) {
      .image-dark-mode{
        filter: sepia(97%) brightness(84%) saturate(190%) contrast(125%); 
      }
    }

    @keyframes scaleImage {
        0% {transform: scale(0.5);}
        100% {transform: scale(1);}
    }

    .sectionHeight{
        min-height: clamp(575px, 150vw, 1200px);
        margin-top: clamp(20px, 75vw, 400px);
    }

    @media(min-width:400px){
        .biba {right: 78%; top:45%}
        .boba {left: 76%; top:45%}
        .sectionHeight{margin-top:200px; margin-bottom: clamp(20px, 20vw,250px);}
    }
</style>
