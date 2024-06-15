<script setup>
import {computed, ref} from "vue";
 import {
   DataLine,
   Document,
   Menu as IconMenu,
     BellFilled,
     List,
     User,
     MoonNight,
     Sunny,
   Setting,
     Fold,
 } from '@element-plus/icons-vue'
 import router from "@/router/index.js";
 const isCollapse = ref(true);
 const chageTheme = (val) => {
   const delay = 200; // 延迟时间，单位为毫秒

   setTimeout(() => {
     if (!val) {
       document.documentElement.setAttribute('theme', 'light');
       document.querySelector("html")?.classList.remove("dark");
       document.querySelector("html")?.classList.add("light");
     } else {
       document.documentElement.setAttribute('theme', 'dark');
       document.querySelector("html")?.classList.remove("light");
       document.querySelector("html")?.classList.add("dark");
     }
   }, delay);
 };
 chageTheme(false)
 const toggleDark =()=> themeStore.setTheme(!dark.value)
 const dark = ref()
 const asideWidth = computed(() => (isCollapse.value ? "64px" : "250px"));
 router.push("/category")
</script>

<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <el-header>
        <el-menu
            :default-active="activeIndex"

            class="el-menu-demo"
            mode="horizontal"
            :ellipsis="false"
            @select="handleSelect"
        >
          <el-menu-item index="0" style="width: 150px">
            <img
                style="width: 70px"
                :src="main_logo_src"
            />
            <h2 class="title">管理平台</h2>
          </el-menu-item>
          <div class="flex-grow" />
          <el-menu-item index="1">主页</el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-avatar :size="50" :src="circleUrl" />
            </template>
            <el-menu-item index="2-1">
              <el-icon><User /></el-icon>
              我的信息
            </el-menu-item>
            <div>
              <el-row align="middle">
                <el-col :span="8" :offset="2" style="font-size: 14px">黑暗模式</el-col>
                <el-col :span="6" > <el-switch v-model="dark" inline-prompt
                                               :active-icon="MoonNight"
                                               :inactive-icon="Sunny"
                                               active-color="var(--el-fill-color-dark)"
                                               inactive-color="var(--el-color-primary)"
                                               @change="toggleDark ; chageTheme(dark);" @click="openFullScreen" size="large" v-loading.fullscreen.lock="fullscreenLoading" /></el-col>
              </el-row>
            </div>
            <el-divider class="divider"/>
            <el-menu-item index="2-4" class="login-out" style="color: red">
              <el-icon><SwitchButton /></el-icon>
              退出登录
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-header>
      <el-container>

        <el-aside class="aside-color" :style="{ width: asideWidth, transition: 'width 0.3s' }">
          <el-row class="tac">
            <el-col :span="20">
              <el-menu
                  default-active="/category"
                  class="el-menu-vertical-demo"
                  :collapse="isCollapse"
                  @open="handleOpen"
                  @close="handleClose"
                  collapse-transition
                  router
              >
                <el-sub-menu index="1" disabled>
                  <template #title>
                    <el-icon><DataLine /></el-icon>
                    <span>销售分析</span>
                  </template>
                  <el-sub-menu index="1-4">
                    <template #title><span>item four</span></template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="/category">
                  <el-icon><icon-menu /></el-icon>
                  <template #title>分类管理</template>
                </el-menu-item>
                <el-menu-item index="/bookManage">
                  <el-icon><document /></el-icon>
                  <template #title>图书管理</template>
                </el-menu-item>
                <el-menu-item index="/event">
                  <el-icon><BellFilled /></el-icon>
                  <template #title>活动管理</template>
                </el-menu-item>
                <el-menu-item index="5" disabled>
                  <el-icon><List /></el-icon>
                    <template #title>
                         订单管理
                    </template>
                </el-menu-item>
                <el-menu-item v-if="isCollapse">
                  <el-button style="width: 30px;margin-left: -5px" type="info" plain @click="isCollapse = !isCollapse"><el-icon><Fold /></el-icon></el-button>
                </el-menu-item>
              </el-menu>
            </el-col>
            <el-col :span="4">
               <el-button v-if="!isCollapse" type="info" plain @click="isCollapse = !isCollapse"><el-icon><Fold /></el-icon></el-button>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>

          <el-main>
            <div style="width: 100% ; height: 100%">
              <router-view></router-view>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}
.login-out:active{
  background-color: lightcoral;
  color: #ff0000
}
.login-out{
  background-color: lightblue;
  color:#ffffff
}
.divider {
  margin-top: 8px;
  margin-bottom: 8px;
}
.layout-container {
  height: 100vh;
  .el-aside {
    .el-menu {
      border-right: none;
    }
  }
}
.el-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #666;
}
.title-icon{
  background-image: url("src/assets/");
}
</style>