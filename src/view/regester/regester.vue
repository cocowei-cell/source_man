<template>
  <div class="regester">
    <z-header title="注册" />
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="学号" prop="stuNum">
        <el-input
          type="text"
          v-model="ruleForm.stuNum"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="姓名" prop="stuName">
        <el-input
          type="text"
          v-model="ruleForm.stuName"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="班级" prop="stuClass">
        <el-input
          type="text"
          v-model="ruleForm.stuClass"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="学院 / 专业">
        <el-cascader
          v-model="college"
          :options="collegeData"
          :props="{ expandTrigger: 'hover' }"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="QQ邮箱" prop="email">
        <el-input
          type="text"
          v-model="ruleForm.email"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="stuPass">
        <el-input type="password" v-model="ruleForm.stuPass"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass"></el-input>
      </el-form-item>

      <el-form-item label-width="100px" label="验证码" prop="code">
        <el-input
          class="el-input-self"
          type="text"
          v-model="ruleForm.code"
        ></el-input>
        <z-code ref="codeRef" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >注册</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ZHeader from "@/components/content/header/Header";
import ZCode from "@/components/content/z-code/z-code";

import request from "@/services/request";
import delayDo from "@/util/delayDo";
import collegeData from "@/mixin/collegeData"
export default {
  name: "regester",
  mixins:[collegeData],
  components: {
    ZHeader,
    ZCode,
  },
  data() {
    var checkNum = (rule, value, callback) => {
      value = value.trim();
      var stuReg = /^\d{9}$/;
      if (!value) {
        callback(new Error("请输入学号"));
      } else if (!stuReg.test(value)) {
        callback(new Error("请输入正确规则的学号"));
      } else {
        callback();
      }
    };
    var checkClass = (rule, value, callback) => {
      value = value.trim();
      var Ceg = /^\d{7}$/;
      if (value === "") {
        callback(new Error("请输入班级"));
      } else if (!Ceg.test(value)) {
        callback(new Error("请输入正确的班级格式"));
      } else {
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      value = value.trim();
      var passReg = /^[0-9A-Za-z_]{6,12}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!passReg.test(value)) {
        callback(new Error("请输入6-12位字母或数字或下划线的密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      value = value.trim();
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.stuPass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    var validateCode = async (rule, value, callback) => {
      if (!this.errorTags) {
        value = value.trim();
        if (value === "") {
          callback(new Error("请输入验证码"));
        } else {
          let tag = await this.$refs.codeRef.authCode(value);
          // console.log(tag);
          if (!tag) {
            callback(new Error("验证码错误"));
          } else {
            callback();
          }
        }
      }
    };
    var validateEmail = (rule, value, callback) => {
      value = value.trim();
      if (value === "") {
        callback(new Error("请输入QQ邮箱"));
      } else {
        var emailReg = /[1-9]\d{7,10}@qq\.com/;
        if (!emailReg.test(value)) {
          callback(new Error("QQ邮箱不符合验证规则"));
        } else {
          callback();
        }
      }
    };
    return {
      ruleForm: {
        stuNum: "",
        stuPass: "",
        checkPass: "",
        stuClass: "",
        code: "",
        stuName: "",
        email: "",
      },
      errorTags: false,
      rules: {
        stuNum: [{ validator: checkNum, trigger: "blur" }],
        stuPass: [{ validator: validatePass1, trigger: "blur" }],
        stuClass: [{ validator: checkClass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        stuName: [
          {
            validator(rule, value, callback) {
              value = value.trim();
              if (value === "") {
                callback(new Error("请输入姓名"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //请求数据
          this.regester();
        } else {
          // 错误提交
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //注册
    async regester() {
      if (!this.errorTags) {
        let data = {
          stu_number: this.ruleForm.stuNum,
          stu_name: this.ruleForm.stuName,
          stu_pass: this.ruleForm.stuPass,
          stu_email: this.ruleForm.email,
          stu_class: this.ruleForm.stuClass,
          college:this.college
        };
        let { msg, code } = await request({
          url: "/api/user/regester",
          method: "POST",
          data,
        });
        // console.log(msg);
        if (code === 401) {
          this.$message.error(msg);
          this.$refs.codeRef.refresh();
          this.errorTags = true;
          this.ruleForm.code = "";
        } else if (code !== 200) {
          this.$message.error("注册失败");
          this.$refs.codeRef.refresh();
          this.errorTags = true;
          this.ruleForm.code = "";
        } else {
          this.$message({
            type: "success",
            message: "注册成功，2s后返回登录页",
            duration: 2000,
          });
          this.errorTags = true;
          await delayDo(2000, () => {
            this.$router.replace("/login");
          });
        }
      }
    },
  },
  watch: {
    //监听学号的改变，打开节流阀。
    "ruleForm.stuNum": {
      handler(newVal, oldVal) {
        this.errorTags = false;
      },
      deep: true,
    },
  },
  created() {
    this.getCollegeData()
  },
};
</script>
<style scoped>
.regester {
  width: 550px;
  margin: 0 auto;
  margin-top: 150px;
}
.el-input-self {
  width: 100px;
}
</style>