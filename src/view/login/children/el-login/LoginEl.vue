<template>
  <div class="regester">
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

      <el-form-item label="密码" prop="stuPass">
        <el-input type="password" v-model="ruleForm.stuPass"></el-input>
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
        <el-button
          :style="{ width: isAdmin ? '50%' : '' }"
          type="primary"
          @click="submitForm('ruleForm')"
          >登录</el-button
        >
        <el-button v-if="!isAdmin" @click="regester">注册</el-button>
        <el-button @click="lossPass">忘记密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/services/request";
import { setUserState } from "@/store/CONST";
import ZCode from "@/components/content/z-code/z-code";
export default {
  name: "LoginEl",
  components: {
    ZCode,
  },
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
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

    var validateCode = async (rule, value, callback) => {
      value = value.trim();
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        let tag = await this.$refs.codeRef.authCode(value);
        if (!tag) {
          callback(new Error("验证码错误"));
        } else {
          callback();
        }
      }
    };
    return {
      ruleForm: {
        stuNum: "",
        stuPass: "",
        code: "",
      },
      rules: {
        stuNum: [{ validator: checkNum, trigger: "blur" }],
        stuPass: [{ validator: validatePass1, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          // 错误提交
          return false;
        }
      });
    },
    //注册
    regester() {
      this.$router.replace("/regester");
    },
    async login() {
      let res = await request({
        url: "/api/user/login",
        method: "POST",
        data: {
          stu_number: this.ruleForm.stuNum,
          stu_pass: this.ruleForm.stuPass,
        },
      });
      if (res.code !== 200) {
        this.$message.error(res.msg);
        //刷新验证码
        this.$refs.codeRef.refresh();
      } else {
        this.$store.commit(setUserState, {
          isLogin: true,
          token: res.token,
          userInfo: {
            stu_number: res.stu_number,
            stu_email: res.stu_email,
            stu_name: res.stu_name,
            role: res.role,
          },
        });
        // console.log(res);
        sessionStorage.setItem("token", res.token);
        //判断角色，如果是管理员就跳转到管理员页面
        if (this.isAdmin === true) {
          if (res.role === "super") {
            this.$router.replace("/super");
          } else if (res.role === "admin") {
            this.$router.replace("/admin");
          }
        } else {
          this.$router.replace("/index");
        }
      }
    },
    lossPass() {
      this.$router.replace("/losspass");
    },
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
.header {
  text-align: center;
  padding-left: 100px;
  margin-bottom: 50px;
}
</style>