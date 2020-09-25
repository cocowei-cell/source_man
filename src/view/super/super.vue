<template>
  <el-container class="container_home">
    <!-- 头部区域 -->
    <el-header>
      <h1 class="title">管理系统后台</h1>
      <el-dropdown class="dropdown">
        <span class="el-dropdown-link">
          {{userInfo}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <!-- 下拉菜单 -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
          <el-dropdown-item @click.native="modifypass">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <!-- 主题区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside class="aside" width="300px">
        <z-aside />
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
</template>

<script>
import { setUserState } from "@/store/CONST";
import ZCenter from "@/components/content/z-center/z-center";
import ZAside from "@/view/super/children/z-aside"
import request from "@/services/request";
export default {
  name: "super",
  components: {
    ZCenter,
    ZAside
  },
  data() {
    return {

    }
  },
  methods: {
    //退出
    logOut() {
      sessionStorage.clear();
      this.$store.commit(setUserState, { isLogin: false });
      this.$router.replace("/login");
      // console.log(123123)
    },
    // 修改密码
    modifypass() {
      // console.log(123)
      this.$router.push("/super/modifypass")
    },
  },
  computed:{
    // 用户信息展示
    userInfo() {
      return `${this.$store.state.userInfo.stu_number}${this.$store.state.userInfo.stu_name}`;
    }
  }
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
.title{
  color:#fff;
}
</style>