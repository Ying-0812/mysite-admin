import request from '@/utils/request'

//登录
export function login(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}

//获取登录信息
export function getInfo() {
  return request({
    url: '/api/admin/whoami',
    method: 'get',
  })
}

//登出
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

//修改登录信息
export function updateAdmin(data) {
  return request({
    url: '/api/admin',
    method: 'put',
    data
  })
}