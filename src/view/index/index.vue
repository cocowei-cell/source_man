* @Descripttion: 首页
* @Author: zzz
* @Date: 2020-09-03 20:12:40
* @LastEditors: Please set LastEditors
* @LastEditTime: 2020-09-16 23:16:27

<template>
  <div>
    <z-header />
    <router-view></router-view>
  </div>
</template>

<script>
import ZHeader from "@/components/content/z-header/z-header";
export default {
  name: "index",
  components: {
    ZHeader,
  },
  created() {},
};
</script>
<style scoped>
</style>