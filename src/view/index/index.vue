<!--
 * @Descripttion: 
 * @Author: zzz
 * @Date: 2020-09-03 20:12:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-10 19:58:50
-->
<template>
  <div>
    <z-header/>
    <router-view></router-view>
  </div>
</template>

<script>
import ZHeader from '@/components/content/z-header/z-header';
export default {
  name:'index',
  components:{
    ZHeader
  }
}
</script>
<style scoped>

</style>