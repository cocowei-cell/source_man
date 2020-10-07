<template>
  <div>
    <!-- 头部区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>学院与专业</el-breadcrumb-item>
      <el-breadcrumb-item>添加学院和专业</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体区域 -->

    <div class="main">
      <!-- 左边区域 -->
      <div class="left">
        <el-input v-model="college" placeholder="请输入添加的学院"></el-input>
        <el-button @click="addCollege" class="btn_add fr" type="primary"
          >添加</el-button
        >
      </div>
      <!-- 右边区域 -->
      <div class="right">
        <el-table
          :data="collegeData"
          style="width: 100%"
          stripe
          border
          max-height="800"
          v-loading="waiting"
        >
          <el-table-column prop="college_name" label="学院名称">
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="oper">
              <el-button type="primary" @click="addProfessional(oper.row)">
                添加专业
              </el-button>
              <el-button type="primary" @click="modifyCollege(oper.row)">
                修改信息
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 对话框区域 -->
    <el-dialog :title="collegeTitle" :visible.sync="showAddPro" fullscreen>
      <div class="main">
        <!-- 左边区域 -->
        <div class="left">
          <el-input v-model="profess" placeholder="请输入添加的专业"></el-input>
          <el-button @click="addProSubmit" class="btn_add fr" type="primary"
            >添加</el-button
          >
        </div>
        <!-- 右边区域 -->
        <div class="right">
          <el-table
            :data="professData"
            style="width: 100%"
            stripe
            border
            max-height="800"
            v-loading="waiting"
          >
            <el-table-column prop="profess_name" label="专业名称">
            </el-table-column>
            <el-table-column label="操作" width="300">
              <template slot-scope="oper">
                <el-button type="primary" @click="modifyProfession(oper.row)">
                  修改信息
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <!-- 修改专业对话框 -->
    <el-dialog
      :title="modifyProfessionObj.professTitle"
      :visible.sync="modifyProfessionObj.showModifyProfess"
    >
      <el-form label-width="80px">
        <el-form-item label="专业名称">
          <el-input
            v-model="modifyProfessionObj.profess_name"
            placeholder="专业名称置为空即删除该专业"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="modifyProfessionSub" class="fr" type="primary"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 修改学院对话框 -->
    <el-dialog
      :title="modifyCollegeObj.collegeTitle"
      :visible.sync="modifyCollegeObj.showModifyCollege"
    >
      <el-form label-width="80px">
        <el-form-item label="学院名称">
          <el-input
            v-model="modifyCollegeObj.college_name"
            placeholder="学院名称置为空即删除该学院"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="modifyCollegeSub" class="fr" type="primary"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/services/request";
export default {
  name: "z-college",
  data() {
    return {
      college: "",
      collegeID: "",
      profess: "",
      // 学院数据
      collegeData: [],
      // 专业数据
      professData: [],
      waiting: false,
      showAddPro: false,
      collegeTitle: "",
      // 修改专业对象
      modifyProfessionObj: {
        professTitle: "",
        showModifyProfess: false,
        profess_name: "",
      },
      // 修改学院对象
      modifyCollegeObj: {
        collegeTitle: "",
        showModifyCollege: false,
        college_name: "",
      },
    };
  },
  methods: {
    async addCollege() {
      if (this.college.trim() === "") {
        this.$message.error("请输入学院名称");
        return;
      }
      let res = await request({
        url: "/api/super/addcollege",
        method: "POST",
        data: {
          college: this.college,
        },
      });
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.college = "";
        this.getCollegeData();
      } else {
        this.$message.error(res.msg);
      }
    },
    async getCollegeData() {
      this.waiting = true;
      let res = await request({
        url: "/api/super/getcollege",
      });
      if (res.code == 200) {
        this.collegeData = [];
        this.collegeData = res.data;
      }
      this.waiting = false;
    },
    // 添加专业
    addProfessional({ college_name, _id }) {
      this.collegeTitle = `你选择的是${college_name}，请添加对应的专业(按ESC退出)`;
      //保存学院的id值
      this.collegeID = _id;
      this.getProfess();
      this.showAddPro = true;
    },
    // 添加专业到数据库
    async addProSubmit() {
      if (this.profess.trim() === "") {
        return this.$message.error("请输入专业");
      }
      let res = await request({
        url: "/api/super/addprofess",
        method: "post",
        data: {
          collegeID: this.collegeID,
          profess_name: this.profess,
        },
      });
      if (res.code == 200) {
        this.$message.success(res.msg);
        // 重新获取专业数据
        this.getProfess();
        // 清空专业输入框
        this.profess = "";
      } else {
        this.$message.error(res.msg);
      }
    },
    async getProfess() {
      let res = await request({
        url: "/api/super/getprofess/" + this.collegeID,
      });
      if (res.code == 200) {
        this.professData = [];
        this.professData = res.data;
      }
    },
    // 修改学院信息
    modifyCollege({ _id, college_name }) {
      this.modifyCollegeObj = {
        college_name,
        showModifyCollege: true,
        collegeTitle: `你选择的是${college_name}，请按提示修改即可。如果想要删除这个专业，请将专业名称置为空`,
        _id,
      };
    },
    //提交修改学院信息
    async modifyCollegeSub() {
      const { _id, college_name } = this.modifyCollegeObj;
      let res = await request({
        url: "/api/super/modifycollege",
        method: "PUT",
        data: {
          _id,
          college_name,
        },
      });
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.getCollegeData();
        this.modifyCollegeObj.showModifyCollege = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    // 修改专业信息
    modifyProfession({ _id, profess_name }) {
      this.modifyProfessionObj = {
        profess_name,
        showModifyProfess: true,
        professTitle: `你选择的是${profess_name}，请按提示修改即可。如果想要删除这个专业，请将专业名称置为空`,
        _id,
      };
    },
    // 提交修改专业信息
    async modifyProfessionSub() {
      const { _id, profess_name } = this.modifyProfessionObj;
      let res = await request({
        url: "/api/super/modifyprofess",
        method: "PUT",
        data: {
          _id,
          profess_name,
        },
      });
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.modifyProfessionObj.showModifyProfess = false;
        //重新获取专业数据
        this.getProfess();
      } else {
        this.$message.error(res.msg);
      }
    },
  },
  created() {
    this.getCollegeData();
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
.btn_add {
  margin-top: 10px;
}
</style>