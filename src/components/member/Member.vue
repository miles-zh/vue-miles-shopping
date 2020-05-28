<template>
  <div class="memeber-container">
    <div class="member-top m-f m-f-jcc text-white-color m-f-aic div-black-color animated slideInDown " v-if="isTopShow">
      <div class="username m-f-f">miles</div>
      <div class="setting">设置</div>
    </div>
    <div class="member-content" @scroll="memberScroll">
      <div class="member-content-head  text-white-color m-f m-f-aic m-f-jcc m-f-fdc">
        <div class="member-setting">
          <i class="fa fa-cog" aria-hidden="true"></i>
        </div>
        <img :src="$store.state.userinfo.userImg" alt />
        <div class="member-name">{{$store.state.userinfo.username}}</div>
      </div>
      <div class="all-orders">
        <div class="all-orders-head m-f m-f-aic">
          <div class="m-f-f">所有订单</div>
          <div class="text-gray-color" @click="goOrderList">
            查询订单
            <i class="fa fa-angle-right" aria-hidden="true"></i>
          </div>
        </div>
        <div class="orders-classify m-f m-f-jcsa">
          <div class="orders-item m-f m-f-fdc">
            <i class="fa fa-credit-card-alt" aria-hidden="true"></i>
            待付款
          </div>

          <div class="orders-item m-f m-f-fdc">
            <i class="fa fa-truck" aria-hidden="true"></i>
            待收货
          </div>
          <div class="orders-item m-f m-f-fdc">
            <i class="fa fa-retweet" aria-hidden="true"></i>
            退货 / 换货
          </div>
        </div>
      </div>
      <div class="address m-f">
        收货地址
        <i class="fa fa-angle-right m-f-f text-gray-color" aria-hidden="true" @click="settingAddress"></i>
      </div>
      <div class="feedback m-f">
        我要吐槽
        <i class="fa fa-angle-right  m-f-f text-gray-color" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTopShow: false,
      animation:''
    };
  },
  methods:{
    memberScroll(e){
      e.target.scrollTop > 30
        ?
        this.isTopShow=true
        :
        this.isTopShow=false
    },
      
    settingAddress(){
      this.$router.push({path:'/home/addresslist'})
    },
    goOrderList(){
      this.$router.push({path:'/home/orderlist'})
    }
  }
};
</script>

<style scoped lang="scss">
.memeber-container {
  height: 100%;
  position: relative;
}

.member-top {
  height: 1rem;

  position: absolute;
  z-index: 2;
  width: 100%;
  font-size: 0.3rem;
  
}
.member-content {
  height: 100%;
  overflow: auto;
  background-color: #ccc;
  position: relative;
  .member-content-head {
    height: 5rem;
    background-color: #555;
    .member-setting {
      position: absolute;
      right: 30px;
      top: 30px;
      font-size: 0.4rem;
    }
    img {
      height: 3rem;
      width: 3rem;
      border-radius: 50%;
      border: 1px solid #fff;
    }
    .member-name {
      font-size: 0.5rem;
      margin-top: 20px;
    }
  }
  .all-orders {
    padding: 20px;
    text-align: left;
    background-color: #fff;
    .all-orders-head {
      font-size: 0.4rem;
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
      div:nth-child(2) {
        font-size: 0.3rem;
        i {
          margin-left: 20px;
        }
      }
      
    }
    .orders-classify {
        padding-top: 20px;
        padding-bottom: 20px;
        .orders-item {
          font-size: 0.3rem;
          width: 30%;
          text-align: center;
          i{
            margin-bottom: 10px;
          }
        }
      }
  }
  .address,.feedback{
    font-size: 0.4rem;
    text-align: left;
    padding:20px;
    margin-top:20px;
    background-color: #fff;
    i{
      text-align: right;
    }
  }
}
</style>