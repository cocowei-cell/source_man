<template>
  <div>
    <el-container class="container_home">
      <!-- 头部区域 -->
      <el-header>
        <h1 class="title">管理系统审核后台</h1>
        <el-dropdown class="dropdown">
          <span class="el-dropdown-link">
            {{ userInfo }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- 下拉菜单 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
            <el-dropdown-item @click.native="modifypass"
              >修改密码</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 主题区 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside class="aside" width="300px">
          <z-admin-aside />
        </el-aside>
        <!-- 主区域 -->
        <el-main>
          <!-- 缓存组件 -->
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ZAdminAside from "@/view/admin/children/z-admin-aside";
import adminMixin from "@/mixin/adminMix";
import request from "@/services/request";
export default {
  name: "admin",
  mixins: [adminMixin],
  components: {
    ZAdminAside,
  },
};
</script>
<style scoped>
.container_home {
  height: 100vh !important;
}
.aside {
  background-color: #333744;
}
.el-header {
  background-color: #373d41;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}
.el-main {
  background-color: #eaedf1;
}
.dropdown {
  color: #ffffff;
}
.title {
  color: #fff;
}
</style>