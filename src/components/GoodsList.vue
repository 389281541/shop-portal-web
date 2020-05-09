<template>
  <div>
    <Search></Search>
    <GoodsListNav></GoodsListNav>
    <div class="container">
      <div class="bread-crumb">
        <Breadcrumb>
          <BreadcrumbItem to="/goodsList">
            <Icon type="ios-home-outline"></Icon> 全部商品
          </BreadcrumbItem>
          <BreadcrumbItem to="/goodsList?searchData=">
            <Icon type="bag"></Icon> {{searchLabel}}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <!-- 商品标签导航 -->
<!--      <GoodsClassNav></GoodsClassNav>-->
      <!-- 商品展示容器 -->
      <div class="goods-box">
        <div class="as-box">
          <div class="item-as-title">
            <span>商品精选</span>
            <span>广告</span>
          </div>
          <div class="item-as" v-for="(item,index) in recommendGoodsList" :key="index">
            <div class="item-as-img">
              <router-link :to="{path:'/goodsDetail', query:{ id: item.id }}"><img :src="item.coverImg" alt=""></router-link>
            </div>
            <div class="item-as-price">
              <span>
                <span class="seckill-price text-danger">￥{{item.minPrice.toFixed(2)}}</span>
              </span>
            </div>
            <div class="item-as-intro font-color">
              <router-link :to="{path:'/goodsDetail', query:{ id: item.id }}"><span  class="font-color">{{item.name}}</span></router-link>
            </div>
            <div class="item-as-selled">
              已有<span>{{item.sale}}</span>人购买
            </div>
          </div>
        </div>
        <div class="goods-list-box">
          <div class="goods-list-tool">
            <ul>
              <li v-for="(item,index) in goodsTool" :key="index" @click="sortBy(item.en, index)"><span :class="{ 'goods-list-tool-active': isAction[index]}">{{item.title}} <Icon :type="icon[index]"></Icon></span></li>
            </ul>
          </div>
          <div class="goods-list">
            <div class="goods-show-info" v-for="(item, index) in goodsList" :key="index">
              <div class="goods-show-img">
                <router-link :to="{path:'/goodsDetail', query:{ id: item.id }}"><img :src="item.coverImg"/></router-link>
              </div>
              <div class="goods-show-price">
                <span>
                  <span class="seckill-price text-danger">￥{{item.minPrice.toFixed(2)}}</span>
                </span>
              </div>
              <div class="goods-show-detail" >
                <router-link :to="{path:'/goodsDetail', query:{ id: item.id }}"><span class="font-color">{{item.name}}</span></router-link>
              </div>
              <div class="goods-show-num">
                已有<span>{{item.sale}}</span>人购买
              </div>
              <div class="goods-show-seller">
                <span>{{item.shop.name}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="goods-page">
        <Page :total="total" :current="listQuery.pageNum" :page-size="listQuery.pageSize" @on-change="handlePageChange"></Page>
      </div>
    </div>
    <Spin size="large" fix v-if="listLoading"></Spin>
  </div>
</template>

<script>
import Search from '@/components/Search'
import GoodsListNav from '@/components/nav/GoodsListNav'
import GoodsClassNav from '@/components/nav/GoodsClassNav'
import { fetchGoodsList, fetchRecommendGoodsList } from '@/api/goods'

export default {
  name: 'GoodsList',
  beforeRouteEnter (to, from, next) {
    window.scrollTo(0, 0)
    next()
  },
  data () {
    return {
      listQuery: {
        pageNum: 1,
        pageSize: 16,
        itemId: null,
        sortBy: null,
        sortType: null
      },
      total: null,
      searchItem: null,
      searchLabel: '',
      goodsList: [],
      listLoading: false,
      recommendGoodsList: [],
      sortTypeArr: ['asc', 'desc', 'asc'],
      isAction: [ true, false, false ],
      icon: [ 'arrow-up-a', 'arrow-down-a', 'arrow-down-a' ],
      goodsTool: [
        {title: '综合', en: 'sortId'},
        {title: '销量', en: 'sale'},
        {title: '价格', en: 'minPrice'}
      ]
    }
  },
  methods: {
    sortBy (data, index) {
      console.log(data)
      this.icon = [ 'arrow-down-a', 'arrow-down-a', 'arrow-down-a' ]
      this.isAction = [ false, false, false ]
      this.isAction[index] = true
      this.icon[index] = 'arrow-up-a'
      this.listQuery.sortBy = data
      this.listQuery.sortType = this.sortTypeArr[index]
      this.getGoodsList()
    },
    getRecommendGoodsList () {
      this.listLoading = true
      fetchRecommendGoodsList({itemId: this.searchItem}).then(response => {
        this.listLoading = false
        this.recommendGoodsList = response.data
      })
    },
    getGoodsList () {
      fetchGoodsList(this.listQuery).then(response => {
        this.goodsList = response.data.records
        this.total = response.data.total
      })
    },
    handlePageChange (i) {
      this.listQuery.pageNum = i
      this.getGoodsList()
    }
  },
  created () {
    this.listQuery.pageNum = 1
    this.listQuery.sortBy = 'sortId'
    this.listQuery.sortType = 'asc'
    this.searchItem = this.$route.query.searchItem
    this.getRecommendGoodsList()
    this.getGoodsList()
  },
  mounted () {
    this.searchLabel = this.$route.query.searchLabel
    this.listQuery.itemId = this.$route.query.searchItem
  },
  components: {
    Search,
    GoodsListNav,
    GoodsClassNav
  }
}
</script>

<style scoped>
.container {
  margin: 15px auto;
  width: 93%;
  min-width: 1000px
}
.text-danger {
  color: #A94442
}
.seckill-price{
  margin-right: 5px;
  font-size: 25px;
  font-weight: bold
}
.goods-box {
  margin-top: 20px;
  display: flex
}
/* ---------------侧边广告栏开始------------------- */
.as-box {
  width: 200px;
  border: 1px solid #ccc
}
.item-as-title {
  width: 100%;
  height: 36px;
  color: #B1191A;
  line-height: 36px;
  font-size: 18px
}
.item-as-title span:first-child{
  margin-left: 20px
}
.item-as-title span:last-child{
  float: right;
  margin-right: 15px;
  font-size: 10px;
  color: #ccc
}
.item-as{
  width: 160px;
  margin: 18px auto
}
.item-as-img{
  width: 160px;
  height: 160px;
  margin: 0px auto
}
.item-as-img img {
  width: 100%;
  height: 100%;
}
.item-as-price span{
  font-size: 18px
}
.item-as-intro{
  margin-top: 5px;
  font-size: 12px
}
.item-as-selled{
  margin-top: 5px;
  font-size: 12px
}
.item-as-selled span{
  color: #005AA0
}
/* ---------------侧边广告栏结束------------------- */

/* ---------------商品栏开始------------------- */
.goods-list-box {
  margin-left: 15px;
  width: calc(100% - 215px)
}
.goods-list-tool {
  width: 100%;
  height: 38px;
  border: 1px solid #ccc;
  background-color: #F1F1F1
}
.goods-list-tool ul {
  padding-left: 15px;
  list-style: none
}
.goods-list-tool li {
  cursor: pointer;
  float: left
}
.goods-list-tool span {
  padding: 5px 8px;
  border: 1px solid #ccc;
  border-left: none;
  line-height: 36px;
  background-color: #fff
}
.goods-list-tool span:hover {
  border: 1px solid #E4393C
}
.goods-list-tool i:hover {
  color: #E4393C
}
.goods-list-tool-active {
  color: #fff;
  border-left: 1px solid #ccc;
  background-color: #E4393C !important
}

.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between
}
.goods-show-info {
  width: 240px;
  padding: 10px;
  margin: 15px 0px;
  border: 1px solid #fff;
  cursor: pointer
}
.goods-show-info:hover {
  border: 1px solid #ccc;
  box-shadow: 0px 0px 15px #ccc
}
.goods-show-price {
  margin-top: 6px
}
.goods-show-detail{
  font-size: 12px;
  margin: 6px 0px
}
.goods-show-num {
  font-size: 12px;
  margin-bottom: 6px;
  color: #009688
}
.goods-show-num span {
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
.goods-show-img {
  width: 220px;
  height: 220px;
  margin: 0px auto
}

.goods-show-img img {
  width: 100%;
  height: 100%;
}

.font-color {
  color: #495060;
}
/* ---------------商品栏结束------------------- */
</style>
