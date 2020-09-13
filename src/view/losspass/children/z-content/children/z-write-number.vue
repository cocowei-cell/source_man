<template>
  <div>
    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="填写学号" prop="stu_number">
        <el-input
          type="text"
          v-model="form.stu_number"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code" label-width="100px">
        <el-input
          type="text"
          style="width: 100px"
          v-model="form.code"
          autocomplete="off"
        ></el-input>
        <z-code ref="codeRef" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ZCode from "@/components/content/z-code/z-code";
import request from "@/services/request";
import { SETSTUNUMBER } from "@/store/CONST";
export default {
  name: "z-write-number",
  components: {
    ZCode,
  },
  data() {
    var checkNum = (rule, value, cb) => {
      value = value.trim();
      var stuReg = /^\d{9}$/;
      if (value === "") {
        return cb(new Error("请输入学号"));
      } else if (!stuReg.test(value)) {
        return cb(new Error("请输入正确格式的学号"));
      } else {
        cb();
      }
    };
    var checkCode = async (rule, value, cb) => {
      value = value.trim();
      if (value === "") {
        cb(new Error("请输入验证码"));
      } else {
        let tag = await this.$refs.codeRef.authCode(value);
        if (!tag) {
          cb(new Error("验证码错误"));
        } else {
          cb();
        }
      }
    };
    return {
      form: {
        stu_number: "",
        code: "",
      },
      rules: {
        stu_number: [{ validator: checkNum, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((v) => {
        if (v) {
          //发送请求
          this.validateStu();
        } else {
          return;
        }
      });
    },
    async validateStu() {
      let res = await request({
        url: "/api/user/losspass",
        method: "POST",
        data: {
          stu_number: this.form.stu_number,
        },
      });
      if (res.code == 200) {
        //跳转到qq邮箱验证页面 保存学号
        this.$store.commit(SETSTUNUMBER, this.form.stu_number);
        //设置步骤索引为1
        this.$store.commit("setIndex", 1);
      } else {
        this.$message({
          type: "error",
          message: "学号不存在",
        });
        this.$refs.codeRef.refresh();
      }
    },
  },
};
</script>
<style scoped>
</style>