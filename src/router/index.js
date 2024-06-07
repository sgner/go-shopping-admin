import login from "@/view/Login.vue"
import home from "@/view/main/main.vue"
import {createRouter, createWebHashHistory} from "vue-router";
const routes=[
    {
        path:"/",component:login
    },
    {
        path:"/home",component: home
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes: routes
})

export default router;