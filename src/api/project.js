import request from '@/utils/request'

//获取项目列表
export function getProject() {
  return request({
    url: '/api/project',
    method: 'get',
  })
}

//修改项目
export function updateProject(editInfo) {
  return request({
    url: `/api/project/${editInfo.id}`,
    method: 'put',
    data: editInfo.data
  })
}

//新增项目
export function addProject(data) {
  return request({
    url: '/api/project',
    method: 'post',
    data
  })
}

//删除项目
export function delProject(id) {
  return request({
    url: `/api/project/${id}`,
    method: 'delete',
  })
}
