<template>
    <div class="tab">
        <router-link tag="div" class="tab-item" to="/home">
            <span class="tab-link">首页</span>
        </router-link>
        <router-link tag="div" class="tab-item" to="/mine">
            <span class="tab-link">我的</span>
        </router-link>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    methods: {
      toMineClick() {
        console.log('toMineClick')// @click="toMineClick"
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    .tab
        display: flex
        height: 44px
        line-height: 44px
        font-size: $font-size-medium-x
        border-top solid 0.5px $color-text-l
        background-color: $color-my-blue
        .tab-item
            flex: 1
            text-align: center
            .tab-link
                padding-bottom: 5px
                color: $color-text-l
            &.router-link-active
                .tab-link
                    color: $color-theme
                    border-bottom: 2px solid $color-theme
</style>