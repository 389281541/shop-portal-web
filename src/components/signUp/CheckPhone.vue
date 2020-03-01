<template>
  <div class="info-form">
    <Form ref="formValidate" :model="formValidate" :label-width="80" :rules="ruleValidate">
      <FormItem label="手机号" prop="phone">
          <i-input v-model="formValidate.phone" clearable size="large"  placeholder="请输入手机号"></i-input>
      </FormItem>
      <FormItem label="验证码" prop="checkNum">
          <i-input v-model="formValidate.checkNum" size="large"  placeholder="请输入验证码">
            <Button slot="append" @click="getcheckNum">获取验证码</Button>
          </i-input>
      </FormItem>
      <Button type="error" size="large" long @click="handleSubmit('formValidate')">验证手机号</Button>
    </Form>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapMutations } from 'vuex'
import {sendSms, verifySms} from '@/api/sms'

export default {
  name: 'CheckPhone',
  data () {
    return {
      formValidate: {
        phone: '',
        checkNum: ''
      },
      ruleValidate: {
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ],
        checkNum: [
          { required: true, message: '必须填写验证码', trigger: 'blur' },
          { type: 'string', min: 6, max: 6, message: '验证码长度错误', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['SET_SIGN_UP_SETP']),
    getcheckNum () {
      if (this.formValidate.phone.length === 11) {
        sendSms({mobile: this.formValidate.phone}).then(response => {
          let res = response.data
          if (res) {
            this.$Message.success({
              content: '发送成功,测试环境为123456',
              duration: 6,
              closable: true
            })
          } else {
            this.$Message.error({
              content: '发送失败，请重试',
              duration: 6,
              closable: true
            })
          }
        })
      } else {
        this.$Message.error({
          content: '请输入正确的手机号',
          duration: 6,
          closable: true
        })
      }
    },
    handleSubmit (name) { // 提交验证
      this.$refs[name].validate((valid) => {
        if (!valid) {
          return
        }
        verifySms({
          mobile: this.formValidate.phone,
          verifyCode: this.formValidate.checkNum
        }).then(response => {
          let res = response.data
          if (res) {
            this.SET_SIGN_UP_SETP(1)
            this.$router.push({ path: '/SignUp/inputInfo', query: { phone: this.formValidate.phone } })
          } else {
            this.$Message.error({
              content: '验证码错误',
              duration: 6,
              closable: true
            })
          }
        })
      })
    }
  },
  store
}
</script>

<style scoped>
.info-form {
  width: 90% !important
}
</style>
