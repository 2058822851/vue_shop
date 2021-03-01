<template> 
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avater_box">
        <img src="~assets/logo.png" alt="">
      </div>
      <!-- 登录表单区 -->
      <el-form label-width="0px" class="login_form"
      ref='loginFormRef'
      :model='loginForm'
      :rules='loginRules'>
        <!-- 用户名 -->
        <el-form-item prop='username'>
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop='password'>
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type='password'></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click='resetLoginForm'>重置</el-button>
        </el-form-item>
      </el-form>
    </div> 
  </div>
</template>
<script>
import { getLogin } from 'network/login'
export default {
  data() {
    return {
      //登陆表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //表单的验证规则
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'},
          { min: 3, max: 6, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    //点击重置按钮
    resetLoginForm() {
      //console.log(this);
      this.$refs.loginFormRef.resetFields()
    },
    //点击登录预验证
    login() {
      this.$refs.loginFormRef.validate((valid) => {
        //console.log(valid);
        if(!valid) return;
        /* const result = this.$http.post('login', this.loginForm)
        console.log(result); */
        getLogin(this.loginForm.username, this.loginForm.password).then(res => {
          console.log(res);
          if(res.meta.status !== 200) return this.$message.error('登录失败')
          this.$message.success('登陆成功')
          //1将登陆成功后的token，保存到客户端session Storage中
            //1.1项目中除了登录之外的其他APi接口，必须在登陆之后才能访问
            //1.2token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
          window.sessionStorage.setItem("token", res.data.token)
          //2通过编程式导航跳转到后台主页，路由地址是/home
          this.$router.push("home")
        
        })
      })
    }
  }
  
}
</script>

<style lang="less" scoped>
  .login_container{
    background-color: #2b4b6b;
    height: 100%;
  }

  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    .avater_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      box-shadow: 0 0 10px #ddd;
      padding: 10px;
      position: absolute;
      transform: translate(-50%,-50%);
      left: 50%;
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        background-color: #eee;
        border-radius: 50%;
      }
    }   
  }

  .login_form{
    position: absolute;
    bottom: 0;
    box-sizing: border-box;
    padding:0 20px;
    width: 100%;
    
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }
</style>