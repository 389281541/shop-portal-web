import request from '@/utils/request'

export function createQrCodeImage (data) {
  return request({
    url: '/payment/createQrCodeImage',
    method: 'post',
    data: data
  })
}
