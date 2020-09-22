
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
      let items = sessionStorage.getItem("items");
      //如果不存在从服务器重新获取
      if (!items) {
        let res = await request({
          url: "/api/others/getitems",
        });
        if (res.code == 200) {
          //添加到submitInfo中去
          this.addToInfo(res.result);
          sessionStorage.setItem("items", JSON.stringify(res.result));
        } else {
          this.$message.error(res.msg);
        }
      } else {
        //有缓存
        let data = JSON.parse(sessionStorage.getItem("items"));
        this.addToInfo(data);
      }
    },
  },
};
