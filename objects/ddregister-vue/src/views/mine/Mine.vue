<template>
  <div style="color: black; background-color: #eeeeee; width: 100%; height: 100%; position: relative;">
    <div style="width: 100%; height: 10px;"></div>

    <mt-cell title="我的账号id：" v-bind:value="userInfo.userId"></mt-cell>
    <mt-cell title="我的账号邮箱：" v-bind:value="userInfo.email"></mt-cell>

    <div style="width: 100%; height: 30px;"></div>

    <!--<mt-cell title="我的账单" is-link to="/login02"></mt-cell>-->
    <mt-cell title="我的现金券" is-link to="/coupon"></mt-cell>
    <mt-cell title="邀请有礼">
      <span @click="shareClick" style="color: green; border: solid 1px green; padding: 5px;">点我分享得现金</span>
    </mt-cell>

    <mydialog ref="mydialog">
      <div class="flex-column-layout" style="background-color: white; color: black; width: 95%; padding: 15px; border-radius: 5px; position: relative; box-sizing: border-box;">
        <div style="font-size: 22px; font-weight: bold; color: #d93f30;">分享得现金</div>
        <div style="font-size: 19px; margin-top: 25px; line-height: 25px; font-weight: bold;">复制下方链接给好友打开，好友下单后，你将得到100元现金。</div>
        <div style="font-size: 19px; margin-top: 20px; line-height: 25px; font-weight: bold; text-decoration: underline; word-wrap: break-word; word-break:break-all;">{{sharedLink}}</div>
        <button v-clipboard:copy="sharedLink"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                style="margin-top: 20px; border-radius: 5px; line-height: 35px; background-color: #3C6696; color: white; width: 150px;font-size: 16px;">点击复制链接</button>
        <button @click="closeDialog" style="margin-top: 20px; border-radius: 5px; line-height: 35px; background-color: #3C6696; color: white; width: 150px;font-size: 16px;">关 闭</button>
      </div>
    </mydialog>

    <inviewdialog ref="inviewdialog">
      <div style="width: 85%; border-radius: 3px;background-color: white; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div style="margin-top: 15px; font-size: 16px; font-weight: bold;"> 您还没有登录哦</div>
        <div style="margin-top: 18px; font-size: 16px; font-weight: bold; color: gray;">使用邮箱快速登录</div>
        <div style="width: 100%; height: 1px; margin-top: 20px; background-color: gray;"></div>
        <div @click="confirmToLoginClick" style="font-size: 17px; font-weight: bold; color: dodgerblue; line-height: 40px; width: 100%; text-align: center;">确 定</div>
      </div>
    </inviewdialog>
  </div>
</template>

<script>
import UserInfoStorage from '../../storage/UserInfoStorage'
import mydialog from '../../components/mydialog'
import InviewDialog from '../../components/InviewDialog'
import { Toast, Indicator, MessageBox} from 'mint-ui'
import ShareLinkUtil from '../../util/ShareLinkUtil'

export default {
  name: 'mine',
  components: {
    mydialog: mydialog,
    inviewdialog: InviewDialog
  },
  data() {
    return {
      userInfo: '',
      sharedLink: ''
    }
  },

  activated() {
    if (this.userInfo == '') {
      this.__loadUserInfo()
    }
  },

  methods: {

    /**
     * 加载保存在本地的用户数据
     */
    __loadUserInfo() {
      let _this = this

      if (UserInfoStorage.getStoragedUserInfo()) {
        console.log('user is logined...')
        _this.$refs.inviewdialog.hide()
        _this.userInfo = UserInfoStorage.getStoragedUserInfo()
      } else {
        console.log('user has been not logined...')
        _this.$refs.inviewdialog.show();
      }
    },

    confirmToLoginClick() {
      let _this = this
      UserInfoStorage.getStorageUserInfoLoginByNull(this, function (userInfo) {
        _this.userInfo = userInfo
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

</style>