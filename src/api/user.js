// 我们所有的用户请求接口都会写在这里
// 首先我们要进行数据请求就必须把我们封装好的axios数据请求方法导入进来
// 我们已经在request文件暴露了一个数据请求对象了，此时我们直接导入该方法即可
import request from '@/utils/request'
// 导入该函数之后我们需要设置登录操作的请求接口
// 我们设置哪个接口直接按需导出即可，这样用的时候直接按需导入即可
// 因为我们是一个登录操作需要把登录信息提交给服务器端，此时我们的请求方式是post
// 请求参数我们需要在登录的时候把表单信息导入进来即可
// 登录页面的请求接口
export const login = (loginData) => {
  return request('/app/v1_0/authorizations', 'post', loginData)
}
