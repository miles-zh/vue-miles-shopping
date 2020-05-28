<template>
  <div>
    <div class="top m-f div-black-color text-white-color m-f-aic">
      <i class="fa fa-angle-left" aria-hidden="true" @click="goBack"></i>
      <span>{{title}}</span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  props:['title']
};
</script>

<style scoped lang="scss">


.top {
  font-size: 0.4rem;
  padding: 10px 20px;
  height: 1rem;
  box-sizing: border-box;
  width: 100%;
  i {
    color: #eee;
    font-size: 0.7rem;
    text-align: left;
  }
  span {
    flex: 1;
  }
}
</style>