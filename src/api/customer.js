import request from '@/utils/request'

export function registerCustomer (data) {
  return request({
    url: '/customer/register',
    method: 'post',
    data: data
  })
}

export function loginCustomer (data) {
  return request({
    url: '/customer/login',
    method: 'post',
    data: data
  })
}

export function logoutCustomer (data) {
  return request({
    url: '/customer/logout',
    method: 'post',
    data: data
  })
}
