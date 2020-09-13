<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="#409EFF"
      text-color="#606266"
    >
      <el-submenu index="1" class="userName fr">
        <template slot="title">{{ username }}</template>
        <el-menu-item index="1-1">退出</el-menu-item>
        <el-menu-item index="1-2">修改密码</el-menu-item>
      </el-submenu>

      <el-menu-item index="2" class="fr">我的分数</el-menu-item>
      <el-menu-item index="3" class="fr">我的提交</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { setUserState } from "@/store/CONST";
export default {
  name: "z-header",
  data() {
    return {
      activeIndex: "2",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      switch (key) {
        case "2":
          this.$router.push("/index/mysource");
          break;
        case "3":
          this.$router.push("/index/mysubmit");
          break;
        case "1-1":
          sessionStorage.removeItem("token");
          this.$store.commit(setUserState, { isLogin: false });
          this.$router.replace("/login");
          break;
        case "1-2":
          this.$router.push("/index/modifypass");
          break;
      }
    },
  },
  computed: {
    username() {
      return `${this.$store.state.userInfo.stu_number}${this.$store.state.userInfo.stu_name}`;
    },
  },
};
</script>
</script>
<style scoped>
.userName {
  padding-right: 30px;
}
.el-menu-demo {
  user-select: none;
}
</style>