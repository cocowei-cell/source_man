/*
 * @Descripttion:
 * @Author: zzz
 * @Date: 2020-09-02 12:53:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-16 23:24:29
 */
import Vue from "vue";
import Vuex from "vuex";
import { setUserState, SETSTUNUMBER } from "./CONST"; //常量
import request from "@/services/request";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLogin: false, //是否登录
    userInfo: {}, //用户信息
    token: "", //token值
    stuNumber: "", //忘记密码页面的学号
    index: 0,
    qqcode: "",
    isOpen: false,
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
    setOpen(state, payload) {
      state.isOpen = payload;
    },
  },
  actions: {
    //获取网站是否开启
    async isOpen({ commit }) {
      let res = await request({
        url: "/api/others/getopen",
      });
      commit("setOpen", res.isOpen);
    },
  },
  getters: {},
});

export default store;
