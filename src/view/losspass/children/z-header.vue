<template>
  <div class="header">
    <div class="container">
      <span class="fl"> 审核系统 | 重置密码 </span>
      <router-link class="fr login_loss" to="/login">登录</router-link>
    </div>
  </div>
</template>

<script>
import ZNav from "./z-nav";
export default {
  name: "z-header",
};
</script>
<style scoped>
.header {
  width: 100%;
  height: 60px;
  background-color: #409eff;
  line-height: 60px;
  color: #fff;
  user-select: none;
}

.container {
  width: 60%;
  margin: 0 auto;
}

.login_loss {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}
</style>