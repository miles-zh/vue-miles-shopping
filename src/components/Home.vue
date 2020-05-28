<template>
  <div class="home">
    <div class="content" :style="{'height':contentHeight+'px'}">
      <router-view></router-view>
    </div>
    <div class="footer">
      <router-link to="/home/index" class="router-link"  active-class="nav-active">
        <i class="fa fa-home fa-fw" aria-hidden="true"></i>
        <div>首页</div>
      </router-link>
      <router-link to="/home/cart"  class="router-link"    active-class="nav-active">
        <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        <div>购物车</div>
      </router-link>
      <router-link to="/home/member"  class="router-link"    active-class="nav-active">
        <i class="fa fa-user" aria-hidden="true"></i>
        <div>会员</div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
    data(){
      return {
        contentHeight:0,
      }
    },
    created(){
      let width=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      width=width > 750?750:width
      let height=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      this.contentHeight=height - (width/ 10)
    
    },
    mounted(){
    }  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
a{
  text-decoration: none;
  color: #000;
}
.home {
  height: 100%;
  width: 100%;
  position: relative;
  .footer {
    position: absolute;
    bottom: 0;
    border-top: 1px solid #999;

    height: 1rem;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #000;
    color: #fff;
    i {
      font-size: 0.5rem;
    }
    .router-link {
      font-size: 0.3rem;
      flex: 1;
      color: #fff;
    }
    .nav-active{
      color: #000;
      background-color: #fff;
    }
  }
  .content{
    overflow: auto;
  }
}
</style>
