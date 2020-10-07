<template>
  <div>
    <!-- 头部区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>信息总览</el-breadcrumb-item>
      <el-breadcrumb-item>导出为Excel表格</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体区域 -->
    <div class="main">
      <!-- 选择区域 -->
      <div class="wrap_nav">
        <el-form inline>
          <el-form-item label="学院 / 专业">
            <el-cascader
              v-model="college"
              :options="collegeData"
              :props="{ expandTrigger: 'hover' }"
            ></el-cascader>
          </el-form-item>
          <!-- 年级 -->
          <el-form-item label="年级">
            <el-select v-model="grades">
              <el-option
                v-for="item in classes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 学期 -->
          <el-form-item label="学期">
            <el-select v-model="selectTime">
              <el-option
                v-for="item in time"
                :key="item._id"
                :label="item.time"
                :value="item.time"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 班级 -->
          <el-form-item label="班级">
            <el-input
              class="width_item"
              v-model="classModel"
              placeholder="不填写该项默认获取本专业所有数据"
            ></el-input>
          </el-form-item>
          <!-- 获取 -->
          <el-form-item>
            <el-button @click="getScore" type="primary">获取数据</el-button>
          </el-form-item>
          <!-- 导出为表格 -->
          <el-form-item>
            <el-button @click="outputExcel" type="primary"
              >导出为Excel</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <!-- 表格区域 -->
      <el-table
        :data="gradeData"
        style="width: 100%"
        stripe
        border
        max-height="690"
        v-loading="waiting"
        id="table"
      >
        <el-table-column prop="stu_number" label="学号"> </el-table-column>
        <el-table-column prop="stu_name" label="姓名"> </el-table-column>
        <el-table-column prop="firstTotal" label="第一学期总成绩">
        </el-table-column>
        <el-table-column prop="firstRank" label="第一学期排名">
        </el-table-column>
        <el-table-column prop="secondTotal" label="第二学期总成绩">
        </el-table-column>
        <el-table-column prop="secondRank" label="第二学期排名">
        </el-table-column>
        <el-table-column prop="finalTotal" label="全学年成绩">
        </el-table-column>
        <el-table-column
          prop="finalRank"
          label="全学年总排名"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import request from "@/services/request";
import collegeData from "@/mixin/collegeData";
import getTime from "@/mixin/getTime";
import exportExcel from "@/util/exportExcel";
export default {
  name: "z-info",
  mixins: [collegeData, getTime],
  data() {
    return {
      // 成绩数据
      gradeData: [],
      // 等待加载图标
      waiting: false,
      collegeData: [],
      // 年级
      classes: [],
      // 选择的班级
      classModel: "",
      grades: "",
    };
  },
  methods: {
    // 获取学年成绩
    async getScore() {
      this.waiting = true;
      if (!this.college) {
        this.waiting = false;
        return this.$message.warning("请选择学院和专业");
      }
      let res = await request({
        url: "/api/score/getallscore?t="+Math.random(),
        params: {
          college: this.college,
          grades: this.grades,
          selectTime: this.selectTime,
          classModel: this.classModel,
        },
      });
      if (res.code === 200) {
        this.$message.success(res.msg);
        this.gradeData = [];
        this.gradeData = res.data;
      } else {
        this.$message.error(res.msg);
      }
      this.waiting = false;
    },
    async getClasses() {
      // 强制刷新，防止缓存数据
      let res = await request({
        url: "/api/others/getclasses/?t=" + Math.random(),
      });
      if (res.code == 200) {
        this.classes = res.data;
        this.grades = this.classes[0].value;
      }
    },
    // 导出为Excel
    outputExcel() {
      // 文件名
      if (this.gradeData.length === 0) {
        return this.$message.warning("暂无数据！");
      }
      let fileName = `${this.gradeData[0].profess_name}${this.grades}级${this.selectTime}素质分成绩表`;
      exportExcel(document.querySelector("#table"), fileName);
    },
  },
  created() {
    this.getClasses();
  },
};
</script>
<style scoped>
.main {
  margin-top: 20px;
}
.width_item {
  width: 280px;
}
</style>