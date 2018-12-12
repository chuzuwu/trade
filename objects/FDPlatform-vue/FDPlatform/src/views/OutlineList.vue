<template>
  <div style="background-color: #fbf9fe;">
    <div v-for="(outline,index) in outlineList"
         @click="clickOutline(index)"
         class="x-cell">
      <div class="x-location-line">
        <img src="../assets/location.png" style="width: 25px;"/>
        <div style="
        flex: 1;
        justify-content: space-between;
        display: flex;
        flex-direction: row;">
          <span style="">{{outline.LOCATION}}</span>
          <!--<span style="
          white-space: nowrap;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;">10-19</span>-->
        </div>
      </div>
      <h1 class="x-outline-title">{{outline.TITLE}}</h1>
    </div>
  </div>
</template>

<style lang="less">
  .x-cell {
    /*margin-left: 5px;*/
    /*margin-right: 5px;*/
    /*box-sizing: border-box;*/
    width: 100%;
    margin-top: 20px;
    background-color: white;
    /*border-radius: 5px;*/
    /*border: solid 1px gray;*/
    border-top: solid 1px lightgray;
    border-bottom: solid 1px lightgray;
    /*padding-top: 7px;*/
    /*padding-left: 5px;*/
    padding: 5px;
    /*box-shadow: darkgrey 10px 10px 30px 5px ;*/
   /* box-shadow: darkgrey 0px 0px 30px 5px inset;*/
    box-shadow: lightgray 0px 0px 14px 4px;
  }
  .x-location-line {
    width: 100%;
    /*height: 30px;*/
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: solid 1px lightgray;
  }
  .x-outline-title {
    font-size: 19px;
    font-weight: 500;
    padding-top: 5px;
  }
  /* .a 连着又.b 表明父控件是.a，子控件是.b才成立; ','号表示两者都成立; > 表明父控件是'.a'，子控件是span才成立*/
  /*.a .b {
    box-sizing: border-box;
    background-color: aquamarine;
    border: solid 2px red;
  }
  .a, .b {
    box-sizing: border-box;
    background-color: aquamarine;
    border: solid 2px red;
  }
  .a > span {
    color: white;
  }*/
</style>

<script>
  import TSCenter from '../utils/TempStorageCenter'
  export default {
    name: 'outlineList',
    data(){
      return {
        outlineList: []
      }
    },
    methods: {
      clickOutline(index) {
        console.log('clickOutline index is=>', index)
        let _this = this

        let objectId = _this.outlineList[index].objectId
        console.log('set objectId =>', objectId)
        TSCenter.sharedInstance().setGoodsWithKey('objectId', objectId)

        _this.$router.push({
          path: '/HouseDetail'
        })
      }
    },
    created() {
      let _this = this;
      const query = _this.Bmob.Query('CZW_ARTICLE');
      query.order("-createdAt");
      query.select("TITLE","LOCATION");
      query.limit(2);
      query.skip(0);
      query.find().then(res => {
        // 返回成功
        console.log("查询出租屋文章标题成功=>", res)
        _this.outlineList = res
      }).catch(function (err) {
        console.log("查询出租屋文章标题失败!!!=>", err)
      })
    }
  }
</script>

