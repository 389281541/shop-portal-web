import request from '@/utils/request'

export function fetchAddressList (data) {
  return request({
    url: '/customerAddress/list',
    method: 'post',
    data: data
  })
}

export function updateAddress (data) {
  return request({
    url: '/customerAddress/update',
    method: 'post',
    data: data
  })
}

export function addAddress (data) {
  return request({
    url: '/customerAddress/add',
    method: 'post',
    data: data
  })
}

export function getAddress (data) {
  return request({
    url: '/customerAddress/get',
    method: 'post',
    data: data
  })
}

export function removeAddress (data) {
  return request({
    url: '/customerAddress/remove',
    method: 'post',
    data: data
  })
}

export function listAddress (data) {
  return request({
    url: '/customerAddress/list',
    method: 'post',
    data: data
  })
}

export function setDefaultAddress (data) {
  return request({
    url: '/customerAddress/setDefault',
    method: 'post',
    data: data
  })
}
