<template>
  <div>
      <swiper ref="mySwiper" :options="swiperOptions" :style="{'height':height}">
      <swiper-slide v-for="(item,index) in swiperImgs" :key="index" >
        <img :src="item" @click="previewImg(item)" />
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
    props:['swiperImgs',"swiperOptions","height"],
    components:{
       
    SwiperSlide,
    Swiper,
    
    },
    methods:{
      previewImg(url){
        this.$emit("touchstart",url)
      }
    }
}
</script>

<style scoped>

.swiper-container {
  width: 100%;
  
}
.swiper-container img {
  height: 100%;
  width: 100%;
}

</style>