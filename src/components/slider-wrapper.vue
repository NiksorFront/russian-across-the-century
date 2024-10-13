<script setup>
    // import { Splide, SplideSlide } from '@splidejs/vue-splide';
    import { ref, defineProps } from 'vue';
    import image1 from "../assets/images/ancient-russian-law-page/1.jpg"

    // Принимаем пропсы title и slides (массив объектов)
    const props = defineProps({
    title: String,
    slides: Array
    });

    // Логика для модального окна
    const isModalOpen = ref(false);
    const currentModalData = ref({
    title: '',
    text: ''
    });

    // Функция для открытия модального окна
    const openModal = (slide) => {
    currentModalData.value = {
        title: slide.title,
        text: slide.modalText
    };
    isModalOpen.value = true;
    };

    // Функция для закрытия модального окна
    const closeModal = () => {
    isModalOpen.value = false;
    };
</script>

<template>
    <Splide :options="{type:'slide', perPage: 3,}" class="bg-slate-400 w-full h-64">
      <SplideSlide>
        <img :src="image1" class="w-40 object-contain"/>
      </SplideSlide>
      <SplideSlide>
        <p>124545</p>
        <img :src="image1" class="w-40 object-contain"/>
      </SplideSlide>
      <SplideSlide>
        <img :src="image1" class="w-40 object-contain"/>
      </SplideSlide>
    </Splide>
</template>

<style scoped>
    .slide{
        width: clamp(250px, 33%, 360px);
    }
/* Опционально: добавить CSS для анимации открытия/закрытия модального окна, если нужно */
</style>
