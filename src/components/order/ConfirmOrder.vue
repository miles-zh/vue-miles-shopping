<template>
  <div class="confirm-order-container">
    <TopBackTabbar title="确认订单"></TopBackTabbar>
    <div class="order-content">
      <div class="receiving-information m-f">
        <i class="fa fa-map-marker text-red-color" aria-hidden="true"></i>
        <div class="telephone-address">
          <div class="telephone">{{$store.state.userinfo.recieveInfo[0].recieveName}} {{$store.state.userinfo.recieveInfo[0].recievePhone}}</div>
          <div class="address">{{$store.state.userinfo.recieveInfo[0].recieveAddress}}</div>
        </div>
        <i class="fa fa-angle-right text-gray-color" aria-hidden="true" @click="goAddressList"></i>
      </div>

      <div class="orderlist" v-for="(item,index) in orderList" :key="index">
        <div class="goods-info m-f">
          <img :src="item.goods_img" alt />
          <div class="m-f m-f-fdc m-f-aic">
            <div class="goods-name div-text-overflow-hidden-2">{{item.goods_name}}</div>
            <div
              class="specifications text-gray-color div-text-overflow-hidden-2"
            >{{item.goods_specifications}}</div>
          </div>
          <div class="unitprice-count">
            <div class="unitprice">${{item.goods_sell_price}}</div>
            <div class="count text-gray-color">x{{item.cart_count}}</div>
          </div>
        </div>
        <div class="delivery-method m-f">
          <div>
            配送方式
            <span class="text-gray-color">普通配送</span>
          </div>
          <div class="m-f-f">快递 免邮</div>
        </div>
        <div class="invoice m-f">
          <div>开具发票</div>
          <div class="m-f-f">本次不开具发票</div>
        </div>
        <div class="remarks m-f">
          订单备注:
          <input type="text" placeholder="选填，请先和商家协商一致" class="m-f-f" />
        </div>
        <div class="subtotal">
          <span class="text-gray-color">共 {{item.cart_count}} 件</span>
          <span>小计:</span>
          <span class="text-red-color">￥{{item.cart_count*item.goods_sell_price}}</span>
        </div>
      </div>
    </div>
    <div class="bottom m-f m-f-jcfe m-f-aic">
      <div class="text-gray-color">共 {{allTotalCount}} 件</div>
      <div>
        合计:
        <span class="text-red-color">￥{{allTotalPrice}}</span>
      </div>
      <div class="submit text-white-color div-red-color">提交订单</div>
    </div>
  </div>
</template>

<script>
import TopBackTabbar from "../common/TopBackTabbar";
export default {
  data() {
    return {
      orderList: [],
      allTotalCount: 0,
      allTotalPrice: 0
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.orderList =this.$route.query.orderList; 
      if(this.orderList === '[object Object]'){ this.$router.go(-1); return}

      this.orderList.forEach(item => {
        this.allTotalCount += item.cart_count;
        this.allTotalPrice += item.cart_count * item.goods_sell_price;
      });
    },
    goAddressList(){
      this.$router.push({path:'/home/addresslist'})
    }
  },
  components: {
    TopBackTabbar
  }
};
</script>

<style scoped lang="scss">
.confirm-order-container {
  height: 100%;
  position: relative;
  left: 0;
  right: 0;
  box-sizing: border-box;
}

.order-content {
  height: calc(100% - 2rem);
  overflow: auto;
  background-color: #eee;
  padding: 10px;

  .receiving-information {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 1px 1px 5px #cccccc;
    padding: 10px;
    i {
      margin-right: 20px;
      margin-left: 20px;
      font-size: 0.8rem;
    }
    .telephone-address {
      font-size: 0.4rem;
      color: #555;
      flex: 1;
      text-align: left;
      .address {
        font-size: 0.3rem;
      }
    }
  }
  .orderlist {
    background-color: #fff;
    box-shadow: 1px 1px 5px #ccc;
    border-radius: 20px;
    margin-top: 20px;
    padding: 20px 10px;
    .goods-info {
      img {
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 10px;
      }
      .unitprice-count {
        width: 1.5rem;

        text-align: right;
        .count {
          font-size: 0.25rem;
          padding-right: 30px;
        }
        .unitprice {
          font-size: 0.3rem;
        }
      }
      div:nth-of-type(1) {
        flex: 1;
        font-size: 0.3rem;
        padding: 10px 20px;
        text-align: left;

        .goods-name,
        .specifications {
          height: 1rem;
          // line-height: 0.4rem;
          width: 95%;
          // border: 1px solid #000;
          padding: 10px 20px;
          margin-top:10px;
        }

        .goods-name {
          margin-bottom: 0.22rem;
        }
        .specifications {
          background-color: #eee;
          border-radius: 5px;
        }
      }
    }
    .delivery-method,
    .invoice {
      font-size: 0.3rem;
      padding: 10px 10px 10px 1rem;
      margin-top: 5px;
      div > span {
        font-size: 0.25rem;
        margin-left: 20px;
      }
      div:last-child {
        text-align: right;
      }
    }
    .remarks {
      font-size: 0.3rem;
      padding: 10px 10px 10px 1rem;
      margin-top: 20px;

      input {
        outline: none;
        border: none;
        font-size: 0.25rem;
        margin-left: 10px;
      }
    }
    .subtotal {
      font-size: 0.3rem;
      padding: 10px 10px 10px 1rem;
      text-align: right;
      span:nth-child(1),
      span:nth-child(2) {
        margin-right: 10px;
      }
      span:nth-child(1) {
        margin-right: 20px;
      }
    }
  }
}

.bottom {
  height: 1rem;
  border-top: 1px solid #999;
  position: absolute;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  // border:1px solid #000;

  div:nth-child(1) {
    font-size: 0.3rem;
  }
  div:nth-child(2) {
    font-size: 0.4rem;
    margin: 0px 20px;
  }
  .submit {
    font-size: 0.4rem;
    margin-right: 30px;
    padding: 10px 50px;
    border-radius: 0.4rem;
  }
}
</style>