<template>
  <div class="goods">
     <goods-list-item v-for="item in goods" :goodslist="item"/> 
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
    name:'GoodsList',
    components: { 
      GoodsListItem 
    },
    props:{
        goods:{
           type:Array,
           default(){
            return []
        }
        }
        
    }

}
</script>

<style>
.goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
}
</style>