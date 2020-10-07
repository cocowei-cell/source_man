/**
 * @description: 获取二级联动数据
 * @param {type}
 * @return {type}
 */
import request from "@/services/request";
export default {
  data() {
    return {
      collegeData: [],
      college:""
    };
  },
  methods: {
    // 获取二级联动学院与专业数据
    async getCollegeData() {
      let res = await request({
        url: "/api/others/getcolleges",
      });
      if (res.code == 200) {
        this.collegeData = res.data;
      }
    },
  },
  created() {
    this.getCollegeData();
  },
};
