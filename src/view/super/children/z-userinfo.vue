<template>
  <div>
    <!-- 头部区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体部分 -->
    <div class="main">
      <div class="search">
        <el-input
          v-model="stu_num"
          placeholder="请输入要查询用户的学号"
        ></el-input>
        <el-button
          @click="getOneInfo"
          icon="el-icon-search"
          class="search_btn"
          type="primary"
        ></el-button>
      </div>
      <div class="table">
        <!-- 用户信息展示 -->
        <el-table
          :data="userInfo"
          style="width: 100%"
          stripe
          border
          max-height="690"
          v-loading="waiting"
        >
          <el-table-column prop="stu_number" label="学号"> </el-table-column>
          <el-table-column prop="stu_name" label="姓名"> </el-table-column>
          <el-table-column prop="stu_class" label="班级"> </el-table-column>
          <el-table-column prop="stu_email" label="邮箱"> </el-table-column>
          <el-table-column prop="role" label="角色"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="oper">
              <el-button type="primary" @click="show(oper.row)">
                修改信息
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 用户信息展示区域 -->
    <el-dialog :title="diaTitle" :visible.sync="diaShow" width="55%">
      <el-form label-width="80px">
        <el-form-item label="学号:">
          <span>{{ dialogData.stu_number }}</span>
        </el-form-item>
        <el-form-item label="姓名:">
          <span>{{ dialogData.stu_name }}</span>
        </el-form-item>
        <el-form-item label="班级:">
          <el-input
            v-model="dialogData.stu_class"
            placeholder="班级"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input
            v-model="dialogData.stu_email"
            placeholder="邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色:">
          <el-select v-model="dialogData.role" placeholder="角色信息">
            <el-option
              v-for="item in options"
              :key="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <span
            style="margin-left:15px;">normal为普通用户，admin为普通审核人，super为超级管理员(可以设置其他人的权限)</span
          >
        </el-form-item>
        <el-form-item class="submit_btn">
          <el-button class="fr" @click="submit" type="primary">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
</template>

<script>
import request from "@/services/request";
export default {
  name: "z-userinfo",
  data() {
    return {
      stu_num: "",
      currentPage: 1,
      userInfo: [],
      waiting: false,
      diaTitle: "",
      diaShow: false,
      options: [
        {
          value: "normal",
        },
        {
          value: "admin",
        },
        {
          value: "super",
        },
      ],
      dialogData: {}, //对话框信息展示
      pageData: {}, //分页展示信息
    };
  },
  methods: {
    // 数据信息展示
    show({ stu_number, stu_name, _id, role, stu_class, stu_email }) {
      this.diaTitle = stu_number + stu_name;
      this.diaShow = true;
      this.dialogData = {
        stu_number,
        stu_name,
        _id,
        stu_class,
        stu_email,
        role,
      };
    },
    currentHandler(page) {
      this.getAllUsers(page);
      this.currentPage = page;
    },
    // 提交
    async submit() {
      // 提交数据
      this.waiting = true;
      let res = await request({
        url: "/api/super/modifyinfo",
        method: "put",
        data: {
          _id: this.dialogData._id,
          stu_email: this.dialogData.stu_email,
          stu_class: this.dialogData.stu_class,
          auth: this.dialogData.role,
        },
      });
      if (res.code == 200) {
        this.$message.success("设置成功!!");
        this.getAllUsers(this.currentPage);
        this.diaShow = false;
      } else {
        this.$message.error(res.msg);
      }
      this.waiting = false;
    },
    // 根据指定的页码获取数据
    async getAllUsers(page) {
      this.waiting = true;
      let res = await request({
        url: "/api/super/getuser/" + page,
      });
      const { result } = res;
      this.pageData.total = result.total;
      this.pageData.size = result.size;
      this.currentPage = result.page;
      this.userInfo = [];
      this.userInfo = result.records;
      this.waiting = false;
    },
    async getOneInfo() {
      // 校验正确格式的学号
      if (!/\d{9}/.test(this.stu_num)) {
        this.$message.error("请输入正确格式的学号!");
        return;
      }
      // 请求对应的信息
      this.waiting = true;
      let res = await request({
        url: "/api/super/getoneuser",
        params: {
          stu_number: this.stu_num,
        },
      });
      if (res.code == 200) {
        this.userInfo = [];
        this.userInfo.push(res.result);
        this.$message.success("查询成功");
      } else {
        this.$message.error(res.msg);
      }
      this.waiting = false;
    },
  },
  watch: {
    stu_num(newV) {
      if (newV.trim() === "") {
        this.getAllUsers(this.currentPage);
      }
    },
  },
  created() {
    this.getAllUsers(1);
  },
};
</script>
<style scoped>
.search {
  width: 400px;
}
.search_btn {
  margin-left: 8px;
}
.main {
  margin-top: 20px;
}
.el-input {
  width: 75%;
}
.submit_btn {
  margin-right: 30px;
}
.table {
  margin-top: 20px;
}
.pagination {
  position: absolute;
  bottom: 20px;
}
</style>