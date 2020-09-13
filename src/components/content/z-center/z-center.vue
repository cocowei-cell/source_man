<template>
  <div :style="{width:width}" style="margin:0 auto;">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'z-center',
  props:{
    width:{
      type:String,
      default:"50%"
    }
  }
}
</script>
<style scoped>

</style>