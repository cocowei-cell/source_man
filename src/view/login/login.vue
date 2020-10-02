<!--
 * @Descripttion: 
 * @Author: zzz
 * @Date: 2020-09-02 13:19:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-29 13:33:15
-->
<template>
  <div class="login">
    <z-header class="header-login" title="素质分审核系统" />
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
