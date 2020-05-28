<template>
  
      <div class="tip text-red-color" v-if="isShow">
      <i :class="['fa',iconfont]" aria-hidden="true"></i>
      {{text}}
    </div>
  
</template>

<script>
export default {
    props:['isShow','iconfont','text']
}
</script>

<style scoped lang="scss">
.tip {
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translateX(-50%);
  z-index: 2;
  font-size: 0.4rem;
  background-color: #000;
  width: 95%;
  padding: 30px 20px;
}
</style>