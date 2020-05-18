<template>
  <div>
    <div class="pay-done-box">
      <img src="static/img/pay-success.png">
    </div>
  </div>
</template>

<script>
import {alipayCallback} from '@/api/pay'
export default {
  name: 'PayDone',
  created () {
    this.params.outTradeNo = this.$route.query.out_trade_no
    this.params.totalAmount = this.$route.query.total_amount
    this.params.charset = this.$route.query.charset
    this.params.sign = this.$route.query.sign
    this.params.tradeNo = this.$route.query.trade_no
    this.params.authAppId = this.$route.query.auth_app_id
    this.params.version = this.$route.query.version
    this.params.appId = this.$route.query.app_id
    this.params.signType = this.$route.query.sign_type
    this.params.sellerId = this.$route.query.seller_id
    this.params.timestamp = this.$route.query.timestamp
    this.params.tradeStatus = 'TRADE_SUCCESS'
    alipayCallback(this.params).then(response => {
      console.log(response.data)
    })
  },
  destroyed () {
  },
  data () {
    return {
      params: {
        outTradeNo: null,
        totalAmount: null,
        charset: null,
        sign: null,
        tradeNo: null,
        authAppId: null,
        version: null,
        appId: null,
        signType: null,
        sellerId: null,
        timestamp: null,
        tradeStatus: null
      },
      info: null
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.pay-done-box {
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}
</style>
