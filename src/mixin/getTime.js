/**
 * @description: 获取审核时间
 * @param {type}
 * @return {type}
 */
import request from "@/services/request";
export default {
  data() {
    return {
      waiting: false,
      time: [],
      selectTime: "",
    };
  },
  methods: {
    //获取审核时间
    async getTime() {
      let res = await request({
        url: "/api/score/gettimes",
      });
      if (res.code == 200) {
        let time = res.time;
        // 分隔年
        let finalData = [];
        time.forEach((v) => {
          finalData.push({
            time: v.time.split("年")[0] + "年",
            _id: v._id,
          });
        });
        this.time = finalData;
        this.selectTime = finalData[0].time;
      }
      this.waiting = false;
    },
  },
  created() {
    this.getTime();
  },
};
