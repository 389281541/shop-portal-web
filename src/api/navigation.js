import request from '@/utils/request'

export function listItem (data) {
  return request({
    url: '/nav/listItem',
    method: 'post',
    data: data
  })
}

export function listAdvertise (data) {
  return request({
    url: '/nav/listAdvertise',
    method: 'post',
    data: data
  })
}
