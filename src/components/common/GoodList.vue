<template>
  <div>
      <div class="hot-goods-content">
        <div class="hot-goods-item" v-for="(item,index) in goodsList" :key="index" >
          <div class="hot-goods-img">
            <img :src="item.img_src" @click="goGoodsDetail(item.id)" alt="图片稍等" />
          </div>
          <div class="hot-goods-price">
            <div class="sell-price">￥{{item.sell_price}}</div>
            <div class="market-price">￥{{item.market_price}}</div>
          </div>
          <div class="hot-goods-title div-text-overflow-hidden-2">{{item.title}}</div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    props:["goodsList"],
    methods:{
        goGoodsDetail(id){
            this.$emit("click",id)
        }
    }
}
</script>

<style lang="scss" scoped>

.hot-goods-content {
    padding-top: 20px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    height: auto;
    .hot-goods-item {
      width: calc(50% - 20px);
      box-shadow: 1px 1px 5px #999;
      margin: 10px;
      padding: 10px;
      .hot-goods-img {
        height: 3.5rem;
        img {
          height: 100%;
          width: 100%;
        }
      }

      .hot-goods-price {
        display: flex;
        line-height: 0.8rem;
        height: 0.8rem;
        .sell-price {
          font-size: 0.4rem;
          color: #f40;
        }
        .market-price {
          font-size: 0.3rem;
          color: #999;
          text-decoration: line-through;
          margin-left: 20px;
        }
      }
      .hot-goods-title{
        font-size: 0.3rem;
        text-align: left;
        text-indent: 0.4rem;
        
        line-height: 0.4rem;
        width: 100%;
      
        display:-webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        

      }
    }
  }

</style>