import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
const Login = resolve => require(['@/components/Login'], resolve)
const SignUp = resolve => require(['@/components/SignUp'], resolve)
const CheckPhone = resolve => require(['@/components/signUp/CheckPhone'], resolve)
const InputInfo = resolve => require(['@/components/signUp/InputInfo'], resolve)
const SignUpDone = resolve => require(['@/components/signUp/SignUpDone'], resolve)
const GoodsList = resolve => require(['@/components/GoodsList'], resolve)
const GoodsDetail = resolve => require(['@/components/GoodsDetail'], resolve)
const ShoppingCart = resolve => require(['@/components/ShoppingCart'], resolve)
const Order = resolve => require(['@/components/Order'], resolve)
const Pay = resolve => require(['@/components/Pay'], resolve)
const PayDone = resolve => require(['@/components/PayDone'], resolve)
const Freeback = resolve => require(['@/components/Freeback'], resolve)
const Home = resolve => require(['@/components/Home'], resolve)
const MyInfo = resolve => require(['@/components/home/MyInfo'], resolve)
const MyAddress = resolve => require(['@/components/home/MyAddress'], resolve)
const AddAddress = resolve => require(['@/components/home/AddAddress'], resolve)
const MyOrder = resolve => require(['@/components/home/MyOrder'], resolve)
const OrderDetail = resolve => require(['@/components/home/OrderDetail'], resolve)
const MyShoppingCart = resolve => require(['@/components/home/MyShoppingCart'], resolve)
const MyCoupon = resolve => require(['@/components/home/MyCoupon'], resolve)
const Merchant = resolve => require(['@/components/Merchant'], resolve)

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/', // 首页
    name: 'Index',
    component: Index
  },
  {
    path: '/Login', // 登录
    name: 'Login',
    component: Login
  },
  {
    path: '/SignUp', // 注册
    name: 'SignUp',
    component: SignUp,
    children: [
      {
        path: '/',
        name: 'index',
        component: CheckPhone
      },
      {
        path: 'checkPhone',
        name: 'CheckPhone',
        component: CheckPhone
      },
      {
        path: 'inputInfo',
        name: 'InputInfo',
        component: InputInfo
      },
      {
        path: 'signUpDone',
        name: 'SignUpDone',
        component: SignUpDone
      }
    ]
  },
  {
    path: '/goodsList', // 商品列表
    name: 'GoodsList',
    component: GoodsList
  },
  {
    path: '/goodsDetail', // 商品详情
    name: 'GoodsDetail',
    component: GoodsDetail
  },
  {
    path: '/shoppingCart', // 详情
    name: 'ShoppingCart',
    component: ShoppingCart
  },
  {
    path: '/order', // 订单页面
    name: 'Order',
    component: Order
  },
  {
    path: '/pay', // 支付页面
    name: 'Pay',
    component: Pay
  },
  {
    path: '/payDone', // 支付成功页面
    name: 'PayDone',
    component: PayDone
  },
  {
    path: '/freeback', // 反馈页面
    name: 'Freeback',
    component: Freeback
  },
  {
    path: '/home', // 主页
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'HomeIndex',
        component: MyOrder
      },
      {
        path: 'myInfo',
        name: 'MyInfo',
        component: MyInfo
      },
      {
        path: 'myAddress',
        name: 'MyAddress',
        component: MyAddress
      },
      {
        path: 'addAddress',
        name: 'AddAddress',
        component: AddAddress
      },
      {
        path: 'myOrder',
        name: 'MyOrder',
        component: MyOrder
      },
      {
        path: '/orderDetail', // 订单详情页面
        name: 'OrderDetail',
        component: OrderDetail
      },
      {
        path: 'myShoppingCart',
        name: 'MyShoppingCart',
        component: MyShoppingCart
      },
      {
        path: 'myCoupon',
        name: 'MyCoupon',
        component: MyCoupon
      }
    ]
  },
  {
    path: '/merchant',
    name: 'Merchant',
    component: Merchant
  },
  {
    path: '/shoppingCart', // 详情
    name: 'ShoppingCart',
    component: ShoppingCart
  }
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})
