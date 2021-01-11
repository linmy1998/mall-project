<template>
   <div id="tab-bar">
     <slot></slot>
   </div>
</template>
<script>

export default {
    name:'tabbar',
 
}
</script>
<style scoped>
#tab-bar{
  display: flex;
  background-color: #e7e2e2;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 0 1px rgb(100, 100, .08);
}

</style>