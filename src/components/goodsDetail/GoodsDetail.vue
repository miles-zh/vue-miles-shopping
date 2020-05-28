<template>
  <div class="goods-detail-container">
    <TopBackTabbar title="商品详情"></TopBackTabbar>
    <div class="content" :style="{'overflow':isSlide}" @scroll="scroll">
      <Swiper
        :swiperImgs="swiperImgs"
        :swiperOptions="swiperOptions"
        :height="swiperHeight"
        @touchstart="previewImg"
      ></Swiper>
      <div class="goods-price-title">
        <div class="goods-price">
          <div class="sell-price">￥{{goodsDetail.sell_price}}</div>
          <div class="market-price">￥{{goodsDetail.market_price}}</div>
        </div>
        <div class="goods-title">{{goodsDetail.title}}</div>
      </div>
      <div class="delivery-info">
        <div class="text">发货:</div>
        <div class="address">
          <i class="fa fa-map-marker" aria-hidden="true"></i> 
          贵州贵阳
        </div>
        <div class="cost">
          <span>快递：</span>￥0.00
        </div>
        <div class="monthly-sales">月销 {{goodsDetail.month_sell_count}}</div>
      </div>
      <div class="join-cart"></div>
      <div class="goods-detail">
        <div class="goods-detail-title m-f m-f-jcsa m-f-aic">
          <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
          宝贝详情
          <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
        </div>
        <div class="goods-detail-item" v-for="(item,index) in goodsDetail.detail_desc" :key="index">
          <div class="goods-detail-brief">{{item.detail_desc_title}}</div>
          <img :src="item.detail_desc_img_src" @click="previewImg(item.detail_desc_img_src)" />
        </div>

        <div class="price-explain">
          <div class="price-explain-title">价格说明</div>
          <div class="scribing-price">
            <div>
              <span>*</span> 划线价格
            </div>
            <p>商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</p>
          </div>
          <div class="no-scribing-price">
            <div>
              <span>*</span>未划线价格
            </div>
            <p>商品的实时标价。不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠卷、积分等发生变化，最终以订单结算页价格为准。</p>
          </div>
        </div>
      </div>
      <div
        class="image-preview"
        v-if="isPreviewImg"
        @click="closePreviewImg"
        :style="{'top':previewImgTop}"
      >
        <img :src="previewImgSrc" />
      </div>
    </div>
    <div class="bottom m-f m-f-jcc m-f-aic">
      <div class="communication m-f m-f-fdc text-gray-color" @click="goChart">
        <i class="fa fa-comments-o" aria-hidden="true"></i>
        客服
      </div>
      <div class="botton-area m-f m-f-aic m-f-jcc text-white-color m-f-f">
        <div class="button" @click="openSelectSpecifications('AddToCart')">加入购物车</div>
      <div class="button" @click="openSelectSpecifications('BuyNow')">立即购买</div>
      </div>
      
    </div>
    <div class="specifications animate bounceInUp" v-if="isSpecificationsShow">
      <div class="specifications-close" @click="closeSpecifications">x</div>
      <div class="specifications-content">
        <div class="goods-brief-info m-f m-f-aic">
          <img
            :src="swiperImgs[0]"
          />
          <div class="goods-sellprice-stockcount m-f m-f-fdc m-f-f">
            <div class="goods-sellprice text-red-color">￥{{goodsDetail.sell_price}}</div>
            <div class="goods-stockcount text-gray-color">库存 {{goodsDetail.stock_count}} 件</div>
            <div>选择 尺寸 颜色</div>
          </div>
        </div>
        <div class="delivery-area">
          <div class="title">配送区域</div>
          <div class="address text-gray-color m-f m-f-aic">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
            <span class="m-f-f">贵州省 贵阳市 观山湖区</span>
            <i class="fa fa-angle-right" aria-hidden="true"></i>
          </div>
        </div>
        <div class="sizes-area">
          <div class="title">尺寸</div>
          <div class="sizes m-f m-f-fww">
            <div
              class="sizesitem"
              v-for="(item,index) in goodsDetail.size_classify"
              :key="index"
              @click="selectedGoodsColorOrSize(item,'size',index)"
            >{{item}}</div>
          </div>
        </div>
        <div class="colors-area">
          <div class="title">颜色</div>
          <div class="colors m-f m-f-fww">
            <div
              v-for="(item,index) in goodsDetail.color_classify"
              :key="index"
              @click="selectedGoodsColorOrSize(item,'color',index)"
              class="colorsitem"
            >{{item}}</div>
          </div>
        </div>
        <div class="buy-count-area m-f m-f-aic">
          <div class="title m-f-f">购买数量</div>
          <CountIncrementDecrementButton
            :count="goodsCount"
            @decrement="countReduce"
            @increment="countAdd"
          ></CountIncrementDecrementButton>
        </div>
      </div>

      <div class="selected-area m-f m-f-aic m-f-jcc">
        <div class="selected-ok text-white-color div-red-color" @click="selectedGoodsOk">确定</div>
      </div>
    </div>
    <Tip :isShow="isOpenTip" :iconfont="tipIconfont" :text="tipText"></Tip> 
  </div>
</template>

<script>
import Swiper from "../common/Swiper";
import TopBackTabbar from "../common/TopBackTabbar";
import CountIncrementDecrementButton from "../common/CountIncrementDecreamentButton";
import Tip from "../common/Tip"
export default {
  data() {
    return {
      goodsDetail: {},
      swiperImgs: [],
      swiperHeight: "5rem",
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      isPreviewImg: false,
      previewImgSrc: "",
      isSlide: "auto",
      previewImgTop: 0,
      isSpecificationsShow: false,
      isCartOrBuy: "",
      goodsColor: "",
      goodsSize: "",
      isSelectColor: false,
      isSelectSize: false,
      goodsCount: 1,
      isOpenTip: false,
      tipText:'',
      tipIconfont:''
      
    };
  },
  created() {
    this.getGoodsDetailData();
  },
  methods: {
    async getGoodsDetailData() {
      // console.log(this.$route.params.id);
      const { data } = await this.$http.post(
        this.baseUrl + "/api/goods/goodsdetail",
        { id: this.$route.params.id }
      );

      this.goodsDetail = data.data;
      this.swiperImgs = this.goodsDetail.goods_imgs.map(item => {
        return item.img_src;
      });

      this.goodsDetail.color_classify = this.goodsDetail.color_classify.split(
        " ,"
      );
      this.goodsDetail.color_classify.pop();
      this.goodsDetail.size_classify = this.goodsDetail.size_classify.split(
        ","
      );
      this.goodsDetail.size_classify.pop();
      // console.log(this.goodsDetail)
    },
    previewImg(url) {
      // console.log(url)
      this.isPreviewImg = true;
      this.previewImgSrc = url;
      this.isSlide = "hidden";
    },
    closePreviewImg() {
      this.isPreviewImg = false;
      this.previewImgSrc = "";
      this.isSlide = "auto";
    },
    scroll(e) {
      this.previewImgTop = e.target.scrollTop + "px";
    },
    openSelectSpecifications(str) {
      this.isSpecificationsShow = true;
      this.isCartOrBuy = str;
      // console.log(str);
    },
    closeSpecifications() {
      this.isSpecificationsShow = false;
      this.isCartOrBuy = "";
      this.goodsCount=1
      this.goodsColor=''
      this.goodsSize=''
    },
    countReduce() {
      if (this.goodsCount < 2) {
        return;
      }
      this.goodsCount--;
    },
    countAdd() {
      this.goodsCount++;
    },
    selectedGoodsColorOrSize(str, text, index) {
      // console.log(index)

      if (text == "color") {
        this.goodsColor = str;
        let colorsDom = document.getElementsByClassName("colorsitem");
        this.selectedColorOrSizeStyle(colorsDom, index);
      }
      if (text == "size") {
        this.goodsSize = str;
        let sizesDom = document.getElementsByClassName("sizesitem");
        this.selectedColorOrSizeStyle(sizesDom, index);
      }
      // console.log(this.goodsColor,this.goodsSize)
    },
    selectedColorOrSizeStyle(doms, index) {
      doms.forEach(item => {
        item.style.border = "1px solid #ccc";
        item.style.color = "#000";
      });
      doms[index].style.border = "1px solid #f40";
      doms[index].style.color = "#f40";
    },
    tipShow(str,iconfont){
      this.tipText=str
      this.tipIconfont=iconfont
      this.isOpenTip=true
      
        setTimeout(()=>{
          this.isOpenTip=false
          
        },2000)
    },
    selectedGoodsOk() {
      if(this.goodsSize== "" || this.goodsColor==""){
        this.tipShow("请选择颜色或者尺寸!!!","fa-info-circle")
        return
      }
      let goodsItem = {};
      goodsItem.goods_id = Number(this.$route.params.id);
      goodsItem.goods_sell_price = this.goodsDetail.sell_price;
      goodsItem.goods_img = this.swiperImgs[0];
      goodsItem.goods_name = this.goodsDetail.title;
      goodsItem.goods_specifications = this.goodsSize + "," + this.goodsColor;
      goodsItem.cart_count = this.goodsCount;
      // console.log(this.$store.state.cartlist)

      if (this.isCartOrBuy == "AddToCart") {
        let index = this.$store.state.cartlist.findIndex(item => {
          return item.goods_id == goodsItem.goods_id;
        });
        if (index == -1) {
          this.$store.commit("addToCart", goodsItem);
        } else {
          this.$store.commit(
            "appendToCart",
            goodsItem.goods_id,
            goodsItem.cart_count
          );
        }
        
        this.closeSpecifications()
        this.tipShow("添加成功，在购物车等亲 ~ ",'fa-check')
      }
      if(this.isCartOrBuy == 'BuyNow'){
        this.$router.push({path:'/home/confirmorder',query:{orderList:[goodsItem]}})
      }
    },
    goChart(){
      this.$router.push('/home/chart')
    }
  },
  components: {
    Swiper,
    TopBackTabbar,
    CountIncrementDecrementButton,
    Tip
  }
};
</script>

<style scoped lang="scss">
.content {
  height: calc(100% - 2rem);
  overflow: auto;
  position: relative;
}

$text-color: #999;

.goods-price-title {
  padding: 15px;
  border: 1px solid #999;
  background-color: #eee;
  margin-top: 20px;
  box-shadow: 1px 1px 5px #999;
  .goods-price {
    display: flex;
    line-height: 1rem;
    height: 1rem;
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
  .goods-title {
    font-size: 0.35rem;
    text-align: left;

    // word-wrap: none;
    word-break: break-all;
    hyphens: auto;
  }
}
.delivery-info {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #eee;
  margin: 20px 0;
  box-shadow: 1px 1px 5px #999;
  border: 1px solid #999;
  background-color: #eee;
  font-size: 0.35rem;
  padding: 20px;
  .text {
    color: $text-color;
    margin-right: 20px;
  }
  .address {
    flex: 1;
    text-align: left;
    i {
      color: $text-color;
    }
  }
  .cost {
    span {
      color: $text-color;
    }
  }
  .monthly-sales {
    color: $text-color;
    font-size: 0.3rem;
    margin-left: 50px;
  }
}
.goods-detail {
  background-color: #000;
  // margin-bottom: 50px;
  .goods-detail-title {
    line-height: 1rem;
    font-size: 0.5rem;
    color: #555;
    background-color: #eee;
    i {
      color: $text-color;
    }
  }
  .goods-detail-item {
    height: 4.5rem;
    display: flex;
    margin: 10px 0;
    background-color: #fff;
    .goods-detail-brief {
      display: flex;
      margin: 0 10px;
      align-items: center;
      font-size: 0.3rem;
      width: 30%;
      text-align: left;
    }
    img {
      flex: 1;
      margin: 10px;
    }
  }
  .goods-detail-item:nth-of-type(odd) {
    flex-direction: row-reverse;
  }
  .price-explain {
    
    background-color: #fff;
    padding:10px 10px  20px 10px ;
    .price-explain-title {
      font-size: 0.3rem;
      line-height: 0.6rem;
      border-bottom: 1px solid #ccc;
      text-align: left;
      padding-left: 20px;
      color: #555;
      
    }
    .scribing-price,
    .no-scribing-price {
      margin-top: 10px;
      font-size: 0.2rem;
      text-align: left;
      padding: 10px;
      color: #555;
      div {
        color: #f40;

        align-items: center;
        span {
          margin-right: 10px;
        }
      }
      p {
        text-indent: 0.4rem;
        word-wrap: none;
        word-break: break-all;
        hyphens: auto;
        margin-top:10px;
      }
    }
  }
}
.image-preview {
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    margin: 0 10px;
  }
}
.goods-detail-container {
  height: 100%;
  position: relative;
}
.bottom {
  position: absolute;
  height: 1rem;
  border-top: 1px solid #999;
  bottom: 0;
  left: 0;
  font-size: 0.3rem;
  overflow: hidden;
  width: 100%;

  .communication{
    margin:0 30px;
    i{
      font-size: 0.4rem;
    }
  }

  .button {
    margin: 10px 0px;
    padding: 10px 20px;
    width: 30%;
  }
  .button:first-child {
    background-image: linear-gradient(to right, #555, #000);
    border-top-left-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;
  }
  .button:last-child {
    background-image: linear-gradient(to right, #960, #969);
    border-top-right-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
  }
}

.specifications {
  position: absolute;
  bottom: 0;
  z-index: 2;
  height: 70%;
  animation-duration: 1s;
  background-color: #fff;
  // border: 1px solid #000;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  border-top:1px solid #000;
  padding: 20px;
  width: 100%;
  .specifications-close {
    position: absolute;
    right: 10px;
    top: 10px;
    height: 30px;
    width: 30px;
    border: 1px solid #999;
    color: #999;
    font-size: 20px;
    border-radius: 50%;
  }
  .specifications-content {
    overflow: auto;
    height: calc(100% - 1rem);
  }
  .goods-brief-info {
    padding-bottom: 20px;
    img {
      height: 3rem;
      width: 3rem;
      border-radius: 20px;
    }
    .goods-sellprice-stockcount {
      font-size: 0.4rem;
      padding-left: 20px;
      div {
        text-align: left;
        width: 100%;
        line-height: 0.6rem;
      }
      div:nth-child(3) {
        color: #000;
        
      }
    }
  }
  .delivery-area {
    font-size: 0.3rem;
    text-align: left;
    padding: 20px;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    .address {
      padding: 10px 0px;
      span {
        margin: 0 20px;
      }
    }
  }
  .sizes-area,
  .colors-area {
    font-size: 0.3rem;
    padding: 20px;
    text-align: left;
    border-bottom: 1px solid #ccc;
    .sizes,
    .colors {
      div {
        margin-left: 20px;
        margin-top: 10px;
        background-color: #eee;
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
  }
  .buy-count-area {
    font-size: 0.3rem;
    padding: 20px;
    text-align: left;
  }
  .selected-area {
    border-top: 1px solid #ccc;
    height: 1rem;
    font-size: 0.4rem;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    .selected-ok {
      padding: 10px 2rem;
      border-radius: 30px;
    }
  }
}

</style>