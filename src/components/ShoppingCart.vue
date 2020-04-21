<template>
  <div class="cart_info">
    <div class="mycart w990 mt10 bc">
      <h2><span>我的购物车</span></h2>
      <table>
        <thead>
        <tr>
          <th class="col1">商品名称</th>
          <th class="col2">商品信息</th>
          <th class="col3">单价</th>
          <th class="col4">数量</th>
          <th class="col5">小计</th>
          <th class="col6">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in cartList" :data="cartList" :key="index">
          <td class="col1"><a href="javascript:void(0);"><img :src="item.coverImg" alt=""/></a><strong><router-link :to="{path:'/goodsDetail', query:{ id: item.spuId}}">{{item.spuName}}</router-link></strong>
          </td>
          <td class="col2"><p v-for="(spec,index) in handleSpec(item.skuSpec)" :key="index">{{spec}}</p>
          </td>
          <td class="col3"><div class="promotion_type" v-if="item.promotionType !== 0">优惠：{{item.promotionType | promotionTypeFilter}}</div><div class="original_price" v-if="item.promotionType === 1">￥{{item.originalPrice.toFixed(2)}}</div><div>￥{{item.price.toFixed(2)}}</div></td>
          <td class="col4">
            <a href="javascript:;" @click="reduceCount(index)" class="reduce_num" :disabled="item.quantity===1"></a>
            <input type="text" name="amount" :value="item.quantity" class="amount"/>
            <a href="javascript:;" @click="addCount(index)" class="add_num"></a>
          </td>
          <td class="col5">￥<span>{{(item.price*item.quantity).toFixed(2)}}</span></td>
          <td class="col6"><a href="javascript:void(0);" @click="remove(index)">删除</a></td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="6">购物金额总计： <strong>￥ <span id="total" v-if="totalAmount !== null">{{totalAmount.toFixed(2)}}</span></strong></td>
        </tr>
        </tfoot>
      </table>
      <div class="cart_btn bc mt10">
        <router-link to="/goodsList" class="continue">继续购物</router-link>
        <router-link :to="{path:'/order', query:{ flashFlag: '0'}}" class="checkout" v-show="cartList.length > 0">结 算</router-link>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {fetchCartList, updateQuantity, removeCart} from '@/api/cart'

export default {
  data () {
    return {
      cartList: [],
      totalAmount: null,
      reduceAmount: null,
      showBalanceButton: null
    }
  },
  created () {
    this.getCartList()
    this.calculateTotal()
  },
  activated () {
  },
  computed: {},
  filters: {
    promotionTypeFilter (value) {
      if (value === 0) {
        return ''
      } else if (value === 1) {
        return '限时优惠'
      } else if (value === 2) {
        return '满减'
      }
    }
  },
  methods: {
    getCartList () {
      fetchCartList().then(response => {
        this.cartList = response.data
        this.calculateTotal()
      })
    },
    handleSpec (value) {
      if (value === null) {
        return []
      } else {
        let attr = JSON.parse(value)
        let result = []
        for (let i = 0; i < attr.length; i++) {
          let temp = ''
          temp += attr[i].key
          temp += ':'
          temp += attr[i].value
          temp += ''
          result.push(temp)
        }
        return result
      }
    },
    addCount (index) {
      updateQuantity({id: this.cartList[index].id, quantity: this.cartList[index].quantity + 1})
        .then(() => {
          this.cartList[index].quantity = this.cartList[index].quantity + 1
        })
      this.calculateTotal()
    },
    reduceCount (index) {
      if (this.cartList[index].quantity === 1) {
        return
      }
      updateQuantity({id: this.cartList[index].id, quantity: this.cartList[index].quantity - 1}).then(() => {
        this.cartList[index].quantity = this.cartList[index].quantity - 1
      })
      this.calculateTotal()
    },
    remove (index) {
      removeCart({id: this.cartList[index].id}).then(() => {
        this.getCartList()
      })
    },
    calculateTotal () {
      let total = 0
      for (let i = 0; i < this.cartList.length; i++) {
        total += this.cartList[i].price * this.cartList[i].quantity
      }
      this.totalAmount = total
    }
  }
}
</script>
<style scoped>
.w990 {
  width: 70%;
}
.mt10 {
  margin-top: 10px;
}
.bc {
  margin-left: auto;
  margin-right: auto;
}
.mycart {
  overflow: auto;
}
.mycart h2 {
  width: 190px;
  height: 50px;
  background: url("../../static/img/cart_001.gif") 0 0 no-repeat;
}
.mycart h2 span {
  display: none;
}
.mycart table {
  width: 100%;
  border: 1px solid #E7E3E7;
  border-top: 2px solid #CE0000;
  background: #FFFDEE;
  color: #666;
}
.mycart thead {
  height: 36px;
  line-height: 36px;
  background: url("../../static/img/sort_bg.png") 0 0 repeat-x;
}
.mycart th {
  text-align: center;
  font-weight: bold;
}
.mycart tbody td {
  border-bottom: 1px solid #E7E3E7;
}
.mycart td {
  text-align: center;
}
.mycart .col1 {
  width: 40%;
}
.mycart .col2 {
  width: 20%;
}
.mycart .col3 {
  width: 10%;
}
.mycart .col4 {
  width: 10%;
}
.mycart .col5 {
  width: 10%;
}
.mycart .col6 {
  width: 10%;
}
.mycart tbody img {
  width: 80px;
  height: 80px;
  border: 1px solid #eee;
  vertical-align: middle;
  float: left;
  display: inline;
  margin-right: 10px;
}
.mycart td.col1 {
  text-align: left;
  padding: 10px 0 10px 10px;
}
.mycart td.col1 strong {
  font-weight: normal;
  display: inline-block;
  float: left;
  width: 70%;
  margin-top: 5px;
}
.mycart td.col1 strong a {
  color: #666666;
}
.mycart td.col2 {
  text-align: left;
  padding-left: 60px;
}
.mycart td.col4 {
  padding-left: 25px;
}
.mycart .amount {
  float: left;
  font-size: 12px;
  display: inline;
  width: 30px;
  height: 16px;
  padding: 2px;
  border: 1px solid #ccc;
  text-align: center;
  margin: 3px 4px 0px;
}
.reduce_num {
  float: left;
  display: inline;
  width: 15px;
  height: 15px;
  border: 0;
  padding: 0;
  margin: 0;
  background: url("../../static/img/newicon.png") -216px -190px;
  position: relative;
  top: 4px;
}
.add_num {
  float: left;
  display: inline;
  width: 15px;
  height: 15px;
  border: 0;
  padding: 0;
  margin: 0;
  background: url("../../static/img/newicon.png") -232px -190px;
  position: relative;
  top: 4px;
}
.reduce_num:hover {
  background-position: -216px -206px;
}
.add_num:hover {
  background-position: -232px -206px;
}
.mycart td.col5 {
  color: #e4393c;
  font-weight: bolder;
  font-family: Verdana, Arial;
}
.mycart tfoot tr {
  height: 36px;
  line-height: 36px;
  background: url("../../static/img/sort_bg.png") 0 0 repeat-x;
}
.mycart .col6 a {
  color: #005aa0;
}
.mycart tfoot td {
  text-align: right;
  padding-right: 30px;
}
.mycart tfoot td strong {
  color: #e4393c;
  font-weight: bolder;
  font-family: Verdana, Arial;
}
.cart_btn {
  height: 36px;
  margin-right: 0px;
}
.cart_btn .checkout {
  width: 135px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  float: right;
  display: inline-block;
  background: url("../../static/img/btn_check.jpg") 0 0 no-repeat;
}
.cart_btn .checkout:hover {
  text-decoration: none;
  background-position: 0 -36px;
  color: #fff;
}
.cart_btn .continue {
  width: 94px;
  height: 36px;
  float: left;
  display: inline;
  line-height: 36px;
  text-align: center;
  background: url("../../static/img/btn_continue.png") 0 0 no-repeat;
}
.cart_btn .continue:hover {
  text-decoration: none;
  background-position: 0 -36px;
}
.cart_info {
  font-size: 14px;
}
.original_price {
  text-decoration: line-through;
}
.promotion_type {
  font-size: 12px;
  color: #f90013;
}
</style>
