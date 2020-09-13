const env = "dev"; //设置开发环境
const devURL = "http://localhost:3000";
const proURL = "";
const BaseURL = env === "dev" ? devURL : proURL;
export { BaseURL };

//     import request from "@/services/request"
