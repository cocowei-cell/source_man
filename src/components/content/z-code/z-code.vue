<template>
  <div class="code_">
    <img
      class="img"
      @click="refresh"
      :src="codeURL"
      alt="验证码"
      ref="imgCodeRef"
    />
  </div>
</template>

<script>
import request from "@/services/request";
import config from "@/config";
export default {
  name: "z-code",
  data() {
    return {
      codeURL: config.mainURL + "/api/others/getcode",
    };
  },
  methods: {
    refresh() {
      this.$refs.imgCodeRef.src = `${this.codeURL}?t=${Math.random()}`;
    },
    async authCode(code) {
      let res = await request({
        url: "/api/others/authcode",
        method: "POST",
        withCredentials: true,
        data: {
          code,
        },
      });
      if (res.code == 400) {
        this.refresh();
        return false;
      } else {
        return true;
      }
    },
  },
  // 挂载到页面上进行重新获取验证码
  mounted() {
    this.refresh();
  },
};
</script>
<style scoped>
.code_ {
  display: inline-block;
  cursor: pointer;
  line-height: 40px;
  height: 40px;
  border: 1px solid #ccc;
  vertical-align: middle;
  border-radius: 4px;
  margin-top: -2px;
  margin-left: 20px;
}
.img {
  width: 100%;
  height: 100%;
  display: inline-block;
}
</style>