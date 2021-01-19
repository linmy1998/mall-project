<template>
<div class="cart-list">
  <scroll ref="scroll" class="content">
     <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
     
  </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll.vue'
  import CartListItem from './cartListItem.vue'
  


	export default {
		name: "CartList",
    components: {
          Scroll,
        CartListItem, 
    },
    props: {
		  cartList: {
		    type: Array,
        default() {
		      return []
        }
      }
    },
   activated () {
       this.$refs.scroll.scroll.refresh()
   }
	}
</script>

<style scoped>
.cart-list{
    height: calc(100% - 49px - 44px - 40px);
}
.content{
    height: 100%;
    overflow: hidden;
}
</style>
