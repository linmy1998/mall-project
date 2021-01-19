<template>
<div class="tab-bar-item" @click="ItemClick">
  <div v-if="!isActive"><slot  name="item-icon"></slot></div>
  <div v-else><slot  name="item-icon-active"></slot></div>
  <div :class="{active:isActive}"><slot name="item-text"></slot></div>
  
</div>
   
  
</template>
<script>

export default {

    name:'tabbaritem',
    props: {
      path:String
    },
    data () {
      return {
        // isActive:true
      }
    },
    computed: {
      isActive(){
        return this.$route.path.indexOf(this.path) !==-1
      },
      
    },
    methods: {
      ItemClick(){
        this.$router.replace(this.path).catch(err=>err)
      }
    }
    
}
</script>
<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  margin-top: 3px;
  font-size: 14px;
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  vertical-align:middle;
  margin-bottom: 2px;
}
.active{
  color: palevioletred;
}
</style>