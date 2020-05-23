<template>
  <div>
    <div class="address-box" :class="{'bor':index===0}" v-for="(item, index) in addressList" :key="index">
      <div class="address-header">
        <span>{{item.receiverName}}</span>
        <div class="address-action">
          <span @click="setDefault(index)" v-if="!item.isDefault">设为默认</span>
          <span @click="edit(index)">修改</span>
          <span @click="del(index)">删除</span>
        </div>
      </div>
      <div class="address-content">
        <p><span class="address-content-title"> 收 货 人 :</span> {{item.receiverName}}</p>
        <p><span class="address-content-title"> 手 机 号 :</span> {{item.phone}}</p>
        <p><span class="address-content-title">收货地区:</span> {{item.province}} {{item.city}} {{item.district}}</p>
        <p><span class="address-content-title">收货地址:</span> {{item.address}}</p>
        <p><span class="address-content-title">邮政编码:</span> {{item.zip}}</p>
      </div>
    </div>
    <Modal v-model="modal" width="530">
        <p slot="header">
          <Icon type="edit"></Icon>
          <span>修改地址</span>
        </p>
        <div>
            <Form :model="formData" label-position="left" :label-width="100" :rules="ruleInline">
              <FormItem label="收件人" prop="name">
                <i-input v-model="formData.receiverName" size="large"></i-input>
              </FormItem>
              <FormItem label="手机号" prop="phone">
                <i-input v-model="formData.phone" size="large"></i-input>
              </FormItem>
              <FormItem label="收件地区" prop="address">
                <Distpicker :province="formData.province" :city="formData.city" :area="formData.district" @province="getProvince" @city="getCity" @area="getArea"></Distpicker>
              </FormItem>
              <FormItem label="收件地址" prop="address">
                <i-input v-model="formData.address" size="large"></i-input>
              </FormItem>
              <FormItem label="邮政编码" prop="postalcode">
                <i-input v-model="formData.zip" size="large"></i-input>
              </FormItem>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" size="large" long @click="editAction">修改</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import Distpicker from 'v-distpicker'
import {fetchAddressList, getAddress, setDefaultAddress, updateAddress, removeAddress} from '@/api/address'
const defaultFormData = {
  receiverName: '',
  province: '',
  city: '',
  district: null,
  address: '',
  zip: ''
}
export default {
  name: 'MyAddress',
  data () {
    return {
      modal: false,
      addressList: [],
      formData: Object.assign({}, defaultFormData),
      ruleInline: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        postalcode: [
          { required: true, message: '请输入邮政编码', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { type: 'string', pattern: /^1[3|4|5|7|8][0-9]{9}$/, message: '手机号格式出错', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getAddressList()
  },
  methods: {
    getAddressList () {
      fetchAddressList().then(response => {
        this.addressList = response.data
      })
    },
    edit (index) {
      this.modal = true
      getAddress({id: this.addressList[index].id}).then(response => {
        this.formData = response.data
      })
    },
    editAction () {
      this.modal = false
      updateAddress(this.formData).then(response => {
        let res = response.data
        if (res) {
          this.$Message.success('修改成功')
        } else {
          this.$Message.error('修改失败')
        }
        this.getAddressList()
      })
    },
    del (index) {
      this.$Modal.confirm({
        title: '信息提醒',
        content: '你确定删除这个收货地址',
        onOk: () => {
          removeAddress({id: this.addressList[index].id}).then(response => {
            let res = response.data
            if (res) {
              this.$Message.success('删除成功')
            } else {
              this.$Message.error('删除失败')
            }
            this.getAddressList()
          })
        },
        onCancel: () => {
          this.$Message.info('取消删除')
        }
      })
    },
    setDefault (index) {
      setDefaultAddress({id: this.addressList[index].id}).then(response => {
        let res = response.data
        if (res) {
          this.$Message.success('设置成功')
        } else {
          this.$Message.error('设置失败')
        }
        this.getAddressList()
      })
    },
    getProvince (data) {
      this.formData.province = data.value
    },
    getCity (data) {
      this.formData.city = data.value
    },
    getArea (data) {
      this.formData.district = data.value
    }
  },
  components: {
    Distpicker
  }
}
</script>

<style scoped>
.address-box {
  padding: 15px;
  margin: 15px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #ccc
}
.address-header {
  height: 35px;
  display: flex;
  justify-content: space-between;
  color: #232323;
  font-size: 18px
}
.address-content {
  font-size: 14px
}
.address-content-title {
  color: #999
}
.address-action span {
  margin-left: 15px;
  font-size: 14px;
  color: #2d8cf0;
  cursor: pointer
}
.bor{
  border:2px solid black;
}
</style>
