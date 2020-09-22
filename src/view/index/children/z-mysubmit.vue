<template>
  <div>
    <z-center width="78%" class="my_submit">
      <el-card>
        <div class="nav">
          <p class="submit_title">选择筛选的学期</p>
          <el-select v-model="time" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item._id"
              :value="item.time"
            >
            </el-option>
          </el-select>
          <el-button class="btn" type="primary" @click="slectForm"
            >筛选</el-button
          >
          <span class="time_over" :class="{ time_over_active: !isOpen }">{{
            timeOver
          }}</span>
          <!-- <span class="fr">最终总分:{{ 15 }}</span>
          <span class="fr">第一审核人总分:{{ 15 }}</span> -->
          <span class="fr">自评总分:{{ totalScore }}</span>
        </div>
        <!-- 资料提交 -->
        <el-table
          class="tables"
          :data="submitInfo"
          style="width: 100%"
          stripe
          border
          max-height="690"
          v-loading="tagLod"
        >
          <!-- 序号 -->
          <el-table-column prop="item_number" label="序号" width="180">
          </el-table-column>
          <!-- 描述 -->
          <el-table-column prop="description" label="描述" width="280">
          </el-table-column>
          <!-- 加分原因 -->
          <el-table-column prop="reason" label="加分原因"> </el-table-column>
          <!-- 自评分数 -->
          <el-table-column prop="self_score" label="自评分数" width="120">
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" width="260">
            <template slot-scope="scope">
              <el-button @click="show(scope.row)" type="primary"
                >查看</el-button
              >
              <el-button
                @click="edit(scope.row)"
                type="warning"
                :disabled="!isOpen"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </z-center>

    <!-- 编辑该项目 -->

    <el-dialog
      :title="showEdit.itemNumber"
      :visible.sync="showEdit.dialogVisibleEdit"
      width="55%"
    >
      <!-- 审核表单 -->
      <el-form :model="editForm" status-icon label-width="100px">
        <el-alert
          title="如果这个小项你已经上传过了，请不要重复上传相同的图片材料，上传你需要添加的即可，如想查看自己上传了哪些本项的图片，请点击蓝色查看按钮"
          type="warning"
          effect="dark"
        >
        </el-alert>
        <el-form-item label="序号:">
          <span>{{ editForm.item_number }}</span>
        </el-form-item>
        <el-form-item label="描述:">
          <span>{{ editForm.description }}</span>
        </el-form-item>
        <el-form-item label="加分原因">
          <el-input
            type="text"
            v-model="editForm.reason"
            autocomplete="off"
            placeholder="请输入加分原因"
          ></el-input>
        </el-form-item>
        <!-- 自评分数 -->
        <el-form-item label="自评分数">
          <el-input
            type="text"
            v-model="editForm.self_score"
            placeholder="请输入自评分数"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 提交 -->
        <el-form-item label="上传的材料">
          <el-upload
            action="http://localhost:3001/upload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="handleSuccess"
            :on-error="hadleError"
            :headers="headers"
            accept="image/png,image/jpeg"
            multiple
            ref="upload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button class="fr" @click="submitEdit" type="primary">
            提交
          </el-button>
        </el-form-item>
        <!-- 上传图片 -->
      </el-form>
    </el-dialog>

    <!-- 展示当前项目信息 -->
    <el-dialog
      :title="showItem.itemNumber"
      :visible.sync="showItem.dialogVisibleShow"
      width="55%"
    >
      <el-image
        :src="showItem.imgPath[0]"
        :preview-src-list="showItem.imgPath"
      ></el-image>
    </el-dialog>
    <!-- 展示上传的图片 -->
    <el-dialog title="材料" :visible.sync="dialogVisible" width="55%">
      <img :src="imgPath" alt="上传的图片" />
    </el-dialog>
  </div>
</template>

<script>
import ZCenter from "@/components/content/z-center/z-center";
import request from "@/services/request";
import Mixin from "@/mixin/submitMixin"; //获取表格数据 混入
export default {
  name: "z-mysubmit",
  mixins: [Mixin],
  components: {
    ZCenter,
  },
  data() {
    return {
      options: [], //获取时间
      time: "",
      isOpen: false,
      //展示项目
      showItem: {
        dialogVisibleShow: false,
        itemNumber: "",
        imgPath: [],
      },
      //展示编辑页面
      showEdit: {
        dialogVisibleEdit: false,
        itemNumber: "",
      },
      //编辑的表单项
      editForm: {
        _id: "",
        item_number: "",
        description: "",
        reason: "",
        self_score: 0,
        pictures: [],
      },
      submitInfo: [], //用户对应的数据
      imgPath: "~@/assets/img/zhanwei.jpg", //上传时点击查看的文件图片
      dialogVisible: false, //弹框是否弹出
      tagLod: false,
    };
  },
  methods: {
    async getTime() {
      let timeTag = sessionStorage.getItem("time");
      //从服务器重新请求
      if (!timeTag) {
        let res = await request({
          url: "/api/score/gettimes",
        });
        if (res.code == 200) {
          this.options = res.time;
          sessionStorage.setItem("time", JSON.stringify(res.time));
        }
      } else {
        this.options = JSON.parse(timeTag);
      }
    },
    //获取筛选的学期，请求对应的数据

    async slectForm() {
      let time = this.time;
      if (time === "") {
        return;
      }
      this.tagLod = true;
      this.options.some((v) => {
        if (v.time === time) {
          this.isOpen = v.isOpen;
          return false;
        }
      });
      //请求对应的数据
      let res = await request({
        url: "/api/score/getitems/" + time,
      });
      //混合数据表格
      //提交表格置为空
      this.submitInfo = [];
      if (res.data.length === 0) {
        this.tagLod = false;
        return;
      }
      // 重新获取提交表格
      this.getInfo();
      //获取时间是否过期
      // console.log(res);
      res.data.forEach((v) => {
        let item_number = v.item_number;
        this.submitInfo.some((item) => {
          if (item.item_number == item_number) {
            item.self_score = v.self_score;
            item.reason = v.reason;
            item.pictures = v.pictures;
            item._id = v._id;
            item.self_score = v.self_score;
            return false;
          }
        });
      });
      this.tagLod = false;
    },
    addToInfo(data) {
      this.submitInfo = [];
      let obj = {
        reason: "",
        pictures: [],
        self_score: 0,
      };
      // 追加到数组中
      data.forEach((item) => {
        this.submitInfo.push({
          ...obj,
          ...item,
        });
      });
    },
    //查看对应的项目
    show(id) {
      this.showItem = {
        dialogVisibleShow: true,
        itemNumber: `项目编号:${id.item_number}（点击图片查看大图）`,
        imgPath: id.pictures,
      };
    },
    //清除文件列表
    clearUpload() {
      this.$refs.upload.clearFiles();
    },
    //编辑
    edit({ item_number, description, reason, self_score, pictures, _id }) {
      this.showEdit = {
        dialogVisibleEdit: true,
        itemNumber: `项目编号:${item_number} (如果想删除该项目，请将自评分数置为0)`,
      };
      this.editForm = {
        _id,
        item_number,
        description,
        reason,
        self_score,
        pictures,
      };
    },
    //提交
    async submitEdit() {
      //判断分数是否为非数字
      let form = this.editForm;
      //如果分数非数字
      if (Number(form.self_score).toString() == "NaN") {
        return this.$message.error("分数中含有非法字符");
      } else if (form.self_score === "") {
        return this.$message.error("请输入分数");
      }
      //原因为空
      if (form.reason.trim() === "") {
        return this.$message.error("请输入加分原因");
      }
      let res = await request({
        url: "/api/score/modifyitems",
        method: "put",
        data: {
          item_id: form._id,
          reason: form.reason,
          pictures: form.pictures,
          self_score: +form.self_score,
          time: this.time,
          item_number: form.item_number,
        },
      });
      if (res.code == 200) {
        //提交表单
        this.showEdit.dialogVisibleEdit = false;
        this.$message.success("提交成功");
        //重新获取表单数据
        this.slectForm();
        this.clearUpload();
      } else {
        this.$message.error(res.msg);
      }
    },

    //上传成功
    handleSuccess(res) {
      // res为服务器返回的数据
      if (res.code == 200) {
        const file = res.files[0].url;
        //将返回的url地址保存到对应的项目中
        this.editForm.pictures.push(file);
        this.$message.success("上传成功");
      } else {
        this.$message.error(res.msg);
      }
    },
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
        url: "http://localhost:3001/delete",
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
  },
  computed: {
    timeOver() {
      let result = this.isOpen == false ? "已关闭提交权限" : "未审核";
      return result;
    },
    headers() {
      //上传携带token
      return {
        token: sessionStorage.getItem("token"),
      };
    },
    totalScore() {
      let total = 0;
      this.submitInfo.forEach((v) => {
        total += v.self_score;
      });
      return total;
    },
  },
  created() {
    this.$store.commit("setHeaderIndex", "3");
    this.getTime();
    //获取从刚提交那里的时间
    let time = this.$route.query.time;
    if (time) {
      this.time = time;
      this.slectForm();
    }
  },
};
</script>
<style scoped>
.my_submit {
  margin-top: 8px !important;
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
.box-card {
  margin-top: 8px;
  padding-bottom: 15px;
}
.btn {
  margin-left: 10px;
}
.tables {
  margin-top: 20px;
}
.time_over_active {
  color: #f56c6c !important;
}
.time_over {
  margin-left: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #909399;
}
.image {
  overflow: auto;
  height: 600px;
}
img {
  width: 100%;
}
span.fr {
  margin-right: 20px;
  padding: 15px;
}
</style>