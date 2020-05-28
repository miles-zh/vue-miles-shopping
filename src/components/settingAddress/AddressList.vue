<template>
  <div class="address-list-container">
    <TopBackTabbar :title="topBackTabbar">
      <div class="add-address" @click="addNewAddress">添加新地址</div>
    </TopBackTabbar>
    <div class="address-list-content">
      <div class="address-list-item m-f m-f-aic" v-for="(item,index) in $store.state.userinfo.recieveInfo" :key="index">
        <div class="item-img text-white-color m-f  m-f-jcc m-f-aic">{{item.recieveName}}</div>
        <div class="recieve-info m-f-f">
          <div class="recieve-title m-f m-f-aic">
            <span>{{item.recieveName}}</span>
            <span class="text-gray-color">{{item.recievePhone}}</span>
          </div>
          <div class="address">
            <span class="text-red-color" v-if="index==0">默认</span>{{item.recieveAddress}}
          </div>
        </div>
        <div class="vertical-line"></div>
        <div class="edit-button text-gray-color" @click="editAddress(item)">编辑</div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBackTabbar from "../common/TopBackTabbar";
export default {
  data() {
    return {
      topBackTabbar: "我的收获地址"
    };
  },
  methods: {
    addNewAddress() {
      this.$router.push("/home/addnewaddress");
    },
    editAddress(item){
        // console.log(id)
        this.$router.push({path:'/home/addnewaddress',query:{address:item}})
    }
  },
  components: {
    TopBackTabbar
  }
};
</script>

<style scoped lang="scss">
.address-list-container {
  position: relative;
  height: 100%;
}
.add-address {
  font-size: 0.3rem;
}
.address-list-content {
  height: calc(100% - 1rem);
  overflow: auto;
  .address-list-item {
    padding: 20px 10px;
    .item-img {
      background: linear-gradient(to right, #ccc, #aaa);
      height: 1rem;
      width: 1rem;
      font-size: 0.2rem;
      
      border-radius: 50%;
      
      padding: 0 20px;
    }
    .recieve-info {
      text-align: left;
      padding: 0 20px;
      .recieve-title {
        span:nth-child(1) {
          font-size: 0.4rem;
          margin-right: 20px;
        }
        span:nth-child(2) {
          font-size: 0.3rem;
        }
      }
      .address {
        font-size: 0.3rem;
        padding: 10px 0;
        span {
          border: 1px solid #f40;
          padding: 5px 10px;
          margin-right: 10px;
          font-size: 0.2rem;
          line-height: 0.5rem;
        }
      }
    }
    .vertical-line {
      height: 0.5rem;
      width: 1px;
      background-color: #ccc;
    }
    .edit-button {
      font-size: 0.35rem;
      padding: 0 20px;
    }
  }
}
</style>