<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'

  export default {
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollX: false,
          scrollY: true,
          click: true,
          preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|IMG)$/ }
        })
      }
    },
    activated() {
      if (this.scroll) {
        console.log('scroll is refresh...')
        this.scroll.refresh()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
