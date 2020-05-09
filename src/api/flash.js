import request from '@/utils/request'

export function fetchFlashThemeList (data) {
  return request({
    url: '/flash/theme/list',
    method: 'post',
    data: data
  })
}

export function generateFlashConfirmOrder (data) {
  return request({
    url: '/flash/generateFlashConfirmOrder',
    method: 'post',
    data: data
  })
}

export function goConfirmOrder (data) {
  return request({
    url: '/flash/goConfirmOrder',
    method: 'post',
    data: data
  })
}

export function generateFlashOrder (data) {
  return request({
    url: '/flash/generateOrder',
    method: 'post',
    data: data
  })
}
