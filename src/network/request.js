//封装网络请求
import axios from 'axios'

export function request(config) {
  //1穿甲axios实例
    const instance = axios.create({
      baseURL: 'http://timemeetyou.com:8889/api/private/v1/',
      timeout: 5000
    })

  //2axios拦截器
      //2.1请求拦截
    instance.interceptors.request.use(config => {
      return config
    }, err => {
      console.log(err);
    })
    //2.2响应拦截
    instance.interceptors.response.use(res => {
     return res.data;
    },err => {
      console.log(err);
    })
    //3.发送真正的网络请求
    return instance(config)
  }