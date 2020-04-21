<template>
  <div>
    <div class="item-detail-show">
      <div class="item-detail-left">
        <div class="item-detail-big-img">
          <img :src="bigImg" alt="">
        </div>
        <div class="item-detail-img-row">
          <div class="item-detail-img-small" v-for="(item, index) in value.photoList" :key="index" @mouseover="showBigImg(item, index)">
            <img :src="item" alt="">
          </div>
        </div>
      </div>
      <div class="item-detail-right">
        <div class="item-detail-title">
          <p>
            <span class="item-detail-express">包邮配送</span> {{value.name}}</p>
        </div>
        <div class="seckill-head" v-show="value.flashSpuInfo.flashFlag===1">
          <div class="seckill-icon">
            <img src="static/img/index/clock.png">
          </div>
          <div class="seckill-text">
            <span class="seckill-title">限时秒杀</span>
          </div>
          <div class="count-down">
            <span class="count-down-text" v-show="value.flashSpuInfo.flashStatus===0">距离开始</span>
            <span class="count-down-text" v-show="value.flashSpuInfo.flashStatus===1">距离结束</span>
            <span class="count-down-num count-down-hour">{{this.zeroize(value.flashSpuInfo.hms.hour)}}</span>
            <span class="count-down-point">:</span>
            <span class="count-down-num count-down-minute">{{this.zeroize(value.flashSpuInfo.hms.minute)}}</span>
            <span class="count-down-point">:</span>
            <span class="count-down-num count-down-seconds">{{this.zeroize(value.flashSpuInfo.hms.second)}}</span>
          </div>
        </div>
        <div class="item-detail-price-row">
          <div class="item-price-left">
            <div class="item-price-row">
              <p>
                <span class="item-price-title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                <span class="item-price" v-if="(value.promotionType===1 && this.selectedSku !== null) || value.flashSpuInfo.flashFlag===1">￥{{this.selectedSku.originalPrice.toFixed(2)}}</span>
                <span class="item-promotion-price" v-if="value.promotionType!==1 && value.flashSpuInfo.flashFlag===0 && this.selectedSku !== null">￥{{this.selectedSku.price.toFixed(2)}}</span>
              </p>
            </div>
            <div class="item-price-row" v-show="value.promotionType===1 && value.flashSpuInfo.flashFlag===0">
              <p>
                <span class="item-price-title">促&nbsp;销&nbsp;价</span>
                <span class="item-promotion-price" v-if="this.selectedSku !== null">￥{{this.selectedSku.price.toFixed(2)}}</span>
              </p>
            </div>
            <div class="item-price-row" v-show="value.flashSpuInfo.flashFlag===1">
              <p>
                <span class="item-price-title">秒&nbsp;杀&nbsp;价</span>
                <span class="item-promotion-price" v-if="this.selectedSku !== null">￥{{(this.selectedSku.originalPrice - value.flashSpuInfo.flashDiscountPrice).toFixed(2)}}</span>
              </p>
            </div>
            <div class="item-price-row" v-show="value.promotionType===2">
              <p>
                <span class="item-price-title">满&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;减</span>
                <span class="item-price-full-cut" v-for="(item,index) in value.fullReductionList" :key="index">满{{item.fullPrice}}减{{item.reducePrice}}</span>
              </p>
            </div>
          </div>
          <div class="item-price-right">
            <div class="item-remarks-sum">
              <p>限购</p>
              <p  v-show="value.flashSpuInfo.flashFlag===0">
                <span class="item-remarks-num">{{value.promotionPerLimit}}件</span>
              </p>
              <p  v-show="value.flashSpuInfo.flashFlag===1">
                <span class="item-remarks-num">{{value.flashSpuInfo.flashPromotionLimit}}</span>
              </p>
            </div>
            <div class="item-remarks-sum">
              <p>销量</p>
              <p>
                <span class="item-remarks-num">{{value.sale}}件</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 选择颜色 -->
        <div class="item-select" v-for="(item, index) in value.specNameList" :key="index">
          <div class="item-select-title">
            <p>{{item.name}}:</p>
          </div>
          <div class="item-select-row">
              <div class="item-select-box" v-for="(subItem, subIndex) in item.children" :key="subIndex" @click="select(index, subIndex)" :class="{'item-select-box-active': subIndex === selectAttrMap[index]}">
                <div class="item-select-intro">
                  <p>{{subItem.name}}</p>
                </div>
              </div>
          </div>
        </div>
        <br>
        <div class="add-buy-car-box">
          <div class="add-buy-car"  v-show="value.flashSpuInfo.flashFlag===0">
            <InputNumber :min="1" v-model="count" size="large"></InputNumber>
            <Button type="error" size="large" @click="addShoppingCart()">加入购物车</Button>
            <span class="item-price-title" v-if="this.selectedSku !== null">&nbsp;&nbsp;&nbsp;&nbsp;库存{{this.selectedSku.stock - this.selectedSku.lockStock}}件</span>
          </div>
          <div class="add-buy-car"  v-show="value.flashSpuInfo.flashFlag===1">
            <InputNumber :min="1" v-model="count" size="large"></InputNumber>
            <Button type="error" size="large" @click="doFlash()" :disabled="value.flashSpuInfo.flashStatus===0">立即秒杀</Button>
            <span class="item-price-title" v-if="this.selectedSku !== null">&nbsp;&nbsp;&nbsp;&nbsp;库存{{value.flashSpuInfo.flashPromotionNum - this.selectedSku.lockStock}}件</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {addCart} from '@/api/cart'
import {goConfirmOrder} from '@/api/flash'
export default {
  name: 'ShowGoods',
  props: {
    value: Object
  },
  computed: {
    valueId () {
      return this.value.id
    }
  },
  watch: {
    valueId: function (newValue) {
      if (newValue === undefined || newValue === null || newValue === 0) {
        return
      }
      this.handleEditCreated()
    }
  },
  data () {
    return {
      price: 0,
      count: 1,
      selectBoxIndex: 0,
      imgIndex: 0,
      selectedSku: null,
      bigImg: null,
      setIntervalObj: null,
      selectAttrMap: {}
    }
  },
  created () {
  },
  methods: {
    select (index, subIndex) {
      this.selectAttrMap[index] = subIndex
      console.log('index=' + index, 'subIndex=' + subIndex)
      let selectSkuNameArray = []
      for (let i = 0; i < this.value.specNameList.length; i++) {
        let children = this.value.specNameList[i].children
        for (let j = 0; j < children.length; j++) {
          if (j === this.selectAttrMap[i]) {
            selectSkuNameArray.push(children[j].name)
          }
        }
      }
      let skuName = selectSkuNameArray.join('_')
      this.selectedSku = this.getSkuByName(skuName)
    },
    getSkuByName (skuName) {
      for (let i = 0; i < this.value.skuList.length; i++) {
        if (this.value.skuList[i].skuName === skuName) {
          return this.value.skuList[i]
        }
      }
    },
    showBigImg (item, index) {
      this.bigImg = item
      this.imgIndex = index
    },
    addShoppingCart () {
      addCart({skuId: this.selectedSku.id, quantity: this.count}).then(response => {
        let res = response.data
        if (res) {
          this.$Message.success('添加成功！')
          this.$router.push('/shoppingCart')
        } else {
          this.$Message.error('添加失败！')
        }
      })
    },
    doFlash () {
      goConfirmOrder({skuId: this.selectedSku.id, quantity: this.count, flashPrice: this.selectedSku.originalPrice - this.value.flashSpuInfo.flashDiscountPrice}).then(response => {
        let res = response.data
        if (!res) {
          this.$Message.error('秒杀失败！')
        }
        this.$router.push({path: '/order', query: {flashFlag: '1'}})
      })
    },
    flashTimeUpdate () {
      if (this.value.flashSpuInfo.hms.second === 0 && this.value.flashSpuInfo.hms.minute === 0 && this.value.flashSpuInfo.hms.hour === 0) {
        return
      }
      this.value.flashSpuInfo.hms.second--
      if (this.value.flashSpuInfo.hms.second === -1) {
        this.value.flashSpuInfo.hms.second = 59
        this.value.flashSpuInfo.hms.minute--
        if (this.value.flashSpuInfo.hms.minute === -1) {
          this.value.flashSpuInfo.hms.minute = 59
          this.value.flashSpuInfo.hms.hour--
        }
      }
    },
    zeroize (obj) {
      return obj < 10 ? '0' + obj : obj
    },
    handleEditCreated () {
      for (let i = 0; i < this.value.specNameList.length; i++) {
        this.selectAttrMap[i] = 0
      }
      let selectSkuNameArray = []
      for (let i = 0; i < this.value.specNameList.length; i++) {
        let children = this.value.specNameList[i].children
        for (let j = 0; j < children.length; j++) {
          if (j === 0) {
            selectSkuNameArray.push(children[j].name)
          }
        }
      }
      let skuName = selectSkuNameArray.join('_')
      this.selectedSku = this.getSkuByName(skuName)
      this.bigImg = this.value.photoList[0]
    }
  },
  mounted () {
    const father = this
    this.setIntervalObj = setInterval(function () {
      father.flashTimeUpdate()
    }, 1000)
  },
  destroyed () {
    clearInterval(this.setIntervalObj)
  }
}
</script>

<style scoped>
/******************商品图片及购买详情开始******************/
.item-detail-show {
  width: 80%;
  margin: 15px auto;
  display: flex;
  flex-direction: row;
  background-color: #fff
}
.item-detail-left {
  width: 350px;
  margin-right: 30px
}
.item-detail-big-img {
  width: 350px;
  height: 350px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer
}
.item-detail-big-img img {
  width: 100%
}
.item-detail-img-row {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start
}
.item-detail-img-small {
  width: 68px;
  height: 68px;
  box-shadow: 0px 0px 8px #ccc;
  cursor: pointer
}
.item-detail-img-small :hover {
  transform: translateY(-5px);
}
.item-detail-img-small img {
  width: 100%
}
/*商品选购详情*/
.item-detail-right {
  display: flex;
  flex-direction: column
}
.item-detail-title p {
  color: #666;
  font-size: 20px
}
.item-detail-express {
  font-size: 14px;
  padding: 2px 3px;
  border-radius: 3px;
  background-color: #e4393c;
  color: #fff
}
/*商品标签*/
.item-detail-tag {
  font-size: 12px;
  color: #e4393c
}
/*价格详情等*/
.item-detail-price-row {
  padding: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f3f3f3
}
.item-price-left {
  display: flex;
  flex-direction: column
}
.item-price-title {
  color: #999999;
  font-size: 14px;
  margin-right: 15px
}
.item-price-row {
  margin: 5px 0px
}
.item-price {
  color: #999999;
  text-decoration: line-through;
  font-size: 15px;
  cursor: pointer
}
.item-promotion-price {
  color: #f90013;
  font-size: 38px;
  cursor: pointer
}
.item-price-full-cut {
  margin-right: 5px;
  padding: 3px;
  color: #e4393c;
  font-size: 12px;
  background-color: #ffdedf;
  border: 1px dotted #e4393c;
  cursor: pointer
}
.item-remarks-sum {
  padding-left: 8px;
  border-left: 1px solid #ccc
}
.item-remarks-sum p {
  color: #999999;
  font-size: 12px;
  line-height: 10px;
  text-align: center
}
.item-remarks-num {
  line-height: 18px;
  color: #005eb7
}
.item-select {
  display: flex;
  flex-direction: row;
  margin-top: 15px
}
.item-select-title {
  color: #999999;
  font-size: 14px;
  margin-right: 15px
}
.item-select-row {
  display: flex;
  flex-direction: row
}
.item-select-row {
  display: flex;
  flex-direction: row;
  margin-bottom: 5px
}
.item-select-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0px
}
.item-select-img {
  width: 36px
}
.item-select-box {
  padding: 5px;
  margin-right: 8px;
  background-color: #f7f7f7;
  border: 0.5px solid #ccc;
  cursor: pointer
}
.item-select-box:hover {
  border: 0.5px solid #e3393c
}
.item-select-box-active {
  border: 0.5px solid #e3393c
}
.item-select-img img {
  width: 100%
}
.item-select-intro p {
  margin: 0px;
  padding: 5px
}
.item-select-class {
  padding: 5px;
  margin-right: 8px;
  background-color: #f7f7f7;
  border: 0.5px solid #ccc;
  cursor: pointer
}
.item-select-class:hover {
  border: 0.5px solid #e3393c
}
.add-buy-car-box {
  width: 100%;
  margin-top: 15px;
  border-top: 1px dotted #ccc
}
.add-buy-car {
  margin-top: 15px
}
.seckill-head {
  width: 100%;
  height: 32px;
  background-color: #fe0851
}
.seckill-icon {
  width: 36px;
  height: 100%;
  float: left
}
.seckill-icon img {
  width: 24px;
  height: 24px;
  margin-top: 4px;
  margin-left: 10px;
  animation-name: shake-clock;
  animation-duration: 0.3s;
  animation-iteration-count: infinite /*设置无线循环*/
}
.seckill-text {
  width: 300px;
  height: 100%;
  float: left
}
.seckill-text .seckill-title {
  font-size: 14px;
  line-height: 32px;
  margin-left: 20px;
  color: #fff
}
.seckill-text .seckill-remarks {
  margin-left: 5px;
  font-size: 14px;
  color: #fff
}
/*倒计时*/
.count-down {
  height: 100%;
  margin-right: 20px;
  line-height: 32px;
  float: right
}
.count-down-text {
  color: #fff
}
.count-down-num {
  padding: 3px;
  border-radius: 5px;
  background-color: #440106;
  font-size: 14px;
  font-weight: bold;
  color: #f90013
}
.count-down-point {
  font-size: 14px;
  font-weight: bold;
  color: #440106
}
/******************商品图片及购买详情结束******************/
</style>
