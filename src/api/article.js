import axios from '@/libs/api.request'

/**
 * 上传文件
 * @param data
 * @returns {*}
 */
export const uploadFile = (data) => {
  return axios.request({
    url: 'article/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
/**
 * 创建一篇文章
 * @param data
 * @returns {*}
 */
export const createOneArticle = (data) => {
  return axios.request({
    url: 'article/createOneArticle',
    method: 'post',
    data
  })
}
/**
 * 获取所有的文章
 * @param data
 * @returns {*}
 */
export const getAllArticle = (data) => {
  return axios.request({
    url: 'article/getAllArticle',
    method: 'get',
    params: data
  })
}
/**
 * 删除一篇文章
 * @param id
 * @returns {*}
 */
export const deleteOneArticle = (id) => {
  return axios.request({
    url: 'article/deleteOneArticle',
    method: 'post',
    data: {
      id
    }
  })
}
/**
 * 通过id查询文章，进行修改更新操作
 * @param id
 * @returns {*}
 */
export const querySingleArticle = (id) => {
  return axios.request({
    url: `article/${id}`,
    method: 'get',
  })
}
