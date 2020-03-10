<template>
  <div>
    <div class="add-container">
      <div class="add-title">
        <h1>添加收货地址</h1>
      </div>
      <div class="add-box">
        <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
          <FormItem label="收件人" prop="receiverName">
            <i-input v-model="formData.receiverName" size="large"></i-input>
          </FormItem>
          <FormItem label="收件地区" prop="address">
            <Distpicker :province="formData.province" :city="formData.city" :area="formData.district" @province="getProvince" @city="getCity" @area="getArea"></Distpicker>
          </FormItem>
          <FormItem label="收件地址" prop="address">
            <i-input v-model="formData.address" size="large"></i-input>
          </FormItem>
          <FormItem label="邮政编码" prop="zip">
            <i-input v-model="formData.zip" size="large"></i-input>
          </FormItem>
        </Form>
      </div>
      <div class="add-submit">
        <Button type="error" size="large" @click="handleAdd">添加地址</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Distpicker from 'v-distpicker'
import {addAddress} from '@/api/address'
const defaultFormData = {
  receiverName: '',
  province: '',
  city: '',
  district: null,
  address: '',
  zip: ''
}
export default {
  name: 'AddAddress',
  data () {
    return {
      formData: Object.assign({}, defaultFormData),
      ruleInline: {
        receiverName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        zip: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getProvince (data) {
      this.formData.province = data.value
    },
    getCity (data) {
      this.formData.city = data.value
    },
    getArea (data) {
      this.formData.district = data.value
    },
    handleAdd () {
      addAddress(this.formData).then(response => {
        let res = response.data
        if (res) {
          this.$Message.success('添加成功')
        } else {
          this.$Message.error('添加失败')
        }
      })
    }
  },
  components: {
    Distpicker
  }
}
</script>

<style scoped>
.add-container {
  margin: 15px auto;
  width: 60%;
  min-width: 600px
}
.add-title {
  margin-bottom: 15px;
  text-align: center
}
.add-submit {
  display: flex;
  justify-content: center
}
</style>
