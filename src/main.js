import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from'@/router'
import { createPinia } from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import "element-plus/theme-chalk/dark/css-vars.css"
import "@/style/theme/theme.css"
import "@/style/style.css"
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)
import zhCn from 'element-plus/es/locale/lang/zh-cn'
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
