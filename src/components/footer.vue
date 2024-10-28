<script setup>
    // import synchronization from "../assets/images/synchronization.svg";
    // import skolkovo from "../assets/images/skolkovo-logo.png";
    import vkLogo from "../assets/images/vk-logo.svg";
    import tgLogo from "../assets/images/tg-logo.svg";
    import dzenLogo from "../assets/images/dzen-logo.svg";
    import youtubeLogo from "../assets/images/youtube-logo.svg";
    import hourglassLogo from "../assets/images/hourglass.svg";
    // import podcastLogo from "../assets/images/micro.png"
    import PDFka from "../assets/OPD-Policy.pdf";

</script>

<template>
    <div class="w-full max-w-[1200px] mx-auto text-white">
        <div class="container mx-auto py-6 sm:py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <!--Логотипы-->
            <div class="flex m-4 gap-1 max-w-[250px] justify-between">
                <a href="https://t.me/alliancelegalcg" target="_blank"><img :src="tgLogo" alt="телеграмчик" class="w-10 object-contain" /></a>
                <a href="https://vk.com/alliance_legal" target="_blank"><img :src="vkLogo" alt="вконтосик" class="w-10 object-contain" /></a>
                <a href="https://dzen.ru/id/622b489016aad67be6cdbf35" target="_blank"><img :src="dzenLogo" alt="дзен" class="w-10 object-contain" /></a>
                <a href="https://www.youtube.com/channel/UC_As5xBHOMjW4dPB1bQEThg/featuredhttps%3A" target="_blank"><img :src="youtubeLogo" alt="ютубчик" class="w-10 object-contain" /></a>
                <a href="https://zakon.ru/Profile/Show/229640" target="_blank"><img :src="hourglassLogo" alt="песочные часы" class="w-10 object-contain" /></a>
            </div>
            
            <!-- Контакты -->
            <div class="mx-4 my-0 sm:row-start-2 lg:row-start-1 lg:col-start-2 space-y-2 mt-3">
                    <a href="tel:74996780120" target="_blank" class="block helvetica-500 footer__text hover:opacity-75 transition-all">+7 499 678-01-20</a>
                    <a href="mailto:alcg@live.ru" target="_blank" class="block helvetica-500 footer__text hover:opacity-75 cursor-pointer transition-all">alcg@live.ru</a>
                    <p class="block helvetica-500 footer__text transition-all">125375, Москва<br>ул. Тверская, дом 16, строение 1<br> БЦ «Галерея Актер», офис А-501</p>
            </div>

            <!-- Контакты 2-->
            <div class="mx-4 my-0 sm:row-start-3 lg:row-start-1 lg:col-start-3 space-y-2 mt-3">
                <a href="tel:73432867053" target="_blank" class="block helvetica-500 footer__text hover:opacity-75 cursor-pointer transition-all">+7 343 286-70-53</a>
                <a href="mailto:alcg@live.ru" target="_blank" class="block helvetica-500 footer__text hover:opacity-75 cursor-pointer transition-all">alcg@live.ru</a>
                <p class="block helvetica-500 footer__text transition-all">620144, Екатеринбург<br>ул. Шейнкмана, дом 121, 3 этаж<br>БЦ «Антарес-бизнес»</p>
            </div>

            <!-- Для бизнеса  -->
            <div class="mx-4 space-y-2 mt-3">
                <h3 class="helvetica-500 text-xs opacity-50">ДЛЯ БИЗНЕСА</h3>
                <a href="https://al-cg.com/" target="_blank" class="block helvetica-500 footer__text hover:opacity-75 cursor-pointer transition-all">Юридическая защита</a>
            </div>

        </div>

        <div class="container w-fit sm:w-full h-28 lg:h-14 mt-5 mx-4 sm:mx-auto helvetica-500 text-[#81808f] flex flex-col justify-between border-y border-[#2a282f] lg:flex-row">
            <p class="text-xs mt-4">© 2011-2024 Консалтинговая группа «Альянс Лигал»</p>
            <!-- <a href="https://docs.google.com/document/d/1pEuP2_b7xq5dhRkhLKW5RUYfgEl_Nesm/edit" target="_blank" class="text-xs sm:text-sm lg:mt-4">Пользовательское соглашение</a> -->
            <p class="text-xs  lg:mt-4">При использовании материалов сайта прямая индексируемая ссылка на al-cg.com обязательна</p>
            <!-- <a href="https://docs.google.com/document/d/1YMnZH72TBClUCrCouuZuYsddu57FEsM0" target="_blank" class="text-xs sm:text-sm mb-4 lg:mt-4">Политика в отношении обработки персональных данных</a> -->
            <a :href="PDFka" target="_blank" class="text-xs  mb-4 lg:mt-4 underline">Политика обработки персональных данных</a>
        </div>

        <!-- <p class="container w-fit sm:w-full py-4 mx-4 sm:mx-auto helvetica-500 text-xs/[14px] sm:text-sm text-[#81808f]">© 2011-2024 Консалтинговая группа «Альянс Лигал».<a href="mailto:hello@synchronize.ru" target="_blank" class="text-white">hello@synchronize.ru</a>
            <br><br>На информационном ресурсе при применении информационных технологий предоставления информации <a href="https://docs.google.com/document/d/1VV5fpA3IqraYvIR1dryj64Y7LMSBXh4hhU2weCLlifY/edit" target="_blank" class="text-white">(рекомендательные технологии)</a> осуществляется сбор, систематизация и анализ сведений, относящихся к предпочтениям пользователей сети «Интернет», находящихся на территории Российской Федерации.</p> -->
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