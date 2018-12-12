<script src="../../main.js"></script>
<template>
  <transition name="slide">
    <div class="login01">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>

      <div class="content-wrapper">
        <input v-model="inputPhone" placeholder="请输入支付宝收款手机号" class="my-input"/>
        <button class="my-button" style="font-size: 14px;" @click="sendCodeByEmail">发送验证码到({{email}})</button>
        <input v-model="inputCode" placeholder="请输入4位数验证码" class="my-input" style="margin-top: 25px;"/>
        <button class="my-button" @click="next">确 定</button>
      </div>

    </div>
  </transition>
</template>

<script>
  import StringUtil from '../../util/StringUtil'
  import UserInfoStorate from '../../storage/UserInfoStorage'
  import { Toast, Indicator, MessageBox} from 'mint-ui'
  import TSCenter from '../../storage/TempStorageCenter'
  export default {
    data() {
      return {
        inputPhone: '',
        inputCode: '',
        email: '',
        usercouponsId: ''
      }
    },
    mounted() {
      let _this = this;
      _this.email = _this.$route.query.email;
      _this.usercouponsId = _this.$route.query.usercouponsId;
      console.log("参数==>",_this.$route.query)
    },

    destroyed() {
      console.log('apply cash destroyed...')
    },

    methods: {
      back() {
        this.$router.back()
      },

      /**
       * 发送邮件
       */
      sendCodeByEmail() {
        let _this = this
        UserInfoStorate.getStorageUserInfoLoginByNull(_this, function (userInfo) {
          let email = userInfo.email;
          if (StringUtil.isEmail(email)) {// 是邮箱
            Indicator.open({
              text: '正在发送邮件',
              spinnerType: 'triple-bounce'
            });

            _this.$http.get('couponOrder/sendEmail', {
              params: {
                'email': email
              }
            }).then(function (response) {
              Indicator.close();
              console.log(response);
              if (response.data.code == 0) {
                // 发送邮件成功
                MessageBox('发送邮件成功', `请前往您的邮箱(${email})获取申请兑现验证码`);
              } else {
                // 发送邮件失败
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
        })
      },

      /**
       * 申请提现
       */
      next() {
        let _this = this
        if (StringUtil.isNullOrEmptyTrim(_this.inputCode)) {
          Toast('请输入验证码')
          return
        }

        if (!StringUtil.isPhone(_this.inputPhone)) {
          Toast('请输入正确的手机号')
          return
        }

        Indicator.open({
          text: '正在操作',
          spinnerType: 'triple-bounce'
        });

        _this.$http.get('couponOrder/create', {
          params: {
            'usercouponsId': _this.usercouponsId,
            'recvChannelPhone': _this.inputPhone,
            'code': _this.inputCode
          }
        }).then(function (response) {
          Indicator.close();
          console.log(response)
          if (response.data.code == 0) {
            TSCenter.sharedInstance().setGoodsWithKey('RefreshCoupon01', true)
            MessageBox.alert('请等待系统打款到你的支付宝', '申请兑现成功').then(function () {
              _this.$router.back()
            });
          } else {
            MessageBox('申请兑现错误', response.data.msg);
          }
        }).catch(function (error) {
          Indicator.close();
          console.log(error);
          MessageBox('catch', error);
        })
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
    font-size: 16px;
    display: block;
    /*height: 70px;*/
    width: 80%;
    border-bottom solid 1px black;
    text-align: center;
    line-height: 44px;
  }

  .my-button {
    width: 80%;
    height: 44px;
    border-radius: 5px;
    background-color: #3C6696;
    color: white;
    font-size: 18px;
    margin-top: 25px;
  }
</style>