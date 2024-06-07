<script setup>
import {ElMessage} from "element-plus";

const isLogin = ref(false)
const user = ref({
  id:'',
  username:'',
  avatar:'',
})
import {ref} from "vue";
const default_avatar = ref('/src/assets/avatar.png')

const loginData = ref({
  username:'',
  password:'',
  temporaryId:'',
  code:'',
})
const img = ref('');
import {useTemporaryIdStore} from "@/stores/TemporaryId.js";
import {verifyService} from "@/api/Verify.js";
import {useTokenStore} from "@/stores/Token.js";
const temId = useTemporaryIdStore()
const code = ref('')

const imageVerify = async ()=>{
  const temporaryIdStore = useTemporaryIdStore()
  let result
  try{
    result = await verifyService(temporaryIdStore.temporaryId)
  }catch(err){
    await verifyService(temporaryIdStore.temporaryId)
  }
  const codeResult = result.data
  img.value = codeResult.image;
  code.value = codeResult.code
  img.value = `data:image/jpeg;base64,${img.value}`
  if(temporaryIdStore.temporaryId === ''){
    temporaryIdStore.setTemporaryId(codeResult.temporaryId)
  }
}
const clearLogin = ()=>{
    loginData.value.username = ''
    loginData.value.password = ''
    loginData.value.rePassword= ''
    loginData.value.code= ''
}

const checkCode = (rule,value,callback)=>{
  if(value === ''){
    callback(new Error("请输入验证码"))
  }else if (value !== code.value){
    callback(new Error("验证码错误!"))
    imageVerify()
  }else {
    callback()
  }
}
const loginRule = {
  username:[
    {required:true,message:'请输入用户名',trigger:'blur'},
  ],
  password:[
    {required:true,message:'请输入密码',trigger:'blur'}
  ]
  ,
  code:[
    {validator: checkCode,trigger:'blur'}
  ]
}
const tokenStore = useTokenStore()
const success = (msg)=>{
  ElMessage.success(msg)
}
const userLogin = async ()=>{

  loginData.value.temporaryId = temId.temporaryId
  const result = await loginService(loginData.value)
  success("登录成功")
  tokenStore.setToken(result.data)
  isLogin.value = true
  loginVisible.value = false
  clearLogin()
}
imageVerify()
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <el-form ref="form" size="large" autocomplete="off" :model="loginData" :rules="loginRule">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder = "请输入用户名" v-model="loginData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="loginData.password"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div class = "container">
            <el-row>
              <el-col :span="16">
                <el-input name="code" :prefix-icon="Lock" placeholder="请输入验证码" v-model="loginData.code"></el-input>
              </el-col>
                <el-col :span="6">
                  <el-image :src='img' @click="imageVerify()" class="verifyImg"></el-image>
                </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type = "primary" auto-insert-space @click="login()" :plain="true">登录</el-button>
          <div class="flex" style="margin-left: 40px">
            <el-link type="primary" :underline="false">忘记密码?</el-link>
          </div>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
.verifyImg{
  width: 140px;
  height: 50px;
}
.login-page {
  height: 100vh;
  background-color: #fff;
  .container {
    display: flex; /* 使用flex布局 */
    align-items: center; /* 垂直居中对齐 */
  }

  .el-input {
    margin-right: 10px; /* 设置组件间的间距 */
  }


  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
.bg {
     background:
         url('src/assets/tu2.jpeg') no-repeat center / cover;
     border-radius: 0 20px 20px 0;
   }
</style>