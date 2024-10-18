import { createApp } from 'vue'
import App from "./App.vue";
import Footer from "./components/footer.vue";
import './style.css'
import router from "./router";
// import VueSplide from "@splidejs/vue-splide";


// createApp(App).use(router).use(VueSplide).mount('#app')
createApp(App).use(router).mount('#app')
createApp(Footer).mount("#footer")