/*
 * @Descripttion:
 * @Author: zzz
 * @Date: 2020-09-02 12:53:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-23 18:51:04
 */
import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import routes from "./routes";
import auth from "../services/authToken/auth"; //验证token是否正确
Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
NProgress.configure({ showSpinner: true }); //显示等待圈圈
const router = new Router({
  mode: "history", //配置历史模式
  routes,
});

// 全局导航守卫添加Nprogress效果
// 进入路由前
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // console.log(to);
  let tokenTags = true;
  let adminTags = true;
  let superTags = true;
  let token = sessionStorage.getItem("token"); //取出token
  // 验证token合法性
  if (token) {
    let { code, role } = await auth(token);
    if (code !== 200) {
      sessionStorage.removeItem("token");
      tokenTags = false;
    } else if (role !== "super") {
      superTags = false;
    } else if (role !== "admin") {
      adminTags = false;
    }
  } else {
    tokenTags = false;
  }
  //路由保护首页，未登录不可以进入该路由
  if (to.path.includes("/index")) {
    if (tokenTags) return next();
    else return next("/login");
  }
  //路由保护管理员页面
  // console.log(to);
  if (to.path.includes("/admin")) {
    if (tokenTags) {
      if (adminTags) {
        return next();
      } else {
        return next("/login");
      }
    } else {
      return next("/login");
    }
  }
  // 路由保护超级管理员页面
  if (to.path.includes("/super")) {
    if (tokenTags) {
      if (superTags) {
        return next();
      } else {
        return next("/login");
      }
    } else {
      return next("/login");
    }
  }
  next();
});

// 进入路由后

router.afterEach(() => {
  NProgress.done();
});
//导出router对象
export default router;
