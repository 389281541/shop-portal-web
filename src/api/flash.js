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

export function generateFlashOrder (path, data) {
  return request({
    url: '/flash/' + path + '/generateOrder',
    method: 'post',
    data: data
  })
}

export function fetchPath () {
  return request({
    url: '/flash/path/get',
    method: 'post'
  })
}
