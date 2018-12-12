<template>
  <div style="height:100%;">
    <div class="x-header">
      <div class="x-header-left" @click="onClickBack" v-if="title=='首页'?0:1">
        <img src="./assets/left-arrow.png" style="height: 60%;"/>
        <span style="color: white; font-size: 18px; line-height: 46px; text-align: center;">返回</span>
      </div>
      <h1 class="x-header-title">
        <span>{{title}}</span>
      </h1>
    </div>
    <keep-alive>
      <router-view class="router-view"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name:'App',
    methods: {
      onClickBack() {
        console.log('onClickBack...')
        this.$router ? this.$router.back() : window.history.back()
      }
    },
    computed: {
      ...mapState({
        title(state) {
          console.log('state is =>', state)
          return state.pageTitle;
        }
      })
      // title() {
      //   return store.state.pageTitle
      // }
    },
    mounted () {
      // console.log('test =>', testttt)
    }
  }


</script>

<style lang="less">
  * {
    margin: 0;
    padding: 0;
  }
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  body {
    background-color: #fbf9fe;
  }

  .router-view {
    width: 100%;
    padding-top: 46px;

  }

  .x-header {
    width: 100%;
    height: 46px;
    background-color: #35495e;
    position: absolute;
    z-index: 100;
    left: 0;
    top: 0;
  }

  .x-header-left {
    height: 90%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .x-header-title {
    line-height: 46px;
    text-align: center;
    font-size: 19px;
    font-weight: 400;
    color: white;
  }
</style>
