import { createRouter, createWebHistory } from "vue-router"
import MainPage from "./pages/main-page.vue"
import AncientRussianLawPage from "./pages/ancient-russian-law-page.vue";
import MedievalLawPage from "./pages/medieval-law-page.vue";
import LawInRussianEmpirePage from "./pages/law-in-russian-empire-page.vue";
import LawInSovietRussiaPage from "./pages/law-in-soviet-russia-page.vue";
import ModernLawPage from "./pages/modern-law-page.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/", component: MainPage},
        {path: "/ancient-russian-law", component: AncientRussianLawPage},
        {path: "/medieval-law", component: MedievalLawPage},
        {path: "/law-in-russian-empire", component: LawInRussianEmpirePage},
        {path: "/law-in-soviet-russia", component: LawInSovietRussiaPage},
        {path: "/modern-law", component: ModernLawPage}
    ]
})