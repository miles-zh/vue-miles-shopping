<template>
  <div>
    <div class="head">
      <img src="http://img5.imgtn.bdimg.com/it/u=3791377322,2218627747&fm=26&gp=0.jpg   " alt />
    </div>
    <div class="nav">
      <div
        :class="['login-button',isLoginOrRegister?'active':'']"
        @click="isLoginOrRegister = true"
      >登录</div>
      <div
        :class="['register-button',!isLoginOrRegister?'active':'']"
        @click="isLoginOrRegister = false"
      >注册</div>
    </div>
    <div class="login" v-if="isLoginOrRegister">
      <form method="#">
        <div class="username">
          <label for="loginusername">
            <i class="fa fa-user-o" aria-hidden="true"></i>
          </label>
          <input
            type="text"
            id="loginusername"
            name="mobile"
            placeholder="手机号"
            v-model.trim="loginFormData.mobile"
            @blur="verificateMobile"
          />
        </div>

        <div class="verification-reminder">{{mobileVerificationReminderText}}</div>

        <div class="verification">
          <label for="loginverification">
            <i class="fa fa-lock" aria-hidden="true"></i>
          </label>
          <input
            type="text"
            id="loginverification"
            name="verification"
            placeholder="验证码"
            v-model.trim="loginFormData.verification"
            @blur="verificateVerification"
          />
          <button disabled>获取验证码</button>
        </div>
        <div class="verification-reminder">{{verificationVerificationReminderText}}</div>
        <div class="submit" @click.stop="login">登录</div>
      </form>
    </div>
    <div class="register" v-if="!isLoginOrRegister">注册</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoginOrRegister: true,
      loginFormData: {
        mobile: "",

        verification: ""
      },
      
      verificationVerificationReminderText: "",
      mobileVerificationReminderText: ""
    };
  },
  created() {
    // console.log(this.$route.query.beforePath);
    
  },
  methods: {
    async login() {
      console.log(this.loginFormData.mobile);
      const { data } = await this.$http.post(
        this.baseUrl + "/api/login",
        this.loginFormData
      );
      console.log(data);
      window.localStorage.setItem("isLogin", data.data.isLogin);
      
    //   await this.getCartlist()
      await this.$store.commit('getCartlist',data.data.userId)
      await this.$store.commit('getUserInfo',data.data.userId)
          this.$router.push({ path: this.$route.query.beforePath });
      
      
    },
    verificateMobile() {
      if (this.loginFormData.mobile.length == 0) {
        this.mobileVerificationReminderText = "";
        return;
      }
      let reg = /^1[3-9]\d{9}$/;
      if (this.loginFormData.mobile.length != 11) {
        this.mobileVerificationReminderText =
          "Please Input 11 Mobile Numbers!!!";
      } else if (!reg.test(this.loginFormData.mobile)) {
        this.mobileVerificationReminderText =
          "Please Input The Correct Mobile Numbers!!!";
      } else {
        this.mobileVerificationReminderText = "";
      }
    },
    verificateVerification() {
      if (this.loginFormData.verification.length == 0) {
        this.verificationVerificationReminderText = "";
        return;
      }
      if (this.loginFormData.verification.length != 6) {
        this.verificationVerificationReminderText =
          "Please Input 6-digit Verification Code!!!";
      } else {
        this.verificationVerificationReminderText = "";
      }
    },
    async getCartlist() {
      const { data } = await this.$http.get(
        this.baseUrl + "/api/goods/cartlist"
      );
      window.localStorage.setItem("cartlist", JSON.stringify(data.data));
      // console.log(data.data)
    }
  }
};
</script>

<style scoped lang="scss">
$color: #39f;
.head {
  height: 6rem;
  background-color: #000;
  width: 100%;
  // border:1px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    widows: 3rem;
    border: 1px solid #000;
    height: 3rem;
    border-radius: 50%;
  }
}
.nav {
  display: flex;
  font-size: 0.6rem;
  line-height: 1rem;
  border-bottom: 1px solid $color;
  div {
    width: 50%;
  }
  .active {
    background-color: $color;
    color: #fff;
  }
}
form {
  padding: 10px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  .username,
  .verification {
    border-bottom: 1px solid $color;
    width: 5rem;
    margin-top: 8px;
  }
  i {
    font-size: 0.5rem;
    color: #999;
  }
  input {
    width: 4.5rem;
    height: 0.5rem;
    outline: none;
    border: none;
    padding-left: 10px;
    font-size: 0.4rem;
    align-items: baseline;
    color: #999;
  }
  .verification {
    display: flex;
    align-items: flex-end;
    border-bottom-right-radius: 10px;
    button {
      font-size: 0.2rem;
      height: 0.6rem;
      width: 2rem;
      border: 1px solid $color;
      background-color: $color;
      color: #fff;
      line-height: 0.6rem;
      border-radius: 10px;
    }
    input {
      width: 3rem;
      margin-bottom: 0.15rem;
    }
  }
  .submit {
    background: $color;
    outline: none;
    border: 1px solid $color;
    width: 5rem;
    height: 0.8rem;
    font-size: 0.5rem;
    line-height: 0.8rem;
    color: #fff;
    margin-top: 50px;
  }
  .verification-reminder {
    font-size: 0.3rem;
    height: 0.5rem;
    line-height: 0.5rem;
    color: #f40;
  }
}
</style>