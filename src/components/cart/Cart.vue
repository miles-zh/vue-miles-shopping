<template>
  <div class="cart-container">
    <div class="top">
      <div class="top-head">
        <div class="title">购物车</div>
        <div class="operation" @click="operation">{{operationText}}</div>
      </div>
      <div class="top-footer">
        <div class="goods-count">共 {{$store.state.cartlist.length}} 件商品</div>
        <div class="receiving-address">收货地址：{{$store.state.userinfo.recieveInfo[0].recieveAddress}}</div>
      </div>
    </div>
    <div class="cart-content">
      <div class="cart-item" v-for="(item,index) in $store.state.cartlist" :key="index">
        <div class="cart-item-content">
          <input type="checkbox" name="cartlist" :value="JSON.stringify(item)" @click="checkGoods"/>
          <img
            :src="item.goods_img"
          />
          <div class="goods-brief m-f m-f-fdc m-f-aic" >
            <div class="goods-name div-text-overflow-hidden-2">{{item.goods_name}}</div>
            <div class="goods-specifications  div-text-overflow-hidden-2">{{item.goods_specifications}}</div>
          </div>
        </div>
        <div class="cart-item-price">
          <div class="goods-price">￥{{item.goods_sell_price}}</div>
          <CountIncrementDecrementButton :count="item.cart_count" @decrement='countReduce(item.goods_id,item.cart_count)' @increment='countAdd(item.goods_id,item.cart_count)'></CountIncrementDecrementButton>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="checkbox" @click="checkedAllGoods">
        <input type="checkbox" ref="selectAll"> 全选
      </div>
      
      <div class="settlement-delete">
        <div class="settlement" v-if="isSettlementOrDelete">共计：<span>￥{{totalPrice}}</span>  <div class="settlement-button" @click="goConfirmOrder">结算</div></div>
        <div class="delete"  v-if="!isSettlementOrDelete">
          <div class="delete-button" @click="deleteCartList">删除</div>
        </div>
      </div>
    </div>
    <Tip :text="tipText" :isShow="isOpenTip" :iconfont="tipIconfont"></Tip>
  </div>
</template>

<script>
import CountIncrementDecrementButton from '../common/CountIncrementDecreamentButton'
import Tip from '../common/Tip'

export default {
  data() {
    return {
      // goodsCount:1
      checkedGoods:[],
       isSettlementOrDelete:true,
       operationText:'管理',
       totalPrice:0,
       tipText:'',
       tipIconfont:'',
       isOpenTip:false

    };
  },
  created() {
    // let isLogin=this.getLoginStatus()
    // this.goLoginRegister(isLogin)
      // console.log(this.$store)
  },
  mounted(){
   
  },
  components:{
    CountIncrementDecrementButton,
    Tip
  },
  methods: {
    goLoginRegister(status) {
      if (status == false) {
        this.$router.push({ path: "/home/loginregister" });
      } else {
        return;
      }
    },
    getLoginStatus() {
      let isLogin = window.localStorage.getItem("isLogin") || false;
      return isLogin;
    },
    countReduce(id,count){
      if(count < 2){return}
      this.$store.commit('decrement',id)

      let index=this.checkedGoods.findIndex(item=>{
        return item.goods_id === id
      })

      if(index !== -1){
        this.checkedGoods[index].cart_count>1?(this.checkedGoods[index].cart_count -=1) : 1
        
      }


      this.computeTotalPrice(this.checkedGoods)
    },
    countAdd(id){
      // this.goodsCount++;
      this.$store.commit('increment',id)

      let index=this.checkedGoods.findIndex(item=>{
        return item.goods_id === id
      })

      if(index !== -1){
        this.checkedGoods[index].cart_count++
      }
      
      



      this.computeTotalPrice(this.checkedGoods)




    },
    
    checkGoods(e){
      let value=JSON.parse(e.target.defaultValue)
      
      if(e.target.checked){
        
        this.checkedGoods.push( value )
        // console.log(this.checkedGoods)

        // console.log(this.$store.state.cartlist.length,this.checkedGoods.length)
        if(this.$store.state.cartlist.length   == this.checkedGoods.length){
          this.$refs.selectAll.checked=true
        }


        this.computeTotalPrice(this.checkedGoods)
      }else{
        let index=this.checkedGoods.findIndex(item=>{
          return item.goods_id == value.goods_id
        })
        
        this.checkedGoods.splice(index,1)
        if(this.checkedGoods.length !=0){
          this.computeTotalPrice(this.checkedGoods)
        }else{
          this.totalPrice=0
          this.$store.commit('setTotalPrice',this.totalPrice)
        }

        this.$refs.selectAll.checked=false
        
      }
      // console.log(this.checkedGoods)
    },
    operation(){
      if(this.operationText == '管理'){
        this.operationText="完成"
      }else{
        this.operationText='管理'
        this.totalPrice=0;
      }
      this.isSettlementOrDelete=!this.isSettlementOrDelete
    },
    checkedAllGoods(e){
      let checkboxs=document.querySelectorAll('input[name="cartlist"]')
      if(e.target.checked){
        this.checkedGoods=[]
        checkboxs.forEach(item=>{
          item.checked=true
          // console.log(item.defaultValue)
          let obj=JSON.parse(item.defaultValue)
          this.checkedGoods.push(obj)
        })
        // console.log(this.checkedGoods)
        // 保留两位小数
        this.computeTotalPrice(this.checkedGoods)
        
      }else{
        this.checkedGoods=[]
        this.totalPrice=0
        this.$store.commit('setTotalPrice',this.totalPrice)
        checkboxs.forEach(item=>{
          item.checked=false
        })

      }
      
    },
    async computeTotalPrice(arr){
      this.totalPrice=0
       await arr.forEach( item=>{
          this.totalPrice=  this.totalPrice +Number(item.goods_sell_price) * Number(item.cart_count) 
        })
        // console.log(this.totalPrice)
        this.totalPrice=this.totalPrice.toFixed(2)
        this.$store.commit('setTotalPrice',this.totalPrice)
    },
    deleteCartList(){
      // console.log(this.checkedGoods)
      if(this.checkedGoods.length != 0){
        let arr=this.checkedGoods.map(item=>{
          return item.goods_id
        })
        this.$store.commit('deleteCartlist',arr)
        let checkboxs=document.querySelectorAll('input[name="cartlist"]')
        checkboxs.forEach(item=>{
          item.checked=false
        })
        this.totalPrice=0;
        this.checkedGoods=[]
      }
      
    },
    tipShow(str,iconfont){
      this.tipText=str
      this.tipIconfont=iconfont
      this.isOpenTip=true
        setTimeout(()=>{
          this.isOpenTip=false
        },2000)
    },
    goConfirmOrder(){
      if(this.checkedGoods.length==0){
        this.tipShow("请选择购买的商品!!!","fa-info-circle")
        return
      }
      let orderList=this.checkedGoods
      console.log(orderList)
      this.$router.push({path:'/home/confirmorder',query:{orderList}})
    }

  }
};
</script>

<style scoped lang="scss">
.cart-container {
  height: 100%;
  overflow: auto;
  width: 100%;
  position: relative;
}
.top {
  background-color: #000;
  height: 1.5rem;
  color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  .top-head {
    display: flex;
    height: 0.8rem;
    line-height: 0.8rem;
    padding: 10px;
    .title {
      font-size: 0.4rem;
    }
    .operation {
      font-size: 0.3rem;
      font-weight: bolder;
      flex: 1;
      text-align: right;
    }
  }
  .top-footer {
    font-size: 0.25rem;
    display: flex;
    padding: 10px;
    .receiving-address {
      margin-left: 20px;
      width: 6rem;
      text-align: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
.cart-content {
  position: relative;
  top: 1.5rem;
  overflow: auto;
  
  height:calc(100% - 2.7rem);
  .cart-item {
    height: 4rem;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 10px #ccc;
    width: 95%;
    margin: 10px 10px 0px 10px;
    border-radius: 10px;
    padding: 10px;
    .cart-item-content {
      display: flex;
      align-items: center;
      justify-content: center;

      input {
        height: 0.5rem;
        width: 0.5rem;
        border-radius: 0.25rem;
        margin: 0px 10px;
      }
      img {
        height: 2.5rem;
        width: 2.5rem;
        margin: 0 20px;
      }
      .goods-brief {
        flex: 1;
        font-size: 0.3rem;
        height: 2.5rem;
        
        .goods-name,.goods-specifications {
          height: 1rem;
          width: 80%;
          padding: 10px;
          text-align: left;
        }
        .goods-specifications {
          background-color: #eee;
          margin-top:10px;
        }
      }
    }
    .cart-item-price{
      display: flex;
      align-items: center;
      height: 1rem;
      margin-top:10px;
      .goods-price{
        width: 60%;
        text-align: right;
        font-size: 0.4rem;
        color: #f40;
      }
      
    }
  }
}
.bottom {
  border-top: 1px solid #ccc;
  height: 1.2rem;
  width: 100%;
  position: absolute;
  bottom: 0;
  overflow: hidden;
  display: flex;
  font-size: 0.3rem;
  padding:10px 20px;
  align-items: center;
  .settlement-delete{
    flex: 1;
    .settlement{
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .settlement-button{
        background-color: #f40;
        padding: 10px 30px;
        border-radius: 30px;
        margin-left: 20px;
        color: #fff;
      }
      span{
        color: #f40;
      }
    }
    .delete{
      display: flex;
      justify-content: flex-end;
      .delete-button{
        background-color: #f40;
        width: 1.5rem;
        padding:10px 20px;
        border-radius: 20px;
        color: #fff;
      }
    }
  }
  .checkbox{
    font-size: 0.4rem;
    display: flex;
    align-items: center;
    color: #999;
    input{
      height: 0.5rem;
        width: 0.5rem;
        border-radius: 0.25rem;
        margin-right: 10px;
    }
    
  }
}
</style>