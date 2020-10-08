/**
 * @description: 提交页面混入 获取表单项目代码
 * @param {type}
 * @return {type}
 */
import request from "@/services/request";
export default {
  methods: {
    //获取表单项目 也仍然采取缓存策略
    async getInfo() {
      let res = await request({
        url: "/api/others/getitems",
      });
      if (res.code == 200) {
        //添加到submitInfo中去
        this.addToInfo(res.result);
      } else {
        this.$message.error(res.msg);
      }
    },
  },
};
