<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../../assets/img/logo_miccall.png" alt="" />
      </div>
      <!-- 登录区域 -->
      <el-form
        ref="loginFromRef"
        label-width="0px"
        class="login_from"
        :model="loginFrom"
        :rules="loginFromRules"
      >
        <!-- 账号 -->
        <el-form-item prop="username">
          <!--prop element-ui数据验证属性  值为验证规则 -->
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="loginFrom.username"
            placeholder="请输入账号"
            clearable 
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="loginFrom.password"
            type="password"
            placeholder="密码"
            clearable 
            show-password
          ></el-input>
        </el-form-item>
        <!-- 登录区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="primary" @click="resetLoginFrom">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reManagerLogin } from "../../utils/request";
import { warningAlert, succseeAlert } from "../../utils/alert";
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      loginFrom: {
        username: "lixiaobai",
        password: "1234",
      },
      //element-ui 自带登录验证
      loginFromRules: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    
  },
  methods: {
    ...mapActions({
      changeUserInfoAction:"changeUserInfoAction"
    }),
    //login 验证数据库  登录数据
    login() {
      this.$refs.loginFromRef.validate((valid) => {
        if (!valid) {
          return;
        }

        reManagerLogin(this.loginFrom).then(res=>{
          if(res.data.code ==200){
            succseeAlert("登陆成功")
            this.changeUserInfoAction(res.data.list)
            this.$router.push("/")

          }else {
            warningAlert("登录失败")
          }
        })
      });
    },
    //重置数据 
    resetLoginFrom() {
      this.$refs.loginFromRef.resetFields();
    },
  },
};
</script>
<style scoped>
.login_container {
  height: 100%;
  background: #2b4b6b;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #ccc;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
}
.avatar_box img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background: #eee;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login_from {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>