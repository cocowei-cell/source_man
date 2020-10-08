/*
 * @Descripttion:
 * @Author: zzz
 * @Date: 2020-09-02 12:53:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-08 17:48:33
 */
import Vue from "vue";
import Vuex from "vuex";
import { setUserState, SETSTUNUMBER } from "./CONST"; //常量
import request from "@/services/request";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: false, //是否登录
    userInfo: {
      stu_number: "",
      stu_name: "",
    }, //用户信息
    token: "", //token值
    stuNumber: "", //忘记密码页面的学号
    index: 0,
    qqcode: "",
    headerIndex: "4",
    // 错误数量
    errorCount: 0,
    // 管理员是否开启
    isOpen: false,
  },
  mutations: {
    [setUserState](
      state,
      { isLogin, token, userInfo = { stu_number: "", stu_name: "" } }
    ) {
      state.isLogin = isLogin;
      state.token = token;
      state.userInfo = userInfo;
    },
    //设置学号
    [SETSTUNUMBER](state, payload) {
      state.stuNumber = payload;
    },
    setIndex(state, payload) {
      state.index = payload;
    },
    //设置qqcode
    setQQcode(state, payload) {
      state.qqcode = payload;
    },
    //设置首页的跳转链接
    setHeaderIndex(state, payload) {
      state.headerIndex = payload;
    },
    // 修改审核错误数量
    modifyErrorCount(state, payload) {
      state.errorCount = payload;
    },
    // 修改管理员权限是否开启
    modifyOpen(state, payload) {
      state.isOpen = payload;
    },
  },
  actions: {
    // 异步获取错误数量
    async getCountError({ commit }) {
      let res = await request({
        url: "/api/admin/getcount",
      });
      if (res.code == 200) {
        commit("modifyErrorCount", res.count);
      }
    },
  },
});

export default store;
