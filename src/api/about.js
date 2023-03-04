import request from '@/utils/request'

//获取关于我的URL
export function getAboutMe() {
  return request({
    url: '/api/about',
    method: 'get',
  })
}

//设置关于我的URL
export function setAboutMe(data) {
  return request({
    url: `/api/about`,
    method: 'post',
    data
  })
}