import Vue from "vue"
import App from "./App.vue"

// import "normalize.css"
import "lib-flexible/flexible.js"

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = binding.value
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount("#app")