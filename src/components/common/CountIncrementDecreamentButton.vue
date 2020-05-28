<template>
  
      <div class="goods-count m-f m-f-f m-f-jcc">
            <div @click="countReduce">-</div>
            <div>{{count}}</div>
            <div @click="countAdd">+</div>
    </div>
  
</template>

<script>
export default {
    props:['count'],
    methods:{
        countReduce(){
            this.$emit('decrement')
        },
        countAdd(){
            this.$emit('increment')
        }
    }
}
</script>

<style scoped lang='scss'>
.goods-count{
        font-size: 0.35rem;
        div:nth-of-type(odd){
          border:1px solid #ccc;
          background-color: #eee;
          padding: 10px 20px;
        }
        div:nth-of-type(even){
          border-top:1px solid #ccc;
          border-bottom:1px solid #ccc;
          text-align: center;
          width: 1rem;
          padding: 10px 0;
        }
      }
</style>