<template>
  <div class="modify_pass">
    <z-center>
      <div class="center">
        <h1>修改密码</h1>
        <el-form
          :model="form"
          status-icon
          :rules="rules"
          ref="form"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="输入原密码" prop="old_stu_pass">
            <el-input
              type="password"
              v-model="form.old_stu_pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="输入新密码"
            prop="new_stu_pass"
            label-width="100px"
          >
            <el-input
              type="password"
              v-model="form.new_stu_pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirm" label-width="100px">
            <el-input
              type="password"
              v-model="form.confirm"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label-width="100px" label="验证码" prop="code">
            <el-input
              style="width: 100px"
              type="text"
              v-model="form.code"
            ></el-input>
            <z-code ref="codeRef" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </z-center>
  </div>
</template>
  
<script>
import ZCenter from "@/components/content/z-center/z-center";
import ZCode from "@/components/content/z-code/z-code";
import request from "@/services/request";
export default {
  name: "z-modifypass",
  components: {
    ZCenter,
    ZCode,
  },
  data() {
    //原密码
    var checkPass1 = (rule, value, callback) => {
      var passReg = /^[0-9A-Za-z_]{6,12}$/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!passReg.test(value)) {
        callback(new Error("请输入6-12位字母或数字或下划线的密码"));
      } else {
        callback();
      }
    };
    //新密码
    var checkPass2 = (rule, value, callback) => {
      var passReg = /^[0-9A-Za-z_]{6,12}$/;
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (!passReg.test(value)) {
        callback(new Error("请输入6-12位字母或数字或下划线的密码"));
      } else {
        callback();
      }
    };
    //确认新密码
    var checkPass3 = (rule, value, callback) => {
      value = value.trim();
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.new_stu_pass) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    //验证码
    var checkCode = async (rule, value, callback) => {
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
      form: {
        old_stu_pass: "",
        new_stu_pass: "",
        code: "",
        confirm: "",
      },
      rules: {
        old_stu_pass: [{ validator: checkPass1, trigger: "blur" }],
        new_stu_pass: [{ validator: checkPass2, trigger: "blur" }],
        confirm: [{ validator: checkPass3, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((v) => {
        if (v) {
          this.modifypass();
        } else {
          return false;
        }
      });
    },
    async modifypass() {
      let res = await request({
        url: "/api/user/modifypass",
        method: "POST",
        data: {
          old_stu_pass: this.form.old_stu_pass,
          new_stu_pass: this.form.new_stu_pass,
        },
      });
      //token失效
      if (res.code === 401) {
        //跳转到登录页，初始化vuex清空token
        sessionStorage.removeItem("token");
        //清空用户信息
        this.$store.commit("SETUSER_STATE", {});
        //跳转到登录页面
        this.$router.replace("/login");
      }
      //走到这里程序一定不是401的状态码
      if (res.code !== 200) {
        this.$message.error(res.msg);
        //刷新验证码
        this.$refs.codeRef.refresh();
      } else {
        this.$message.success("密码修改成功，下次登录后生效！");
        // 将所有输入框置空
        this.form = {
          old_stu_pass: "",
          new_stu_pass: "",
          code: "",
          confirm: "",
        };
      }
    },
  },
};
</script>
<style scoped>
.modify_pass {
  margin-top: 100px;
}
.center {
  width: 500px;
  margin: 0 auto;
}
h1 {
  text-align: center;
  padding-left: 72px;
  margin-bottom: 30px;
  font-weight: 500;
  color: #66b1ff;
}
</style>