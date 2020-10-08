import Vue from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./store";
import ElementUI from "element-ui";
import FastClick from "fastclick";
FastClick.attach(document.body);
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
