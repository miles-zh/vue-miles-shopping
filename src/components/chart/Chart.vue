<template>
  <div class="chart-container">
    <TopBackTabbar :title="topBackTabbar">
      <div class="delete-all-record" @click="deleteAllRecord">清空记录</div>
    </TopBackTabbar>
    <div class="chart-content" ref="messagecontent">
      <div :class="['message','m-f',item.isMe?'m-f-jcfe':'']" v-for="(item,index) in dealMessageList" :key="index">
        <div :class="['message-item','m-f','m-f-fww',item.isMe?'message-item-me':'']">
          <div class="message-item-date">{{item.createdShowTime}}</div>
          <img :src="item.avatarUrl" alt="" class="message-item-avatar">
          <div class="message-item-content">
            <div v-if="item.messageType === 'text'" class="message-text">{{item.text}}</div>
            <img v-if="item.messageType === 'img'" class="message-img" :src="item.imgUrl" alt="">
            <img v-if="item.messageType === 'expression'" class="message-expression" :src="item.imgUrl" alt="">
          </div>
        </div>
      </div>
      <!-- <div class="message m-f m-f-jcfe">
        <div class="message-item m-f m-f-fww message-item-me">
          <div class="message-item-date">10:30</div>
          <img src="http://pic.51yuansu.com/pic3/cover/02/56/11/59fb41a3f3a19_610.jpg" alt="" class="message-item-avatar">
          <div class="message-item-content"> -->
            <!-- <div class="message-text">你好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好</div> -->
            <!-- <img class="message-img" src="http://pic.51yuansu.com/pic3/cover/02/56/11/59fb41a3f3a19_610.jpg" alt=""> -->
            <!-- <img class="message-expression" src="http://pic.51yuansu.com/pic3/cover/02/56/11/59fb41a3f3a19_610.jpg" alt=""> -->
          <!-- </div>
        </div>
      </div> -->
     
    </div>
    <div class="bottom m-f m-f-jcc m-f-aic">
      <input type="text" class="m-f-f" v-model.trim="sendValue" @input="changeSendMessageStatus" />
      <div class="send-img-button m-f m-f-aic m-f-jcc" @click="showSendImgWrap">+</div>
      <div
        :class="['send-out-button','div-red-color', 'text-white-color',isSendMessage?'disabled':''] "
        @click="sendMessage"
      >发送</div>
      <div class="send-img-wrap" v-if='isShowSendImgWrap'>
        <span class="span"  @click="sendImg">图片</span> <input type="file" accept="image/*" ref="selectedImg" multiple hidden>  
        <div class="expression">
          <swiper ref="mySwiper" style="height:5rem" :options="swiperOptions">
            <swiper-slide v-for="(item,index) in swiperItems" :key="index">
                
                <img  v-for="(item1,index1) in item" :key="index1" :src="item1" @click="sendExpression(item1)" />
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBackTabbar from "../common/TopBackTabbar";
import {dealChatTimestamp} from '../../assets/selfTools.js'
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { expressionUrlArr } from "../../assets/emj"
import "swiper/css/swiper.css";
export default {
  data() {
    return {
      topBackTabbar: "客服",
      sendValue: "",
      isSendMessage: true,
      swiperItems: [],
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        }
      },
      messageList:[],
      isShowSendImgWrap:false,
      chartContentOffsetTop:0
    };
  },
  components: {
    TopBackTabbar,
    Swiper,
    SwiperSlide
  },
  methods: {
    async getMessage() {
      const { data } = await this.$http.get(
        this.baseUrl + "/api/customerservice"
      );
      // console.log(data)
      let text = data.data;
      let obj={
        isMe:false,
        messageType:'text',
        text:text,
        avatarUrl:'http://pic.51yuansu.com/pic3/cover/02/56/11/59fb41a3f3a19_610.jpg',
        createdTime:new Date().getTime()
      }
      this.messageList.push(obj)
          this.$nextTick(function(){
            this.autoToBottom()
          })
      window.localStorage.setItem('chartList',JSON.stringify(this.messageList))    
       
    },
    sendMessage() {
      if (this.sendValue.length == 0) return;
      let obj={
        isMe:true,
        messageType:'text',
        text:this.sendValue,
        avatarUrl:'http://pic.51yuansu.com/pic3/cover/02/56/11/59fb41a3f3a19_610.jpg',
        createdTime:new Date().getTime()
      }
      this.messageList.push(obj)  
      this.sendValue = "";
      this.isSendMessage = true;
      this.isShowSendImgWrap=false
      this.$nextTick(()=>{
        this.autoToBottom()
      })
            
       
      setTimeout(() => {
        this.getMessage();
      }, 100);
    },
    changeSendMessageStatus() {
      if (this.sendValue.length == 0) {
        this.isSendMessage = true;
      } else {
        this.isSendMessage = false;
      }
    },
    getOldMessage(){
      let list= JSON.parse(window.localStorage.getItem('chartList')) || []
      this.messageList=list
    },
    
    deleteAllRecord() {
      window.localStorage.removeItem("chart");
      window.location.reload();
    },
    getSwiperItems(arr) {
      let arr1 = [],
        arr2 = [],
        arr3 = [],
        arr4 = [],
        arr5 = [];
      for (let i = 0; i < 98; i++) {
        if (i < 21) {
          let str=arr[0][i] 
          arr1.push(str);
        } else if (i < 42) {
          let str=arr[1][i-21]
          arr2.push(str);
        } else if (i < 63) {
          let str=arr[2][i-42] 
           arr3.push(str);
        } else if (i < 84) {
            let str=arr[3][i-63] 
          arr4.push(str);
        } else {
          let str=arr[0][i-84]  
          arr5.push(str);
        }
      }
      this.swiperItems.push(arr1);
      this.swiperItems.push(arr2);
      this.swiperItems.push(arr3);
      this.swiperItems.push(arr4);
      this.swiperItems.push(arr5);
    },
    sendExpression(url){
      // console.log(url)
      
      let obj={
        isMe:true,
        messageType:'expression',
        imgUrl:url,
        avatarUrl:'http://pic.51yuansu.com/pic3/cover/02/56/11/59fb41a3f3a19_610.jpg',
        createdTime:new Date().getTime()
      }
      this.isShowSendImgWrap=false
      this.messageList.push(obj)
      window.localStorage.setItem('chartList',JSON.stringify(this.messageList)) 
            this.$nextTick(()=>{
              this.autoToBottom()
            })
      
    },
    showSendImgWrap(){
      this.isShowSendImgWrap = !this.isShowSendImgWrap
    },
    sendImg(){
      let input=this.$refs.selectedImg
      input.click()
      input.addEventListener('change',(e)=>{
        // console.log(e)
        let files = e.target.files
       
        files.forEach(item=>{
          let url= window.URL.createObjectURL(item);
          
          let obj={
            isMe:true,
            messageType:'img',
            imgUrl:url,
            avatarUrl:'http://pic.51yuansu.com/pic3/cover/02/56/11/59fb41a3f3a19_610.jpg',
            createdTime:  new Date().getTime()
          }
          
          this.messageList.push(obj)  
          this.isShowSendImgWrap=false
          // console.log(obj)
          // console.log(this.messageList)
          window.localStorage.setItem('chartList',JSON.stringify(this.messageList)) 
          this.$nextTick(()=>{
            setTimeout(()=>{
              this.autoToBottom()
            },100)
           
          })
          
        }) 
      },false)
    },
    autoToBottom(){
        // this.$refs.chartcontent
        
          // console.log(this.$refs)
          this.$refs.messagecontent.scrollTop = this.$refs.messagecontent.scrollHeight

       
    }  
  },
  mounted() {
    // console.log(this.$refs.chartContent)



    this.getOldMessage();
    // let timer=setInterval(()=>{
    //    let t= setCountDown('2020-06-07 10:09:09',timer)
    // //    console.log(t)
    // },1000)
    
    // console.log(this.swiperItems)
  },
  created(){
    // console.log(expressionUrlArr)
      this.getSwiperItems(expressionUrlArr)
  },
  computed:{
    dealMessageList(){
      // console.log(this.messageList)
      let list=this.messageList

      // console.log(list)
      let len=list.length
      for(let i=0;i<len;i++){
        // console.log(list[i].createdTime)
        if(i===0){
          list[0].createdShowTime=dealChatTimestamp(list[0].createdTime)
          continue;
        } 
        let difference = list[i].createdTime - list [i-1].createdTime 
        // console.log(difference+'-dd-'+i)
        if(difference < 60000){
          list[i].createdShowTime= ""
        }else{
          list[i].createdShowTime= dealChatTimestamp(list[i].createdTime)
        } 
      }
      // console.log(list)
      return list
    }
  }
};
</script>

<style lang='scss' scoped>
.chart-container {
  height: 100%;
  position: relative;
  overflow: hidden;
  .delete-all-record {
    font-size: 0.3rem;
    color: #07f;
  }
  .chart-content {
    height: calc(100% - 1rem);
    width: 100%;
    overflow: auto;
    padding: 20px 20px 1rem 20px;
    .message-item{
      max-width: 7rem;
      // border:1px solid #000;
      margin-top: 20px;
      .message-item-date{
        width: 100%;
        font-size: 0.3rem;
        color: #999;
        padding: 10px 20px;
        text-align: left;
      }
      .message-item-avatar{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        border:1px solid #999;
      }
      .message-item-content{
        background-color: #eee;
        padding: 20px;
        font-size: 0.4rem;
        position: relative;
        margin-left: 0.35rem;
        border-radius: 0.1rem;
        max-width:calc(100% - 1.35rem);
        .message-text{
          text-align: left;
        }
        .message-img{
          max-width: 100%;
          max-height: 3rem;
        }
        .message-expression{
          height:.8rem;
          width:.8rem ;
        }
      }
      .message-item-content::before{
        position: absolute;
        content: "";
        height: 0;
        width: 0;
        border-right: 0.3rem solid #eee;
        border-top: 0.3rem solid #fff;
        border-bottom: 0.3rem solid #fff;
        left: -0.3rem;
        top: 0.1rem;
      }
    }
    .message-item-me{
      flex-direction: row-reverse;
      .message-item-date{
        text-align: right;
      }
      .message-item-content{
        margin-right: 0.35rem;
        margin-left: auto;
      }
      .message-item-content::before{
        left: auto;
        right: -0.3rem;
        transform: rotateZ(180deg);
      }
    }
    
  }
  .bottom {
    height: 1rem;
    width: 100%;
    position: absolute;
    bottom: 0;
    border-top: 1px solid #ccc;
    padding: 0 20px;
    font-size: 0.3rem;
    background-color: #eee;
    input {
      padding: 5px 0.3rem;
      outline: none;
      border: 1px solid #ccc;
      font-size: 0.4rem;
      border-radius: 0.4rem;
    }
    .send-out-button {
      margin-left: 10px;
      padding: 5px 10px;
      border-radius: 10px;
      box-shadow: none;
    }
    .send-out-button.disabled {
      background-color: #ccc;
    }
    .send-img-button {
      height: 0.5rem;
      width: 0.8rem;
      background-color: #ddd;
      margin-left: 10px;
    }
    .send-img-wrap {
      position: absolute;
      border: 1px solid #eee;
      width: 100%;
      height: 6rem;
      top: -6rem;
      text-align: left;
      background-color: #fff;
      padding: 20px 10px;
      .span {
        padding: 10px 20px;
        background-color: #ddd;
        display: inline-block;
      }
      .expression {
        height: 5rem;
        // border: 1px solid #000;
        margin-top: 15px;
        img {
          height: 1rem;
          width: 1rem;
          margin: 13px;
        }
      }
    }
  }
}
</style>