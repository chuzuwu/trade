<template>
  <div id="app" ref="app">
    <keep-alive>
      <router-view class="router-view"></router-view>
    </keep-alive>
    <tabbar></tabbar>
  </div>
</template>

<script type="text/ecmascript-6">
  import Tabbar from 'components/tabbar/tabbar'
  import UserInfoStorage from './storage/UserInfoStorage'

  export default {
    components: {
      tabbar: Tabbar
    },

    data() {
      return {
        clientHeight: ''
      }
    },

    mounted() {

      //window.location.href
      let _wlh = window.location.href
      console.log('window.location.href =>', window.location.href)
      //sharedUserid=\[[^\]]+\]  获取第一个
      if (_wlh) {
        let reg = new RegExp('suid=[0-9]+')
        let rs = reg.exec(window.location.href)
        if (rs) {
          let str_ = rs[0]
          let arr_ = str_.split('=')
          if (arr_ && arr_.length > 1) {
            let suid = arr_[1]
            console.log('suid =>', suid)
            UserInfoStorage.sharedUserid = suid
          }
        }
      }

      //this.$route
      //console.log('this.$route =>', this.$route)
      //this.$route.path
      //console.log('this.$route.path =>', this.$route.path)
      //this.$route.params
      //console.log('this.$route.params =>', this.$route.params)

      // 获取浏览器可视区高度
      this.clientHeight = `${document.documentElement.clientHeight}`

      // 窗口大小改变监听
      window.onresize = function temp() {
        this.clientHeight = `${document.documentElement.clientHeight}`
      }
    },

    watch: {
      clientHeight: function() {
        this._clientHeightChangeFixed(this.clientHeight)
      }
    },

    methods: {
      _clientHeightChangeFixed(clientHeight) {
        //this.$refs.app.style.height = clientHeight + 'px';
      }
    }
  }
</script>



<style lang="stylus">

  .flex-column-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  #app {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content:flex-end;

    height: 100%;
    width: 100%;
  }

  .router-view {
    flex-grow: 1;
    flex-shrink: 1;
  }


/*#app*/
  /*font-family 'Avenir', Helvetica, Arial, sans-serif*/
  /*-webkit-font-smoothing antialiased*/
  /*-moz-osx-font-smoothing grayscale*/
  /*text-align center*/
  /*color #2c3e50*/

/*#nav*/
  /*padding 30px*/
  /*a*/
    /*font-weight bold*/
    /*color #2c3e50*/
    /*&.router-link-exact-active*/
      /*color #42b983*/
</style>
