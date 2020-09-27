/**
 * @description: 后台管理和审核页面
 * @param {type} 
 * @return {type} 
 */
import { setUserState } from "@/store/CONST";
export default {
  methods:{
     //退出
     logOut() {
      sessionStorage.clear();
      this.$store.commit(setUserState, { isLogin: false });
      this.$router.replace("/login");
      // console.log(123123)
    },
    // 修改密码
    modifypass() {
      // console.log(123)
      this.$router.push("/super/modifypass")
    },
  },
  computed:{
    // 用户信息展示
    userInfo() {
      return `${this.$store.state.userInfo.stu_number}${this.$store.state.userInfo.stu_name}`;
    }
  }
}