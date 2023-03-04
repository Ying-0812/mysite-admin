import request from '@/utils/request'

//获取文章列表
export function getArticle(page = 1, limit = 10) {
  return request({
    url: '/api/blog',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}

//发布文章
export function addArticle(data) {
  return request({
    url: `/api/blog`,
    method: 'post',
    data
  })
}

//修改文章
export function updateArticle(editInfo) {
  return request({
    url: `/api/blog/${editInfo.id}`,
    method: 'put',
    data: editInfo.data
  })
}

//获取单个文章
export function getOncearticle(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'get'
  })
}

//删除文章
export function deleteArticle(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'delete',
  })
}

// 获取文章分类
export function getArticleSort() {
  return request({
    url: `/api/blogtype`,
    method: 'get',
  })
}

// 获取单个文章分类
export function getOnceArticle(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'get',
  })
}

//添加文章分类
export function addArticleSort(data) {
  return request({
    url: `/api/blogtype`,
    method: 'post',
    data
  })
}

//修改文章分类
export function updateArticleSort(editInfo) {
  return request({
    url: `/api/blogtype/${editInfo.id}`,
    method: 'put',
    data: editInfo.data
  })
}

//删除文章分类
export function deleteArticleSort(id) {
  return request({
    url: `/api/blogtype/${id}`,
    method: 'delete',
  })
}
