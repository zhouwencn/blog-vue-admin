import axios from '@/libs/api.request'

export const findAllCategory = () => {
  return axios.request({
    url: 'category/findAllCategory',
    method: 'get',
  })
}
