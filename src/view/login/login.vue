<!--
 * @Descripttion: 
 * @Author: zzz
 * @Date: 2020-09-02 13:19:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-27 22:29:20
-->
<template>
  <div class="login">
    <z-header class="header-login" title="SPAd单页面" />
    <z-tabs class="login-form" />
  </div>
</template>

<script>
import ZHeader from "@/components/content/header/Header";
import ZTabs from "./children/el-content/z-content";

export default {
  name: "login",
  components: {
    ZHeader,
    ZTabs,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  // background: url("../../assets/img/bg1.jpg") no-repeat;
  background-size: 100% 100%;
  background-position: left top;
  background-attachment: fixed;
}

.header-login {
  color: #409eff;
  padding-top: 120px;
}
</style>
