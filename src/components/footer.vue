<script setup>
    import synchronization from "../assets/images/synchronization.svg";
    import skolkovo from "../assets/images/skolkovo-logo.png";
    import vkLogo from "../assets/images/vk-logo.svg";
    import tgLogo from "../assets/images/tg-logo.svg";
    import podcastLogo from "../assets/images/micro.png"

</script>

<template>
    <div class="w-full max-w-[1200px] mx-auto text-white">
        <div class="container mx-auto py-6 sm:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-4">
            <!-- Логотипы -->
            <div class="grid grid-cols-4 sm:grid-cols-2 m-4 gap-1 sm:max-w-[160px] sm:max-h-[125px] lg:col-start-1 lg:col-span-2 lg:row-start-1">
                <a href="https://online.synchronize.ru/" target="_blank"><img :src="synchronization" alt="Синхронизация" class="w-20 object-contain invert" /></a>
                <a href="https://sk.ru/" target="_blank"><img :src="skolkovo" alt="участник Хуёлково" class="w-[62px] object-contain ml-auto translate-x-2 sm:translate-x-0" /></a>
                <div class="grid col-span-2 grid-cols-3 ml-auto gap-1 sm:w-full sm:ml-0">
                    <a href="https://t.me/+gY7XBrs4xvQ0Njcy" target="_blank"><img :src="tgLogo" alt="телеграмчик" class="w-10 object-contain" /></a>
                    <a href="https://vk.com/synchronize" target="_blank"><img :src="vkLogo" alt="вконтосик" class="w-10 object-contain" /></a>
                    <a href="https://podcast.ru/1711936901" target="_blank"><img :src="podcastLogo" alt="скучный микро" class="w-10 object-contain" /></a>
                </div>
            </div>
            
            <!-- Форма подписки -->
            <div class="mb-5 w-hit h-full max-h-[280px] sm:max-w-[280px] bg-[#2a282f] rounded-2xl mx-4 sm:col-start-2 sm:row-start-2 lg:col-span-4 lg:col-start-7 lg:row-start-1">
                <h5 class="helvetica-700 footer__text ml-5 mt-5 mb-3.5">ХОЧУ БЫТЬ В КУРСЕ ВСЕГО</h5>
                <form class="space-y-4 flex flex-col w-fit mx-5">
                    <input type="email" placeholder="Введите email" class="w-full h-12 p-2 border border-white bg-[#2a282f] rounded-xl"/>
                    <div class="flex flex-wrap gap-2">
                        <input type="checkbox" class="size-4 accent-[#2a282f]">
                        <span class="w-[90%] helvetica-500 form__text text-gray-500 opacity-80 mt-0.5">Подтверждаю, что мне больше 18 лет, и заявляю, что согласен с обработкой моих персональных данных в соответствии с <a href="https://docs.google.com/document/d/1YMnZH72TBClUCrCouuZuYsddu57FEsM0/edit?pli=1" target="_blank" class="underline form__text text-gray-500 opacity-70">Политикой обработки персональных данных </a></span>
                    </div>
                    <button type="submit" class="w-full h-11 bg-white helvetica-500 text-black py-2 rounded-xl">Подписаться</button>
                </form>
            </div>

            <!-- Ссылки на разделы -->
            <div class="m-4 mt-4 space-y-3.5 sm:col-start-2 lg:col-start-5 lg:col-span-2 lg:mx-0 sm:row-start-1">
                <a href="https://online.synchronize.ru/referal_lk" target="_blank" class="block underline decoration-2 helvetica-700 footer__text hover:opacity-75 hover:decoration-1 cursor-pointer transition-all">ПРИГЛАСИТЬ ДРУГА</a>
                <a href="https://online.synchronize.ru/#catalogue" target="_blank" class="block underline decoration-2 helvetica-700 footer__text hover:opacity-75 hover:decoration-1 cursor-pointer transition-all">КАТАЛОГ КУРСОВ</a>
                <a href="https://special.synchronize.ru/joinus" target="_blank" class="block underline decoration-2 helvetica-700 footer__text hover:opacity-75 hover:decoration-1 cursor-pointer transition-all">ВАКАНСИИ</a>
            </div>

            <div class="mx-4 my-0 space-y-2 col-start-1 row-start-1 col-span-2 hidden lg:block mt-[auto]">
                <p href="tel:74993914639" target="_blank" class="block helvetica-500 footer__text hover:opacity-75 cursor-pointer transition-all">+ 7(499) 39 146 39</p>
                <a href="mailto:hello@synchronize.ru" target="_blank" class="block helvetica-500 footer__text hover:opacity-75 cursor-pointer transition-all">hello@synchronize.ru</a>
                <a href="https://t.me/SynchronizeSupportBot?start=link_nTOgfsLiCm" target="_blank" class="block helvetica-500 footer__text hover:opacity-75 cursor-pointer transition-all">Поддержка в Telegram</a>
            </div>

            <div class="m-4 my-0 flex flex-col gap-6 sm:col-start-1 sm:row-start-2 lg:col-start-3 lg:col-span-2 lg:row-start-1 lg:flex-col-reverse lg:mx-0">
                <!-- Контакты -->
                <div class="space-y-2 lg:hidden">
                    <p href="tel:74993914639" target="_blank" class="block helvetica-500 footer__text hover:opacity-75 cursor-pointer transition-all">+ 7(499) 39 146 39</p>
                    <a href="mailto:hello@synchronize.ru" target="_blank" class="block helvetica-500 footer__text hover:opacity-75 cursor-pointer transition-all">hello@synchronize.ru</a>
                    <a href="https://t.me/SynchronizeSupportBot?start=link_nTOgfsLiCm" target="_blank" class="block helvetica-500 footer__text hover:opacity-75 cursor-pointer transition-all">Поддержка в Telegram</a>
                </div>
                <!-- Для бизнеса -->
                <div class="space-y-2 lg:mb-[33%]">
                    <h3 class="helvetica-500 text-xs opacity-50">ДЛЯ БИЗНЕСА</h3>
                    <a href="https://online.synchronize.ru/b2b" target="_blank" class="block helvetica-500 footer__text hover:opacity-75 cursor-pointer transition-all">Корпоративное обучение</a>
                    <a href="https://online.synchronize.ru/b2b/cert" target="_blank" class="block helvetica-500 footer__text hover:opacity-75 cursor-pointer transition-all">Сертификаты на курсы</a>
                </div>

                <!-- Спецпредложения -->
                <div class="space-y-2">
                    <h3 class="helvetica-500 text-xs opacity-50">СПЕЦПРЕДЛОЖЕНИЯ</h3>
                    <a href="https://online.synchronize.ru/sub" target="_blank" class="block helvetica-500 footer__text hover:opacity-75 cursor-pointer transition-all">Подписка на все курсы</a>
                    <a href="https://online.synchronize.ru/gifts" target="_blank" class="block helvetica-500 footer__text hover:opacity-75 cursor-pointer transition-all">Подарочные сертификаты</a>
                </div>
            </div>
        </div>

        <div class="container w-fit sm:w-full h-28 lg:h-14 mt-5 mx-4 sm:mx-auto helvetica-500 text-[#81808f] flex flex-col justify-between border-y border-[#2a282f] lg:flex-row">
            <p class="text-xs sm:text-sm mt-4">© Синхронизация, 2024</p>
            <a href="https://docs.google.com/document/d/1pEuP2_b7xq5dhRkhLKW5RUYfgEl_Nesm/edit" target="_blank" class="text-xs sm:text-sm lg:mt-4">Пользовательское соглашение</a>
            <a href="https://docs.google.com/document/d/1YMnZH72TBClUCrCouuZuYsddu57FEsM0" target="_blank" class="text-xs sm:text-sm mb-4 lg:mt-4">Политика в отношении обработки персональных данных</a>
        </div>

        <p class="container w-fit sm:w-full py-4 mx-4 sm:mx-auto helvetica-500 text-xs/[14px] sm:text-sm text-[#81808f]">ООО «Культурная платформа «Синхронизация». Адрес для направления юридически значимых сообщений: <a href="mailto:hello@synchronize.ru" target="_blank" class="text-white">hello@synchronize.ru</a>
            <br><br>На информационном ресурсе при применении информационных технологий предоставления информации <a href="https://docs.google.com/document/d/1VV5fpA3IqraYvIR1dryj64Y7LMSBXh4hhU2weCLlifY/edit" target="_blank" class="text-white">(рекомендательные технологии)</a> осуществляется сбор, систематизация и анализ сведений, относящихся к предпочтениям пользователей сети «Интернет», находящихся на территории Российской Федерации.</p>
    </div>
</template>

<style scoped>
    .form__text{
        font-size: 10px;
        /* font-weight: 2px; */
        line-height: 13px;
        text-align: left;
    }

    .footer__text{
        font-size: 14px;
        line-height: 19px;
    }
</style>