<template>
  <div class="container">
    <Layout class="layout">
      <Sider class="side-bar" :style="{height: 'calc(100vh - 35px)', background: '#fff', overflow: 'auto'}" ref="side" :collapsed-width="78">
        <Menu active-name="1-2" theme="light" width="auto" @on-select="onSelect">
          <div class="user-icon">
            <div class="user-img">
              <img :src="userInfo.avatar">
            </div>
            <p>{{userInfo.name}}</p>
          </div>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-person" size="24"></Icon>
              <span>个人信息</span>
            </template>
            <menu-item name="MyInfo">个人信息</menu-item>
            <menu-item name="myAddress">我的收货地址</menu-item>
            <menu-item name="addAddress">添加收货地址</menu-item>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
                <Icon type="ios-paper" size="24"></Icon>
                <span>订单</span>
            </template>
            <menu-item name="myOrder">我的订单</menu-item>
          </Submenu>
<!--          <Submenu name="3">-->
<!--            <template slot="title">-->
<!--                <Icon type="ios-cart" size="24"></Icon>-->
<!--                <span>购物车</span>-->
<!--            </template>-->
<!--            <menu-item name="myShoppingCart">我的购物车</menu-item>-->
<!--          </Submenu>-->
          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-pricetag" size="24"></Icon>
              <span>优惠券</span>
            </template>
            <menu-item name="myCoupon">我的优惠券</menu-item>
          </Submenu>
        </Menu>
      </Sider>
      <Layout class="layout">
        <Header :style="{background: '#fff'}">
          <h2>{{activeTitle}}</h2>
        </Header>
        <content class="content">
          <transition mode="out-in">
            <router-view></router-view>
          </transition>
        </content>
        <Footer class="layout-footer-center">2020 &copy; vigo</Footer>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { getCustomerInfo } from '@/api/customer'
export default {
  name: 'Home',
  data () {
    return {
      activeTitle: '我的订单',
      avatar: null,
      bar: {
        'myAddress': '我的收货地址',
        'addAddress': '添加收货地址',
        'myOrder': '我的订单',
        'myShoppingCart': '我的购物车'
      },
      userInfo: {}
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    onSelect (name) {
      this.activeTitle = this.bar[name]
      this.$router.push(`/home/${name}`)
    },
    getUserInfo () {
      getCustomerInfo().then(response => {
        this.userInfo = response.data
      })
    }
  },
  store
}
</script>

<style scoped>
.side-bar a {
  color: #232323
}
.user-icon {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}
.user-icon span {
  font-size: 96px
}
.user-img {
  margin-bottom: 15px;
  width: 96px;
  height: 96px;
  border-radius: 48px;
  overflow: hidden
}
.user-img img{
  width: 100%
}
.content {
  margin: 15px;
  background-color: #fff;
  padding: 15px
}
.layout-footer-center {
  padding: 0px 15px;
  padding-bottom: 15px;
  text-align: center
}
</style>
