import "./assets/css/reset.scss";

import Vue from "vue";
import VueTouch from "vue-touch";
Vue.use(VueTouch, { name: "v-touch" });

import App from "./App";
import store from "./store";

Vue.config.productionTip = false;

Vue.filter("formatNum", function(num) {
  return num.toString().split("").reverse().reduce((prev, cur, index) => {
    return (index % 3 ? cur : (cur + ",")) + prev;
  });
});

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");

let proxyVue = new Vue();
Vue.prototype.proxyVue = proxyVue;
