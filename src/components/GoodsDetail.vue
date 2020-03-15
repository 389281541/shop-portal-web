<template>
  <div>
    <ShopHeader
      v-model="shopGoodsParam"
    ></ShopHeader>
    <!-- 商品信息展示 -->
    <ShowGoods
      v-model="goodsParam"
    ></ShowGoods>
    <!-- 商品详细展示 -->
    <ShowGoodsDetail
      v-model="goodsParam"
    ></ShowGoodsDetail>
    <Spin size="large" fix v-if="isLoading"></Spin>
  </div>
</template>

<script>
import Search from '@/components/Search'
import GoodsDetailNav from '@/components/nav/GoodsDetailNav'
import ShopHeader from '@/components/header/ShopHeader'
import ShowGoods from '@/components/goodsDetail/ShowGoods'
import ShowGoodsDetail from '@/components/goodsDetail/ShowGoodsDetail'
import {fetchShopGoodsInfo} from '@/api/shop'
import {getGoodsDetail} from '@/api/goods'

const defaultGoodsParam = {
  id: null,
  name: null,
  shop: null,
  minPrice: null,
  promotionType: null,
  promotionStartTime: null,
  promotionEndTime: null,
  masterImgUrl: null,
  photoList: [],
  spuParameters: [],
  fullReductionList: [],
  skuList: [],
  specNameList: [],
  coverImg: null,
  sale: null,
  hotGoodsList: []
}

const defaultShopGoodsParam = {
  id: null,
  name: null,
  avatar: null,
  newGoodsList: [],
  hotGoodsList: []
}

export default {
  name: 'GoodsDetail',
  beforeRouteEnter (to, from, next) {
    window.scrollTo(0, 0)
    next()
  },
  created () {
    this.isLoading = false
    this.id = this.$route.query.id
    getGoodsDetail({id: this.id}).then(response => {
      this.goodsParam = response.data
      this.shopId = this.goodsParam.shop.id
      fetchShopGoodsInfo({id: this.shopId}).then(response => {
        this.shopGoodsParam = response.data
        this.$set(this.goodsParam, 'hotGoodsList', this.shopGoodsParam.hotGoodsList)
      })
    })
  },
  data () {
    return {
      id: null,
      isLoading: true,
      shopId: null,
      goodsParam: Object.assign({}, defaultGoodsParam),
      shopGoodsParam: Object.assign({}, defaultShopGoodsParam),
      tagsColor: [ 'blue', 'green', 'red', 'yellow' ]
    }
  },
  components: {
    Search,
    ShopHeader,
    GoodsDetailNav,
    ShowGoods,
    ShowGoodsDetail
  }
}
</script>

<style scoped>
.shop-item-path {
  height: 38px;
  background-color: rgb(236, 235, 235);
  line-height: 38px;
  color: #2c2c2c
}
.shop-nav-container {
  margin: 0px auto;
  width: 80%
}
</style>
