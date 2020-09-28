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
    <el-alert
      title="说明：如果自评总分数为0，系统自动默认设置为0分，并且第一、第二审核人为“无”，审核人不必再审核该项。审核人审核成功的标志：对应审核人下面有你的名字。若要修改分数，请直接点击审核进入修改并且提交即可"
      type="warning"
      effect="dark"
    >
    </el-alert>
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
      <el-table-column prop="selfTotal" label="自评总分数"> </el-table-column>
      <el-table-column prop="first_per" label="第一审核人"> </el-table-column>
      <el-table-column prop="firstTotal" label="第一审核总分数">
      </el-table-column>
      <el-table-column prop="second_per" label="第二审核人"> </el-table-column>
      <el-table-column prop="secondTotal" label="第二审核总分数">
      </el-table-column>
      <el-table-column label="审核状态">
        <template slot-scope="checkState">
          <el-tag :type="checkState.row.is_checked ? 'success' : 'info'">{{
            checkState.row.is_checked == true ? "已审核" : "未完成审核"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="oper">
          <el-button
            type="primary"
            :disabled="oper.row.selfTotal == 0 ? true : false"
            @click="check(oper.row)"
          >
            审核
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 开启审核 -->
    <el-dialog
      :title="title"
      :visible.sync="checkShow"
      width="80%"
      :fullscreen="true"
    >
      <!-- 说明区域 -->
      <el-alert
        title="说明：审核状态显示未完成审核代表第一审核人或第二审核人未审核，最终总分数以第二审核人为准"
        type="warning"
        effect="dark"
      >
      </el-alert>
      <!-- 表格区域 -->
      <el-table
        :data="checkDialog"
        style="width: 100%"
        stripe
        border
        max-height="690"
        v-loading="waiting"
      >
        <el-table-column prop="item_number" label="序号"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="reason" label="加分原因"> </el-table-column>
        <el-table-column prop="self_score" label="自评分数"> </el-table-column>
        <!-- 第一审核人分数 -->
        <el-table-column label="第一审核分数">
          <template slot-scope="firstScore">
            <el-input
              v-model="firstScore.row.first.score"
              placeholder="第一审核人分数"
            ></el-input>
          </template>
        </el-table-column>
        <!-- 第二审核人分数 -->
        <el-table-column label="第二审核人分数">
          <template slot-scope="secondScore">
            <el-input
              v-model="secondScore.row.second.score"
              placeholder="第二审核人分数"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="is_checked" label="审核状态">
          <template slot-scope="checkState">
            <el-tag :type="checkState.row.is_checked ? 'success' : 'info'">{{
              checkState.row.is_checked == true ? "已审核" : "未完成审核"
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="oper">
            <el-button type="primary" @click="showProve(oper.row)">
              查看材料
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 提交按钮 -->
      <el-button @click="submitItem" class="btn fr" type="primary"
        >提交</el-button
      >
    </el-dialog>
    <el-dialog :title="picturesTitle" :visible.sync="showProves">
      <div class="lazy_imgs">
        <!-- 图片 -->
        <el-image
          v-for="url in pictures"
          :src="url"
          :preview-src-list="pictures"
          :key="url"
        ></el-image>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import request from "@/services/request";
export default {
  name: "z-checking",
  data() {
    return {
      // 审核的班级
      navClass: "201819716",
      // 按班级还是按学号，默认是按班级为1
      selectMode: 1,
      // 表格数据
      checkData: [],
      // 审核框弹出
      checkShow: false,
      //图片展示区标题
      picturesTitle: "",
      pictures: [],
      // 图片展示是否弹出
      showProves: false,
      checkDialog: [],
      title: "",
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
    async check(data) {
      this.waiting = true;
      let res = await request({
        url: "/api/admin/getoneuser",
        params: {
          time: this.selectTime,
          user_id: data.user_id,
        },
      });
      if (res.code == 200) {
        // 弹出框
        this.checkShow = true;
        // 设置标题
        let { stu_name, stu_number } = data;
        this.title = `你正在审核 ${stu_number}${stu_name} 的素质分 你选择的是第${
          this.author == 1 ? "一审核人" : "二审核人"
        } 请在对应的审核人下填写分数 不要跨级填写（按ESC可退出审核）`;
        //渲染数据
        this.checkDialog = [];
        this.checkDialog = res.data;
      }

      this.waiting = false;
    },
    showProve(data) {
      //如果没有上传图片
      if (data.pictures.length == 0) {
        this.$message.warning("该项无图片");
        return;
      } else {
        // 打开图片展示区域
        this.showProves = true;
        this.picturesTitle = `项目序号 ：${data.item_number} 描述：${data.description} 加分原因：${data.reason} 自评分数${data.self_score}`;
        this.pictures = data.pictures;
      }
    },
    // 筛选
    async filter() {
      if (this.navClass.trim() === "") {
        return this.$message.error("请输入班级或者学号");
      }
      this.waiting = true;
      let result = await request({
        url: "/api/admin/getitem",
        params: {
          mode: this.selectMode,
          time: this.selectTime,
          cla_num: this.navClass,
        },
      });
      if (result.code == 200) {
        this.$message.success("获取成功");
        //赋值给表格数据
        let { data } = result;
        data.forEach((v) => {
          if (v.first_per !== "无") {
            v.first_per = v.first_per.stu_name;
          }
          if (v.second_per !== "无") {
            v.second_per = v.second_per.stu_name;
          }
        });
        this.checkData = [];
        this.checkData = data;
      } else {
        this.$message.error(result.msg);
      }
      this.waiting = false;
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
    // 审核提交
    async submitItem() {
      // 获取数据
      const dataArr = [];
      this.checkDialog.forEach((v) => {
        dataArr.push({
          _id: v._id,
          first: v.first,
          second: v.second,
        });
      });
      let res = await request({
        url:"/api/admin/submititem"
      })
    },
  },
  created() {
    //提示信息
    // this.notify();
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
.lazy_imgs {
  overflow-y: auto;
  height: 600px;
}
.btn.fr {
  margin-top: 20px;
  margin-right: 50px;
}
</style>