<template>
  <div>
    <!-- 菜单 -->
    <el-menu
      default-active="/super/userinfo?type=super"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <!-- 用户管理菜单 -->
      <el-submenu index="1">
        <template slot="title">
          <!-- 标题 -->
          <i class="el-icon-user-solid"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item @click="loadData" index="/super/userinfo?type=super">
          <span slot="title">超级管理员管理</span>
        </el-menu-item>
        <el-menu-item index="/super/userinfo?type=admin">
          <span slot="title">审核人管理</span>
        </el-menu-item>
        <el-menu-item index="/super/userinfo?type=normal">
          <span slot="title">普通用户管理</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/super/table">
        <i class="el-icon-setting"></i>
        <span slot="title">表格管理</span>
      </el-menu-item>
      <el-menu-item index="/super/time">
        <i class="el-icon-setting"></i>
        <span slot="title">学期时间管理</span>
      </el-menu-item>
      <el-menu-item index="/super/college">
        <i class="el-icon-setting"></i>
        <span slot="title">学院与专业管理</span>
      </el-menu-item>
      <el-menu-item index="/super/info">
        <i class="el-icon-folder"></i>
        <span slot="title">信息总览</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "z-aside",
  methods: {
    loadData() {
      this.$router.push("/super/userinfo?type=super");
    },
  },
  created() {
    this.loadData();
  },
};
</script>
<style scoped>
</style>