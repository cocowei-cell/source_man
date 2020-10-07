<template>
  <div>
    <!-- 头部区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>学期时间管理</el-breadcrumb-item>
      <el-breadcrumb-item>开启或关闭学期审核权限</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体部分 -->
    <!-- 主区域 -->
    <div class="main">
      <!-- 左边区域 -->
      <div class="left">
        <el-form label-width="80px">
          <el-form-item label="学期">
            <el-input
              v-model="time.time"
              placeholder="请新建学期，务必按照2020-2021年第一学期格式创建"
            ></el-input>
          </el-form-item>
          <el-form-item label="审核权限">
            <el-select v-model="time.isOpen" placeholder="">
              <el-option
                v-for="item in options"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="addTime" type="primary">添加</el-button>
          </el-form-item>
          <el-form-item label="是否开启审核人审核权限： " label-width="200px">
            <el-switch @change="handleOpenChecker" v-model="isOpenChecker">
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
      <!-- 右边区域 -->
      <div class="right">
        <el-table
          :data="timeInfo"
          style="width: 100%"
          stripe
          border
          max-height="690"
          v-loading="waiting"
        >
          <el-table-column prop="time" label="学期"> </el-table-column>
          <el-table-column label="审核权限">
            <template slot-scope="oper">
              <el-switch
                @change="handleSwitch(oper.row)"
                v-model="oper.row.isOpen"
              >
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/services/request";
export default {
  name: "z-time",
  data() {
    return {
      // 添加学期的子项
      time: {
        time: "",
        isOpen: false,
      },
      isOpenChecker: false,
      // 表格数据项
      timeInfo: [],
      // 是否开启审核参数
      options: [
        { value: true, label: "开启审核" },
        { value: false, label: "关闭审核" },
      ],
      waiting: false,
    };
  },
  methods: {
    // 添加时间项
    async addTime() {
      let { time, isOpen } = this.time;
      if (time.trim() === "") {
        this.$message.error("请输入日期");
        return;
      }
      this.waiting = true;
      let res = await request({
        url: "/api/super/settings",
        method: "POST",
        data: {
          time,
          auth: isOpen,
        },
      });
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.getTime();
      } else {
        this.$message.error(res.msg);
      }
      this.waiting = false;
    },
    //获取时间
    async getTime() {
      let res = await request({
        url: "/api/score/gettimes",
      });
      this.timeInfo = res.time;
    },
    // 处理switch选择
    async handleSwitch(data) {
      let tag = await this.$confirm(
        `是否修改${data.time}的审核权限`,
        "修改权限",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (tag === "confirm") {
        let res = await request({
          url: "/api/super/settings",
          method: "POST",
          data: {
            _id: data._id,
            auth: data.isOpen,
          },
        });
        if (res.code == 200) {
          this.$message.success(res.msg);
        } else {
          this.$message.error("设置失败");
        }
      } else {
        data.isOpen = !data.isOpen;
      }
    },
    async handleOpenChecker() {
      let tag = await this.$confirm(`是否修改审核人的审核权限`, "修改权限", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);

      if (tag === "confirm") {
        let res = await request({
          url: "/api/super/modifycheck",
          method: "POST",
          data: {
            auth: this.isOpenChecker,
          },
        });
        if (res.code == 200) {
          this.$message.success(res.msg);
        } else {
          this.$message.error(res.msg);
        }
      } else {
        this.isOpenChecker = !this.isOpenChecker;
      }
    },
    async getOpen() {
      let res = await request({
        url: "/api/others/getisopen",
      });
      this.isOpenChecker = res.isOpen;
    },
  },
  created() {
    this.getTime();
    this.getOpen();
  },
};
</script>
<style scoped>
.main {
  display: flex;
  margin-top: 20px;
}
.left {
  flex: 8;
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