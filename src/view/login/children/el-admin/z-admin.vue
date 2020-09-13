<template>
  <div>
    <login :isAdmin="true" />
  </div>
</template>

<script>
import Login from "../el-login/LoginEl";
export default {
  name: "z-admin",
  components: {
    Login,
  },
};
</script>
<style scoped>
</style>