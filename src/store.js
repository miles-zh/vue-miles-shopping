import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex);



let store = new Vuex.Store({
    state: {
      cartlist: JSON.parse(window.localStorage.getItem('cartlist')) ||[],
      totalprice:0,
      userinfo:JSON.parse(window.localStorage.getItem('userinfo')) || {}
    },
    mutations: {
      increment (state,id) {
        //   console.log(id)
        let indexArr=state.cartlist.map((item,index)=>{
            if(item.goods_id == id){
              return index
            }else{
                return ''
            }
             
        })
        let index=  Number(indexArr.toString().replace(/\D/ig,""))
        state.cartlist[index].cart_count++;
        window.localStorage.setItem("cartlist",JSON.stringify(state.cartlist))
      },
      decrement(state,id){
        let indexArr=state.cartlist.map((item,index)=>{
            if(item.goods_id == id){
              return index
            }else{
                return ''
            }
             
        })
        let index=  Number(indexArr.toString().replace(/\D/ig,""))
        state.cartlist[index].cart_count--;
        window.localStorage.setItem("cartlist",JSON.stringify(state.cartlist))
      },
      async getCartlist(state,id){
        const {data} =await Axios.post("http://rap2.taobao.org:38080/app/mock/252258/api/goods/cartlist",{userId:id})
        // console.log(data,state)
        window.localStorage.setItem("cartlist", JSON.stringify(data.data));
        state.cartlist=data.data
        
      },
      setTotalPrice(state,total){
        state.totalprice=total
        // console.log(state.totalprice)
      },
      deleteCartlist(state,arr){
        let cartlist=state.cartlist;
        
        arr.forEach(item=>{
          let index=cartlist.findIndex(item1=>{
            return item1.goods_id==item
          })
          console.log(index)
          state.cartlist.splice(index,1)
        })

        window.localStorage.setItem("cartlist",JSON.stringify(state.cartlist))
        
      },
      addToCart(state,item){
        state.cartlist.push(item)
        window.localStorage.setItem("cartlist",JSON.stringify(state.cartlist))
      },
      appendToCart(state,id,count){
        let indexArr=state.cartlist.map((item,index)=>{
          if(item.goods_id == id){
            return index
          }else{
              return ''
          }
           
      })
      let index=  Number(indexArr.toString().replace(/\D/ig,""))
      state.cartlist[index].cart_count+=count;
      window.localStorage.setItem("cartlist",JSON.stringify(state.cartlist))
      },
      async getUserInfo(state,id){
        const {data} = await Axios.post("http://rap2.taobao.org:38080/app/mock/252258/api/userinfo",{userId:id})
        window.localStorage.setItem("userinfo", JSON.stringify(data.data));
        state.userinfo=data.data
      },
      saveRecieveAddress(state,address){


        console.log(address)
        let recieveList=state.userinfo.recieveInfo
        let index=recieveList.findIndex(item=>{
          return item.recieveId==address.recieveId
        }) 

        
        
        console.log(index)
        if(index == -1){
          address.isDefaultAddress == true?state.userinfo.recieveInfo.unshift(address):state.userinfo.recieveInfo.push(address);
        }else{

          if(address.isDefaultAddress){
            state.userinfo.recieveInfo.splice(index,1)
            state.userinfo.recieveInfo.unshift(address)
          }else{
            state.userinfo.recieveInfo[index]=address
          }

        }
          window.localStorage.setItem("userinfo", JSON.stringify(state.userinfo));
      },
      deleteRecieveAddress(state,id){
        let recieveList=state.userinfo.recieveInfo
        let index=recieveList.findIndex(item=>{
          return item.recieveId==id
        })
        state.userinfo.recieveInfo.splice(index,1)
        window.localStorage.setItem("userinfo", JSON.stringify(state.userinfo));
      }
  
    },
})


export default store



