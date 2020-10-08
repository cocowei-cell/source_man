/**
 * @description: 获取管理员是否开启审核
 * @param {type}
 * @return {type}
 */
import request from "@/services/request";
export default {
  data() {
    return {
      isOpenAdmin: false,
    };
  },
  methods: {
    async getOpen() {
      let res = await request({
        url: "/api/others/getisopen?t=" + Math.random(),
      });
      this.isOpenAdmin = false;
      this.isOpenAdmin = res.isOpen;
      this.$store.commit("modifyOpen", res.isOpen);
    },
  },
  created() {
    this.getOpen();
  },
  watch:{
    "$store.state.isOpen": {
      handler(newVal) {
        this.isOpenAdmin = newVal;
      },
      deep: true,
      immediate: true,
    },
  }
};
