/*
 * @Descripttion:
 * @Author: zzz
 * @Date: 2020-09-03 13:39:06
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-08 18:05:37
 */
import axios from "axios";
import qs from "qs";
import config from "@/config";

/**
 * @description: 封装请求处理函数
 * @param {Object}
 * @return {Promise}
 */

function request(options) {
  const instance = axios.create({
    baseURL: config.mainURL,
    timeout: 8000,
  });
  //登录前的拦截器
  instance.interceptors.request.use((config) => {
    let token = sessionStorage.getItem("token");
    //自定义响应头一定要在后端配置res.header('Access-Allow-','token')
    if (token) {
      config.headers.token = token;
    }
    // 如果类型为上传路由，那么不进行序列化
    if (config.headers["Content-Type"] == "multipart/form-data") {
      config.data = options.data;
    } else {
      config.data = qs.stringify(options.data);
    }
    return config;
  });
  //响应后的拦截 对数据进行格式化
  instance.interceptors.response.use((response) => {
    return response.data;
  });

  return instance(options);
}

export default request;
