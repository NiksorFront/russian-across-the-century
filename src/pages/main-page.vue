<script setup>
  import allianceLegal from "../assets/images/Alliance-Legal.svg";
  import synchronization from "../assets/images/synchronization.svg";
  import line from "../assets/images/line.svg";
  import historicalFigure from "../assets/images/historical-figure.svg";

  import AnimationScales from "../components/animation-scales.vue";
  import DialogOneMobile from "../components/dialog-one-mobile.vue";
  import DialogTwoMobile from "../components/dialog-two-mobile.vue";
  import DialogOne from "../components/dialog-one.vue";
  import AboutLecture from "../components/about-lecture.vue";
  import DialogTwo from "../components/dialog-two.vue";
  import SocialNetwork from "../components/social-network.vue";

  import preview1 from "../assets/images/previews/preview-1.jpg";
  import preview2 from "../assets/images/previews/preview-2.jpg";
  import preview3 from "../assets/images/previews/preview-3.jpg";
  import preview4 from "../assets/images/previews/preview-4.jpg";
  import preview5 from "../assets/images/previews/preview-5.jpg";

  const video1 = {
    144: "https://files.flowwit.ru/upload/ancient-russian-law/144.mp4",
    240: "https://files.flowwit.ru/upload/ancient-russian-law/240.mp4",
    360: "https://files.flowwit.ru/upload/ancient-russian-law/360.mp4",
    480: "https://files.flowwit.ru/upload/ancient-russian-law/480.mp4",
    720: "https://files.flowwit.ru/upload/ancient-russian-law/720.mp4",
    1080: "https://files.flowwit.ru/upload/ancient-russian-law/1080.mp4",
    preview: preview1,
    urlFrames: "https://files.flowwit.ru/upload/ancient-russian-law/"
  }
  const video2 = {
    144: "https://files.flowwit.ru/upload/medieval-law/144.mp4",
    240: "https://files.flowwit.ru/upload/medieval-law/240.mp4",
    360: "https://files.flowwit.ru/upload/medieval-law/360.mp4",
    480: "https://files.flowwit.ru/upload/medieval-law/480.mp4",
    720: "https://files.flowwit.ru/upload/medieval-law/720.mp4",
    1080: "https://files.flowwit.ru/upload/medieval-law/1080.mp4",
    preview: preview2,
    urlFrames: "https://files.flowwit.ru/upload/medieval-law/"
  }
  const video3 = {
    144: "https://files.flowwit.ru/upload/law-russian-empire/144.mp4",
    240: "https://files.flowwit.ru/upload/law-russian-empire/240.mp4",
    360: "https://files.flowwit.ru/upload/law-russian-empire/360.mp4",
    480: "https://files.flowwit.ru/upload/law-russian-empire/480.mp4",
    720: "https://files.flowwit.ru/upload/law-russian-empire/720.mp4",
    1080: "https://files.flowwit.ru/upload/law-russian-empire/1080.mp4",
    preview: preview3,
    urlFrames: "https://files.flowwit.ru/upload/law-russian-empire/"
  }
  const video4 = {
    144: "https://files.flowwit.ru/upload/law-soviet-russia/144.mp4",
    240: "https://files.flowwit.ru/upload/law-soviet-russia/240.mp4",
    360: "https://files.flowwit.ru/upload/law-soviet-russia/360.mp4",
    480: "https://files.flowwit.ru/upload/law-soviet-russia/480.mp4",
    720: "https://files.flowwit.ru/upload/law-soviet-russia/720.mp4",
    1080: "https://files.flowwit.ru/upload/law-soviet-russia/1080.mp4",
    preview: preview4,
    urlFrames: "https://files.flowwit.ru/upload/law-soviet-russia/"
  }
  const video5 = {
    144: "https://files.flowwit.ru/upload/modern-law/144.mp4",
    240: "https://files.flowwit.ru/upload/modern-law/240.mp4",
    360: "https://files.flowwit.ru/upload/modern-law/360.mp4",
    480: "https://files.flowwit.ru/upload/modern-law/480.mp4",
    720: "https://files.flowwit.ru/upload/modern-law/720.mp4",
    1080: "https://files.flowwit.ru/upload/modern-law/1080.mp4",
    preview: preview5,
    urlFrames: "https://files.flowwit.ru/upload/modern-law/"
  }


  import {ref, onMounted, onUnmounted} from "vue";
  const firstSection = ref(null);
  const wayBtn = ref(null);
  const animationBtn = ref(null);
  const small = ref(parseInt(window.innerWidth) < 1024);
  
  const handleScroll = () => {
    small.value = parseInt(window.innerWidth) < 1024;
  }

  const scrollToDialog = (e) => {
      e.preventDefault();
      window.scrollTo({
        top: (document.querySelector("header").offsetHeight + firstSection.value.offsetHeight),
        behavior: 'smooth'
      })
    }

  const scrollToLecture = (e) => {
      e.preventDefault();
      window.scrollTo({
        top: window.innerHeight + document.querySelector("#diaolog-one").offsetHeight - 250,
        behavior: 'smooth'
      })
    }

  onMounted(() => {
    wayBtn.value.addEventListener('click', (e) => scrollToDialog(e));

    animationBtn.value.addEventListener('click', (e) => scrollToLecture(e));

    window.addEventListener("scroll", handleScroll); // Подписываемся на событие скролла
  })

  onUnmounted(() => {
    // wayBtn.value.removeEventListener('click', scrollToDialog(e));

    // animationBtn.value.removeEventListener('click', scrollToLecture);

    window.removeEventListener("scroll", handleScroll); // Подписываемся на событие скролла
  })
</script>

<template>
  <header class="flex w-10/12 sm:w-11/12 max-w-[1200px] h-fit flex-wrap gap-5 mx-auto my-[35px] sm:my-[65px] lg:mb-[27px] lg:pl-6 justify-between castil-margin">
    <div class="flex justify-between w-full max-w-[135px] sm:max-w-[260px]">
      <a href="https://online.synchronize.ru/" target="_blank" class="my-0.5 sm:mt-2.5"> 
        <img :src="synchronization" alt="Синхронизация" class="w-11 sm:w-20 lg:w-[90px] object-contain dark:invert" />
      </a>
      <img :src="line" alt="line" class="h-7 w-[10.25px] sm:h-full object-contain pl-2 dark:invert" />
      <a href="https://al-cg.com/" target="_blank" class="my-0 sm:my-1"> 
        <img :src="allianceLegal" alt="Alliance Legal" class="w-11 sm:w-20 lg:w-[90px] object-contain dark:invert" />
      </a>
    </div>
    
    <div class="flex items-center mr-4 dark:opacity-50 castil-transform">
      <a ref="animationBtn" class="text-xs md:text-base lg:text-xl text-blue-700 dark:text-white helvetica-500 text-nowrap cursor-pointer z-10">
        анимационные лекции
      </a>
      <p class="text-xs md:text-base lg:text-xl helvetica-500 whitespace-pre text-black dark:text-white"> | памятки</p>
    </div>
  </header>

  <main class="w-11/12 sm:w-full mx-auto overflow-hidden xl:pl-10">
    <section ref="firstSection" class="flex w-11/12 max-w-[1200px] h-[720px] sm:h-[800px] lg:h-[700px] flex-wrap mx-auto mt-[35px] gap-9 sm:gap-4 lg:gap-0 lg:flex-row-reverse relative">
      <div class="w-full h-1/2 lg:h-full sm:h-3/5 lg:w-2/5 relative -z-10">
        <AnimationScales />
      </div>
      <div class="w-full lg:w-3/5 h-1/2 sm:h-3/5 lg:h-fit lg:my-auto flex flex-wrap flex-col lg:flex-row gap-4 sm:gap-8 lg:gap-0 lg:space-y-12">
        <h1 class="title helvetica-700 lg:h-1/6 lg:ml-3 dark:text-white">Россия: право сквозь века</h1>
        <h3 class="subtitle whitespace-pre-line helvetica-500 h-fit lg:ml-3 law-changing dark:text-white">{{"Как менялось право в России:\nот древности до наших дней"}}</h3>
        <a ref="wayBtn" class="button text-nowrap helvetica-500 h-fit w-fit way px-4 lg:px-6 text-center lg:box-content bg-[#101fb3] sm:pb-1 rounded-xl sm:rounded-3xl text-white z-30 cursor-pointer dark:bg-[#FF4800]">в путь!</a>
      </div>
    </section>



    <DialogOneMobile v-if="small" id="diaolog-one"/>
    <DialogOne v-else id="diaolog-one"/>
    

    <section>
      <AboutLecture number="1" title="Древнерусское право" description="У кого дубина тяжелее, тот и прав — так решались сложные вопросы в Древней Руси. Сейчас это, конечно, звучит дико. Но в IX веке бой на дубинках, копьях или кинжалах считали неплохим способом разрешить спор. Ещё один способ — попросить князя рассудить «справедливо». Но справедливость у каждого правителя была своя."
                    :modalContent='{heading: "В этой лекции поговорим о судебных традициях прошлого и узнаем:", paragraphs: ["Кто выполнял роль судей в Древней Руси?", "Какие вопросы решали на вече?", "Как был устроен первый свод правовых норм Древней Руси — «Русская Правда»?"]}' :videoInfo="video1" routeMemo="/ancient-russian-law"/>
    
      <AboutLecture number="2" title="Средневековое право" description="В Средние века русские княжества раздроблены, и законы в них разные. Но в 1497 году князь Иван III создаёт единый для всех земель свод законов — Судебник. Этот документ стал первым шагом на пути к первому всенародно признанному закону — Соборному уложению, которое было принято в XVII веке."
                    :modalContent="{heading: 'В этой лекции погрузимся в правовую систему Средних веков и выясним:', paragraphs:['Кому и за что на Руси начали давать взятки?', 'Какие вопросы решала Боярская дума — «правая рука» царя?', 'Как русские княжества от раздроблённости и власти монголов пришли к единому для всех закону?']}" :videoInfo="video2" routeMemo="/medieval-law"/>

      <AboutLecture number="3" title="Право в Российской империи" description="Попытки законодательно закрепить абсолютную власть императора, стремление суда к независимости, систематизация законов — путь к статусу правового государства был непростым. Но именно в это время проводятся реформы, результатами которых мы пользуемся до сих пор."
                    :modalContent="{heading: 'В этой лекции мы проследим за историей права от Петра I до Николая II. И узнаем:', paragraphs:['Почему правовая политика Петра I не всегда была объективной?', 'Когда в России появились первые адвокаты, следователи и прокуроры?', 'Почему террористке Вере Засулич удалось избежать наказания за покушение на губернатора?']}" :videoInfo="video3" routeMemo="/law-in-russian-empire"/>

      <AboutLecture number="4" title="Право в советской России" description="Новое государство — новые законы. После прихода к власти большевики активно формируют революционно новую правовую систему. Создаются колхозы, а вместе с ними — хозяйственное право. Принимаются новые Конституции, а судебный процесс в поисках объективной истины лишается состязательности."
                    :modalContent="{heading: 'В этой лекции узнаем, как было устроено право в эпоху Советов. И разберёмся:', paragraphs:['Каким должно было стать пролетарское государство?', 'Как менялось право в эпохи «оттепели», «застоя» и «перестройки»?', 'На что по закону имел право советский рабочий?']}" :videoInfo="video4" routeMemo="/law-in-soviet-russia"/>

      <AboutLecture number="5" title="Современное право" description="На смену СССР пришла Российская Федерация. Формируется новая система управления — но с опорой на опыт предыдущих поколений. Провозглашается принцип разделения властей. Создаётся новая законодательная база: от Гражданского и Уголовного кодексов до Семейного и Трудового."
                    :modalContent="{heading: 'В этой лекции разберёмся, как сформировалась правовая система РФ. И выясним:', paragraphs:['Что такое «война законов» и как она повлияла на распад СССР?', 'Кем и как создавалась Конституция 1993 года?', 'Как свободный рынок изменил право в России?']}" :videoInfo="video5" routeMemo="/modern-law"/>
    </section>

    <DialogTwoMobile v-if="small"/>
    <DialogTwo v-else />

   <!-- <section class="md:py-6">
      <SocialNetwork title="Telegram" description="Делимся новостями из мира искусства и обсуждаем их в чате с синхродрузьями" btnText="подписаться на канал" url="https://t.me/+gY7XBrs4xvQ0Njcy" />
      <SocialNetwork title="Email-рассылка" description="Присылаем секретные промокоды и эксклюзивный контент из курсов" btnText="подписаться на рассылку" url="#" />
      <SocialNetwork title="YouTube-канал Синхронизация. Плюс" description="Подписывайтесь на наш канал, чтобы не пропустить ещё больше бесплатных лекций, интервью и подкастов" btnText="смотреть лекции" url="https://www.youtube.com/@synchronizeplus" />
    </section>-->

    <section class="w-11/12 max-w-[1200px] relative bg-white min-h-[700px] h-auto project-partners mx-auto my-16 rounded-[clamp(20px,5vw,50px)] flex flex-wrap">
      <h2 class="w-full h-fit helvetica-700 title-2">
          Партнёры проекты
      </h2>
      
      <a href='https://al-cg.com/' target="_black" class="w-full lg:w-3/4 flex flex-col gap-4 sm:gap-6 lg:gap-14 lg:flex-nowrap lg:flex-row lg:justify-between mt-4 sm:mt-10">
        <img :src="allianceLegal" alt="логотип AllianceLegal" class="h-fit w-[74px] sm:w-[91px] object-contain" />
        <div class="flex flex-col gap-2">
          <h3 class="helvetica-700 title-3">
            Консалтинговая группа «Альянс Лигал»
          </h3>
          <p class="helvetica-400 textik-small">
            Российская юридическая фирма. С 2010 года обеспечивает правовое сопровождение крупного бизнеса, в том числе частных инвесторов и госкорпораций.<br> Защита корпоративных и частных клиентов при разрешении споров, расследовании уголовных дел в сфере экономики и должностных преступлений, сопровождение сделок и инвестпроектов, налоговое консультирование и юридическая поддержка реструктуризации бизнеса. Поддержка некоммерческих организаций в рамках развития юридической науки.
          </p>
        </div>
      </a>

      <a href="https://online.synchronize.ru/" target="_black" class="synchronization-div lg:w-3/4 flex flex-col gap-4 sm:gap-6 lg:gap-14 lg:flex-nowrap lg:flex-row mt-3 sm:mt-10 lg:mt-5">
        <img :src="synchronization" alt="логотип синхронизации" class="h-fit w-[74px] sm:w-[91px] object-contain mt-3" />
        <div class="flex flex-col gap-2">
          <h3 class="helvetica-700 title-3">
            Синхронизация
          </h3>
          <p class="helvetica-400 textik-small">
            Онлайн-лекторий с огненным обучением. Подписка Синхронизации — это 1000+ часов образовательного контента по самым разным направлениям: от искусства, кино и литературы до психологии и нейробиологии.
          </p>
        </div>
      </a>

      <img :src="historicalFigure" alt="историческая фигура" className="historical-figure h-[clamp(570px,115vw,1030px)] object-contain absolute"/>
    </section>
  </main>
</template>

<style>
  @media (max-width: 450px) {
    .castil-transform{
      transform: translateY(420px);
    }
    .castil-margin{
      margin-bottom: 10px;
    }
  }
  

  .button{
    font-size: clamp(19px, 5vw, 50px);
    line-height: clamp(32px, 6vw, 50px);
  }

  .law-changing{
    width: 100%;
  }

  @media (min-width: 1200px){
    .law-changing{
      width: 65%;
    }

    .way{
      width: 24%;
      padding-bottom: 7px;
    }
  }

  @media(min-width: 1280px){
    .button{
      font-size: 50px;
      line-height: 66px;
    }

    .law-changing{
      width: 60%;
    }
  }

  .project-partners{
    padding: clamp(24px,4vw,50px);
    padding-bottom: 150px;
  }

  .synchronization-div{
    width: 100%;
  }

  .historical-figure{
    /* display: flex; */
    top: 86%;
    right: calc((100vw - 208px)/3.5);
  }

  @media(min-width: 480px){
    .synchronization-div{
      width: 65%;
    }

    .historical-figure{
      top: 70%;
      right: -20px;
    }

    .project-partners{
      padding: clamp(24px,4vw,50px);
    }
  }

  @media (min-width: 640px) {
    .historical-figure{
      top: 63%;
      right: -12px;
    }
  }

  @media (min-width: 1024px) {
    .historical-figure{
      top: 90px;
      right: -44px;
    }
  }
</style>
