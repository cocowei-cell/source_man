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
      <el-form-item label="填写新密码" prop="stu_pass">
        <el-input
          type="password"
          v-model="form.stu_pass"
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
          style="width:100px;"
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
</template>

<script>
import request from "@/services/request";
import ZCode from "@/components/content/z-code/z-code"
export default {
  name: "z-new-pass",
  components:{
    ZCode
  },
  data() {
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
      } else if (value !== this.form.stu_pass) {
        callback(new Error("两次输入密码不一致"));
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
          // console.log(tag);
          if (!tag) {
            callback(new Error("验证码错误"));
          } else {
            callback();
          }
        }
    };
    return {
      form: {
        stu_pass:'',
        confirm:'',
        code:''
      },
      rules:{
        stu_pass:[{validator:validatePass1,trigger:'blur'}],
        confirm:[{validator:validatePass2,trigger:'blur'}],
        code:[{validator:validateCode,trigger:'blur'}]
      }
    };
  },
  methods:{
    submit() {
      this.$refs.form.validate((v)=>{
        if(v) {
          //修改密码请求
          this.modifyP();
        } else {
          return;
        }
      })
    },
    async modifyP() {
      let res = await request({
        url:'/api/user/losspass',
        method: 'post',
        data: {
          stu_number:this.$store.state.stuNumber,
          stu_pass:this.form.stu_pass,
          qqcode:this.$store.state.qqcode
        }
      })
      if(res.code == 200) {
        this.$store.commit('setIndex',4);
      } else {
        this.$message.error("密码修改失败");
        //失败后调用刷新函数
        this.$refs.codeRef.refresh();
      }
    }
  }
};
</script>
<style scoped>
</style>