<template>
  <div class="box">
    <div class="nav">
      <ul class="location">
        <li>
          <Dropdown  placement="bottom-start">
            <a href="javascript:void(0)">
              <Icon type="ios-location" class="icon"></Icon>
            </a>
          </Dropdown>
        </li>
      </ul>
      <ul class="detail">
        <li class="first" v-show="!userInfo.name">
          你好，请<router-link to="/login">登录 <Icon type="person"></Icon></router-link> |<span class="text-color-red"><router-link to="/SignUp">免费注册 <Icon type="person-add"></Icon></router-link></span>
        </li>
        <li v-show="!!userInfo.name">
          <Dropdown>
            <p class="username-p">
              <Avatar :src="userInfo.avatar" size="small" /><span class="username">{{userInfo.name}} </span>
            </p>
            <DropdownMenu slot="list">
                <div class="my-page">
                  <div class="my-info" @click="myInfo">
                    <p>我的主页</p>
                  </div>
                  <div class="sign-out" @click="signOutFun">
                    <p>退出登录</p>
                  </div>
                </div>
            </DropdownMenu>
          </Dropdown>
        </li>
        <li>
          <Dropdown placement="bottom-start" @on-visible-change="freshCartList">
            <a href="javascript:void(0)">
              <Icon type="ios-cart-outline"></Icon> 购物车
            </a>
            <DropdownMenu slot="list">
              <div class="shopping-cart-null" v-show="cartList.length <= 0">
                <Icon type="ios-cart-outline" class="cart-null-icon"></Icon>
                <span>你的购物车没有空空哦</span>
                <span>赶快去添加商品吧~</span>
              </div>
              <div class="shopping-cart-list" v-show="cartList.length > 0">
                <div class="shopping-cart-box" v-for="(item,index) in cartList" v-if="index < 6" :key="index">
                  <div class="shopping-cart-img">
                    <img :src="item.coverImg">
                  </div>
                  <div class="shopping-cart-info">
                    <div class="shopping-cart-title">
                      <p>{{item.spuName.substring(0, 22)}}...</p>
                    </div>
                    <div class="shopping-cart-detail">
                      <p>
                        数量:
                        <span class="shopping-cart-text">
                          {{item.quantity}}
                        </span>
                        价钱:
                        <span class="shopping-cart-text">
                          {{item.price}}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="go-to-buy">
                  <Button type="error" size="small" @click="goToCart">
                    查看我的购物车
                  </Button>
                </div>
              </div>
            </DropdownMenu>
          </Dropdown>
        </li>
        <li><router-link to="/home/myOrder">我的订单</router-link></li>
        <li><router-link to="/">网站导航</router-link></li>
        <li><router-link to="/">商城首页</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapState, mapActions } from 'vuex'
import {fetchCartList} from '@/api/cart'
import { getCustomerInfo } from '@/api/customer'
export default {
  name: 'M-Header',
  created () {
    this.isLogin()
    this.getCartList()
    this.getUserInfo()
  },
  data () {
    return {
      cartList: [],
      customerInfo: {}
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapActions(['logout', 'isLogin']),
    goToCart () {
      this.$router.push('/shoppingCart')
    },
    myInfo () {
      this.$router.push('/home')
    },
    signOutFun () {
      this.logout().then(response => {
        this.$router.push('/')
      })
    },
    getCartList () {
      fetchCartList().then(response => {
        this.cartList = response.data
      })
    },
    freshCartList () {
      this.getCartList()
    },
    getUserInfo () {
      getCustomerInfo().then(response => {
        this.customerInfo = response.data
      })
    }
  },
  store
}
</script>

<style scoped>
.box {
  width: 100%;
  height: 35px;
  background-color: #e3e4e5
}
.nav {
  margin: 0% auto;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between
}
.nav ul {
  list-style: none
}
.nav li {
  float: left;
  font-size: 14px;
  line-height: 35px;
  margin-right: 15px;
  font-weight: bold
}
.nav a {
  text-decoration: none;
  color: #999999;
  padding-left: 15px;
  border-left: 1px solid #ccc;
  cursor: pointer
}
.location a {
  border-left: none
}
.nav a:hover {
  color: #d9534f
}
.location {
  color: #999999
}
.icon {
  color: #d9534f
}
.first {
  color: #999999
}
.first a:first-child {
  padding-left: 3px;
  border-left: none
}
.city {
  padding: 10px 15px
}
.city-item {
  font-weight: bold;
  cursor: pointer;
  padding: 5px
}
.city-item:hover {
  color: #d9534f
}
.person-icon {
  color: #d9534f;
  background-color:  #f0cdb2
}
.username {
  color: #999999
}
.shopping-cart-list {
  padding: 3px 15px
}
.shopping-cart-box {
  margin: 8px 0px;
  margin-top: 15px;
  padding-bottom: 15px;
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px #ccc dotted
}
.shopping-cart-box:first-child {
  margin-top: 8px
}
.shopping-cart-img {
  margin-right: 15px;
  width: 40px;
  height: 40px
}
.shopping-cart-img img {
  width: 100%
}
.shopping-cart-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: space-between;
  width: 200px;
  overflow: hidden;
  font-size: 12px;
  line-height: 20px;
  color: #999999
}
.shopping-cart-detail {
  color: #999999
}
.shopping-cart-text {
  color: #ccc
}
.go-to-buy {
  display: flex;
  justify-content: flex-end
}
.shopping-cart-null {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center
}
.cart-null-icon {
  font-size: 38px;
  margin-bottom: 15px
}
.shopping-cart-null span {
  color: #999999;
  font-size: 12px;
  line-height: 16px
}
.username-p {
  cursor: pointer
}
.my-page {
  padding: 3px 5px;
  width: 180px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center
}
.my-page a {
  margin: 0px;
  padding: 0px;
  border: none
}
.my-info {
  padding: 5px;
  width: 50%;
  height: 100%;
  text-align: center;
  cursor: pointer
}
.my-info:hover {
  box-shadow: 0px 0px 5px #ccc
}
.my-info i {
  font-size: 28px
}
.my-info p {
  font-size: 12px
}
.sign-out {
  padding: 5px;
  width: 50%;
  height: 100%;
  text-align: center;
  cursor: pointer
}
.sign-out:hover {
  box-shadow: 0px 0px 5px #ccc
}
.sign-out i {
  font-size: 28px
}
.sign-out p {
  font-size: 12px
}
</style>
