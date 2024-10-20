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
  const imgEls = images.value;
  
  // Получаем координаты секции относительно окна
  const sectionRect = section.getBoundingClientRect();
  const sectionTop = sectionRect.top;
  const sectionHeight = sectionRect.height;
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  let scrollPercent = 0;

  //Определяем, когда скролл достигает компонента
  if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
    bibaEl.classList.remove("hidden")
    bobaEl.classList.remove("hidden")
    imgEls.forEach(imgEl => imgEl.classList.remove("hidden"));
    //Вычисляем процент прокрутки всего компонента
    if(windowWidth < 640){
        scrollPercent = Math.min(Math.max((1 - (sectionHeight + sectionTop - windowHeight) / sectionHeight) - 0.5, 0), 1);
    }else{ //windowWidth < 1024
        scrollPercent = Math.min(Math.max((1 - (sectionHeight + sectionTop - windowHeight) / sectionHeight) - 0.3 , 0), 1);
    }

    // Управление прозрачностью biba и boba
    bibaEl.style.opacity = Math.min(scrollPercent * 3, 1);
    bobaEl.style.opacity = 0;


    // Управление показом картинок

    // Первая и вторая картинки: 0.375 < scrollPercent < 0.600
    if (scrollPercent > 0.175 && scrollPercent < 0.400) {
      imgEls[0].style.opacity = scrollPercent*4;
      imgEls[0].style.scale = Math.min(scrollPercent*4, 1);
      imgEls[1].style.opacity = scrollPercent*4.2;
      imgEls[1].style.scale = Math.min(scrollPercent*4, 1);
    } else {
      imgEls[0].style.opacity = 0;
      imgEls[0].style.scale = 0.75;
      imgEls[1].style.opacity = 0;
      imgEls[1].style.scale = 0.75;
      bibaEl.style.opacity = 0;
    }

    // Третья и четвёртая картинка: 0.600 < scrollPercent < 0.800
    if (scrollPercent > 0.400 && scrollPercent < 0.625) {
      imgEls[2].style.opacity = 1;
      imgEls[2].style.scale = 1;
      imgEls[3].style.opacity = 1;
      imgEls[3].style.scale = 1;
      bobaEl.style.opacity = 1;
    } else {
      imgEls[2].style.opacity = 0;
      imgEls[2].style.scale = 0.75;
      imgEls[3].style.opacity = 0;
      imgEls[3].style.scale = 0.75;
    }


    // Пятая картинка: 0.800 < scrollPercent < 0.900
    if (scrollPercent > 0.625 && scrollPercent < 0.750) {
      imgEls[4].style.opacity = 1;
      imgEls[4].style.scale = 1;
      bibaEl.style.opacity = 1;
    } else {
      imgEls[4].style.opacity = 0;
      imgEls[4].style.scale = 0.75;
    }

    // Шестая картинка: 0.900 < scrollPercent < 0.975
    if (scrollPercent > 0.750 && scrollPercent < 0.875) {
      imgEls[5].style.opacity = 1;
      imgEls[5].style.scale = 1;
      bobaEl.style.opacity = 1;
    } else {
      imgEls[5].style.opacity = 0;
      imgEls[5].style.scale = 0.75;
    }
  }else{
    bibaEl.classList.add("hidden")
    bobaEl.classList.add("hidden")
    imgEls.forEach(imgEl => imgEl.classList.add("hidden"));
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
  <section ref="sctin" class="w-11/12 max-w-[1200px] sectionHeight mx-auto flex justify-around relative">
    <img ref="biba" :src="bibaSVG" class="w-[clamp(80px,16%,195px)] h-fit biba -rotate-6 sm:-rotate-12 lg:rotate-0 opacity-0 transition-opacity duration-300 hidden" />
    
    <div class="top-[30%] left-[20vw] fixed"> 
      <img :src="howResolveDispute1" class="w-[clamp(100px,70vw,500px)] image hidden" />
      <img :src="goOutFieldFight2" class="w-[clamp(100px,70vw,500px)] image mt-1 sm:mt-3 hidden" />
    </div>
    <div class="top-[30%] right-[21vw] fixed">
      <img :src="whatCenturyAreYouFrom3" class="w-[clamp(77px,54vw,385px)] image ml-auto image-dark-mode hidden" />
      <img :src="thereLawsNow4" class="w-[clamp(100px,70vw,500px)] image mt-1 sm:mt-3 image-dark-mode hidden" />
    </div>
    <img :src="whatIsLegislation5" class="w-[clamp(100px,57.5vw,495px)] image fixed top-[33%] left-[20vw] hidden" />
    <img :src="listenYouDarkHead6" class="w-[clamp(100px,58vw,500px)] image fixed top-[33%] right-[21vw] image-dark-mode hidden" />

    <img ref="boba" :src="bobaSVG" class="w-[clamp(80px,16%,171px)] h-fit boba rotate-6 sm:rotate-12 lg:rotate-0 opacity-0 transition-opacity duration-300 -z-10 hidden" />
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
    .image {
        transition: all 0.3s ease;
        object-fit: contain;
        opacity: 0;
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

    @media(min-width:400px){
        .biba {right: 78%; top:45%}
        .boba {left: 76%; top:45%}
    }

    .sectionHeight{
        height: max(1000px, 200vh);
        min-height: max(1000px, 200vh);
        margin-bottom: 400px;
    }
</style>
