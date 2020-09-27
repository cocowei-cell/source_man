<template>
  <div>
    <!-- 菜单 -->
    <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <!-- 用户管理菜单 -->
      <el-menu-item index="/admin/checking">
        <!-- 标题 -->
        <i class="el-icon-user-solid"></i>
        <span slot="title">审核表格</span>
      </el-menu-item>
      <el-menu-item index="/admin/mycheck">
        <i class="el-icon-setting"></i>
        <span slot="title">我的审核</span>
      </el-menu-item>
      <el-menu-item index="/admin/info">
        <i class="el-icon-folder"></i>
        <span>异议审核</span>
        <el-badge :value="10" slot="title" :max="99" class="item"> </el-badge>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "z-admin-aside",
};
</script>
<style scoped>
.el-badge {
  margin-left: 10px;
}
</style>