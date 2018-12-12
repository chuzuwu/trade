<template>
  <transition name="slide">
    <div class="login01">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>

      <div class="content-wrapper">
        <input placeholder="请输入您要登录的邮箱" class="my-input"/>
        <button class="my-button" @click="next">下一步</button>
      </div>

    </div>
  </transition>
</template>

<script>
  export default {
    methods: {
      back() {
        this.$router.back()
      },
      next() {
        this.$router.push({
          path: '/login02'
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
    z-index: 100
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
    background-color: black;
    color: white;
    font-size: 18px;
    margin-top: 30px;
  }
</style>