<template>
  <div>
    <div class="container">
      <i-input v-model="searchData" size="large" class="search" placeholder="输入你想查找的商品">
        <Button slot="append" icon="ios-search" @click="search"></Button>
      </i-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      searchData: '',
      promotionTags: ['买2免1', '领200神券', '199减100', '母婴5折抢', '充100送20']
    }
  },
  methods: {
    search () {
      this.$router.push({path: '/goodsList', query: { searchData: this.searchData }})
    }
  }
}
</script>

<style scoped>
.container {
  padding-top: 15px;
  margin: 0px auto;
  margin-bottom: 15px;
  width: 460px
}
.search {
  margin: 5px 0px
}
</style>
