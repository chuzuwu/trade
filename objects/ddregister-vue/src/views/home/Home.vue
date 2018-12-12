<template>
  <div class="base-layout">
    <scroll class="bscroll">
      <div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;" ref="bscrollContainer">
        <div>
          <img src="../../assets/didi_siya100px.png" style="width: 100%;" ref="img"/>
        </div>
        <button class="share-btn" v-on:click="shareClick">分享获得100元</button>
      </div>
    </scroll>

    <!--<div style="display: flex; flex-direction: column; justify-content: flex-start; align-items: center;" ref="bscrollContainer">-->
      <!--<img src="../../assets/didi_siya.png" style="width: 100%;" ref="img"/>-->
      <!--<button class="share-btn" v-on:click="shareClick">分享获得100元</button>-->
    <!--</div>-->



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
  </div>
</template>

<script>
import UserInfoStorage from '../../storage/UserInfoStorage'
import mydialog from '../../components/mydialog'
import { Toast, Indicator, MessageBox} from 'mint-ui'
import ShareLinkUtil from '../../util/ShareLinkUtil'
import scroll from '../../components/scroll/myscroll'

export default {
  name: 'home',

  data(){
    return {
      sharedLink: ''
    }
  },

  components: {
    mydialog: mydialog,
    scroll: scroll
  },

  mounted(){
    let windowWidth = `${document.documentElement.clientWidth}`
    let imgHeight = windowWidth * 1.58;
    console.log('#######image width height#####', windowWidth, imgHeight)
    this.$refs.img.style.height = imgHeight + 'px';
  },

  methods: {
    /**
     * 点击分享按钮
     */
    shareClick() {
      let _this = this

      if (UserInfoStorage.getStoragedUserInfo()) {
        UserInfoStorage.getStorageUserInfoLoginByNull(_this, function (userInfo) {
          if (userInfo && userInfo.userId) {
            _this.sharedLink = ShareLinkUtil.getSharedLinkWith(userInfo.userId)
          }
          _this.$refs.mydialog.show();
        })
      } else {
        const htmls = `
           <div style="font-size: 15px; line-height: 22px; color: gray;>
             <span">需要先登录生成您的专属分享链接</span>
          </div>
        `;
        MessageBox.confirm('', {
          message: htmls,
          title: '',
          showConfirmButton:true,
          showCancelButton: false,
          confirmButtonText:'使用邮箱快速登录'
        }).then(action => {
          //前往登录页面
          UserInfoStorage.getStorageUserInfoLoginByNull(_this, function (userInfo) {
          })
        });
      }
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

  .base-layout {
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .bscroll{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .share-btn {
    /*margin-left: 5px;*/
    width: 90%;
    /*margin-right: 5px;*/
    margin-bottom: 20px;
    height: 50px;
    border-radius: 5px;
    background-color: $color-my-blue;
    color: white;
    margin-top: 20px;
    font-size: 19px;
    font-weight: bold;
  }
</style>