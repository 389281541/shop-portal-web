import request from '@/utils/request'

export function fetchShopGoodsInfo (data) {
  return request({
    url: '/shop/goodsInfo',
    method: 'post',
    data: data
  })
}
