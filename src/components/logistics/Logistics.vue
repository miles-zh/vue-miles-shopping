<template>
  <div>
      <TopBackTabbar :title='"物流情况"' ref="toptab"></TopBackTabbar>
      <div class="content" :style="{'height':contentHeight + 'px'}">
          <div class="text-wrap">
              <div class="title">
                  <div> 韵达快递 运单号：631394198747 </div>
                  <i :class="['fa',!isShowDetail?'fa-angle-down':'fa-angle-up']" aria-hidden="true" @click="openDetail"></i>
              </div>
              <div class="detail" v-if='isShowDetail'>
                  <div class="detail-item" v-for="(item,index) in logisticsDetail" :key="index">
                      <div class="time">{{item.time}}</div>
                      <div class="detail-content">{{item.position}}</div>
                  </div>
              </div>
          </div>
          <div class="map-wrap" id='map'>
            <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler">
                <!-- <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-map-type> -->
                
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_LEFT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
                
                <bm-driving
                    start="南京"
                    end="贵阳"
                    startCity="南京"
                    endCity="贵阳"
                    :auto-viewport="true">
    
                </bm-driving>
            
            </baidu-map>
          </div>
      </div>
  </div>
</template>

<script>
import TopBackTabbar from '../common/TopBackTabbar'

export default {
    data(){
        return{
            contentHeight:0,
            isShowDetail:false,
            center: {lng: 0, lat: 0},
            zoom: 3,
            logisticsDetail:[
                {
                    time:'12:08',
                    position:'贵州贵阳'
                },{
                    time:'10:07',
                    position:'江苏南京'
                },{
                    time:'01:07',
                    position:'上海上海'
                }
            ]
        }
    },
    components:{
        TopBackTabbar
    },
    mounted(){
        let winHeight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        let winWidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        // console.log(winHeight , this.$refs.toptab.$el.offsetHeight , this.$refs.tab.offsetHeight)

        this.contentHeight = winHeight - this.$refs.toptab.$el.offsetHeight  - (winWidth/10)

    },
    methods:{
        openDetail(){
            this.isShowDetail = !this.isShowDetail
        },
        handler ({BMap, map}) {
            console.log(BMap, map)
            this.center.lng = 116.404
            this.center.lat = 39.915
            this.zoom = 3
        }
    }
}
</script>

<style lang='scss' scoped>
    .content{
        position: relative;
        // background-color: #555;
        overflow: auto;
        .text-wrap{
            position: absolute;
            width: 90%;
            background-color: #fff;
            left: 50%;
            top:10px;
            transform: translateX(-50%);
            border-radius: 10px;
            z-index: 10;
            .title{
                font-size: 0.3rem;
                display: flex;
                padding: 10px 20px;
                border-bottom: 1px solid #eee;
                align-items: center;
                div{
                    flex: 1;
                    text-align: left;
                }
                i{
                    font-size: 0.7rem;
                }
            }
            .detail{
                transition: all 1s;
                padding: 20px;
                .detail-item{
                    display: flex;
                    font-size: 0.3rem;
                    padding:10px 0;
                    .time{
                        padding-right: 10px;
                        border-right: 1px solid #bbb;
                        color: #999;
                    }
                    .detail-content{
                        padding-left: 10px;
                        color: #555;
                    }
                }
            }
        }
        .map-wrap{
            height: 100%;
            z-index: 5;
            overflow: auto;
            .map{
                height: 100%;
                width: 100%;
            }
        }
    }
</style>