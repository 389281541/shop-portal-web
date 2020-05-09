<template>
  <div>
    <Tabs @on-click="changeTab">
      <div v-for="(item, index) in tableItems" :key="index">
        <Tab-pane :label="item.title" :key="item.status"/>
      </div>
    </Tabs>
    <i-input style="height: 30px;width: 203px" v-model="listQuery.orderNo" placeholder="订单搜索"></i-input>
    <Button
      style="margin-left: 20px;height: 30px"
      @click="handleSearchList()"
      type="primary"
      size="small">
      查询结果
    </Button>
    <div class="order_bd mt10">
      <table class="orders">
        <thead>
        <tr>
          <th width="10%">订单号</th>
          <th width="20%">订单商品</th>
          <th width="10%">收货人</th>
          <th width="10%">订单金额</th>
          <th width="10%">支付方式</th>
          <th width="20%">下单时间</th>
          <th width="10%">订单状态</th>
          <th width="10%">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in orderList" :key="index">
          <td>{{item.orderNo}}</td>
          <td><img :src="item.coverImg" alt="" style="width: 100px; height: 100px"/></td>
          <td>{{item.receiverName}}</td>
          <td>￥{{item.totalAmount.toFixed(2)}}</td>
          <td>{{item.payType | formatPayType}}</td>
          <td>{{item.createTime}}</td>
          <td>{{item.status | formatStatus}}</td>
          <td><router-link :to="{path:'/orderDetail', query:{ id: item.id}}">查看</router-link> | <a @click="handleRemove(item.id)">删除</a></td>
        </tr>
        </tbody>
      </table>
    </div>
<!--    <Table border :columns="columns" :data="order" size="large" no-data-text="你还有订单，快点去购物吧"></Table>-->
    <div class="page-size">
      <Page :total="total" :current="listQuery.pageNum" :page-size="listQuery.pageSize" @on-change="handlePageChange"></Page>
    </div>
  </div>
</template>

<script>
import {fetchOrderList, removeOrder} from '@/api/order'
export default {
  name: 'MyOrder',
  data () {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 5,
        status: null,
        orderNo: null
      },
      orderList: [],
      tableItems: [
        {
          title: '所有订单',
          status: -1
        },
        {
          title: '待付款',
          key: 0
        },
        {
          title: '待发货',
          key: 1
        },
        {
          title: '已发货',
          key: 2
        },
        {
          title: '已完成',
          key: 3
        }
      ],
      total: null
    }
  },
  methods: {
    changeTab (value) {
      if (value === 0) {
        this.listQuery.status = null
      }
      if (value === 1) {
        this.listQuery.status = 0
      }
      if (value === 2) {
        this.listQuery.status = 1
      }
      if (value === 3) {
        this.listQuery.status = 2
      }
      if (value === 4) {
        this.listQuery.status = 3
      }
      this.handleSearchList()
    },
    getOrderList () {
      fetchOrderList(this.listQuery).then(response => {
        this.orderList = response.data.records
        this.total = response.data.total
      })
    },
    handleSearchList () {
      this.getOrderList()
    },
    handlePageChange (i) {
      this.listQuery.pageNum = i
      this.handleSearchList()
    },
    handleRemove (id) {
      removeOrder({id: id}).then(response => {
        let res = response.data
        if (res) {
          this.$Message.success('删除成功')
        } else {
          this.$Message.error('删除成功')
        }
        this.handleSearchList()
      })
    }
  },
  created () {
    this.getOrderList()
  },
  filters: {
    formatPayType (value) {
      if (value === 0) {
        return '支付宝'
      } else if (value === 1) {
        return '微信'
      } else {
        return '货到付款'
      }
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
    }
  }
}
</script>

<style scoped>
.page-size {
  margin: 15px 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center
}
.mt10 { margin-top: 10px;}
.order_hd{width:100%; border: 1px solid #e6e6e6; overflow: hidden;}
.order_hd h3{height: 33px; line-height: 33px; border-bottom: 2px solid #c30; font-size: 14px; color:#515a6e; margin-bottom: 8px; font-weight: normal; padding-left: 20px;}
.order_hd dl{width:988px; clear: both;}
.order_hd dt{float: left; display: inline; padding-left: 20px; line-height: 25px;}
.order_hd dd{float: left; display: inline;line-height: 25px; padding-right: 7px; color: #999;}
.order_hd dd a{color: #005ea7;}

table{width:100%;border: 1px solid #e6e6e6; border-top:2px solid #FFCCAA;}

table thead th{height: 30px; line-height: 30px; background: url("../../../static/img/tb_th.gif") 0 0 repeat-x; color:#666; text-align: center;}
table tbody td{border:solid #e6e6e6; border-width: 1px 0 0 1px; text-align: center; padding: 10px 0;}
table tbody td img{width: 50px; height: 50px; border:1px solid #e1e1e1;}
table tbody td a{color: #005ea7;}
</style>
