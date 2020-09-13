<!--
 * @Descripttion: 
 * @Author: zzz
 * @Date: 2020-09-02 13:19:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-13 09:31:22
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
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  // background: url("https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3511244101,2873025970&fm=26&gp=0.jpg")
  // no-repeat;
  background-size: 100% 100%;
  background-position: left top;
  background-attachment: fixed;
}

.header-login {
  color: #409EFF;
  padding-top: 120px;
}
</style>
