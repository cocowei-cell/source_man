<template>
  <div>
    <div class="tabbar">
      <div class="item" :class="{ active: !isAdmin }" @click="handleNormal">
        我是学生
      </div>
      <div class="item" :class="{ active: isAdmin }" @click="handleAdmin">
        我是管理员
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "z-tab",
  data() {
    return {
      isAdmin: false,
    };
  },
  methods: {
    handleNormal() {
      this.isAdmin = false;
      this.$emit("normalShow");
    },
    handleAdmin() {
      this.isAdmin = true;
      this.$emit("adminShow");
    },
  },
};
</script>
<style scoped>
.tabbar {
  width: 300px;
  height: 60px;
  font-size: 17px;
  display: flex;
  line-height: 60px;
  text-align: center;
  position: absolute;
  left: 162px;
  top: -78px;
  user-select: none;
}
.tabbar .item {
  flex: 1;
  cursor: pointer;
}

.item.active {
  border-bottom: 2px solid #66b1ff;
  color: #66b1ff;
}
</style>