<template>
  <div class="loss_content">
    <z-center>
      <div class="content">
        <z-write-number v-if="0===currentIndex"/>
        <z-validate v-else-if="1===currentIndex" />
        <z-new-pass v-else-if="2===currentIndex" />
        <z-complete v-else />
      </div>
    </z-center>
  </div>
</template>

<script>
import ZCenter from "@/components/content/z-center/z-center";

import ZWriteNumber from "./children/z-write-number";
import ZValidate from "./children/z-validate";
import ZNewPass from "./children/z-new-pass";
import ZComplete from "./children/z-complete";
export default {
  name: "z-content",
  data() {
    return {
      // currentIndex:1
    }
  },
  components: {
    ZCenter,
    ZWriteNumber,
    ZValidate,
    ZNewPass,
    ZComplete,
  },
  computed:{
    currentIndex() {
      return this.$store.state.index;
    }
  }
};
</script>
<style scoped>
.content {
  margin: 0 auto;
  padding: 50px;
  width: 500px;
}
</style>