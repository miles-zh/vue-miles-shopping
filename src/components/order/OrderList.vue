<template>
  <div class="order-container">
      <topBackTabbar :title="'所有订单'" ref="toptab"></topBackTabbar>
      <div class="tab" ref='tab'>
          <div :class="['tab-item', tabIndex === index? 'tab-active':'']" v-for="(item,index) in tabs" :key="index" @click="changeTab(index)"> 
            {{item.name}}<div class="tab-line"></div> </div>
      </div>
      <div class="order-content" :style="{'height':ContentHeight + 'px'}">
          <div class="order-item" v-for="(item,index) in orderList" :key='index'>
              <div class="order-title">{{item.order_status}}</div>
              <div class="goods-info-wrap">
                  <div class="img">
                      <img :src="item.order_img" alt="">
                  </div>
                  
                  <div class="goods-info">
                      <div class="goods-name">{{item.goods_name}}</div>
                      <div class="goods-trait">
                          七天无理由退货
                      </div>
                  </div>
                  <div class="goods-price-count">
                      <div>￥{{item.goods_price}}</div>
                      <div>x{{item.goods_count}}</div>
                  </div>
              </div>
              <div class="order-deliver-price">
                  <div>运费险</div>
                  <div>退换货可自动理赔</div>
                  <div>已出单</div>
              </div>
              <div class="order-price">
                  总价￥{{item.order_price}},优惠￥{{item.order_discount_price}},实付款￥{{item.order_pay_price}}
              </div>
              <div class="order-buttons">
                  <div class="order-button-item" @click="goLogistics" v-if='!item.isConfirmReceipted'>
                      查看物流
                  </div>
                  <div class="order-button-item  order-button-active"  v-if='!item.isConfirmReceipted' @click="confirmReceipted(item.order_id)">
                      确认收货
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>

import topBackTabbar from '../common/TopBackTabbar'

export default {
    data(){
        return {
            tabs:[
                {
                    id:0,
                    name:'全部'
                },
                {
                    id:1,
                    name:'待付款'
                },
                {
                    id:2,
                    name:'待发货'
                },
                {
                    id:3,
                    name:'待收货'
                },
                {
                    id:4,
                    name:'待评价'
                }
            ],
            tabIndex:0,
            orderList:[],
            ContentHeight:0,
            
        }
    },
    components:{
        topBackTabbar
    },
    created(){

        
      


        this.getOrderList()
    },
    mounted(){
        let winHeight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        let winWidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        // console.log(winHeight , this.$refs.toptab.$el.offsetHeight , this.$refs.tab.offsetHeight)

        this.ContentHeight = winHeight - this.$refs.toptab.$el.offsetHeight - this.$refs.tab.offsetHeight - (winWidth/10)
    },
    methods:{
        changeTab(index){
            this.tabIndex =index
        },
        async getOrderList(){
            const {data} = await this.axios.get(this.baseUrl+'/api/order/allorderlist')
            // console.log(data)
            if(data.status !== 200){
                return
            }

            let list=data.data

            list.forEach(item=>{
                let n=item.order_price - item.order_pay_price;
                let n1=n>0?n.toFixed(2):0;
                item.order_discount_price=n1
                item.isConfirmReceipted=false
            })
            // console.log(list)

            this.orderList=list
        },
        goLogistics(){
            this.$router.push({path:'/home/logistics'})
        },
        confirmReceipted(id){
            console.log(id)
            let index=this.orderList.findIndex(item=>{
                return item.order_id === id
            })
            console.log(index)
            this.orderList[index].isConfirmReceipted=true
            console.log(this.orderList)
        }
    }
}
</script>

<style scoped lang="scss">
    .order-container{
        height: 100%;
        background-color: #eee;
    }
    .tab{
        display: flex;
        font-size: 0.4rem;
        justify-content: space-around;
        padding: 10px;
    }
    .tab-active{
        color: #f40;
        .tab-line{
            height: 2px;
            background-color: #f40;
            margin-top: 10px;
        }
    }
    .order-content{
        padding: 20px;
        overflow: auto;
        background-color: #eee;
        .order-item{
            background-color: #fff;
            border-radius: 20px;
            font-size: 0.35rem;
            margin-top:20px;
            .order-title{
                padding: 10px 20px;
                text-align: right;
                color: #f40;
            }
            .goods-info-wrap{
                padding: 20px;
                display: flex;
                .img{
                    flex: 2;
                    img{
                        width: 100%;
                    }
                }
                .goods-info{
                    padding: 0 20px;
                    display: flex;
                    flex: 3;
                    flex-direction: column;
                    justify-content: space-between;
                    .goods-name{
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        text-align: left;
                    }
                    .goods-trait{
                        text-align: left;
                        color: #f40;
                    }
                }
                .goods-price-count{
                    flex: 1;
                    text-align: right;
                    color: #777;
                }

            }
            .order-deliver-price{
                display: flex;
                padding: 0 20px 10px;
                align-items: center;
                div:nth-child(1){
                    flex:2;
                    text-align: right;
                    font-size: 0.35rem;
                }
                div:nth-child(2){
                    flex:3;
                    text-align: left;
                    padding: 0 20px;
                    color: #999;
                    font-size: 0.25rem;
                }
                div:nth-child(3){
                    flex:1;
                    color: #f40;
                }
            }
            .order-price{
                padding: 25px;
                color: #555;
                font-size: 0.25rem;
            }
            .order-buttons{
                display: flex;
                justify-content: space-around;
                padding: 15px;
                .order-button-item{
                    border:1px solid #000;
                    height: 0.8rem;
                    line-height: 0.8rem;
                    padding: 0 0.4rem;
                    border-radius: 0.4rem;
                }
                .order-button-active{
                    border:1px solid #f40;
                    color: #f40;
                }
            }
        }
    }
</style>