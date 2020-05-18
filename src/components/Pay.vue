<template>
  <div>
    <div v-html="this.form">
      {{this.form}}
    </div>
    <div>
      <p style="font-size: 20px; font-weight: bold; margin: 20px">正在跳转...</p>
    </div>
  </div>
</template>

<script>
import { goPay } from '@/api/pay'
export default {
  name: 'Pay',
  created () {
    this.parentOrderNo = this.$route.query.parentOrderNo
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
      paymentTimer: null,
      form: null
    }
  },
  methods: {
    generateImg () {
      goPay({parentOrderNo: this.parentOrderNo}).then(response => {
        // 支付宝支付
        this.form = response.data
        this.$nextTick(() => {
          document.forms[0].submit()
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
