<template>
  <div class="info-form">
    <div class="title">
      <h1>个人信息</h1>
    </div>
     <Form ref="customerInfo" :model="customerInfo" :rules="ruleValidate" :label-width="80" >
        <FormItem label="手机号" prop="mobile">
            <i-input v-model="customerInfo.mobile" clearable placeholder="请输入你的手机号"></i-input>
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
       <FormItem label="证件号码" prop="identityNo">
         <i-input v-model="customerInfo.identityNo" clearable  placeholder="请输入你的证件号码"></i-input>
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
           value-format="yyyy-MM-dd"
           :value="customerInfo.birthday"
           type="date"
           placeholder="请选择日期"
           @on-change="customerInfo.birthday=$event"></DatePicker>
       </FormItem>
       <FormItem label="邮箱" prop="email">
         <i-input v-model="customerInfo.email" clearable  placeholder="请输入你的邮箱"></i-input>
       </FormItem>
        <Button type="error" class="submit" long @click="handleSubmit('customerInfo')">修改</Button>
    </Form>
  </div>
</template>

<script>
import SingleUpload from '@/components/Upload/singleUpload'
import { getCustomerInfo, updateCustomer } from '@/api/customer'
const defaultCustomerInfo = {
  mobile: '',
  avatar: '',
  identityName: '',
  identityType: null,
  identityNo: '',
  gender: null,
  birthday: '',
  email: ''
}
export default {
  name: 'MyInfo',
  components: { SingleUpload },
  data () {
    return {
      customerInfo: Object.assign({}, defaultCustomerInfo),
      passWord: null,
      rePassword: null,
      ruleValidate: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
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
    getCustomerInfo().then(response => {
      this.customerInfo = response.data
    })
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          updateCustomer(this.customerInfo).then(response => {
            let res = response.data
            if (res) {
              this.$Message.success('修改成功')
            } else {
              this.$Message.success('修改失败')
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.title {
  margin-bottom: 15px;
  text-align: center
}
.info-form {
  margin: 15px auto;
  width: 60%;
  min-width: 600px
}
.submit {
  width: 80px;
  height: 40px;
  display: flex;
  margin: 0 auto;
  justify-content: center
}
</style>
