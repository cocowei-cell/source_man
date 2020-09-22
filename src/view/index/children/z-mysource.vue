<template>
  <div>
    这是我的分数
  </div>
</template>

<script>
export default {
  name:'z-mysource',
  created() {
     this.$store.commit("setHeaderIndex","2")
  }
}
</script>
<style scoped>

</style>