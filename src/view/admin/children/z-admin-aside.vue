<template>
  <div>
    <!-- 菜单 -->
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      default-active="/admin/checking"
    >
      <!-- 用户管理菜单 -->
      <el-menu-item index="/admin/checking">
        <!-- 标题 -->
        <i class="el-icon-user-solid"></i>
        <span slot="title">审核表格</span>
      </el-menu-item>
      <el-menu-item index="/admin/error">
        <i class="el-icon-folder"></i>
        <span>异议审核</span>
        <el-badge v-if="count!==0" :value="count" slot="title" :max="99" class="item">
        </el-badge>
      </el-menu-item>
      <el-menu-item index="/admin/info">
        <i class="el-icon-setting"></i>
        <span slot="title">信息总览</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import request from "@/services/request";
export default {
  name: "z-admin-aside",
  computed: {
    count() {
      return this.$store.state.errorCount;
    }
  },
  created() {
    // 异步获取错误
    this.$store.dispatch("getCountError");
  },
};
</script>
<style scoped>
.el-badge {
  margin-left: 10px;
}
</style>