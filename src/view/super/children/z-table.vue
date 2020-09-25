<template>
  <div>
    <!-- 头部区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>表格管理</el-breadcrumb-item>
      <el-breadcrumb-item>表单项添加</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主区域 -->
    <div class="main">
      <!-- 左边区域 -->
      <div class="left">
        <el-form label-width="80px">
          <el-form-item label="项目编号">
            <el-input
              v-model="item.item_number"
              placeholder="请输入项目编号"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目描述">
            <el-input
              v-model="item.description"
              placeholder="请输入项目描述"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="addItem" type="primary">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 右边区域 -->
      <div class="right">
        <el-table
          :data="itemInfo"
          style="width: 100%"
          stripe
          border
          max-height="690"
          v-loading="waiting"
        >
          <el-table-column prop="item_number" label="编号" width="120">
          </el-table-column>
          <el-table-column prop="description" label="描述信息">
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="oper">
              <el-button type="primary" @click="edit(oper.row)">
                修改信息
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 用户信息展示区域 -->
        <el-dialog :title="diaTitle" :visible.sync="showDialog" width="55%">
          <el-alert
            title="要删除该项，请将项目编号置为空即可"
            type="warning"
            effect="dark"
          >
          </el-alert>
          <el-form class="form_dia" label-width="80px">
            <el-form-item label="项目编号:">
              <el-input
                v-model="dialogData.item_number"
                placeholder="编号为空默认删除该项"
              ></el-input>
            </el-form-item>
            <el-form-item label="描述信息:">
              <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 3 }"
                v-model="dialogData.description"
                placeholder="描述信息"
              ></el-input>
            </el-form-item>
            <el-form-item class="submit_btn">
              <el-button class="fr" @click="submit" type="primary"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 分页 -->
        <el-pagination
          class="pagination"
          @current-change="currentHandler"
          background
          layout="prev, pager, next"
          :total="pageData.total"
          :page-size="pageData.size"
          :current-page.sync="currentPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/services/request";
export default {
  name: "z-auth",
  data() {
    return {
      // 添加当前的条目
      item: {
        item_number: "",
        description: "",
      },
      itemInfo: [],
      waiting: false,
      pageData: {},
      currentPage: 1,
      dialogData: {}, //会话框的信息
      showDialog: false,
      diaTitle: "",
    };
  },
  methods: {
    // 获取表单项
    async getItem(page) {
      let res = await request({
        url: "/api/super/getitems/" + page,
      });
      if (res.code == 200) {
        let { result } = res;
        this.itemInfo = result.records;
        this.pageData.total = result.total;
        this.pageData.size = result.size;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 添加项目
    async addItem() {
      let { item_number, description } = this.item;
      if (item_number.trim() === "") {
        this.$message.error("请输入项目序号！");
        return;
      }
      if (description.trim() === "") {
        this.$message.error("请输入项目描述信息！");
        return;
      }
      let res = await request({
        url: "/api/super/additems",
        method: "POST",
        data: {
          item_number,
          description,
        },
      });
      if (res.code == 200) {
        this.$message.success("添加成功");
        this.item.item_number = "";
        this.item.description = "";
        this.getItem(this.currentPage);
      } else {
        this.$message.error(res.msg);
      }
    },
    // 当前页面的处理函数
    currentHandler(page) {
      this.currentPage = page;
      this.getItem(page);
    },
    // 编辑处理函数
    edit({ _id, description, item_number }) {
      this.showDialog = true;
      this.diaTitle = `项目编号：${item_number}`;
      this.dialogData = {
        _id,
        description,
        item_number,
      };
    },
    // 修改信息
    async submit() {
      let { _id, description, item_number } = this.dialogData;
      this.waiting = true;
      let res = await request({
        url: "/api/super/modifyitems/" + _id,
        method: "put",
        data: {
          item_number,
          description,
        },
      });
      if (res.code === 200) {
        this.$message.success(res.msg);
        this.showDialog = false;
        this.getItem(this.currentPage);
      } else {
        this.$message.error(res.msg);
      }
      this.waiting = false;
    },
  },
  created() {
    // 页面刚创建就获取项目
    this.getItem(1);
  },
};
</script>
<style scoped>
.main {
  display: flex;
  margin-top: 20px;
}
.left {
  flex: 6;
}
.right {
  flex: 10;
  margin-left: 10px;
}
.pagination {
  position: absolute;
  bottom: 20px;
}
.form_dia {
  margin-top: 10px;
}
</style>