<template>
  <div>
    <!-- 头部区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>审核表格</el-breadcrumb-item>
      <el-breadcrumb-item>审核</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体区域 -->
    <!-- banner区域 -->
    <div class="banner">
      <!-- 表单选区 -->
      <el-form label-width="90px" inline>
        <!-- 审核的班级 -->
        <el-form-item label="班级或学号">
          <el-input
            v-model="navClass"
            placeholder="请输入你审核的班级或学号"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="selectMode">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="selectTime">
            <el-option
              v-for="item in time"
              :key="item.time"
              :label="item.time"
              :value="item.time"
              :disabled="item.isOpen"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="filter" type="primary">筛选</el-button>
        </el-form-item>
        <!-- 审核人 -->
        <el-form-item label="审核人">
          <el-select v-model="author">
            <el-option
              v-for="item in authArray"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格区域 -->
    <!-- 用户信息展示 -->
    <el-table
      :data="checkData"
      style="width: 100%"
      stripe
      border
      max-height="690"
      v-loading="waiting"
    >
      <el-table-column prop="stu_number" label="学号"> </el-table-column>
      <el-table-column prop="stu_name" label="姓名"> </el-table-column>
      <el-table-column prop="stu_class" label="班级"> </el-table-column>
      <el-table-column prop="state" label="自评分数"> </el-table-column>
      <el-table-column prop="state" label="第一审核人"> </el-table-column>
      <el-table-column prop="state" label="第二审核人"> </el-table-column>
      <el-table-column prop="state" label="审核状态"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="oper">
          <el-button type="primary" @click="check(oper.row)"> 审核 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "@/services/request";
export default {
  name: "z-checking",
  data() {
    return {
      // 审核的班级
      navClass: "",
      // 按班级还是按学号，默认是按班级为1
      selectMode: 1,
      // 表格数据
      checkData: [],
      waiting: false,
      // 审核人，默认为第一审核人
      author: 1,
      time: [], //时间参数
      selectTime: "", //选择的时间
      authArray: [
        {
          label: "第一审核人",
          value: 1,
        },
        {
          label: "第二审核人",
          value: 2,
        },
      ],
      options: [
        {
          value: 1,
          label: "按班级",
        },
        {
          value: 2,
          label: "按学号",
        },
      ],
      // 当前页
      currentPage: 1,
    };
  },
  methods: {
    check(data) {
      console.log(data);
    },
    // 筛选
    async filter() {
      if(this.navClass.trim()==="") {
        return this.$message.error("请输入班级或者学号");
      }
      let result = await request({
        url:"/api/admin/getitem",
        params:{
          mode:this.selectMode,
          time:this.selectTime,
          cla_num:this.navClass
        }
      })
      console.log(result)
    },
    notify() {
      this.$alert(
        "请选择自己所审核的班级，以及对应的审核人，请勿越权操作，你的每一步操作后台都记录在案，请规范操作",
        "审核须知",
        {
          confirmButtonText: "确定",
        }
      );
    },
    //获取审核时间
    async getTime() {
      //如果缓存中有时间条目就获取，没有就从服务器重新请求
      let timeTag = sessionStorage.getItem("time");
      //从服务器重新请求
      this.waiting = true;
      if (!timeTag) {
        let res = await request({
          url: "/api/score/gettimes",
        });
        if (res.code == 200) {
          this.time = res.time;
          this.selectTime = res.time[0].time;
          sessionStorage.setItem("time", JSON.stringify(res.time));
        }
      } else {
        this.time = JSON.parse(timeTag);
        this.selectTime = this.time[0].time;
      }
      this.waiting = false;
    },
  },
  created() {
    //提示信息
    this.notify();
    this.getTime();
  },
  // 页面挂载完毕后执行回调
  mounted() {},
};
</script>
<style scoped>
.banner {
  margin-top: 10px;
}
</style>