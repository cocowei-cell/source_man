<template>
  <div class="header">
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
<style scoped>
.header {
  text-align: center;
  padding-left: 100px;
  margin-bottom: 50px;
}
</style>