/**
 * @description: 静态地址服务器地址
 * @param {type} 
 * @return {type} 
 */
import config from "@/config";
export default {
  data() {
    return {
      uploadURL: config.staticURL+"/upload",
      deleteURL: config.staticURL+"/delete"
    }
  },
}