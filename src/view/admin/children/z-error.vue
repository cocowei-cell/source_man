<template>
  <div>
    <!-- 头部区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>异议审核</el-breadcrumb-item>
      <el-breadcrumb-item>查看异议审核</el-breadcrumb-item>
      <z-refresh @click.native="refreshState"></z-refresh>
    </el-breadcrumb>
    <el-table
      class="table_"
      :data="errorInfo"
      style="width: 100%"
      stripe
      border
      max-height="690"
      v-loading="waiting"
      v-if="isOpenAdmin"
    >
      <el-table-column prop="item_id.along_time" label="所属学期">
      </el-table-column>
      <el-table-column prop="along_user.stu_number" label="学号">
      </el-table-column>
      <el-table-column prop="along_user.stu_name" label="姓名">
      </el-table-column>
      <el-table-column prop="item_id.description" label="描述">
      </el-table-column>
      <el-table-column prop="reason" label="异议原因"> </el-table-column>
      <el-table-column prop="item_id.self_score" label="自评分数">
      </el-table-column>
      <el-table-column prop="item_id.second.score" label="最终分数">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="oper">
          <el-button type="primary" @click="handleError(oper.row)">
            处理
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <z-close v-else />
    <!-- 错误信息展示框 -->
    <el-dialog :title="title" :visible.sync="dialogShown">
      <el-alert
        title="说明：你可以直接输入修改后的分数并点击提交按钮即可处理该项，若认为此项不应该被纠正，直接点击提交按钮即可"
        type="warning"
        effect="dark"
      />
      <el-form label-width="100px">
        <!-- 序号 -->
        <el-form-item label="序号:">
          <span>{{ dialogData.item_number }}</span>
        </el-form-item>
        <!-- 项目描述信息 -->
        <el-form-item label="项目描述:">
          <span>{{ dialogData.description }}</span>
        </el-form-item>
        <!-- 自评分数 -->
        <el-form-item label="自评分数:">
          <span>{{ dialogData.self_score }}</span>
        </el-form-item>
        <!-- 最终分数 -->
        <el-form-item label="最终分数:">
          <el-input
            v-model="dialogData.final_score"
            placeholder="最终分数"
          ></el-input>
        </el-form-item>
        <!-- 异议的原因 -->
        <el-form-item label="异议原因:">
          <span>{{ dialogData.dispute_reason }}</span>
        </el-form-item>
        <!-- 证明材料 -->
        <el-form-item label="查看提交材料:">
          <el-button @click="showPicture" type="primary">查看材料</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="fr" @click="handleErrorSubmit" type="primary"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 图片区域展示 -->
    <el-dialog :title="title" :visible.sync="pictureShown">
      <div class="img_show">
        <el-image
          v-for="url in pictures"
          :src="url"
          :key="url"
          :preview-src-list="pictures"
        ></el-image>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/services/request";
import AdminOpen from "@/mixin/getAdminOpen";
import ZRefresh from "./z-refresh";
import ZClose from "./z-close";
export default {
  name: "z-error",
  mixins: [AdminOpen],
  components: {
    ZClose,
    ZRefresh,
  },
  data() {
    return {
      // 错误信息对象
      errorInfo: [],
      //等待标记
      waiting: false,
      dialogData: {}, //错误信息展示框数据
      dialogShown: false,
      pictureShown: false,
      title: "",
      pictures: [],
    };
  },
  methods: {
    async getErrorItem() {
      let res = await request({
        url: "/api/admin/geterror",
      });
      if (res.code == 200) {
        this.errorInfo = [];
        this.errorInfo = res.data;
      }
      this.$store.dispatch("getCountError");
    },
    // 错误查看
    handleError({ along_user, item_id, is_checked, reason, _id }) {
      // 展示对话框
      this.dialogShown = true;
      this.title = `你正在处理${along_user.stu_number}${along_user.stu_name}的异议`;
      this.dialogData = {
        item_number: item_id.item_number,
        description: item_id.description,
        self_score: item_id.self_score,
        final_score: item_id.second.score,
        dispute_reason: reason,
        _id,
        item_id: item_id._id,
      };
      // 保存图片
      this.pictures = item_id.pictures;
    },
    // 证明材料展示 
    showPicture() {
      if (this.pictures.length === 0) {
        return this.$message.warning("无证明材料");
      }
      this.pictureShown = true;
    },
    refreshState() {
      this.getOpen();
      this.getErrorItem();
      this.$message.success("刷新成功");
    },
    // 处理提交
    async handleErrorSubmit() {
      const data = this.dialogData;
      let res = await request({
        url: "/api/admin/handledisputes",
        method: "put",
        data: {
          error_id: data._id,
          item_id: data.item_id,
          final_score: data.final_score,
        },
      });
      if (res.code == 200) {
        this.$message.success("修改成功");
        this.getErrorItem();
        // 重新获取错误数据数目
        this.$store.dispatch("getCountError");
      } else if (res.code == 402) {
        // 管理员关闭审核权限
        this.refreshState();
      } else {
        this.$message.error(res.msg);
      }
      this.dialogShown = false;
    },
  },
  created() {
    this.getErrorItem();
  }
};
</script>
<style scoped>
.table_ {
  margin-top: 20px;
}
.img_show {
  height: 600px;
  overflow: auto;
}
img {
  width: 100%;
  height: 100%;
}
</style>