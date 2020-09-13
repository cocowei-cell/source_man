<template>
  <div class="loss_nav">
    <z-header/>
    <z-nav/>
    <z-content/>
  </div>
</template>

<script>
import ZHeader from "./children/z-header";
import ZNav from "./children/z-nav";
import ZContent from "./children/z-content/z-content"
export default {
  name: "losspass",
  components: {
    ZHeader,
    ZNav,
    ZContent
  },
  beforeDestroy() {
    //在卸载这个组件之前，初始化vuex里面的内容
    this.$store.commit('setIndex',0);
  }
};
</script>
<style scoped>
</style>