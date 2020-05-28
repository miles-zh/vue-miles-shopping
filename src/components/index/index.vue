<template>
  <div>
    
      <Swiper :swiperImgs="swiperImgs" :swiperOptions="swiperOptions" :height="swiperHeight"></Swiper>  

    <div class="nav">
      <div class="nav-item">
        <i class="fa fa-list-alt" aria-hidden="true"></i>
        <div>超市</div>
      </div>
    </div>
    <div class="hot-goods">
      <div class="hot-goods-header">热 销 商 品</div>
      
        <GoodsList :goodsList="hotGoodsList" @click="goGoodsDetail"></GoodsList>
      
      
    </div>
  
    
  </div>
</template>

<script>

import GoodsList from "../common/GoodList"
import Swiper from "../common/Swiper"
export default {
  data() {
    return {
      swiperImgs: [
        "http://img0.imgtn.bdimg.com/it/u=1523873114,1998436516&fm=26&gp=0.jpg",
        "http://img3.imgtn.bdimg.com/it/u=1753883423,2164227819&fm=214&gp=0.jpg",
        "http://pic1.win4000.com/wallpaper/e/57a93b0410306.jpg"
      ],
      swiperHeight:"3.5rem",
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        },
        loop: true,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          /* 触摸滑动后是否继续轮播 */
          disableOnInteraction: false
        },
        //滑动速度
        speed: 800,
        //滑动方向
        direction: "horizontal"
      },
      hotGoodsList: []
    };
  },
  created() {
    this.getHotGoodsListData();
  },
  methods: {
    async getHotGoodsListData() {
      const { data } = await this.$http.get(
        this.baseUrl + "/api/goods/hotgoodslist"
      );
      // console.log(data);
      if (data.status === 200) {
        this.hotGoodsList = data.data;
      }
    },
    goGoodsDetail(id){
      // console.log(id,this)
      this.$router.push({path:"/home/goodsdetail/"+id})
    }
  },
  components: {
    Swiper,
    GoodsList
  },
  mounted() {
   
  }
};
</script>

<style scoped lang="scss">

.nav {
  display: flex;
  height: 1.8rem;
  // border: 1px solid #ccc;
  justify-content: space-around;
  align-items: center;
  background-color: #000;
  color: #fff;
  i {
    font-size: 0.8rem;
  }
  div {
    font-size: 0.4rem;
  }
}
.hot-goods {
  width: 100%;
  .hot-goods-header {
    font-size: 0.4rem;
    font-weight: bolder;
    line-height: 0.7rem;
    border-bottom: 1px solid #999;
    padding: 20px 0;
    background-color: #f40;
    color: #fff;
  }
  
}
</style>