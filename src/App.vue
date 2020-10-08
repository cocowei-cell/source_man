<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { setUserState } from "@/store/CONST";
export default {
  name: "App",
  components: {},
  /* 
      页面刚创建时候让其返回登录页面，因为其刷新后会造成Vuex初始化，造成一些功能出现异常
   */
  created() {
    sessionStorage.clear();
    this.$store.commit(setUserState, {});
    this.$router.replace("/login");
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-width: 1106px;
}

.fl {
  float: left !important;
}

.fr {
  float: right !important;
}

.clearfix {
  display: block;
  content: "";
  clear: both;
}
.el-loading-text {
  font-size: 18px !important;
}
.btn_refresh {
  margin-left: 10px !important;
}

</style>
