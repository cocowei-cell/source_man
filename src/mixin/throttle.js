/**
 * @description: 节流阀混入
 * @param {type}
 * @return {type}
 */

export default {
  data() {
    return {
      tagTime: false,
      time:"",
      options:[]
    };
  },
  watch: {
    time() {
      this.tagTime = true;
    },
  },
};
