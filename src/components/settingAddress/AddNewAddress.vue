<template>
  <div class="add-new-address-container">
    <TopBackTabbar :title="topBackTabbar">
      <div class="save-new-address text-red-color" @click="saveAddress">保存</div>
    </TopBackTabbar>
    <div class="recieve-name m-f">
      <input type="text" class="m-f-f text-gray-color" placeholder="收货人" v-model.trim="recieveName" />
    </div>
    <div class="recieve-mobile m-f">
      <input
        type="text"
        class="m-f-f text-gray-color"
        placeholder="手机号"
        v-model.trim="recievePhone"
      />
    </div>

    <div class="recieve-area m-f">
      <input
        type="text"
        class="m-f-f text-gray-color"
        placeholder="所在地区"
        v-model.trim="addressAllArea"
        @click="isSelectAddressShow=true"
      />
    </div>
    <div class="detail-address m-f">
      <textarea
        id
        cols="20"
        rows="3"
        placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等"
        class="m-f-f text-gray-color"
        v-model.trim="detailAddress"
      ></textarea>
    </div>
    <div class="setting-default-address m-f">
      设置为默认地址
      <div class="m-f-f m-f m-f-jcfe">
        <div class="on-off" :style="{'background-color':isSettingDefaultAddress==true?'#04f':'#aaa'}" @click="setDefaultAddress">
          <div :style="{'left':isSettingDefaultAddress==true?'50%':0}"></div>
        </div>
      </div>
    </div>
    <div class="delete-address text-white-color m-f m-f-aic m-f-jcc" v-if="isDeleteAddressShow">
      <div @click="deleteAddress">删除收货地址</div>
    </div>
    <div class="selectAddress animated slideInUp" v-if="isSelectAddressShow">
      <VDistpicker
        type="mobile"
        @province="onChangeProvince"
        @city="onChangeCity"
        @area="onChangeArea"
      ></VDistpicker>
    </div>
    <Tip :text="tipText" :isShow="isOpenTip" :iconfont="tipIconfont"></Tip>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
import TopBackTabbar from "../common/TopBackTabbar";
import Tip from "../common/Tip";
export default {
  data() {
    return {
      topBackTabbar: "添加新地址",
      isSelectAddressShow: false,
      addressProvince: "",
      addressCity: "",
      addressArea: "",
      recieveName: "",
      recievePhone: "",
      detailAddress: "",
      tipText: "",
      isOpenTip: false,
      tipIconfont: "",
      isDeleteAddressShow: false,
      addressAllArea: "",
      recieveId: null,
      isSettingDefaultAddress:false
    };
  },
  created() {
    this.getFromAddressListData();
  },
  methods: {
    saveAddress() {
      let reg = /^1[3-9][0-9]{9}$/;
      console.log(this.recievePhone.length);
      if (this.recievePhone.length !== 11 || !reg.test(this.recievePhone)) {
        this.tipShow("请输入正确的手机号!!!", "fa-info-circle");
        return;
      }
      let obj = {
        recieveId: this.recieveId,
        recieveName: this.recieveName,
        recievePhone: this.recievePhone,
        recieveAddress: this.addressAllArea + " " + this.detailAddress,
        isDefaultAddress:this.isSettingDefaultAddress
      };
      console.log(this.isSettingDefaultAddress,this.recieveId)
      this.$store.commit("saveRecieveAddress",obj);
      this.$router.go(-1);
    },
    onChangeProvince(a) {
      this.addressProvince = a.value;
    },
    onChangeCity(a) {
      this.addressCity = a.value;
    },
    onChangeArea(a) {
      this.addressArea = a.value;
      this.addressAllArea =
        this.addressProvince + " " + this.addressCity + " " + this.addressArea;
      this.isSelectAddressShow = false;
    },
    tipShow(str, iconfont) {
      this.tipText = str;
      this.tipIconfont = iconfont;
      this.isOpenTip = true;

      setTimeout(() => {
        this.isOpenTip = false;
      }, 2000);
    },
    getFromAddressListData() {
      // console.log(this.$router.currentRoute.query)
      let address = this.$router.currentRoute.query.address;
      if (JSON.stringify(this.$router.currentRoute.query) == "{}") {
        this.recieveId = Math.floor(10 + Math.random() * 90);
      } else {
        this.recieveId = address.recieveId;
        let addressArr = address.recieveAddress.split(" ");
        this.addressAllArea =
          addressArr[0] + " " + addressArr[1] + " " + addressArr[2];
        this.detailAddress = addressArr[3];
        this.recieveName = address.recieveName;
        (this.recievePhone = address.recievePhone),
          (this.isDeleteAddressShow = true);
      }
    },
    setDefaultAddress(){
      this.isSettingDefaultAddress=!this.isSettingDefaultAddress
    },
    deleteAddress(){
      console.log(this.recieveId)
      this.$store.commit("deleteRecieveAddress",this.recieveId)
      this.$router.go(-1)
    }
  },
  components: {
    TopBackTabbar,
    VDistpicker,
    Tip
  },
  computed: {
    // getAddressArea(){
    //     if(this.addressProvince == '' || this.addressCity=='' || this.addressArea==''){
    //         return '所在地区'
    //     }
    //     let str=this.addressProvince+' '+this.addressCity+' '+ this.addressArea
    //     return str
    // }
  }
};
</script>

<style scoped lang="scss">
.add-new-address-container {
  height: 100%;
  position: relative;
  .save-new-address {
    font-size: 0.3rem;
  }
  .recieve-name,
  .recieve-mobile,
  .recieve-area,
  .setting-default-address {
    font-size: 0.4rem;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    margin: 10px 20px;
    input {
      outline: none;
      border: none;
      font-size: 0.35rem;
    }
  }
  .detail-address {
    margin: 10px 20px;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    textarea {
      font-size: 0.3rem;
      outline: none;
      border: none;
    }
  }
  .selectAddress {
    font-size: 0.3rem;
    height: 30%;
    overflow: auto;
    border-top: 1px solid #000;
    position: absolute;
    width: 100%;
    bottom: 0;
    padding-bottom: 1rem;
  }
  .delete-address {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1rem;
    border-top: 1px solid #000;
    overflow: hidden;
    font-size: 20px;
    div:first-child {
      padding: 10px 20px;
      background-color: #f40;
      border-radius: 30px;
    }
  }
  .setting-default-address {
    font-size: 0.3rem;
    div>div{
      height: 0.5rem;
      width: 1rem;
      background-color: #aaa;
      border-radius:0.25rem ;
      position: relative;
      div{
        height: 0.5rem;
        width: 0.5rem;
        border-radius: 50%;
        position: absolute;
        background-color: #eee;
      }
    }
  }
}
</style>