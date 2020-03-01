<template>
  <div class="info-form">
     <Form ref="customerInfo" :model="customerInfo" :rules="ruleValidate" :label-width="80" >
        <FormItem label="用户名" prop="username">
            <i-input v-model="customerInfo.userName" clearable placeholder="请输入你的用户名"></i-input>
        </FormItem>
        <FormItem label="密码" prop="password">
            <i-input type="password" v-model="customerInfo.password" clearable placeholder="请输入你的密码"></i-input>
        </FormItem>
        <FormItem label="确认密码" prop="repassword">
            <i-input type="password" v-model="customerInfo.repassword" clearable  placeholder="请再次输入你的密码"></i-input>
        </FormItem>
       <FormItem label="用户头像" prop="avatar">
         <single-upload v-model="customerInfo.avatar"></single-upload>
       </FormItem>
       <FormItem label="真实姓名" prop="identityName">
         <i-input v-model="customerInfo.identityName" clearable  placeholder="请输入你的真实姓名"></i-input>
       </FormItem>
       <FormItem lable="证件类型" prop="identityType">
         <span slot="label">证件类型</span>
         <i-select v-model="customerInfo.identityType" clearable placeholder="请选择证件类型">
           <Option :value="item.id" v-for="item in idTypeList" v-bind:key="item.id">{{item.name}}</Option>
         </i-select>
       </FormItem>
       <FormItem lable="性别" prop="identityType">
         <span slot="label">性别</span>
         <i-select v-model="customerInfo.gender" clearable placeholder="请选择性别">
           <Option :value="item.id" v-for="item in genderList" v-bind:key="item.id">{{item.name}}</Option>
         </i-select>
       </FormItem>
       <FormItem lable="生日" prop="birthday">
         <span slot="label">生日</span>
         <DatePicker
           format="yyyy-MM-dd"
           type="date"
           placeholder="请选择日期"
           @on-change="customerInfo.birthday=$event"></DatePicker>
       </FormItem>
       <FormItem label="证件号码" prop="identityNo">
         <i-input v-model="customerInfo.identityNo" clearable  placeholder="请输入你的证件号码"></i-input>
       </FormItem>
       <FormItem label="邮箱" prop="email">
         <i-input v-model="customerInfo.email" clearable  placeholder="请输入你的邮箱"></i-input>
       </FormItem>
        <Button type="error" size="large" long @click="handleSubmit('customerInfo')">注册</Button>
    </Form>
  </div>
</template>

<script>
import store from '@/vuex/store'
import { mapMutations, mapActions } from 'vuex'
import SingleUpload from '@/components/Upload/singleUpload'
import { registerCustomer } from '@/api/customer'
import md5 from 'js-md5'

export default {
  name: 'InputInfo',
  components: { SingleUpload },
  data () {
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.customerInfo.password) {
        callback(new Error('两次输入的密码不一样'))
      } else {
        callback()
      }
    }
    return {
      customerInfo: {
        avatar: '',
        userName: null,
        password: null,
        repassword: null,
        email: null,
        identityType: null,
        identityNo: null,
        identityName: null,
        gender: null,
        birthday: null,
        mobile: null
      },
      ruleValidate: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度不能小于6', trigger: 'blur' }
        ],
        repassword: [
          { validator: validatePassCheck, trigger: 'blur' }
        ]
      },
      idTypeList: [{
        id: 1,
        name: '身份证'
      }, {
        id: 2,
        name: '军官证'
      }, {
        id: 3,
        name: '护照'
      }],
      genderList: [{
        id: 0,
        name: '男'
      }, {
        id: 1,
        name: '女'
      }]
    }
  },
  created () {
    this.customerInfo.mobile = this.$route.query.phone
  },
  methods: {
    ...mapMutations(['SET_SIGN_UP_SETP']),
    ...mapActions(['addSignUpUser']),
    handleSubmit (name) {
      const father = this
      this.$refs[name].validate((valid) => {
        if (valid) {
          let encodePassword = md5(md5(this.customerInfo.password.trim()) + 'abcd1234')
          this.customerInfo.password = encodePassword
          registerCustomer(this.customerInfo).then(() => {
            father.SET_SIGN_UP_SETP(2)
            this.$router.push({ path: '/SignUp/signUpDone' })
          })
        } else {
          this.$Message.error('注册失败')
        }
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
