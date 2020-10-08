<template>
  <div class="header">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      active-text-color="#409EFF"
      text-color="#606266"
    >
      <el-menu-item index="0" title="素质分审核系统" class="fl title"
        >审核系统 | v0.0.2</el-menu-item
      >
      <el-submenu index="1" class="userName fr">
        <template slot="title">{{ username }}</template>
        <el-menu-item index="1-1">退出</el-menu-item>
        <el-menu-item index="1-2">修改密码</el-menu-item>
      </el-submenu>

      <el-menu-item index="2" class="fr" title="查看你的分数"
        >我的分数</el-menu-item
      >
      <el-menu-item index="3" class="fr" title="查看你的提交"
        >我的提交</el-menu-item
      >
      <el-menu-item index="4" class="fr" title="提交你的分数"
        >提交审核</el-menu-item
      >
    </el-menu>
  </div>
</template>

<script>
import { setUserState } from "@/store/CONST";
export default {
  name: "z-header",
  methods: {
    //处理选择的选项
    handleSelect(key, keyPath) {
      //key是以1 2 3 1-1 等标号进行排序
      switch (key) {
        case "1-1":
          sessionStorage.clear();
          this.$store.commit(setUserState, { isLogin: false });
          this.$router.replace("/login");
          break;
        //修改密码
        case "1-2":
          this.$router.push("/index/modifypass");
          break;
        //我的分数
        case "2":
          this.$router.push("/index/mysource");
          break;
        //我的提交
        case "3":
          this.$router.push("/index/mysubmit");
          break;
        //提交页面
        case "4":
          this.$router.push("/index/submit");
          break;
      }
    },
  },
  computed: {
    username() {
      return `${this.$store.state.userInfo.stu_number}${this.$store.state.userInfo.stu_name}`;
    },
    //跳转到对应的页面，并且对应的选项处于active状态
    activeIndex() {
      return this.$store.state.headerIndex;
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

.title {
  color: #40b8ff !important;
  font-size: 23px;
  margin-left: 15%;
  border-bottom: none !important;
}
</style>