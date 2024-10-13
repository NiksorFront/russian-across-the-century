import { createApp } from 'vue'
import App from "./App.vue";
import './style.css'
import router from "./router";
// import VueSplide from "@splidejs/vue-splide";


// createApp(App).use(router).use(VueSplide).mount('#app')
createApp(App).use(router).mount('#app')
