<template>
  <div class="shop-box">
    <div class="shop-container">
      <div class="shop-title">
        <div class="shop-title-icon">
          <Icon type="fireball"></Icon>
          <i class="fa fa-fire"></i>
        </div>
        <div class="shop-title-content">
          <div class="shop-logo">
            <router-link :to="{path:'/merchant', query:{ id: value.id}}"><img :src="value.avatar" alt="" style="vertical-align:middle"></router-link>
          </div>
          <router-link :to="{path:'/merchant', query:{ id: value.id}}"><div class="shop-name">{{ value.name }}</div></router-link>
        </div>
      </div>
      <div class="shop-another-item">
        <div class="shop-another-item-detail" v-for="(item, index) in value.newGoodsList" :key="index">
          <div class="shop-another-item-img">
            <img :src="item.coverImg" alt="">
          </div>
<!--          <div class="shop-anoter-item-intro">-->
<!--            <p>{{ item.name }}</p>-->
<!--          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopHeader',
  props: {
    value: Object
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
/* 店铺介绍 */
.shop-box {
  width: 100%;
  height: 120px;
  background-color: #484848
}

.shop-container {
  width: 80%;
  height: 100%;
  margin: 0px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #fff
}

.shop-title {
  display: flex;
  flex-direction: row
}

.shop-title-icon {
  font-size: 46px
}

.shop-title-content {
  padding-top: 8px;
  margin-left: 15px
}

.shop-title-content p {
  line-height: 26px;
  font-size: 20px
}

.shop-title-content a {
  color: #fff
}

.shop-another-item {
  display: flex;
  flex-direction: row
}

.shop-logo {
  width: 40px;
  height: 40px;
}

.shop-name {
  font-size:20px;
  font-style: inherit;
  margin-top:-35px;
  padding-left:60px
}

.shop-logo img {
  width: 100%;
  height: 100%;
}

.shop-another-item-detail {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 15px
}

.shop-another-item-img {
  height: 80px;
  border-radius: 40px;
  overflow: hidden
}

.shop-another-item-img img {
  width: 80px
}

.shop-anoter-item-intro {
  margin-left: 15px
}
</style>
