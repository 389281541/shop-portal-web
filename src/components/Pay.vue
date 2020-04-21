<template>
  <div>
    <div class="pay-container">
      <Alert show-icon>
        扫码支付
        <Icon type="qr-scanner" slot="icon"></Icon>
        <template slot="desc">请用沙箱版支付宝扫描右边二维码进行支付</template>
      </Alert>
      <div class="pay-box">
        <div class="pay-demo">
          <img src="static/img/pay/pay-demo.png">
        </div>
        <div class="pay-qr-scan">
          <img :src="qrCodeImgUrl">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {createQrCodeImage} from '@/api/pay'
import {getOrderStatus} from '@/api/order'
export default {
  name: 'Pay',
  created () {
    this.parentOrderNo = this.$route.query.parentOrderNo
    this.listenOrderStatus()
    this.generateImg()
  },
  activated () {

  },
  destroyed () {
    clearInterval(this.paymentTimer)
  },
  data () {
    return {
      parentOrderNo: null,
      qrCodeImgUrl: null,
      paymentTimer: null
    }
  },
  methods: {
    generateImg () {
      createQrCodeImage({parentOrderNo: this.parentOrderNo}).then(response => {
        this.qrCodeImgUrl = response.data.path
      })
    },
    listenOrderStatus () {
      let paymentTimer = setInterval(() => {
        getOrderStatus({parentOrderNo: this.parentOrderNo}).then(response => {
          if (response.data) {
            this.$router.push('/payDone')
          }
        })
      }, 5e3)
      this.paymentTimer = paymentTimer
    }
  }
}
</script>

<style scoped>
.pay-container {
  margin: 15px auto;
  width: 80%;
  min-width: 1000px
}
.pay-box {
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between
}
.pay-demo {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center
}
.pay-demo img{
  height: 80%
}
.pay-qr-scan {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
}
.pay-tips {
  width: 50%;
  text-align: center;
  font-size: 14px;
  line-height: 30px
}
.pay-tips a {
  color: #999999
}
</style>
