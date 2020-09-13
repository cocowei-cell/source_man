/* 
    路由
*/
export default [
  {
    path: "/",
    redirect: "/login",
  },
  {
    name: "login",
    path: "/login",
    component: () => import("@/view/login/login"), //登录路由
  },
  {
    name: "regester",
    path: "/regester",
    component: () => import("@/view/regester/regester"), //注册路由
  },
  {
    name:"losspass",
    path: "/losspass",
    component: () => import("@/view/losspass/losspass")
  },
  {
    name: "index",
    path: "/index",
    component: () => import("@/view/index/index"), //注册路由
    children: [
      {
        path: "mysource",
        name: "mysource",
        component: () => import("@/view/index/children/z-mysource"),
      },
      {
        path: "mysubmit",
        name: "mysubmit",
        component: () => import("@/view/index/children/z-mysubmit"),
      },
      {
        path: "modifypass",
        name: "modyfypass",
        component: () => import("@/view/index/children/z-modifypass"),
      },
    ],
  },
];
