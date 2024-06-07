<script setup>

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
            <h2 class="title">我的AI助手</h2>
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
            <el-menu-item index="2-2">
              <el-icon><Wallet /></el-icon>
              我的余额
            </el-menu-item>
            <div>
              <el-row align="middle">
                <el-col :span="8" :offset="2" style="font-size: 15px">黑暗模式</el-col>
                <el-col :span="6" > <el-switch v-model="dark" inline-prompt
                                               :active-icon="MoonNight"
                                               :inactive-icon="Sunny"
                                               active-color="var(--el-fill-color-dark)"
                                               inactive-color="var(--el-color-primary)"
                                               @change="toggleDark;chageTheme(dark);" @click="openFullScreen" size="large" v-loading.fullscreen.lock="fullscreenLoading" /></el-col>
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

        <el-aside class="aside-color" width="280px">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                  default-active="/ai/chatgpt"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                  router
              >
                <el-menu-item index="/ai/chatgpt">
                  <img src="@/assets/chatGPT.svg" width="25px">
                  <span>ChatGPT</span>
                </el-menu-item>
                <el-menu-item index="/ai/stability">
                  <el-icon><document /></el-icon>
                  <span>Stability</span>
                </el-menu-item>
                <el-menu-item index="4" disabled>
                  <el-icon><setting /></el-icon>
                  <span>更多</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>

          <el-main>
            <div style="width: 100% ; height: 100% ">
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
.chatgpt-icon{
  background-image: url("src/assets/");
}
</style>