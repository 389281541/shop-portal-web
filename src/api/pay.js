import request from '@/utils/request'

export function goPay (data) {
  return request({
    url: '/aliPay/goPay',
    method: 'post',
    data: data
  })
}

export function alipayCallback (data) {
  return request({
    url: '/aliPay/callback',
    method: 'post',
    data: data
  })
}
