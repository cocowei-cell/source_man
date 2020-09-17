<template>
  <div>
    <div class="auth_admin" v-if="!isOpen">
      <el-alert
        class="alerts"
        title="提示"
        type="info"
        description="管理员未开启审核权限"
        show-icon
        :closable="false"
      >
      </el-alert>
    </div>
    <div class="user_submit" v-else>
      <z-center width="60%">
        <div class="nav"></div>
        <input type="file" @change="han" multiple />
        <el-button @click="submit">上传</el-button>
      </z-center>
    </div>
  </div>
</template>

<script>
import ZCenter from "@/components/content/z-center/z-center";
import request from "@/services/request";
export default {
  name: "z-submit",
  components: {
    ZCenter,
  },
  data() {
    return {
      submitForm: [],
      options: [],
      time: "",
      files: "",
    };
  },
  methods: {
    //获取审核时间
    async getTime() {
      let res = await request({
        url: "/api/score/gettimes",
      });
      let time = res.time;
      this.options = time;
      this.time = time[0].time;
    },
    han(e) {
      let v = e.target.files;
      this.files = v;
    },
    async submit() {
      if (this.files.length === 0) {
        return;
      }
      let form = new FormData();
      for (let i = 0; i < this.files.length; i++) {
        if (!this.files[i].type.includes("image")) {
          this.$message.error("请上传图片类型的文件");
          return;
        }
        //添加到form对象中
        form.append(`img${i}`, this.files[i]);
      }
      //发送请求
      let res = await request({
        url: "http://localhost:3001/upload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "post",
        data: form,
      });
      if(res.code == 200) {
        this.$message.success("文件上传完成")
      }
    },
  },
  watch: {
    time(v, o) {
      console.log(v);
    },
  },
  computed: {
    isOpen() {
      return this.$store.state.isOpen;
    },
  },
  created() {
    this.getTime();
  },
};
</script>
<style scoped>
.auth_admin {
  width: 600px;
  margin: 0 auto;
  margin-top: 15px;
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
</style>
