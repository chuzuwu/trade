<script src="../../main.js"></script>
<template>
  <transition name="slide">
    <div class="login01">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>

      <div class="content-wrapper">
        <input v-model="inputEmail" placeholder="请输入您要登录的邮箱" class="my-input"/>
        <button class="my-button" @click="sendCodeByEmail">发送验证码</button>
        <input v-model="inputCode" placeholder="请输入4位数验证码" class="my-input" style="margin-top: 25px;"/>
        <button class="my-button" @click="next">登录</button>
      </div>

    </div>
  </transition>
</template>

<script>
  import StringUtil from '../../util/StringUtil'
  import UserInfoStorate from '../../storage/UserInfoStorage'
  import { Toast, Indicator, MessageBox} from 'mint-ui'

  export default {
    data() {
      return {
        inputEmail: '',
        inputCode: ''
      }
    },

    created() {
      console.log('widow.localstorage=>',window.localStorage);
    },

    methods: {
      back() {
        this.$router.back()
      },

      /**
       * 通过邮箱验证码登录
       */
      next() {
        let _this = this
        if (StringUtil.isNullOrEmptyTrim(this.inputCode)) {
          Toast('请输入验证码')
          return
        }

        this.$http.get('login/loginbycode', {
          params: {
            'email': this.inputEmail,
            'code': this.inputCode,
            'sharedUserid': UserInfoStorate.sharedUserid
          }
        }).then(function (response) {
          console.log('login/loginbycode=>',response)
          if (response.data.code == 0) {
            console.log('登录的用户=>', response.data.data)
            UserInfoStorate.setStoragedUserInfo(response.data.data)
            _this.$router.back()
          } else {
            // 登录错误
            MessageBox('登录错误', response.data.msg);
          }
        }).catch(function (error) {
          console.log(error);
          MessageBox('catch', error);
        })
      },


      /**
       * 发送邮件
       */
      sendCodeByEmail() {
        let _this = this
        if (StringUtil.isEmail(this.inputEmail)) {// 是邮箱

          Indicator.open({
            text: '正在发送邮件',
            spinnerType: 'triple-bounce'
          });

          this.$http.get('login/sendemail', {
            params: {
              'email': this.inputEmail
            }
          }).then(function (response) {
            console.log('login/sendemail=>',response);
            if (response.data.code == 0) {
              // 发送邮件成功
              Indicator.close();
              MessageBox('发送邮件成功', '请前往您的邮箱获取验证码');
            } else {
              // 发送邮件失败
              Indicator.close();
              MessageBox('发送邮件失败', response.data.msg);
            }
          }).catch(function (error) {
            Indicator.close();
            console.log(error);
            MessageBox('catch', error);
          })
        } else {// 不是邮箱
          Toast('请输入正确的邮箱地址')
        }
      }
    }
  }
</script>


<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .login01
    position: fixed
    top: 0
    bottom: 0
    /*z-index: 100*/
    width: 100%
    background: white
    display: flex
    flex-direction: column
    justify-content: center
    align-items center;
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
  .content-wrapper {
    width: 100%;
    display: flex
    flex-direction: column
    justify-content: center
    align-items center;
  }

  .my-input {
    font-size: 19px;
    display: block;
    /*height: 70px;*/
    width: 60%;
    border-bottom solid 1px black;
    text-align: center;
    line-height: 44px;
  }

  .my-button {
    width: 60%;
    height: 44px;
    border-radius: 5px;
    background-color: #3C6696;
    color: white;
    font-size: 18px;
    margin-top: 25px;
  }
</style>