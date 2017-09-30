<template>
  <div class="commonStyle">
    <m-header title="盈峰环境app" :bg="true">
      <!--<a href="javascript:;"-->
      <!--slot="left"><img class="m-icon-img" src="../assets/images/ic_bar_back_white.png"/>返回</a>-->
      <!--<a href="javascript:;" slot="right">分享</a>-->
    </m-header>

    <!--<div v-for="item in items" class="rootStyle">-->
    <!--<div :id="val" class="itemRoot">-->
    <!--<img v-bind:src=item.headImage width="50" height="50">-->

    <!--<div class="otherText">-->
    <!--<div class="middleText">-->
    <!--<span class="nameText">{{item.nickName}}</span>-->
    <!--<span class="timeText">{{item.createTime}}</span>-->
    <!--</div>-->

    <!--<span class="messageText">{{item.messageContent}}</span>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <PullRefresh :on-refresh="refresh" :on-infinite="infinite" ref="pullrefresh">

      <div v-for="item in items" class="rootStyle">
        <div :id="val" class="itemRoot">
          <img v-bind:src=item.headImage width="50" height="50">

          <div class="otherText">
            <div class="middleText">
              <span class="nameText">{{item.nickName}}</span>
              <span class="timeText">{{item.createTime}}</span>
            </div>

            <span class="messageText">{{item.messageContent}}</span>
          </div>
        </div>
      </div>
    </PullRefresh>

  </div>
</template>
<script>
  import mHeader from '../widget/header'
  import PullRefresh from '../widget/pullRefresh'
  import api from '../../network/baseRequest'

  let pageNo = 1

  export default {
    name: 'mine',
    components: {
      mHeader,
      PullRefresh
    },
    data () {
      return {
        items: []
      }
    },
    created () {
      this.refresh()
    },
    methods: {
      refresh (done) {
//        setTimeout(() => {
//          this.items.reverse()
//          done() // call done
//        }, 2000)

        let self = this
        pageNo = 1
        // 获取数据
        let params = {userName: this.GLOBAL.getUserName(), pageSize: this._PAGESIZE_, pageNo: pageNo}
        api.getMessageList(this, params, function (data) {
          self.items = data.list
          done && done()
        }, function () {
          done && done()
        })
      },

      infinite (done) {
        setTimeout(() => {
          this.items.reverse()
          done() // call done
        }, 2000)
      }
    }
  }
</script>
<style scoped rel="stylesheet/less" lang="less">
  .commonStyle {
    margin: 0px;
  }

  .rootStyle {
    margin-top: 9px;
  }

  .itemRoot {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 9px;
    padding-bottom: 9px;
    background-color: white;
  }

  .otherText {
    width: 100%;
    display: flex;
    margin-left: 10px;
    flex-direction: column;
    margin-right: 20px;
  }

  .middleText {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .nameText {
    color: #333333;
    font-size: 16px;
  }

  .messageText {
    color: #999999;
    font-size: 14px;
    margin-top: 5px;
    width: 234.5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .timeText {
    color: #b2b2b2;
    font-size: 12px;
  }
</style>
