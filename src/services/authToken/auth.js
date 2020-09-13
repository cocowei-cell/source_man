/*
 * @Descripttion:
 * @Author: zzz
 * @Date: 2020-09-08 17:46:28
 * @LastEditors: zzz
 * @LastEditTime: 2020-09-08 17:50:25
 */
import request from "@/services/request";

export default function auth(token) {
 return request({
    url: "/api/others/auth",
    method: "POST",
    data: {
      token,
    },
  })
}
