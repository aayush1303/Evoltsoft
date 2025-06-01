import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import 'leaflet/dist/leaflet.css';



import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiArrowRight } from 'oh-vue-icons/icons'
import { FaMapMarkerAlt, RiChargingPile2Fill } from "oh-vue-icons/icons";
import { FaFilter, FaEye, FaEyeSlash } from 'oh-vue-icons/icons';
import { CoPencil } from "oh-vue-icons/icons";
import { CoAccountLogout } from "oh-vue-icons/icons";
import { PxTrash } from "oh-vue-icons/icons";



addIcons(CoPencil, PxTrash);
addIcons(CoAccountLogout);
addIcons(FaFilter, FaEye, FaEyeSlash);

addIcons(FaMapMarkerAlt, RiChargingPile2Fill);
addIcons(BiArrowRight);

const app = createApp(App)
app.component('v-icon', OhVueIcon)
app.use(router)
app.mount('#app')

