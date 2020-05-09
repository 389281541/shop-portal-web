import request from '@/utils/request'

export function generateConfirmOrder (data) {
  return request({
    url: '/order/generateConfirmOrder',
    method: 'post',
    data: data
  })
}

export function generateOrder (data) {
  return request({
    url: '/order/generateOrder',
    method: 'post',
    data: data
  })
}

export function fetchOrderList (data) {
  return request({
    url: '/order/page',
    method: 'post',
    data: data
  })
}

export function removeOrder (data) {
  return request({
    url: '/order/remove',
    method: 'post',
    data: data
  })
}

export function getOrderDetail (data) {
  return request({
    url: '/order/get',
    method: 'post',
    data: data
  })
}

export function getOrderStatus (data) {
  return request({
    url: '/order/status',
    method: 'post',
    data: data
  })
}
