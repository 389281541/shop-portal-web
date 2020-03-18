import request from '@/utils/request'

export function addCart (data) {
  return request({
    url: '/cart/add',
    method: 'post',
    data: data
  })
}

export function fetchCartList (data) {
  return request({
    url: '/cart/list',
    method: 'post',
    data: data
  })
}

export function updateQuantity (data) {
  return request({
    url: '/cart/updateQuantity',
    method: 'post',
    data: data
  })
}

export function removeCart (data) {
  return request({
    url: '/cart/remove',
    method: 'post',
    data: data
  })
}
