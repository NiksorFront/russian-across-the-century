<script setup>
import { ref, onMounted } from 'vue';
import gradient from "../assets/images/gradient.svg";

// Принятие свойств через defineProps
const props = defineProps({
  title: String,
  items: Array
});

// Состояния для модального окна
const showModal = ref(false);
const currentItem = ref(null);

// Слайдер переменные
const slider = ref(null);
const isDragging = ref(false); // Для управления мышкой
let startX;
let scrollLeft;

// Состояния для стрелок
const canScrollLeft = ref(false);
const canScrollRight = ref(false);

// Открытие модального окна
const openModal = (item) => {
  currentItem.value = item;
  showModal.value = true;
};

// Закрытие модального окна
const closeModal = () => {
  showModal.value = false;
};

// Логика для переключения слайдов (стрелки)
const nextSlide = () => {
  slider.value.scrollLeft += slider.value.offsetWidth;
};

const prevSlide = () => {
  slider.value.scrollLeft -= slider.value.offsetWidth;
};

// Логика для скролла мышью (перетаскивание)
const startDrag = (e) => {
  if (e.type === 'touchstart') return; // Игнорируем, если это тач-событие
  e.target.classList.add('cursor-grabbing');
  isDragging.value = true;
  slider.value.classList.remove('scroll-smooth'); // Отключаем плавность
  startX = e.pageX;
  scrollLeft = slider.value.scrollLeft;
};

const endDrag = (e) => {
  if (e.type === 'touchend') return; // Игнорируем, если это тач-событие
  e.target.classList.remove('cursor-grabbing');
  isDragging.value = false;
  slider.value.classList.add('scroll-smooth'); // Включаем плавность
};

const drag = (e) => {
  if (!isDragging.value || e.type === 'touchmove') return; // Игнорируем тач-событие
  const x = e.pageX;
  const walk = (x - startX) * 1.5; // Скорость прокрутки
  slider.value.scrollLeft = scrollLeft - walk;
};

// Логика для тач-событий (тачскролл)
const startTouch = (e) => {
  startX = e.touches[0].pageX;
  scrollLeft = slider.value.scrollLeft;
};

const moveTouch = (e) => {
  const x = e.touches[0].pageX;
  const walk = (x - startX) * 1.5;
  slider.value.scrollLeft = scrollLeft - walk;
};

// Проверка возможности скролла
const checkScroll = () => {
  const maxScrollLeft = slider.value.scrollWidth - slider.value.clientWidth;

  // Проверяем, можно ли скроллить влево
  canScrollLeft.value = slider.value.scrollLeft > 0;

  // Проверяем, можно ли скроллить вправо
  canScrollRight.value = slider.value.scrollLeft < maxScrollLeft;
};

// Выполняем проверку при монтировании компонента
onMounted(() => {
  checkScroll();
});
</script>

<template>
  <div class="w-full overflow-hidden relative mt-[clamp(45px,7vw,90px)]">
    <!-- Заголовок -->
    <h2 class="title-2 helvetica-700 dark:text-white ml-[3.15%] my-3 sm:my-6">{{ title }}</h2>

    <!-- Левая стрелка -->
    <button v-if="canScrollLeft" @click="prevSlide" class="absolute left-0 lg:-left-2 top-[52%] sm:top-[55%] z-10 p-2">
      <svg class="w-5 lg:w-7 rotate-180 fill-black dark:fill-slate-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.67 42.79"> 
        <path d="m0 35.38 13.33-14.33L.19 6.92 6.63 0l20.03 21.53L6.88 42.79 0 35.38Z"/>
      </svg>
    </button>

    <!-- Слайдер -->
    <div class="flex items-center blur-border">
      <ul
        class="flex w-full overflow-x-scroll snap-x snap-mandatory scroll-smooth cursor-grab"
        ref="slider"
        @mousedown="startDrag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
        @mousemove="drag"
        @touchstart="startTouch"
        @touchmove="moveTouch"
        @touchend="endDrag"
        @scroll="checkScroll"
      >
        <li
          v-for="(item, index) in items"
          :key="index"
          class="flex-shrink-0 w-[clamp(250px,50vw,370px)] h-[clamp(293px,50vw,350px)] relative rounded-[clamp(20px,2vw,45px)] mx-[3.15%] sm:mr-0 my-3 bg-white snap-center"
        >
          <h3 class="w-4/5 sm:w-2/3 mx-auto sm:ml-8 h-10 sm:h-[70px] mt-6 textik helvetica-700">{{ item.title }}</h3>
          <img v-if="item.image" :src="item.image" alt="Image" @mousedown="(e) => e.preventDefault()" class="w-10/12 h-fit object-cover aspect-for-img rounded-[clamp(10px,0.5vw,40px)] mx-auto" />
          <button 
            v-if="item.modalText"
            @click="openModal(item)"
            class="w-[clamp(39px,7vw,57px)] h-[clamp(39px,7vw,57px)] bg-[#101fb3] absolute -top-2.5 -right-2.5 rounded-full rotate-45" >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="5975 5062.5888671875 59 59">
                <path fill="#0C27AF" fill-opacity="1" stroke="" stroke-opacity="1" stroke-width="1" fill-rule="evenodd" id="tSvg12877558042" d="M 6004.499825306921 5063.588845863561 C 6004.499825306921 5063.588845863561 C 6004.499825306921 5063.588845863561 C 6004.499825306921 6032.999825306921 C 5063.588845863561 C 6032.999825306921 C 5063.588845863561 C 6032.999825306921 Z"></path>
              </svg>
          </button>
        </li>
        <!-- Мини костыль -->
        <span class="ml-[2.5%]"></span>
      </ul>
    </div>

    <!-- Правая стрелка -->
    <button v-if="canScrollRight" @click="nextSlide" class="absolute right-0 lg:-right-2 top-[52%] sm:top-[55%] z-10 p-2">
      <svg class="w-5 lg:w-7 fill-black dark:fill-slate-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.67 42.79">
        <path d="m0 35.38 13.33-14.33L.19 6.92 6.63 0l20.03 21.53L6.88 42.79 0 35.38Z"/>
      </svg>
    </button>

    <!-- Модальное окно -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 class="text-2xl mb-4">{{ currentItem.title }}</h2>
        <p>{{ currentItem.modalText }}</p>
        <button @click="closeModal" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Закрыть
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .scroll-smooth {
    scroll-behavior: smooth;
  }

  .blur-border {
    mask-image: url("../assets/images/gradient.svg");
    mask-repeat: no-repeat;
    mask-position: right;
    mask-size: cover;
  }

  .aspect-for-img {
    margin-top: 10px;
    aspect-ratio: 20/19;
  }

  @media (min-width: 490px) {
    .aspect-for-img {
      aspect-ratio: auto;
      margin-top: 30px;
    }
  }

  @media (min-width: 640px) {
    .aspect-for-img {
      margin-top: 0;
    }
  }

  ul {
    scroll-snap-type: x mandatory;
    scrollbar-width: none; /* Firefox */
  }

  ul::-webkit-scrollbar {
    display: none; /* Chrome */
  }

  li {
    scroll-snap-align: center;
  }

  .cursor-grabbing {
    cursor: grabbing;
  }
</style>
