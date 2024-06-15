import login from "@/view/Login.vue"
import home from "@/view/main/main.vue"
import {createRouter, createWebHashHistory} from "vue-router";
import bookManage from "@/view/bookManage/BookManage.vue"
import category from "@/view/categoryManage/CategoryManage.vue"
import event from "@/view/eventManage/EventManage.vue"
const routes=[
    {
        path:"/",component:login
    },
    {
        path:"/home",component: home,children:[
            {path:"/bookManage",component:bookManage},
            {path:"/category",component: category},
            {path:"/event",component: event}
        ]
    }
]

const router = createRouter({
    history:createWebHashHistory(),
    routes: routes
})

export default router;