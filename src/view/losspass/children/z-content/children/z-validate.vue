<template>
  <div>
    <p>邮箱已经发送,请注意查收</p>
    <el-form>
      <el-form-item label="邮箱验证码">
        <el-input ref="input" type="text" v-model="qqcode"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">
          提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request from "@/services/request";
export default {
  name: "z-validate",
  data() {
    return {
      qqcode:''
    }
  },
  methods: {
    async sendEmail(stuNumber) {
      let res =await request({
        url: "/api/user/getqqcode",
        method: "POST",
        data:{
          stu_number:stuNumber,
        }
      })
      if(res.code == 200) {
        console.log("邮箱已发送");
      }
    },
   async submit() {
     if(this.qqcode.trim()==="") {
       this.$refs.input.focus();
       this.$message({
         type: "error",
         message: "请输入验证码"
       })
     }
     let res = await request({
       url:"/api/user/losspass",
       method:'post',
       data: {
         stu_number:this.$store.state.stuNumber,
         qqcode:this.qqcode
       },
     })
     if(res.code===200) {
       //设置qq验证码，方便下次验证
       this.$store.commit('setQQcode',this.qqcode);
       this.$store.commit('setIndex',2);
     } else {
       console.log('wcuowu');
       this.$message({
         type: 'error',
         message:"验证码错误"
       })
     }
    }
  },
  created() {
    //组件被创建时发送邮箱
    let stuNumber = this.$store.state.stuNumber || "";
    this.sendEmail(stuNumber);
  },
};
</script>
<style scoped>
p {
  margin-bottom: 10px;
}
</style>