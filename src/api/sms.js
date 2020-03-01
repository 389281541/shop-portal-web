import request from '@/utils/request'

export function sendSms (data) {
  return request({
    url: '/sms/send',
    method: 'post',
    data: data
  })
}

export function verifySms (data) {
  return request({
    url: '/sms/verify',
    method: 'post',
    data: data
  })
}
