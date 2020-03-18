<template>
  <div class='order_info'>
    <div style='clear:both;'></div>
    <!-- 主体部分 start -->
    <div class='fillin w990 bc mt15'>
      <div class='fillin_hd'>
        <h2>填写并核对订单信息</h2>
      </div>
      <div class='fillin_bd'>
        <!-- 收货人信息  start-->
        <div class='address'>
          <h3>收货人信息 <a href='javascript:;' id='address_modify' v-show="isAddressModify" @click="modifyAddress">[修改]</a></h3>
          <div class='address_info' v-show="isAddressModify">
            <p>王超平 13555555555 </p>
            <p>北京 昌平区 西三旗 建材城西路金燕龙办公楼一层 </p>
          </div>
          <div class='address_select' v-show="!isAddressModify">
            <ul>
              <li class='cur'>
                <input type='radio' name='address' checked='checked'/>王超平 北京市 昌平区 建材城西路金燕龙办公楼一层 13555555555
                <a href=''>设为默认地址</a>
              </li>
              <li>
                <input type='radio' name='address'/>王超平 湖北省 武汉市 武昌 关山光谷软件园1号201 13333333333
                <a href=''>设为默认地址</a>
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
            <p>普通快递送货上门</p>
            <p>送货时间不限</p>
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
              <tr class='cur'>
                <td>
                  <input type='radio' name='delivery' checked='checked'/>普通快递送货上门
                  <select name='' id=''>
                    <option value=''>时间不限</option>
                    <option value=''>工作日，周一到周五</option>
                    <option value=''>周六日及公众假期</option>
                  </select>
                </td>
                <td>￥10.00</td>
                <td>每张订单不满499.00元,运费15.00元, 订单4...</td>
              </tr>
              <tr>
                <td><input type='radio' name='delivery'/>特快专递</td>
                <td>￥40.00</td>
                <td>每张订单不满499.00元,运费40.00元, 订单4...</td>
              </tr>
              <tr>
                <td><input type='radio' name='delivery'/>加急快递送货上门</td>
                <td>￥40.00</td>
                <td>每张订单不满499.00元,运费40.00元, 订单4...</td>
              </tr>
              <tr>
                <td><input type='radio' name='delivery'/>平邮</td>
                <td>￥10.00</td>
                <td>每张订单不满499.00元,运费15.00元, 订单4...</td>
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
            <p>货到付款</p>
          </div>
          <div class='pay_select' v-show="!isPayModify">
            <table>
              <tr class='cur'>
                <td class='col1'><input type='radio' name='pay'/>货到付款</td>
                <td class='col2'>送货上门后再收款，支持现金、POS机刷卡、支票支付</td>
              </tr>
              <tr>
                <td class='col1'><input type='radio' name='pay'/>在线支付</td>
                <td class='col2'>即时到帐，支持绝大数银行借记卡及部分银行信用卡</td>
              </tr>
              <tr>
                <td class='col1'><input type='radio' name='pay'/>上门自提</td>
                <td class='col2'>自提时付款，支持现金、POS刷卡、支票支付</td>
              </tr>
              <tr>
                <td class='col1'><input type='radio' name='pay'/>邮局汇款</td>
                <td class='col2'>通过快钱平台收款 汇款后1-3个工作日到账</td>
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
              <th class='col1'>商品</th>
              <th class='col2'>规格</th>
              <th class='col3'>价格</th>
              <th class='col4'>数量</th>
              <th class='col5'>小计</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class='col1'><a href=''><img src='../../static/img/cart_goods1.jpg' alt=''/></a> <strong><a href=''>【1111购物狂欢节】惠JackJones杰克琼斯纯羊毛菱形格</a></strong>
              </td>
              <td class='col2'><p>颜色：073深红</p>
                <p>尺码：170/92A/S</p></td>
              <td class='col3'>￥499.00</td>
              <td class='col4'> 1</td>
              <td class='col5'><span>￥499.00</span></td>
            </tr>
            <tr>
              <td class='col1'><a href=''><img src='../../static/img/cart_goods2.jpg' alt=''/></a> <strong><a href=''>九牧王王正品新款时尚休闲中长款茄克EK01357200</a></strong>
              </td>
              <td class='col2'><p>颜色：淡蓝色</p>
                <p>尺码：165/88</p></td>
              <td class='col3'>￥1102.00</td>
              <td class='col4'>1</td>
              <td class='col5'><span>￥1102.00</span></td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td colspan='5'>
                <ul>
                  <li>
                    <span>4 件商品，总商品金额：</span>
                    <em>￥5316.00</em>
                  </li>
                  <li>
                    <span>优惠总额：</span>
                    <em>-￥240.00</em>
                  </li>
                  <li>
                    <span>运费：</span>
                    <em>￥10.00</em>
                  </li>
                  <li>
                    <span>应付总额：</span>
                    <em>￥5076.00</em>
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
        <a href=''><span>提交订单</span></a>
        <p>应付总额：<strong>￥5076.00元</strong></p>
      </div>
    </div>
    <!-- 主体部分 end -->
    <div style='clear:both;'></div>
  </div>
</template>
<script>
import Search from '@/components/Search'
import GoodsListNav from '@/components/nav/GoodsListNav'
export default {
  name: 'Order',
  created () {
  },
  data () {
    return {
      isAddressModify: true,
      isDeliveryModify: true,
      isPayModify: true
    }
  },
  computed: {
  },
  methods: {
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
.goods .col1 {
  width: 50%;
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
  width: 50px;
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
</style>
