<template>
  <div class="nav">
    <z-center width="60%">
      <el-steps :active="_index" finish-status="success">
        <el-step title="填写学号"></el-step>
        <el-step title="身份验证"></el-step>
        <el-step title="设置新密码"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </z-center>
  </div>
</template>

<script>
import ZCenter from "@/components/content/z-center/z-center";
export default {
  name: "z-nav",
  data() {
   return{

   }
  },
  computed:{
    _index() {
      return this.$store.state.index; 
    }
  },
  components: {
    ZCenter,
  },
};
</script>
<style scoped>
.nav {
  width: 100%;
  height: 80px;
  background: #f5f5f5;
  padding: 15px;
}
</style>