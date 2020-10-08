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
          <span class="state"
            >状态：{{ state === false ? "未审核" : "已审核" }}</span
          >
          <!-- 刷新数据 -->
          <el-button
            class="btn_refresh"
            type="primary"
            :loading="loading"
            @click="refreshState"
            >刷新状态</el-button
          >
          <!-- 分数条目 -->
          <span class="fr">最终总分：{{ secondScore }}</span>
          <span class="fr">第一审核人总分：{{ firstScore }}</span>
          <span class="fr">自评总分：{{ selfScore }}</span>
        </div>
        <!-- 展示信息 -->
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
          <el-table-column prop="reason" label="加分原因"></el-table-column>
          <!-- 自评分数 -->
          <el-table-column prop="self_score" label="自评分数" width="120">
          </el-table-column>
          <el-table-column
            prop="first.score"
            label="第一审核人分数"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="first.user.stu_name"
            label="第一审核人"
            width="120"
          >
          </el-table-column>
          <el-table-column prop="second.score" label="最终分数" width="120">
          </el-table-column>
          <el-table-column
            prop="second.user.stu_name"
            label="第二审核人"
            width="120"
          >
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="oper">
              <el-button
                @click="handleError(oper.row)"
                :disabled="!state"
                type="text"
                title="如果你对此项审核有疑问请点击这里"
                >对此有疑问？</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </z-center>
    <!-- 异议提交显示 -->
    <el-dialog
      :title="error.item_number"
      :visible.sync="showDialog"
      width="55%"
    >
      <el-form label-width="100px">
        <!-- 描述 -->
        <el-form-item label="描述:">
          <span>{{ error.description }}</span>
        </el-form-item>
        <!-- 自评分数 -->
        <el-form-item label="自评分数:">
          <span>{{ error.self_score }}</span>
        </el-form-item>
        <!-- 第一审核人分数 -->
        <el-form-item label="第一审核人:">
          <span>{{ error.first.score }}</span>
        </el-form-item>
        <!-- 第二审核人分数 -->
        <el-form-item label="第二审核人:">
          <span>{{ error.second.score }}</span>
        </el-form-item>
        <!-- 异议的原因 -->
        <el-form-item label="你的异议原因:">
          <el-input v-model="error.reason" type="text"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitError" class="fr" type="primary"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import ZCenter from "@/components/content/z-center/z-center";
import request from "@/services/request";
import throttle from "@/mixin/throttle";
export default {
  name: "z-mysource",
  components: {
    ZCenter,
  },
  mixins: [throttle],
  data() {
    return {
      submitInfo: [],
      state: false, //审核状态
      tagLod: false, //加载等待图标
      selfScore: 0, //自评分数
      firstScore: "无", //第一审核人分数
      secondScore: "无", //第二审核人分数
      tagTime: false,
      error: {
        first: {},
        second: {},
      },
      showDialog: false,
      loading: false,
    };
  },
  methods: {
    // 获取学期时间
    async getTime() {
      let timeTag = sessionStorage.getItem("time");
      //从服务器重新请求
      if (!timeTag) {
        let res = await request({
          url: "/api/score/gettimes",
        });
        if (res.code == 200) {
          this.options = res.time;
          this.time = this.options[0].time;
          sessionStorage.setItem("time", JSON.stringify(res.time));
        }
      } else {
        this.options = JSON.parse(timeTag);
        this.time = this.options[0].time;
      }
    },
    // 获取筛选
    async slectForm() {
      // 节流处理
      if (this.time === "" || this.tagTime === false) {
        return;
      }
      this.submitInfo = [];
      this.tagLod = true;
      let result = await request({
        url: "/api/score/getscore",
        params: {
          time: this.time,
        },
      });
      if (result.data.info.length === 0) {
        this.tagLod = false;
        return this.$message.warning("该学期你没有提交，暂无数据");
      }
      this.submitInfo = result.data.info;
      this.selfScore = result.data.selfTotal;
      this.state = result.data.is_checked;
      // 状态为未审核
      if (this.state === false) {
        (this.firstScore = "无"), (this.secondScore = "无");
      } else {
        this.firstScore = result.data.firstTotal;
        this.secondScore = result.data.secondTotal;
      }
      this.tagTime = false;
      this.tagLod = false;
    },
    //处理疑问
    handleError({ item_number, self_score, description, first, second, _id }) {
      this.error = {
        item_number: `项目编号:${item_number} (如果你的评分不正确，请提交你的原因)`,
        description,
        first,
        second,
        self_score,
        _id,
        reason: "",
      };
      this.showDialog = true;
    },
    async refreshState() {
      // 重新获取该学期的数据
      this.loading = true;
      this.tagTime = true;
      await this.slectForm();
      this.loading = false;
    },
    //提交错误
    async submitError() {
      let { _id, reason, second } = this.error;
      if (reason.trim() === "") {
        this.$message.error("请输入原因");
        return;
      }
      //提交对应的数据
      let res = await request({
        url: "/api/others/submiterror",
        method: "POST",
        data: {
          item_id: _id,
          reason,
          check_person: second.user._id,
        },
      });
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.showDialog = false;
      } else {
        this.$message.error(res.msg);
      }
    },
  },
  watch: {
    time(newV, oldV) {
      this.tagTime = true;
    },
  },
  async created() {
    this.$store.commit("setHeaderIndex", "2");
    await this.getTime();
    await this.slectForm();
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
.state {
  margin-left: 20px;
  font-weight: 600;
}
span.fr {
  margin-right: 20px;
}
</style>