<template>
  <div class="detail-container">
    <el-card  shadow="never">
      <div style="margin-top: 20px">
        <span style="font-weight: bolder; font-size: 16px">基本信息：</span>
      </div>
      <div class="item-param-container">
        <span class="item-param-box">
          <span class="item-param-title">订单编号: </span>
          <span class="item-param-content">{{order.orderNo}}</span>
        </span>
        <span class="item-param-box">
          <span class="item-param-title">用户账号: </span>
          <span class="item-param-content">{{order.customerName}}</span>
        </span>
        <span class="item-param-box">
          <span class="item-param-title">支付方式: </span>
          <span class="item-param-content">{{order.payType | formatPayType}}</span>
        </span>
        <span class="item-param-box">
          <span class="item-param-title">活动信息: </span>
          <span class="item-param-content">{{order.promotionInfo | formatLongText}}</span>
        </span>
        <span class="item-param-box">
          <span class="item-param-title">配送方式: </span>
          <span class="item-param-content">{{order.deliveryCompany | formatNull}}</span>
        </span>
        <span class="item-param-box">
          <span class="item-param-title">物流单号: </span>
          <span class="item-param-content">{{order.deliveryBillNo | formatNull}}</span>
        </span>
      </div>
      <div style="margin-top: 20px">
        <span style="font-weight: bolder; font-size: 16px">收货人信息：</span>
      </div>
      <div class="item-param-container">
        <span class="item-param-box">
          <span class="item-param-title">收货人: </span>
          <span class="item-param-content">{{order.receiverName}}</span>
        </span>
        <span class="item-param-box">
          <span class="item-param-title">手机号码: </span>
          <span class="item-param-content">{{order.receiverPhone}}</span>
        </span>
        <span class="item-param-box">
          <span class="item-param-title">邮政编码: </span>
          <span class="item-param-content">{{order.receiverPostCode}}</span>
        </span>
        <span class="item-param-box2">
          <span class="item-param-title">收货地址: </span>
          <span class="item-param-content">{{order | formatAddress}}</span>
        </span>
      </div>
      <div style="margin-top: 20px">
        <span style="font-weight: bolder; font-size: 16px">商品信息：</span>
      </div>
      <el-table
        ref="orderItemTable"
        :data="order.orderSkuList"
        style="width: 100%;margin-top: 20px" border>
        <el-table-column label="商品图片" width="120" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.skuPic" style="height: 80px">
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <p>名称：{{scope.row.skuName}}</p>
            <p>品牌：{{scope.row.brandName}}</p>
          </template>
        </el-table-column>
        <el-table-column label="价格/货号" width="120" align="center">
          <template slot-scope="scope">
            <p>价格：￥{{scope.row.price}}</p>
            <p>货号：{{scope.row.skuId}}</p>
          </template>
        </el-table-column>
        <el-table-column label="属性" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.skuSpec | formatSkuSpec}}
          </template>
        </el-table-column>
        <el-table-column label="数量" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.quantity}}
          </template>
        </el-table-column>
        <el-table-column label="小计" width="120" align="center">
          <template slot-scope="scope">
            ￥{{(scope.row.price * scope.row.quantity).toFixed(2)}}
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <span style="font-weight: bolder; font-size: 16px">费用信息：</span>
      </div>
      <div class="item-param-container">
        <span class="item-param-box">
            <span class="item-param-title">商品合计: </span>
            <span class="item-param-content">￥{{(order.totalAmount + order.promotionAmount + order.integrationAmount + order.couponAmount - order.deliverFee).toFixed(2)}}</span>
        </span>
        <span class="item-param-box">
            <span class="item-param-title">运费: </span>
            <span class="item-param-content">￥{{order.deliverFee.toFixed(2)}}</span>
        </span>
        <span class="item-param-box">
            <span class="item-param-title">订单总金额: </span>
            <span class="item-param-content">￥{{(order.totalAmount  + order.promotionAmount + order.integrationAmount + order.couponAmount).toFixed(2)}}</span>
        </span>
        <span class="item-param-box">
            <span class="item-param-title">积分抵扣: </span>
            <span class="item-param-content">￥{{order.integrationAmount.toFixed(2)}}</span>
        </span>
        <span class="item-param-box">
            <span class="item-param-title">活动优惠: </span>
            <span class="item-param-content">￥{{order.promotionAmount.toFixed(2)}}</span>
        </span>
        <span class="item-param-box">
            <span class="item-param-title">优惠券: </span>
            <span class="item-param-content">￥{{order.couponAmount.toFixed(2)}}</span>
        </span>
        <span class="item-param-box">
            <span class="item-param-title">应付款金额: </span>
            <span class="item-param-content">￥{{order.totalAmount.toFixed(2)}}</span>
        </span>
      </div>
    </el-card>
  </div>
</template>
<script>
import {getOrderDetail} from '@/api/order'
const defaultReceiverInfo = {
  id: null,
  receiverName: null,
  receiverPhone: null,
  receiverPostCode: null,
  receiverDetailAddress: null,
  receiverProvince: null,
  receiverCity: null,
  receiverRegion: null,
  status: null
}
export default {
  name: 'OrderDetail',
  data () {
    return {
      id: null,
      order: {},
      receiverDialogVisible: false,
      receiverInfo: Object.assign({}, defaultReceiverInfo),
      moneyDialogVisible: false,
      moneyInfo: {id: null, deliverFee: 0, promotionAmount: 0, discountAmount: 0, status: null},
      messageDialogVisible: false,
      message: {title: null, content: null},
      closeDialogVisible: false,
      closeInfo: {note: null, id: null},
      markOrderDialogVisible: false,
      markInfo: {note: null},
      logisticsDialogVisible: false
    }
  },
  created () {
    this.id = this.$route.query.id
    getOrderDetail({id: this.id}).then(response => {
      this.order = response.data
    })
  },
  filters: {
    formatNull (value) {
      if (value === undefined || value === null || value === '') {
        return '暂无'
      } else {
        return value
      }
    },
    formatLongText (value) {
      if (value === undefined || value === null || value === '') {
        return '暂无'
      } else if (value.length > 8) {
        return value.substr(0, 8) + '...'
      } else {
        return value
      }
    },
    formatPayType (value) {
      if (value === 0) {
        return '支付宝'
      } else if (value === 1) {
        return '微信'
      } else {
        return '货到付款'
      }
    },
    formatSourceType (value) {
      if (value === 1) {
        return 'APP订单'
      } else {
        return 'PC订单'
      }
    },
    formatOrderType (value) {
      if (value === 1) {
        return '秒杀订单'
      } else {
        return '正常订单'
      }
    },
    formatAddress (order) {
      let str = order.receiverProvince
      if (order.receiverCity != null) {
        str += '  ' + order.receiverCity
      }
      str += '  ' + order.receiverRegion
      str += '  ' + order.receiverDetailAddress
      return str
    },
    formatStatus (value) {
      if (value === 1) {
        return '待发货'
      } else if (value === 2) {
        return '已发货'
      } else if (value === 3) {
        return '已完成'
      } else if (value === 4) {
        return '已关闭'
      } else if (value === 5) {
        return '无效订单'
      } else {
        return '待付款'
      }
    },
    formatPayStatus (value) {
      if (value === 0) {
        return '未支付'
      } else if (value === 4) {
        return '已退款'
      } else {
        return '已支付'
      }
    },
    formatDeliverStatus (value) {
      if (value === 0 || value === 1) {
        return '未发货'
      } else {
        return '已发货'
      }
    },
    formatSkuSpec (value) {
      if (value == null) {
        return ''
      } else {
        let attr = JSON.parse(value)
        let result = ''
        for (let i = 0; i < attr.length; i++) {
          result += attr[i].key
          result += ':'
          result += attr[i].value
          result += ' '
        }
        return result
      }
    }
  }
}
</script>
<style scoped>
.detail-container {
  width: 80%;
  padding: 0px 0px 0px 0px;
  margin: 0px auto
}

.operate-container {
  background: #F2F6FC;
  height: 80px;
  margin: -20px -20px 0;
  line-height: 80px
}

.operate-button-container {
  float: right;
  margin-right: 20px
}

.table-layout {
  margin-top: 20px;
  border-left: 1px solid #DCDFE6;
  border-top: 1px solid #DCDFE6
}

.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden
}

.table-cell-title {
  border-right: 1px solid #DCDFE6;
  border-bottom: 1px solid #DCDFE6;
  padding: 10px;
  background: #F2F6FC;
  text-align: center;
  font-size: 14px;
  color: #303133
}
/************* 商品参数 *************/
.item-param-container {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between
}
.item-param-box {
  padding: 5px;
  padding-left: 30px;
  width: 240px;
  height: 36px;
  font-size: 14px
  /* text-align: center */
  /* background-color: #ccc */
}
.item-param-title {
  color: #232323
}
.item-param-box2 {
  padding: 5px;
  padding-left: 30px;
  width: 500px;
  height: 36px;
  font-size: 14px
  /* text-align: center */
  /* background-color: #ccc */
}
.item-param-content {
  color: #999
}
</style>
