<template>
  <div class="z-tabs">
    <z-tabBar @normalShow="isAdmin=false" @adminShow="isAdmin=true"></z-tabBar>
    <div class="content">
      <login-el v-if="!isAdmin" />
      <login-admin v-else />
    </div>
  </div>
</template>

<script>
//TabBar
import ZTabBar from "../el-tab/z-tab";
//学生登录
import LoginEl from "../el-login/LoginEl";
//管理员登录页面
import LoginAdmin from "../el-admin/z-admin";
export default {
  name: "z-content",
  data() {
    return {
      isAdmin: false,
    };
  },
  components: {
    ZTabBar,
    LoginEl,
    LoginAdmin,
  },
};
</script>
<style scoped>
.z-tabs {
  width: 550px;
  margin: 0 auto;
  position: relative;
}

.content {
  margin-top:30px;
}
</style>