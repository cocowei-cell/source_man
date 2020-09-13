<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    created() {},
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-width: 750px;
}

.fl {
  float: left !important;
}

.fr {
  float: right !important;
}

.clearfix {
  display: block;
  content: "";
  clear: both;
}
</style>
