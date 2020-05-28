<template>
  <div class="chart-container">
      <TopBackTabbar :title="topBackTabbar">
          <div class="delete-all-record" @click="deleteAllRecord">清空记录</div>
    </TopBackTabbar>
    <div class="chart-content" ref="chartContent">
       
    </div>
    <div class="bottom m-f m-f-jcc m-f-aic">
        <input type="text" class="m-f-f" v-model.trim="sendValue" @input="changeSendMessageStatus"> <div :class="['send-out-button','div-red-color', 'text-white-color',isSendMessage?'disabled':''] " @click="sendMessage">发送</div>
    </div>
  </div>
</template>

<script>
import TopBackTabbar from '../common/TopBackTabbar'
export default {
    data(){
        return {
            topBackTabbar:'客服',
            sendValue:'',
            isSendMessage:true
        }
    },
    components:{
        TopBackTabbar,
    },
    methods:{
        async getMessage(){
            const {data} =await this.$http.get(this.baseUrl+'/api/customerservice')
            // console.log(data)
            let text=data.data
            this.appendChartContent(text,'left','padding-right')
        },
        sendMessage(){
            if(this.sendValue.length==0)return;
                 this.appendChartContent(this.sendValue,'right','padding-left')
                
                 this.sendValue=""
                 this.isSendMessage=true
                 setTimeout(()=>{
                     this.getMessage()
                 },100)
            
            
        },
        changeSendMessageStatus(){
            if(this.sendValue.length==0){
                this.isSendMessage=true
            }else{
                this.isSendMessage=false
            }
        },
        appendChartContent(content,textposition,divposition){
            let chartContent=this.$refs.chartContent
            let div=document.createElement('div')
            div.style.width='100%'
            div.style.textAlign=textposition
            div.style.height='auto'
            div.className="m-f m-f-fdc"
            div.style.padding="10px"
            div.style[divposition]='30%'
            let span=document.createElement('span')
            
            span.style.color='#04f'
            span.style.fontSize="0.2rem"
            
            span.innerHTML=this.getDateTime()
            
            let p=document.createElement('div')
            
            
            p.innerHTML=content
            p.style.fontSize="0.3rem"
            div.appendChild(span)
            div.appendChild(p)
            // console.log(this.domToString(div))
            let domStr=window.localStorage.getItem('chart') || ""
            window.localStorage.setItem('chart',domStr+this.domToString(div))
            chartContent.appendChild(div)
            // 设置滚动条自动滚动到底 
            chartContent.scrollTop=chartContent.scrollHeight
        },
        getDateTime(){
            let date=new Date()
            let year=date.getFullYear()
            let month=date.getMonth()+1
            let day=date.getDate()

            let hour=date.getHours();

            if(hour<10){
                hour=`0${hour}`
            }else{
                hour=""+hour
            }

            let minute=date.getMinutes();
             if(minute<10){
                minute=`0${minute}`
            }else{
                minute=""+minute
            }
            let second=date.getSeconds();
            if(second<10){
                second=`0${second}`
            }else{
                second=""+second
            }
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`
        },
        getOldMessage(){
            let chartContent=this.$refs.chartContent
            let chartRecord= window.localStorage.getItem('chart') || ""
            chartContent.innerHTML=chartRecord
            // console.log(chartRecord)
        },
        domToString(node){
            let div=document.createElement('div')
            div.appendChild(node)
            let str=div.innerHTML
            div=node=null;
            return str
        },
        deleteAllRecord(){
            window.localStorage.removeItem('chart')
            window.location.reload()
        }

    },
    mounted(){
        // console.log(this.$refs.chartContent)
        this.getOldMessage()
    }
    
}
</script>

<style lang='scss' scoped>

.chart-container{
    height: 100%;
    position: relative;
    overflow: hidden;
    .delete-all-record{
        font-size: 0.3rem;
        color: #07f;
    }
    .chart-content{
        height: calc(100% - 1rem);
        width: 100%;
        overflow: auto;
        padding:20px 20px 1rem 20px;
        
    }
    .bottom{
        height: 1rem;
        width: 100%;
        position: absolute;
        bottom: 0;
        border-top:1px solid #ccc;
        padding:0 20px;
        font-size: 0.3rem;
        background-color: #eee;
        input{
            padding: 5px 0.3rem;
            outline: none;
            border: 1px solid #ccc;
            font-size: 0.4rem;
            border-radius: 0.4rem;
        }
        .send-out-button{
            margin-left: 20px;
            padding:5px 10px;
            border-radius: 10px;
            box-shadow: none;
            
        }
        .send-out-button.disabled{
            background-color: #ccc;
        }
    }
}

</style>