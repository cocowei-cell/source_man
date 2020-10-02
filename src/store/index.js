/*
 * @Descripttion:
 * @Author: zzz
 * @Date: 2020-09-02 12:53:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-02 16:57:36
 */
import Vue from "vue";
import Vuex from "vuex";
import { setUserState, SETSTUNUMBER } from "./CONST"; //常量
import request from "@/services/request"
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: false, //是否登录
    userInfo: {}, //用户信息
    token: "", //token值
    stuNumber: "", //忘记密码页面的学号
    index: 0,
    qqcode: "",
    headerIndex: "4",
    errorCount: 0,
  },
  mutations: {
    [setUserState](state, { isLogin, token, userInfo }) {
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
    modifyErrorCount(state, payload) {
      state.errorCount = payload;
    },
  },
  actions: {
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
