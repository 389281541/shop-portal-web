import request from '@/utils/request'

export function fetchGoodsList (data) {
  return request({
    url: '/goods/page',
    method: 'post',
    data: data
  })
}

export function fetchRecommendGoodsList (data) {
  return request({
    url: '/goods/listRecommend',
    method: 'post',
    data: data
  })
}

export function getGoodsDetail (data) {
  return request({
    url: '/goods/get',
    method: 'post',
    data: data
  })
}
