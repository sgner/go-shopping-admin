<script setup>
const isLogin = ref(false)
const user = ref({
  id:'',
  username:'',
  avatar:'',
})
import {ref} from "vue";
const default_avatar = ref('/src/assets/avatar.png')
const registerData = ref({
  username:'',
  password:'',
  rePassword:'',
  // code:'',
})
const clear = ()=>{
  registerData.value = {
    username:'',
    password:'',
    rePassword:'',
  }
}
const loginData = ref({
  username:'',
  password:'',
  rePassword:'',
  isRemember:'',
  isAuto:'',
  temporaryId:'',
  code:'',
})
const img = ref('');
import {useTemporaryIdStore} from "@/stores/TemporaryId.js";
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
  if(!rememberStore.isRemember){
    loginData.value.username = ''
    loginData.value.password = ''
    loginData.value.rePassword= ''
  }
  loginData.value.code= ''
}
const checkRePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次确认密码'))
  } else if (value !== registerData.value.password) {
    callback(new Error('请确保两次输入的密码一样'))
  } else {
    callback()
  }
}
let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!%*?&@])[A-Za-z\d@!%*?&]{8,}$/
const thePassword = (rule,value,callback)=>{
  if(!regex.test(value)){
    callback(new Error("至少要有一个大小写字母一个特殊字符"))
  }
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
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 16, message: '长度为5~16位非空字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, max: 16, message: '长度为8~16位非空字符', trigger: 'blur' },
    {validator: thePassword,trigger: "blur"}
  ],
  rePassword: [
    { validator: checkRePassword, trigger: 'blur' }
  ]
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
const rememberStore = useRememberStore()
const tokenStore = useTokenStore()
const autoStore = useAutoStore()
const success = (msg)=>{
  ElMessage.success(msg)
}
const AutoLogin = async() =>{
  const autoStore = useAutoStore()
  if(autoStore.isAuto){
    await autoLoginService()
    isLogin.value = true
  }
}
const userLogin = async ()=>{

  loginData.value.temporaryId = temId.temporaryId
  const result = await loginService(loginData.value)
  success("登录成功")
  rememberStore.setIsRemember(loginData.value.isRemember)
  autoStore.setIsAuto(loginData.value.isAuto)
  tokenStore.setToken(result.data)
  isLogin.value = true
  loginVisible.value = false
  clearLogin()
}
const recover = async ()=>{
  const rememberStore = useRememberStore()
  if(rememberStore.isRemember){
    const result =  await recoverService()
    loginData.value.username = result.data.username;
    loginData.value.password = result.data.password;
    loginData.value.isRemember = true;
  }
}
const Register = async ()=>{
  await registerService(registerData.value)
  success("注册成功")
  login.value.status = true
  clear()
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="10" >预留二维码登录，手机号登录等方式</el-col>
    <el-col :span="9" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-if="!isLogin.status" :model="registerData" :rules="rules">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop= "username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.password"></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input :prefix-icon="Lock" type="password" placeholder="请再次输入密码" v-model="registerData.rePassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="danger" auto-insert-space @click="toRegister()">
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isLogin.status=true;clear()"><-已有账号？</el-link>
        </el-form-item>
      </el-form>


      <el-form ref="form" size="large" autocomplete="off" v-else :model="loginData" :rules="loginRule">
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
            <el-input name="code" :prefix-icon="Lock" placeholder="请输入验证码" v-model="loginData.code"></el-input>
            <el-image :src='img' @click="imageVerify()" class="verifyImg"></el-image>
          </div>

        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox v-model="loginData.isRemember">
              记住我
            </el-checkbox>
            <el-checkbox v-model="loginData.isAuto">自动登录</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码?</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type = "danger" auto-insert-space @click="login()" :plain="true">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-link type="info" :underline="false" @click="isLogin.status=false;clearLogin();">没有账号?->注册</el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped>
.login-page {
  background-color: #fff;
  .container {
    display: flex; /* 使用flex布局 */
    align-items: center; /* 垂直居中对齐 */
  }
  .verifyImg{
    width: 200px;
    height: 40px;
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
</style>