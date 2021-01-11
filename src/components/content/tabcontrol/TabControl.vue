<template>
  <div class="TabControl">
      <div class="TabControlItem" 
           v-for="(item,index) in titles" 
           :class="{active: index === currentIndex }"
           @click="tabItem(index)">
          <span>{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'TabControl',
    data () {
        return {
            currentIndex:0
        }
    },
    props: {
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    methods: {
        tabItem(index){
            this.currentIndex=index
            this.$emit('tabClick', index)
        }
    }
}
</script>

<style>
    .TabControl{
        display: flex;
        text-align: center;
        font-size: 14px;
        background-color:#fff;
    }
    .TabControlItem{
        flex: 1;
        height: 40px;
        line-height: 40px;
    }
    .TabControlItem span{
      padding-bottom: 3px;  
    }
    .active{
        color: var(--color-high-text);
    }
    .active span{
        border-bottom: 3px solid var(--color-high-text);
    }
</style>