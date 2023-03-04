import request from '@/utils/request'

//获取评论列表
export function getReviews(page = 1, limit = 10) {
  return request({
    url: '/api/comment',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}

//删除评论
export function delReview(id) {
  return request({
    url: `/api/comment/${id}`,
    method: 'delete',
  })
}
