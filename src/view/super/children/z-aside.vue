<template>
  <div>
    <!-- 菜单 -->
    <el-menu
      default-active="/super/userinfo"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <!-- 用户管理菜单 -->
      <el-menu-item index="/super/userinfo">
        <!-- 标题 -->
        <i class="el-icon-menu"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/super/table">
        <i class="el-icon-menu"></i>
        <span slot="title">表格管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">信息总览</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "z-aside",
};
</script>
<style scoped>
</style>