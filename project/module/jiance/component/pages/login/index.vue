<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <br/>
    <br/>
    <div class="textInputStyles">
      <input v-model="messageuser" placeholder="用户名／手机号" class="messageStyle"
             type="text" ref="username"
      >
      <img class="icon_input" src="../../../../../assets/images/icon_wrong.png"
           v-on:click="clearText">
    </div>
    <div class="line"></div>
    <br/>
    <br/>
    <div class="textInputStyles">
      <input v-model="messagepass" placeholder="输入密码" class="messageStyle"
             type="password" ref="password"
      />
      <template v-if="isSeen">
        <img class="icon_input" src="../../../../../assets/images/icon_eye.png" v-on:click="switchPass"/>
      </template>
      <template v-else>
        <img class="icon_input" src="../../../../../assets/images/icon_invalid.png" v-on:click="switchPass"/>
      </template>
    </div>
    <div class="line"></div>
    <br/>
    <br/>

    <div v-if="isSubmit">
      <div class="submitStyle" v-on:click="loginSubmit">登陆</div>
    </div>
    <div v-else>
      <div class="unSubmitStyle">登陆</div>
    </div>
  </div>
</template>

<script>
  import { LoginRequest, requestLogin } from '../../../api/LoginRequest'

  export default {
    name: 'hello',
    data () {
      return {
        msg: '盈峰项目管理系统',
        messageuser: '',
        messagepass: '',
        isSubmit: false,
        isSeen: false
      }
    },
    watch: {
      messageuser: function () {
        this.isSubmit = this.checkInput()
      },
      messagepass: function () {
        this.isSubmit = this.checkInput()
      }
    },
    methods: {
      checkInput: function () {
        if (this.messageuser !== '' && this.messagepass !== '') {
          return true
        } else {
          return false
        }
      },
      clearText: function () {
        this.messageuser = ''
      },
      switchPass: function () {
        this.isSeen = !this.isSeen
        if (this.isSeen) {
          this.$refs.password.type = 'text'
        } else {
          this.$refs.password.type = 'password'
        }
      },
      loginSubmit: function () {
        let params = {'username': this.messageuser, 'password': this.messagepass}
        requestLogin(this, params, (succ) => {
          this.$vux.toast.text('登陆成功', 'bottom')
          this.$router.replace({path: '/'})
        }, (err) => {
          this.$vux.toast.text('登录失败', 'bottom')
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: inherit;
    font-size: 24px;
    color: #29a1f7;
    margin-top: 179px;
    text-align: center;
  }

  .icon_input {
    width: 20px;
    height: 20px;
  }

  .hello {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 20px;
    margin-right: 20px;
  }

  .textInputStyles {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  .messageStyle {
    font-size: 17px;
    border: none;
    outline: none;
    background: none;
    flex: 1;
  }

  .line {
    height: 1px;
    background-color: #dddddd;
    margin-top: 10px;
  }

  .unSubmitStyle {
    background-color: #cccccc;
    height: 48px;
    font-size: 18px;
    color: white;
    display: flex;
    border-radius: 3px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .submitStyle {
    background-color: #29a1f7;
    height: 48px;
    font-size: 18px;
    color: white;
    display: flex;
    border-radius: 3px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
