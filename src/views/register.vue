<template>
  <div class="main">
    <div class="title">
      <router-link to="/login">登录</router-link>
      <span>·</span>
      <router-link to="/register" class="active">注册</router-link>
    </div>

    <div class="sign-up-container">
      <el-form ref="userForm" :model="params">
        <el-form-item
          class="input-prepend restyle"
          prop="nickname"
          :rules="[
            { required: true, message: '请输入你的昵称', trigger: 'blur' },
          ]"
        >
          <div>
            <el-input
              type="text"
              placeholder="你的昵称"
              v-model="params.nickname"
            />
            <i class="iconfont icon-user" />
          </div>
        </el-form-item>

        <el-form-item
          class="input-prepend restyle no-radius"
          prop="email"
          :rules="[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' },
          ]"
        >
          <div>
            <el-input type="text" placeholder="邮箱" v-model="params.email" />
            <i class="iconfont icon-email" />
          </div>
        </el-form-item>

        <el-form-item
          class="input-prepend restyle no-radius"
          prop="code"
          :rules="[
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ]"
        >
          <div
            style="width: 100%; display: block; float: left; position: relative"
          >
            <el-input type="text" placeholder="验证码" v-model="params.code" />
            <i class="iconfont icon-email" />
          </div>
          <div
            class="btn"
            style="position: absolute; right: 0; top: 6px; width: 40%"
          >
            <el-button type="text" @click="getCodeFun" :disabled="sending">{{
              codeTest
            }}</el-button>
          </div>
        </el-form-item>

        <el-form-item
          class="input-prepend"
          prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <div>
            <el-input
              type="password"
              placeholder="设置密码"
              v-model="params.password"
            />
            <i class="iconfont icon-password" />
          </div>
        </el-form-item>

        <div class="btn">
          <input
            type="button"
            class="sign-up-button"
            value="注册"
            @click="submitRegister('userForm')"
          />
        </div>
        <p class="sign-up-msg">
          点击 “注册” 即表示您同意并愿意遵守简书
          <br />
          <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce"
            >用户协议</a
          >
          和
          <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a>
          。
        </p>
      </el-form>
    </div>
  </div>
</template>

<script>
import "@/assets/css/sign.css";
import "@/assets/css/iconfont.css";

import register from "@/api/register";

export default {
  layout: "sign",
  data() {
    return {
      params: {
        //封装注册输入数据
        email: "",
        code: "", //验证码
        nickname: "",
        password: "",
      },
      sending: false, //是否没在发送验证码
      second: 60, //倒计时间
      codeTest: "获取验证码",
    };
  },
  methods: {
    checkEmail(rule, value, callback) {
      if (!/^([a-z0-9_\\.-]+)@([\da-z\\.-]+)\.([a-z\\.]{2,6})$/.test(value)) {
        return callback(new Error("邮箱号码格式不正确"));
      }
      return callback();
    },
    // 定时器
    timeDown() {
      let result = setInterval(() => {
        --this.second;
        this.codeTest = this.second;
        if (this.second < 1) {
          clearInterval(result);
          this.sending = false;
          this.second = 60;
          this.codeTest = "获取验证码";
        }
      }, 1000);
    },
    // 发送验证码
    getCodeFun() {
      let { email } = this.params;

      if (!email) {
        this.$message({
          type: "error",
          message: "请输入邮箱",
        });

        return;
      }

      register.sendMailCode(this.params.email).then((result) => {
        this.sending = true;
        this.$message({
          type: "info",
          message: "发送验证码成功",
        });
        this.timeDown();
      });
    },
    // 注册提交
    submitRegister(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          register.register(this.params).then((result) => {
            // 注册成功
            this.$message({
              type: "success",
              message: "注册成功",
            });
            // 跳转到登陆页面
            this.$router.push({
              path: "/login",
            });
          });
        }
      });
    },
  },
};
</script>
