<template>
  <div class='order_info'>
    <div style='clear:both;'></div>
    <!-- 主体部分 start -->
    <div class='fillin w990 bc mt15'>
      <div class='fillin_hd'>
        <h2>确认订单信息</h2>
      </div>
      <div class='fillin_bd'>
        <!-- 收货人信息  start-->
        <div class='address'>
          <h3>收货人信息 <a href='javascript:;' id='address_modify' v-show="isAddressModify" @click="modifyAddress">[修改]</a></h3>
          <div class='address_info' v-show="isAddressModify">
            <p>{{selectAddress.receiverName}}&nbsp;&nbsp;{{selectAddress.phone}}</p>
            <p>{{selectAddress.province}}&nbsp;&nbsp;{{selectAddress.city}}&nbsp;&nbsp;{{selectAddress.district}}&nbsp;&nbsp;{{selectAddress.address}}</p>
          </div>
          <div class='address_select' v-show="!isAddressModify">
            <ul>
              <li :class="{'cur':index === selectedAddressIndex}" v-for="(item, index) in confirmOrder.customerAddressList" :key="index">
                <input type='radio' name='address' @click="handleChangeAddress(index)" :checked='index === selectedAddressIndex'/>{{item.receiverName}}&nbsp;&nbsp;{{item.province}}&nbsp;&nbsp;{{item.city}}&nbsp;&nbsp;{{item.district}}&nbsp;&nbsp;{{item.address}}&nbsp;&nbsp;{{item.phone}}
              </li>
              <a href='javascript:void(0);' class='confirm_btn' @click="confirmAddress()"><span>确认收货地址</span></a>
            </ul>
          </div>
        </div>
        <!-- 收货人信息  end-->
        <!-- 配送方式 start -->
        <div class='delivery'>
          <h3>送货方式 <a href='javascript:;' id='delivery_modify' @click="modifyDelivery()"  v-show="isDeliveryModify">[修改]</a></h3>
          <div class='delivery_info' v-show="isDeliveryModify">
            <p>{{selectDeliverMode.label}}</p>
          </div>
          <div class='delivery_select' v-show="!isDeliveryModify">
            <table>
              <thead>
              <tr>
                <th class='col1'>送货方式</th>
                <th class='col2'>运费</th>
                <th class='col3'>运费标准</th>
              </tr>
              </thead>
              <tbody>
              <tr :class="{'cur':selectDeliverMode.value === item.value}" v-for="(item,index) in deliverModeList" :key="index">
                <td><input type='radio' :value="item.value" name='delivery' @change="handleDeliverMode(index)" :checked='selectDeliverMode.value === item.value'/>{{item.label}}</td>
                <td>￥{{item.fee.toFixed(2)}}</td>
                <td>{{item.feeStandard}}</td>
              </tr>
              </tbody>
            </table>
            <a href='javascript:void(0);' class='confirm_btn' @click="confirmDelivery()"><span>确认送货方式</span></a>
          </div>
        </div>
        <!-- 配送方式 end -->
        <!-- 支付方式  start-->
        <div class='pay'>
          <h3>支付方式 <a href='javascript:;' id='pay_modify' @click="modifyPay" v-show="isPayModify">[修改]</a></h3>
          <div class='pay_info' v-show="isPayModify">
            <p>{{selelctPayMode.label}}</p>
          </div>
          <div class='pay_select' v-show="!isPayModify">
            <table>
              <tr :class="{'cur':selelctPayMode.value === item.value}" v-for="(item, index) in payModeList" :key="index">
                <td class='col1'><input type='radio' @change="handelPayMode(index)" :checked='selelctPayMode.value === item.value' :value="item.value" name='pay'/>{{item.label}}</td>
              </tr>
            </table>
            <a href='javascript:void(0);' class='confirm_btn' @click="confirmPay"><span>确认支付方式</span></a>
          </div>
        </div>
        <!-- 支付方式  end-->
        <!-- 商品清单 start -->
        <div class='goods'>
          <h3>商品清单</h3>
          <table>
            <thead>
            <tr>
              <th class='col0'>店铺</th>
              <th class='col1'>商品</th>
              <th class='col2'>规格</th>
              <th class='col3'>价格</th>
              <th class='col4'>数量</th>
              <th class='col5'>小计</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in confirmOrder.cartPromotionList" :key="index">
              <td class='col0'>{{item.shopName}}</td>
              <td class='col1'><a href="javascript:void(0);"><img :src="item.coverImg" alt=''/></a> <router-link :to="{path:'/goodsDetail', query:{ id: item.spuId}}" style="color: #666666">{{item.spuName}}</router-link>
              </td>
              <td class='col2'><p v-for="(spec,index) in handleSpec(item.skuSpec)" :key="index">{{spec}}</p></td>
              <td class='col3'>￥{{item.price.toFixed(2)}}</td>
              <td class='col4'>{{item.quantity}}</td>
              <td class='col5'><span>￥{{(item.price*item.quantity).toFixed(2)}}</span></td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td colspan='6'>
                <ul>
                  <li>
                    <span>{{totalQuantity}}件商品，总商品金额：</span>
                    <em>￥{{totalAmount.toFixed(2)}}</em>
                  </li>
                  <br/>
                  <li>
                    <span>促销优惠：</span>
                    <em>￥{{totalPromotionAmount.toFixed(2)}}</em>
                  </li>
                  <li v-if="confirmOrder.couponList.size > 0">
                    <span>
                      <select style="font-size:12px; color:#666666; height: 20px">
                        <option value="0" @click="handleCouponChange(0, null)">不使用优惠券</option>
                        <option :value ="item.amount" @click="handleCouponChange(item.amount, item.id)" v-for="(item, index) in confirmOrder.couponList" :key="index">{{item.name}}</option>
                      </select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;优惠券：</span>
                    <em>￥{{couponAmount.toFixed(2)}}</em>
                  </li>
                  <br/>
                  <li v-if="confirmOrder.recommendIntegration > 0">
                    <input type="checkbox" class="integration" :value="useIntegration" @change="handleIntegration"/><span style="font-size:12px; color:#666666; margin-bottom: 5px">使用{{confirmOrder.recommendIntegration}}积分</span>&nbsp;&nbsp;&nbsp;&nbsp;积分抵扣：
                    <em>￥{{totalIntegrationAmount.toFixed(2)}}</em>
                  </li>
                  <li>
                    <span>运费：</span>
                    <em>￥{{(confirmOrder.orderNum * deliverAmount).toFixed(2)}}</em>
                  </li>
                </ul>
              </td>
            </tr>
            </tfoot>
          </table>
        </div>
        <!-- 商品清单 end -->
      </div>
      <div class='fillin_ft'>
        <a @click="submit"><span>订单</span></a>
        <p>应付总额：<strong>￥{{(totalAmount-totalPromotionAmount-couponAmount-totalIntegrationAmount+deliverAmount).toFixed(2)}}元</strong></p>
      </div>
    </div>
    <!-- 主体部分 end -->
    <div style='clear:both;'></div>
  </div>
</template>
<script>
import Search from '@/components/Search'
import GoodsListNav from '@/components/nav/GoodsListNav'
import {generateConfirmOrder, generateOrder} from '@/api/order'
import {generateFlashConfirmOrder, generateFlashOrder, fetchPath} from '@/api/flash'
const defaultConfirmOrder = {
  totalAmount: 0,
  deliverAmount: 0,
  promotionAmount: 0,
  payAmount: 0,
  integrationRuleSetting: 0,
  cartPromotionList: [],
  customerAddressList: [],
  couponList: []
}
const defaultGenrateOrderParam = {
  couponId: null,
  addressId: null,
  payType: 0,
  deliverMode: 0,
  deliverFee: 0,
  useIntegration: 0
}
export default {
  name: 'Order',
  created () {
    this.flashFlag = this.$route.query.flashFlag
    this.generateConfirmOrder()
    this.selectDeliverMode = this.deliverModeList[0]
    this.selelctPayMode = this.payModeList[0]
  },
  data () {
    return {
      isAddressModify: true,
      isDeliveryModify: true,
      isPayModify: true,
      selectedAddressIndex: null,
      selectAddress: {receiverName: ''},
      selectDeliverMode: null,
      selelctPayMode: null,
      confirmOrder: Object.assign({}, defaultConfirmOrder),
      genrateOrderParam: Object.assign({}, defaultGenrateOrderParam),
      totalQuantity: null,
      totalAmount: null,
      totalPromotionAmount: null,
      totalIntegrationAmount: null,
      useIntegration: false,
      deliverAmount: null,
      couponAmount: 0,
      flashFlag: 0,
      deliverModeList: [
        {
          value: 0,
          label: '快递',
          fee: 0.00,
          feeStandard: '免费发顺丰、中通、圆通、申通、百世和韵达'
        },
        {
          value: 1,
          label: '中国邮政',
          fee: 20.00,
          feeStandard: '全国统一价'
        }
      ],
      payModeList: [
        {
          value: 0,
          label: '支付宝'
        },
        {
          value: 1,
          label: '微信'
        },
        {
          value: 2,
          label: '货到付款'
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    generateConfirmOrder () {
      if (this.flashFlag === '0') {
        generateConfirmOrder().then(response => {
          this.confirmOrder = response.data
          this.getDefaultAddress()
          this.calculteTotalAmount()
          this.totalIntegrationAmount = 0
          this.deliverAmount = 0
          this.couponAmount = 0
          this.selelctPayMode = this.payModeList[0]
        }).catch(() => {
          this.$router.push({path: '/'})
        })
      } else {
        generateFlashConfirmOrder().then(response => {
          this.confirmOrder = response.data
          this.getDefaultAddress()
          this.calculteTotalAmount()
          this.totalIntegrationAmount = 0
          this.deliverAmount = 0
          this.couponAmount = 0
          this.selelctPayMode = this.payModeList[0]
        }).catch(() => {
          this.$router.push({path: '/'})
        })
      }
    },
    modifyAddress () {
      this.isAddressModify = false
    },
    modifyDelivery () {
      this.isDeliveryModify = false
    },
    modifyPay () {
      this.isPayModify = false
    },
    confirmAddress () {
      this.isAddressModify = true
      console.log('this.isAddressModify' + this.isAddressModify)
    },
    confirmDelivery () {
      this.isDeliveryModify = true
    },
    confirmPay () {
      this.isPayModify = true
    },
    getDefaultAddress () {
      for (let i = 0; i < this.confirmOrder.customerAddressList.length; i++) {
        if (this.confirmOrder.customerAddressList[i].isDefault === 1) {
          this.selectedAddressIndex = i
          this.selectAddress = this.confirmOrder.customerAddressList[i]
        }
      }
    },
    handleChangeAddress (index) {
      this.selectedAddressIndex = index
      this.selectAddress = this.confirmOrder.customerAddressList[index]
      this.genrateOrderParam.addressId = this.selectAddress.id
    },
    handleDeliverMode (index) {
      this.selectDeliverMode = this.deliverModeList[index]
      this.genrateOrderParam.deliverMode = this.selectDeliverMode.value
      if (index === 0) {
        this.deliverAmount = 0
      } else {
        this.deliverAmount = 20
      }
    },
    handelPayMode (index) {
      this.selelctPayMode = this.payModeList[index]
      this.genrateOrderParam.payType = this.selelctPayMode.value
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
    submit () {
      this.genrateOrderParam.addressId = this.selectAddress.id
      this.genrateOrderParam.deliverMode = this.selectDeliverMode.value
      this.genrateOrderParam.payType = this.selelctPayMode.value
      this.genrateOrderParam.deliverFee = this.deliverAmount
      if (this.useIntegration) {
        this.genrateOrderParam.useIntegration = this.confirmOrder.recommendIntegration
      } else {
        this.genrateOrderParam.useIntegration = 0
      }
      if (this.flashFlag === '0') {
        generateOrder(this.genrateOrderParam).then(response => {
          let parentOrderNo = response.data
          this.$router.push({path: '/pay', query: {parentOrderNo: parentOrderNo}})
        })
      } else {
        fetchPath().then(response => {
          let path = response.data
          generateFlashOrder(path, this.genrateOrderParam).then(response => {
            let parentOrderNo = response.data
            this.$router.push({path: '/pay', query: {parentOrderNo: parentOrderNo}})
          })
        })
      }
    },
    calculteTotalAmount () {
      let quantity = 0
      let totalPrice = 0
      let totalPromotion = 0
      for (let i = 0; i < this.confirmOrder.cartPromotionList.length; i++) {
        quantity += this.confirmOrder.cartPromotionList[i].quantity
        totalPrice += this.confirmOrder.cartPromotionList[i].quantity * this.confirmOrder.cartPromotionList[i].price
        totalPromotion += this.confirmOrder.cartPromotionList[i].perReduceAmount * this.confirmOrder.cartPromotionList[i].quantity
      }
      this.totalQuantity = quantity
      this.totalAmount = totalPrice
      this.totalPromotionAmount = Math.ceil(totalPromotion)
    },
    handleIntegration () {
      this.useIntegration = !this.useIntegration
      if (this.useIntegration) {
        this.totalIntegrationAmount = this.confirmOrder.recommendIntegration / 100.0
        this.genrateOrderParam.useIntegration = this.confirmOrder.recommendIntegration
      } else {
        this.totalIntegrationAmount = 0
        this.genrateOrderParam.useIntegration = 0
      }
    },
    handleCouponChange (value, id) {
      this.couponAmount = value
      this.genrateOrderParam.couponId = id
    }
  },
  components: {
    Search,
    GoodsListNav
  }
}
</script>
<style scoped>
  .none{display:none;}
.w990 {
  width: 70%;
}
.bc{margin-left:auto;margin-right:auto;}
.mt15{margin-top:15px;}
.fillin_hd {
  height: 36px;
  line-height: 36px;
  background: url('../../static/img/sort_bg.png') 0 0 repeat-x;
  border: 1px solid #E7E3E7;
  /*border-top: 2px solid #CE0000;*/
  border-bottom: 0;
}
.fillin_hd h2 {
  padding-left: 10px;
  font-weight: 700;
  font-size: 16px;
  font-family: 'microsoft yahei';
  color: #444;
}
.fillin_bd {
  width: 100%;
  border: 1px solid #E7E3E7;
  border-width: 0 1px;
  padding: 0 15px;
  color: #666;
}
.address, .delivery, .pay, .receipt {
  width: 958px;
  padding: 10px 0;
  border-bottom: 1px dotted #ddd;
}
.goods {
  width: 100%;
  padding: 10px 0;
}
.fillin_bd h3 {
  font-size: 14px;
  font-weight: bold;
  height: 36px;
  line-height: 36px;
  color: #333;
}
.fillin_bd p {
  line-height: 20px;
}
.fillin_bd h3 a {
  font-size: 12px;
  font-weight: 100;
  color: #005aa0;
}
.address li {
  padding: 4px 0;
}
.address li a {
  color: #005aa0;
}
.address label {
  float: left;
  display: inline;
  width: 70px;
  position: relative;
  top: 5px;
}
.address label span {
  color: #c30;
  margin-right: 4px;
}
.address form li {
  padding: 5px 0;
}
.address .txt {
  width: 250px;
  height: 18px;
  padding: 3px;
  border: 1px solid #ccc;
}
.address input.address {
  width: 450px;
}
.address li.cur {
  background: #fff4d3;
}
.confirm_btn {
  display: inline-block;
  height: 30px;
  margin-top: 10px;
  background: url('../../static/img/btn_fillin.png') 0 0 no-repeat;
  padding-left: 30px;
  cursor: pointer;
}
.confirm_btn span {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  background: url('../../static/img/btn_fillin.png') right -30px no-repeat;
  padding-right: 30px;
  color: #fff;
  font-size: 14px;
  font-weight: bolder;
}
.confirm_btn:hover {
  background-position: 0 -60px;
}
.confirm_btn:hover span {
  background-position: 0 -90px;
}
.delivery_select table {
  width: 100%;
}
.delivery_select table td {
  padding: 4px 0;
}
.delivery_select .col1 {
  width: 35%;
}
.delivery_select .col2 {
  width: 15%;
}
.delivery_select .col3 {
  width: 50%;
}
.delivery_select .cur {
  background: #fff4d3;
}
.pay_select td {
  padding: 4px 0;
}
.pay_select .col1 {
  width: 20%;
}
.pay_select .col2 {
  width: 80%;
}
.pay_select table {
  width: 100%;
}
.pay_select .cur {
  background: #fff4d3;
}
.receipt_select li {
  padding: 4px 0;
}
.receipt_select .txt {
  width: 250px;
  height: 18px;
  padding: 3px;
  border: 1px solid #ccc;
}
/*radio效果修正*/
input[type='radio'] {
  position: relative;
  top: 2px;
  margin-right: 2px;
}
/*商品信息css*/
.goods table {
  width: 100%;
}
.goods thead {
  background: #ddd;
  height: 35px;
  line-height: 35px;
}
.goods thead th {
  text-align: center;
  font-weight: 500;
}
.goods tbody td {
  text-align: center;
  border-bottom: 1px dotted #E7E3E7;
}
.goods .last td {
  border-bottom: 0;
}
.goods .col0 {
  width: 20%;
}
.goods .col1 {
  width: 30%;
}
.goods .col2 {
  width: 20%;
}
.goods .col3 {
  width: 10%;
}
.goods .col4 {
  width: 10%;
}
.goods .col5 {
  width: 10%;
}
.goods tbody img {
  width: 80px;
  height: 80px;
  border: 1px solid #eee;
  vertical-align: middle;
  float: left;
  display: inline;
  margin-right: 10px;
}
.goods td.col1 {
  text-align: left;
  padding: 10px 0 10px 10px;
}
.goods td.col1 strong {
  display: inline-block;
  float: left;
  width: 280px;
  margin-top: 25px;
}
.goods td.col2 {
  text-align: left;
  padding-left: 60px;
}
.goods tfoot td {
  text-align: right;
  padding-top: 10px;
}
.goods tfoot li {
  line-height: 25px;
  clear: both;
}
.goods tfoot li span {
  width: 100px;
}
.goods tfoot li em {
  display: inline-block;
  width: 70px;
  text-align: right;
}
.fillin_ft {
  width: 100%;
  height: 50px;
  background: #f5f5f5;
  border: 1px solid #E7E3E7;
  border-top: 0;
  text-align: right;
}
.fillin_ft p {
  font-size: 16px;
  font-weight: bold;
  color: #666;
  float: right;
  display: inline;
  line-height: 50px;
}
.fillin_ft p strong {
  color: #e4393c;
  font-family: Verdana, Arial;
}
.fillin_ft a {
  float: right;
  display: inline;
  width: 135px;
  height: 36px;
  background: url('../../static/img/order_btn.jpg') 0 0 no-repeat;
  vertical-align: middle;
  margin: 7px 10px 0;
}
.fillin_ft a span {
  display: none;
}
.fillin_ft a:hover {
  background-position: 0 -36px;
}
li {
  margin:0;
  padding:0;
}
ul, ol, li, dl, dt, dd {
  list-style-type: none;
}
.order_info {
  font-size: 14px;
}
.integration {
  vertical-align: middle;
}
</style>
