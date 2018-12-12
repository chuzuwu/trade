<template>
  <div>
    <div style="width: 100%;font-size: 16px;
    font-weight: 400;
    padding: 8px;box-sizing: border-box;line-height: 26px;">
      {{value}}
    </div>
  </div>
</template>
<style lang="less">
</style>

<script>
  // import VueMarkdown from 'vue-markdown'
  // import marked from 'marked'
  // import showdown from 'showdown'
  import TSCenter from '../utils/TempStorageCenter'

  export default {
    name: 'houseDetail',
    data(){
      return {
        value: ''
      }
    },
    // components: {
      // 'mavon-editor': MavonEditor
      //VueMarkdown // 声明组件
    // },

    // computed: {
    //   renderHtml() {
        // marked.setOptions({
        //   renderer: new marked.Renderer(),
        //   gfm: true, //允许 Git Hub标准的markdown.
        //   tables: true, //允许支持表格语法。该选项要求 gfm 为true。
        //   breaks: true, //允许回车换行。该选项要求 gfm 为true。
        //   pedantic: true, //尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
        //   sanitize: true, //对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
        //   smartLists: true, //使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
        //   smartypants: false//使用更为时髦的标点，比如在引用语法中加入破折号。
        // });
        // return marked(this.value)
        // let converter = new showdown.Converter();
        // let html = converter.makeHtml(this.value);
        // return html
    //   }
    // },

    created() {

    },

    activated() {
      let _this = this;
      let objectId = TSCenter.sharedInstance().getGoodsWithKey('objectId')

      console.log('get objectId =>', objectId)
      if (objectId){
        const query = _this.Bmob.Query('CZW_ARTICLE');
        // query.select("MDCONTENT");
        query.get(objectId).then(function (res) {
          console.log('文章内容=>', res)
          _this.value = res.MDCONTENT
        }).catch(function (err) {
          console.log('文章内容失败!!!!!=>', err)
        });
      }
    }
  }
</script>

