<template>
     <tabbar>
   <tab-bar-item path='/home'>
     <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
       <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
     <div slot="item-text">首页</div>
   </tab-bar-item>
   <tab-bar-item path='/categroy'>
     <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
       <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
     <div slot="item-text">分类</div>
   </tab-bar-item>
   <tab-bar-item path='/cart'>
     <img slot="item-icon" src="~assets/img/tabbar/cart.svg" alt="">
       <img slot="item-icon-active" src="~assets/img/tabbar/cart_active.svg" alt="">
     <div slot="item-text">购物车</div>
   </tab-bar-item>
   <tab-bar-item path='/profile'>
     <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
       <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
     <div slot="item-text">我的</div>
   </tab-bar-item>
 </tabbar>
</template>
<script>
import tabbar from 'components/common/tabbar/TabBar.vue'
import TabBarItem from 'components/common/tabbar/TabBarItem.vue'
export default {
    name:'MainTabar',
    components: {
    tabbar,
    TabBarItem
    }
}
</script>
<style scoped>

</style>