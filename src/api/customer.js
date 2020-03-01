import request from '@/utils/request'

export function registerCustomer (data) {
  return request({
    url: '/customer/register',
    method: 'post',
    data: data
  })
}

export function login (data) {
  return request({
    url: '/customer/login',
    method: 'post',
    data: data
  })
}
