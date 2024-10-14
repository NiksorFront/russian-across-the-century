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
  const isDragging = ref(false); // Для контроля перетаскивания
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

  // Логика для слайдера: переключение слайдов (для стрелок)
  const nextSlide = (scrollDelta) => {
    slider.value.scrollLeft += slider.value.offsetWidth/2 + scrollDelta;
  };

  const prevSlide = (scrollDelta) => {
    slider.value.scrollLeft -= slider.value.offsetWidth/2 + scrollDelta;
  };

  // Логика для перетаскивания (общая для тача и мыши)
  const startDrag = (e) => {
    // e.target.classList.add('cursor-grabbing');
    isDragging.value = true;
    slider.value.classList.remove('scroll-smooth'); // Отключаем плавность
    startX = e.pageX || e.touches[0].pageX;
    scrollLeft = slider.value.scrollLeft;
  };

  const endDrag = () => {
    isDragging.value = false;
    slider.value.classList.add('scroll-smooth'); // Включаем плавность
    // e.target.classList.remove('cursor-grabbing');

    // При завершении свайпа, корректируем позицию слайда
    const childrens = slider.value.querySelectorAll("li");
    const numSlides = childrens.length - 1; //Потому что 0 тоже считается
    const oneSlideWidth = childrens[0].offsetWidth + slider.value.offsetWidth * 0.063; //ширина + left и right margin'ы
    const scrollDelta = -(scrollLeft - slider.value.scrollLeft)*3;
    const currentSlide = scrollDelta/oneSlideWidth > numSlides-1 ? numSlides : Math.round(slider.value.scrollLeft/oneSlideWidth);
    slider.value.scrollLeft = oneSlideWidth * currentSlide ;
  };

  const drag = (e) => {
    if (!isDragging.value) return;
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX); // Прокрутка слайдов
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
    <button v-if="canScrollLeft" @click="prevSlide" class="absolute left-0 lg:-left-2 top-[52%] sm:top-[55%] z-10 p-2 opacity-0 sm:opacity-100">
      <svg class="w-5 lg:w-7 rotate-180 fill-black dark:fill-slate-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.67 42.79"> <path d="m0 35.38 13.33-14.33L.19 6.92 6.63 0l20.03 21.53L6.88 42.79 0 35.38Z"/></svg>
    </button>

    <!-- Слайдер -->
    <div class="flex items-center blur-border">

      <ul
        class="flex w-full overflow-x-hidden cursor-grab"
        ref="slider"
        @mousedown="startDrag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
        @mousemove="drag"
        @touchstart="startDrag"
        @touchend="endDrag"
        @touchmove="drag"
        @scroll="checkScroll"
        :class="{ 'scroll-smooth': !isDragging }"
      >
        <li
          v-for="(item, index) in items"
          :key="index"
          class="flex-shrink-0 w-[clamp(250px,50vw,370px)] h-[clamp(293px,50vw,350px)] relative rounded-[clamp(20px,2vw,45px)] mx-[3.15%] sm:mr-0 my-3 bg-white"
        >
          <h3 class="w-4/5 sm:w-2/3 mx-auto sm:ml-8 h-10 sm:h-[70px] mt-6 textik helvetica-700">{{ item.title }}</h3>
          <img v-if="item.image" :src="item.image" alt="Image" @mousedown.prevent class="w-10/12 h-fit object-cover aspect-for-img rounded-[clamp(10px,0.5vw,40px)] mx-auto" />
          <button 
            v-if="item.modalText"
            @click="openModal(item)"
            class="w-[clamp(39px,7vw,57px)] h-[clamp(39px,7vw,57px)] bg-[#101fb3] absolute -top-2.5 -right-2.5 rounded-full rotate-45" >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="5975 5062.5888671875 59 59"> <path fill="#0C27AF" fill-opacity="1" stroke="" stroke-opacity="1" stroke-width="1" fill-rule="evenodd" id="tSvg12877558042" d="M 6004.499825306921 5063.588845863561 C 6004.499825306921 5063.588845863561 6004.499825306921 5063.588845863561 6004.499825306921 5063.588845863561 C 6004.499825306921 5063.588845863561 6032.999825306921 5063.588845863561 6032.999825306921 5092.088845863561 C 6032.999825306921 5092.088845863561 6032.999825306921 5092.088845863561 6032.999825306921 5092.088845863561 C 6032.999825306921 5092.088845863561 6032.999825306921 5120.588845863561 6004.499825306921 5120.588845863561 C 6004.499825306921 5120.588845863561 6004.499825306921 5120.588845863561 6004.499825306921 5120.588845863561 C 6004.499825306921 5120.588845863561 5975.999825306921 5120.588845863561 5975.999825306921 5092.088845863561 C 5975.999825306921 5092.088845863561 5975.999825306921 5092.088845863561 5975.999825306921 5092.088845863561C 5975.999825306921 5092.088845863561 5975.999825306921 5063.588845863561 6004.499825306921 5063.588845863561 Z" stroke-linecap="butt"></path> <path fill="white" fill-opacity="1" stroke="" stroke-opacity="1" stroke-width="1" fill-rule="evenodd" id="tSvgd2d04985d6" d="M 5994.52462530692 5099.450445863561 C 6001.17492530692 5092.800045863561 6001.17492530692 5092.800045863561 6001.17492530692 5092.800045863561 C 6001.17492530692 5092.800045863561 5994.62002530692 5086.245245863561 5994.62002530692 5086.245245863561 C 5994.62002530692 5086.245245863561 5997.8338253069205 5083.031445863561 5997.8338253069205 5083.031445863561 C 5997.8338253069205 5083.031445863561 6004.388725306921 5089.586245863561 6004.388725306921 5089.586245863561 C 6004.388725306921 5089.586245863561 6011.03902530692 5082.935945863561 6011.03902530692 5082.935945863561 C 6011.03902530692 5082.935945863561 6014.47562530692 5086.372445863561 6014.47562530692 5086.372445863561 C 6014.47562530692 5086.372445863561 6007.82522530692 5093.022845863561 6007.82522530692 5093.022845863561 C 6007.82522530692 5093.022845863561 6014.3801253069205 5099.577745863561 6014.3801253069205 5099.577745863561 C 6014.3801253069205 5099.577745863561 6011.16632530692 5102.791545863561 6011.16632530692 5102.791545863561 C 6011.16632530692 5102.791545863561 6004.61142530692 5096.236645863561 6004.61142530692 5096.236645863561 C 6004.61142530692 5096.236645863561 5997.961125306921 5102.886945863561 5997.961125306921 5102.886945863561 C 5997.961125306921 5102.886945863561 5994.52462530692 5099.450445863561 5994.52462530692 5099.450445863561" stroke-linecap="butt"></path> <defs></defs> </svg>
          </button>
        </li>
        <!-- Мини костыль -->
        <span class="ml-[3.75%]"></span>
      </ul>
    </div>

    <!-- Правая стрелка -->
    <button v-if="canScrollRight" @click="nextSlide" class="absolute right-0 lg:-right-2 top-[52%] sm:top-[55%] z-10 p-2 opacity-0 sm:opacity-100">
      <svg class="w-5 lg:w-7 fill-black dark:fill-slate-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.67 42.79"> <path d="m0 35.38 13.33-14.33L.19 6.92 6.63 0l20.03 21.53L6.88 42.79 0 35.38Z"/></svg>
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
  /* Добавление плавного перехода при скроллинге */
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
</style>
