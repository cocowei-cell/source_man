* @Descripttion: 首页
* @Author: zzz
* @Date: 2020-09-03 20:12:40
* @LastEditors: Please set LastEditors
* @LastEditTime: 2020-09-16 23:16:27

<template>
  <div>
    <z-header />
    <keep-alive exclude="z-submit">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import ZHeader from "@/view/index/children/z-header";
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