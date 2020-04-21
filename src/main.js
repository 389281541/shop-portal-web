// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import { getToken } from '@/utils/auth'
const blackList = ['/', '/order', '/home/MyInfo', '/home/myAddress', '/home/addAddress', '/home/myOrder', '/home/myShoppingCart', '/home/myCoupon', '/shoppingCart'] // 重定向黑名单
Vue.use(iView)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  if (getToken()) {
    next()
  } else {
    if (blackList.indexOf(to.path) !== -1) {
      next('/login')
    } else {
      next()
    }
  }
})

router.afterEach(route => {
  iView.LoadingBar.finish()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
