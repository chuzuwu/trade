<script src="../../main.js"></script>
<template>
  <transition name="slide">
    <div class="login01">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <scroll class="content-wrapper">
        <div style="width: 100%; display: flex; justify-content: flex-start; flex-direction: column; align-items: center;">
          <div v-show="hasData" v-for="(coupon, index) in coupons" style="width: 95%; border-radius: 8px; background-color: white; color: black; padding: 10px; border: solid 1px lightgray; margin-bottom: 10px;">
            <div style="display: flex; flex-direction: row; justify-content: space-between; align-items:center; width: 100%;">
              <span style="font-size: 20px;">分享现金券{{coupon.use_status == 0 ? '(未使用)' : coupon.use_status == 1 ? '(处理中)' : '(已使用)'}}</span>
              <div v-show="coupon.use_status == 0 ? true : false" @click="applyCash(index)" style="font-size: 15px; background-color: #3C6696; color: white; padding: 7px; border-radius: 3px;">申请兑现</div>
            </div>
            <div style="display: flex; flex-direction: row; justify-content: space-between; align-items:center; width: 100%; margin-top: 15px;">
              <div style="flex-grow: 1; flex-shrink: 1; flex-direction: column;">
                <div style="line-height: 20px; font-size: 12px; color: gray;">
                  <span>描述：</span>
                  <span>用户通过你的分享下单</span>
                </div>
                <div style="line-height: 20px; font-size: 12px; color: gray;">
                  <span>日期：</span>
                  <span>{{coupon.create_time}}</span>
                </div>
              </div>
              <span style="font-size: 33px; font-weight: bold;">{{coupon.coupon_amount}}元</span>
            </div>
          </div>
        </div>
      </scroll>
      <div v-if="hasData == false" class="content-wrapper" style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div style="font-size: 16px; font-weight: bold; color: black">暂无数据, 分享可获得现金券</div>
        <button v-on:click="shareClick" style="border-radius: 5px;background-color: #3C6696;color: white;font-size: 16px;margin-top: 25px; padding: 10px 20px 10px 20px;">点我分享</button>
        <mydialog ref="mydialog">
          <div class="flex-column-layout" style="background-color: white; color: black; width: 95%; padding: 15px; border-radius: 5px; position: relative;">
            <div style="font-size: 22px; font-weight: bold; color: #d93f30;">分享得现金</div>
            <div style="font-size: 19px; margin-top: 25px; line-height: 25px; font-weight: bold;">复制下方链接给好友打开，好友下单后，你将得到100元现金。</div>
            <div style="font-size: 19px; margin-top: 20px; line-height: 25px; font-weight: bold; text-decoration: underline;">{{sharedLink}}</div>
            <button v-clipboard:copy="sharedLink"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                    style="margin-top: 20px; border-radius: 5px; line-height: 35px; background-color: #3C6696; color: white; width: 150px;font-size: 16px;">点击复制链接</button>
            <button @click="closeDialog" style="margin-top: 20px; border-radius: 5px; line-height: 35px; background-color: #3C6696; color: white; width: 150px;font-size: 16px;">关 闭</button>
          </div>
        </mydialog>
      </div>
    </div>
  </transition>
</template>

<script>
  import scroll from '../../components/scroll/myscroll'
  import UserInfoStorage from '../../storage/UserInfoStorage'
  import StringUtil from '../../util/StringUtil'
  import { Toast, Indicator, MessageBox} from 'mint-ui'
  import TSCenter from '../../storage/TempStorageCenter'
  import mydialog from '../../components/mydialog'
  import ShareLinkUtil from '../../util/ShareLinkUtil'

  export default {
    components: {
      scroll: scroll,
      mydialog: mydialog
    },
    data() {
      return {
        coupons: [],
        hasData: false,
        sharedLink: ''
      }
    },
    created() {
      this.__requestUserCouponsFromServer()
    },

    activated() {
      console.log('coupon01 activated...')
      if (TSCenter.sharedInstance().getGoodsWithKey('RefreshCoupon01')){
        console.log('coupon01 refreshing...')
        this.__requestUserCouponsFromServer()
      }
    },

    methods: {
      back() {
        this.$router.back()
      },

      /**
       * 跳转到申请界面
       */
      applyCash(index) {
        console.log(index);
        let _this = this;
        let userCoupon = _this.coupons[index];
        console.log(userCoupon)
        let usercouponsId = userCoupon.usercoupons_id;
        if (StringUtil.isNullOrEmptyTrim(usercouponsId)) {
          MessageBox('参数不正确');
          return
        }

        UserInfoStorage.getStorageUserInfoLoginByNull(_this, function (userInfo) {
          _this.$router.push({
            path: '/applyCash',
            query:{
              usercouponsId: usercouponsId,
              email: userInfo.email
            }
          })
        })
      },

      /**
       * 从服务器请求用户的现金券
       * @private
       */
      __requestUserCouponsFromServer() {
        let _this = this;

        Indicator.open({
          text: '正在请求数据',
          spinnerType: 'triple-bounce'
        });

        UserInfoStorage.getStorageUserInfoLoginByNull(_this, function (userInfo) {
          _this.$http.get('/userCoupons/findByUserId', {
            params: {
              'userId': userInfo.userId,
            }
          }).then(function (response) {
            Indicator.close();
            console.log('/userCoupons/findByUserId=>',response)
            if (response.data.code == 0) {
              _this.coupons = response.data.data;
              _this.hasData = _this.coupons.length === 0 ? false : true
            } else {
            }
          }).catch(function (error) {
            Indicator.close();
            console.log(error);
            MessageBox('catch', error);
          })
        })
      },



      /**
       * 点击分享按钮
       */
      shareClick() {
        let _this = this
        UserInfoStorage.getStorageUserInfoLoginByNull(_this, function (userInfo) {
          if (userInfo && userInfo.userId) {
            _this.sharedLink = ShareLinkUtil.getSharedLinkWith(userInfo.userId)
          }
          _this.$refs.mydialog.show();
        })
      },

      /**
       * 关闭弹窗
       */
      closeDialog() {
        let _this = this
        _this.$refs.mydialog.hide();
      },

      /**
       * 复制分享链接成功
       */
      onCopy(e) {
        Toast('复制成功')
      },

      /**
       * 复制分享链接失败
       */
      onError(e) {
        MessageBox('复制失败', '请长按链接进行复制')
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
    background: #eeeeee
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
    /*height: 100%;*/
    position: absolute;
    top: 40px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
</style>