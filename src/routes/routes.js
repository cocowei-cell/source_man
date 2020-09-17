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
    name:"losspass",
    path: "/losspass",
    component: () => import("@/view/losspass/losspass")
  },
  {
    name: "index",
    path: "/index",
    redirect:'/index/submit',
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
      {
        path: "submit",
        name: "submit",
        component: () => import("@/view/index/children/z-submit"),
      }
    ],
  },
];

/* 
  <p class="submit_title">请选择提交的学期</p>
  <el-select v-model="time" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item._id"
              :value="item.time"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
*/