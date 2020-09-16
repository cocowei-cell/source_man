<template>
  <div>
    <div class="auth_admin" v-if="!isOpen">
      <el-alert
        class="alerts"
        title="提示"
        type="info"
        description="管理员未开启审核权限"
        show-icon
        :closable="false"
      >
      </el-alert>
    </div>
    <div class="user_submit" v-else>
      我是提交页面哈哈
    </div>
  </div>
</template>

<script>
export default {
  name: "z-submit",
  methods: {},
  computed: {
    isOpen() {
      return this.$store.state.isOpen;
    },
  },
};
</script>
<style scoped>
.auth_admin {
  width: 600px;
  margin: 0 auto;
  margin-top: 15px;
}
</style>