<template>
  <div>
    <z-center width="78%">
      <el-card class="box-card" v-loading="waiting">
        <!-- 头部 -->
        <div class="nav">
          <p class="submit_title">请选择提交的学期</p>
          <el-select v-model="time" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item._id"
              :value="item.time"
              :disabled="!item.isOpen"
            >
            </el-option>
          </el-select>
          <el-button
            @click="refresh"
            class="btn_refresh"
            :loading="loading"
            type="primary"
            >刷新数据</el-button
          >
        </div>
        <!-- 未开启管理员权限 -->
        <div class="auth_admin" v-if="!isOpen">
          <el-alert
            class="alerts"
            title="提示"
            type="info"
            description="管理员未开启审核权限"
            show-icon
            :closable="false"
            :show-summary="true"
          >
          </el-alert>
        </div>
        <!-- 主体 -->
        <div class="container_submit" v-else>
          <!-- 资料提交 -->
          <el-table
            :data="submitInfo"
            style="width: 100%"
            stripe
            border
            max-height="690"
            v-loading="waiting"
          >
            <el-table-column prop="item_number" label="序号" width="180">
            </el-table-column>
            <el-table-column prop="description" label="描述" width="280">
            </el-table-column>
            <!-- input -->
            <el-table-column label="加分原因">
              <template slot-scope="reason">
                <el-input
                  type="textarea"
                  width="60"
                  v-model="reason.row.reason"
                  placeholder="加分原因"
                  :autosize="{ minRows: 1, maxRows: 3 }"
                  clearable
                ></el-input>
              </template>
            </el-table-column>
            <!-- input -->
            <el-table-column label="自评分数" width="120">
              <template slot-scope="self">
                <el-input
                  @input="totalScore"
                  width="60"
                  v-model="self.row.self_score"
                  placeholder="分数"
                ></el-input>
              </template>
            </el-table-column>
            <!-- 上传材料 -->
            <el-table-column label="材料(请上传图片类型文件)">
              <template slot-scope="proves">
                <el-upload
                  :action="uploadURL"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :on-success="handleSuccess"
                  :on-error="hadleError"
                  :headers="headers"
                  accept="image/png,image/jpeg"
                  multiple
                >
                  <el-button
                    size="small"
                    @click="handleUpload(proves.$index, proves.row.item_number)"
                    type="primary"
                    >点击上传</el-button
                  >
                </el-upload>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="fr submitForm" v-if="isOpen">
          <div style="display: inline-block; margin-right: 25px">
            合计分数:
            <span>{{ score }}</span>
          </div>
          <el-button class="btn" @click="submit" type="primary">提交</el-button>
        </div>
      </el-card>
    </z-center>
    <!-- 图片展示区域 -->
    <el-dialog title="材料" :visible.sync="dialogVisible" width="55%">
      <img :src="imgPath" />
    </el-dialog>
  </div>
</template>

<script>
import ZCenter from "@/components/content/z-center/z-center";
import request from "@/services/request";
import StaticURL from "@/mixin/staticURL"; 
import Mixin from "@/mixin/submitMixin"; //获取表格数据混入
export default {
  name: "z-submit",
  mixins: [Mixin,StaticURL],
  components: {
    ZCenter,
  },
  data() {
    return {
      submitInfo: [], //提交的表单
      options: [], //时间参数
      time: "", //提交的学期
      isOpen: false, //是否开启审核
      imgPath: "", //预览图片时的图片路径
      dialogVisible: false, //是否显示图片展示区域,
      itemNumber: "", //上传项目标号,
      score: 0, //上传时的总分数
      waiting: false,
      loading: false,
    };
  },
  methods: {
    //获取审核时间
    async getTime() {
      this.waiting = true;
      let res = await request({
        url: "/api/score/gettimes",
      });
      if (res.code == 200) {
        this.options = [];
        this.isOpen = false;
        this.time = "";
        this.options = res.time;
        //  如果所有的学期均未开启审核就显示提示信息
        for (let i = 0, len = this.options.length; i < len; i++) {
          if (this.options[i].isOpen == true) {
            this.isOpen = true;
            this.time = this.options[i].time;
            break;
          }
        }
      }
      this.waiting = false;
    },
    addToInfo(data) {
      let obj = {
        reason: "",
        pictures: [],
        self_score: 0,
      };
      this.submitInfo = [];
      // 追加到数组中
      data.forEach((item) => {
        this.submitInfo.push({
          ...obj,
          ...item,
        });
      });
    },
    handleSuccess(res) {
      // res为服务器返回的数据
      if (res.code == 200) {
        const file = res.files[0].url;
        //将返回的url地址保存到对应的项目中
        const form = this.submitInfo;
        const item_number = this.itemNumber;
        for (let i = 0, len = form.length; i < len; i++) {
          if (form[i].item_number === item_number) {
            form[i].pictures.push(file);
            break;
          }
        }
        this.$message.success("上传成功");
      } else {
        this.$message.error(res.msg);
      }
    },
    //上传失败
    hadleError() {
      this.$message.error("文件上传失败！");
    },
    //在删除之前的操作
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //处理删除文件
    async handleRemove(file) {
      const temp_path = file.response.files[0].temp_path;
      //删除文件
      let res = await request({
        url: this.deleteURL,
        method: "post",
        data: {
          temp_path,
        },
      });
      if (res.code == 200) {
        this.$message.success(res.msg);
      }
    },
    //点击预览功能
    handlePreview(file) {
      let path = file.response.files[0].url;
      this.imgPath = path;
      this.dialogVisible = true;
    },
    //点击上传时候传入项目标号
    handleUpload(index, num) {
      this.itemNumber = num;
    },
    //计算总分数
    totalScore() {
      let total_score = 0;
      this.submitInfo.forEach((v) => {
        //+号为将字符串数字转化为真正的数字
        total_score += +v.self_score;
      });
      this.score = total_score;
    },
    // 刷新数据
    async refresh() {
      //获取时间
      this.loading = true;
      await this.getTime();
      //获取表格结构
      await this.getInfo();
      this.loading = false;
    },
    //上传
    async submit() {
      if (+this.score === 0) {
        this.$message.warning("素质为0分不用提交哦，系统默认为0分");
        return;
      } else if (this.score.toString() == "NaN") {
        this.$message.warning("素质分数存在非法字符，请核查完毕再提交");
        return;
      }

      let tag = await this.$confirm(
        `是否提交表格，你提交的学期为：${this.time},自评分数为：${this.score}分`,
        "提交",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      //如果确认点击
      if (tag === "confirm") {
        const loading = this.$loading({
          lock: true,
          text: "提交中...^_^",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        //上传开始 处理提交的表单
        const submit_form = this.submitInfo;
        let res = await request({
          url: "/api/score/submit",
          method: "POST",
          data: {
            submit_form,
            time: this.time,
          },
        });
        //关闭遮罩层
        loading.close();
        if (res.code == 200) {
          this.$message.success("提交成功");
          this.$router.push({
            path: "/index/mysubmit",
            query: {
              time: this.time,
            },
          });
          //设置首页选项为3
          this.$store.commit("setHeaderIndex", "3");
        } else {
          this.$message.error(res.msg);
        }
      }
    },
  },
  computed: {
    headers() {
      //上传携带token
      return {
        token: sessionStorage.getItem("token"),
      };
    },
  },
  created() {
    //设置表头
    this.$store.commit("setHeaderIndex", "4");
    //获取时间
    this.getTime();
    //获取表格结构
    this.getInfo();
  },
};
</script>
<style scoped>
.auth_admin {
  width: 600px;
  margin: 0 auto;
  margin-top: 15px;
}
.nav {
  margin-top: 20px;
}
.submit_title {
  margin-bottom: 10px;
  font-size: 18px;
  color: #40b8ff;
  font-weight: bold;
}
.container_submit {
  margin-top: 20px;
}
img {
  width: 100%;
}
.box-card {
  margin-top: 8px;
  padding-bottom: 15px;
}
.submitForm {
  margin-top: 10px;
}
</style>
