<template>
  <div class="code_">
    <img
      class="img"
      @click="refresh"
      src="http://localhost:3000/api/others/getcode"
      alt="验证码"
      ref="imgCodeRef"
    />
  </div>
</template>

<script>
import request from "@/services/request";
export default {
  name: "z-code",
  methods: {
    refresh() {
      this.$refs.imgCodeRef.src = `http://localhost:3000/api/others/getcode?t=${Math.random()}`;
    },

    /**
     * @description: 验证code是否合法
     * @param {String}
     * @return {Bolean}
     */
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
        this.refresh()
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