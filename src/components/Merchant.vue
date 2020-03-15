<template>
  <div>
    <ShopHeader
      v-model="shopGoodsParam"
    ></ShopHeader>
    <div class="goods-container">
      <div class="goods-list">
        <div class="goods-show-info" v-for="(item, index) in goodsList" :key="index">
          <div class="goods-show-img">
            <router-link :to="{path:'/goodsDetail', query:{ id: item.id}}"><img :src="item.coverImg"/></router-link>
          </div>
          <div class="goods-show-price">
            <span>
              <Icon type="social-yen text-danger"></Icon>
              <span class="seckill-price text-danger">￥{{item.minPrice.toFixed(2)}}</span>
            </span>
          </div>
          <div class="goods-show-detail">
            <span>{{item.name}}</span>
          </div>
          <div class="goods-show-num">
            已有<span>{{item.sale}}</span>人购买
          </div>
        </div>
      </div>
      <div class="goods-page">
        <Page :total="total" :current="listQuery.pageNum" :page-size="listQuery.pageSize" @change="handlePageChange()"></Page>
      </div>
    </div>
  </div>
</template>

<script>
import ShopHeader from '@/components/header/ShopHeader'
import {fetchGoodsList} from '@/api/goods'
import {fetchShopGoodsInfo} from '@/api/shop'
const defaultShopGoodsParam = {
  id: null,
  name: null,
  avatar: null,
  newGoodsList: [],
  hotGoodsList: []
}
export default {
  name: 'Merchant',
  created () {
    this.listQuery.shopId = this.$route.query.id
    this.getGoodsList()
    this.getShopGoods()
  },
  data () {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 20,
        shopId: null
      },
      goodsList: [],
      total: null,
      shopGoodsParam: Object.assign({}, defaultShopGoodsParam)
    }
  },
  methods: {
    getGoodsList () {
      fetchGoodsList(this.listQuery).then(response => {
        this.goodsList = response.data.records
        this.total = response.data.total
      })
    },
    getShopGoods () {
      fetchShopGoodsInfo({id: this.listQuery.shopId}).then(response => {
        this.shopGoodsParam = response.data
      })
    },
    handlePageChange (i) {
      this.listQuery.pageNum = i
      this.getGoodsList()
    }
  },
  components: {
    ShopHeader
  }
}
</script>

<style scoped>
.text-danger {
  color: #A94442
}
.seckill-price{
  margin-right: 5px;
  font-size: 25px;
  font-weight: bold
}
.goods-container {
  margin: 15px auto;
  width: 80%
}
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between
}
.goods-show-info{
  width: 240px;
  padding: 10px;
  margin: 15px 0px;
  border: 1px solid #fff;
  cursor: pointer
}
.goods-show-img {
  width: 220px;
  height: 220px;
  margin: 0px auto
}

.goods-show-img img {
  width: 100%;
  height: 100%;
}
.goods-show-info:hover{
  border: 1px solid #ccc;
  box-shadow: 0px 0px 15px #ccc
}
.goods-show-price{
  margin-top: 6px
}
.goods-show-detail{
  font-size: 12px;
  margin: 6px 0px
}
.goods-show-num{
  font-size: 12px;
  margin-bottom: 6px;
  color: #009688
}
.goods-show-num span{
  color: #005AA0;
  font-weight: bold
}
.goods-show-seller{
  font-size: 12px;
  color:#E4393C
}
.goods-page {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end
}
</style>
