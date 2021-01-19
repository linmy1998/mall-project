<template>
<div id="cart">
    <nav-bar class="nav-bar"><div slot="center">购物车({{cartLength}})</div></nav-bar>
    <cart-list class="cart-list" :cart-list="cartList"></cart-list>
    <cart-bottom-bar />
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import CartList from './childComps/cartList.vue';
import { mapGetters } from "vuex";
import CartBottomBar from './childComps/cartBottomBar.vue';

export default {
    name:'Cart',
    components: { 
      NavBar,
      CartList,
      CartBottomBar },
    computed: {
        ...mapGetters(['cartLength','cartList'])
    }

}
</script>
<style scoped>
.nav-bar{
    background-color: var(--color-tint);
    color: #fff;
}
#cart {
    /*position: relative;*/
    height: 100vh;
  }
</style>