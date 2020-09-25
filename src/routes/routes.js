/* 
    路由
*/
export default [
  {
    path: "/",
    redirect: "/index/submit",
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
    name: "losspass",
    path: "/losspass",
    component: () => import("@/view/losspass/losspass"),
  },
  {
    name: "index",
    path: "/index",
    redirect: "/index/submit",
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
        component: () =>
          import("@/components/content/z-modifypass/z-modifypass"),
      },
      {
        path: "submit",
        name: "submit",
        component: () => import("@/view/index/children/z-submit"),
      },
    ],
  },
  {
    name: "super",
    path: "/super",
    redirect:"/super/userinfo",
    component: () => import("@/view/super/super"), //超级管理员页面
    children: [
      {
        name: "modifypass",
        path: "modifypass",
        component: () =>
          import("@/components/content/z-modifypass/z-modifypass"),
      },
      {
        name: "userinfo",
        path: "userinfo",
        component: () =>
          import("@/view/super/children/z-userinfo"),
      },
      {
        name: "table",
        path: "table",
        component: () =>
          import("@/view/super/children/z-table"),
      },
    ],
  },
  {
    name: "404",
    path: "*",
    component: () => import("@/view/404"), //404页面
  },
];

