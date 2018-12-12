<template>
    <div v-if="isShow" class="dialog" v-on:click="clickHide2">
        <div class='dialogBody'>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  name:'myDialog',
  data() {
    return {
      isShow: false
    }
  },

  methods: {
    clickHide2() {
      console.log('click background')
      // this.hide()
    },
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .dialog{
        z-index: 50;
        display: flex;
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.4);
        .dialogBody{
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0px;
            left: 0px;
            right: 0px;
            bottom: 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
    }
</style>