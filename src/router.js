import Vue from 'vue'
import VueRouter from "vue-router"
Vue.use(VueRouter)
// const Index = () => import("./components/index/index.vue")
// const Member=()=>import("./components/member/Member.vue")
// const Cart=()=>import("./components/cart/Cart.vue")
// const GoodsDetail=()=>import("./components/goodsDetail/GoodsDetail.vue")
// const LoginRegister=()=>import("./components/loginRegister/LoginRegister.vue")

// const ConfirmOrder=()=>import("./components/order/ConfirmOrder.vue")



import Index from "./components/index/index.vue"
import Member from "./components/member/Member.vue"
import Cart from "./components/cart/Cart.vue"
import GoodsDetail from "./components/goodsDetail/GoodsDetail.vue"
import LoginRegister from "./components/loginRegister/LoginRegister.vue"
import ConfirmOrder from "./components/order/ConfirmOrder.vue"

import AddressList from "./components/settingAddress/AddressList.vue"

import AddNewAddress from "./components/settingAddress/AddNewAddress.vue"

import Chart from "./components/chart/Chart.vue"
import OrderList from "./components/order/OrderList.vue"
import Logistics from './components/logistics/Logistics.vue'

const routes = [
    {
        path: '/',
        redirect: '/home/index'
    },
    {
        path: "/home/index",
        component: Index
    },
    {
        path: "/home/cart",
        component: Cart
    },
    {
        path: "/home/member",
        component: Member
    },
    {
        path:'/home/goodsdetail/:id',
        component:GoodsDetail
    },
    {
        path:'/home/loginregister',
        component:LoginRegister
    },
        {
            path:'/home/confirmorder',
            component:ConfirmOrder
        },
        {
            path:'/home/addresslist',
            component:AddressList
        },{
            path:'/home/addnewaddress',
            component:AddNewAddress
        },{
            path:'/home/chart',
            component:Chart
        },{
            path:'/home/orderlist',
            component:OrderList
        },{
            
            path:'/home/logistics',
            component:Logistics
            
        }
    
]




const router = new VueRouter({
    routes
})

router.beforeEach((to,from,next)=>{
    const isLogin=window.localStorage.getItem('isLogin')
    // console.log(to)
    // console.log(isLogin)
   if(to.matched[0].path == '/home/cart'){
        if(isLogin == "true"){
            next()
        }else{
            next({path:'/home/loginregister?beforePath='+to.matched[0].path})
        }
   }else if(to.matched[0].path=='/home/member'){
    if(isLogin == "true"){
        next()
    }else{
        next({path:'/home/loginregister?beforePath='+to.matched[0].path})
    }
   }else{
       next()
   }
   
    
    
})


export default router
