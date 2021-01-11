<template>
<div id="home">
<nav-bar class="home-nav">
    <div slot='center'>购物车</div>
</nav-bar>  
<scroll class="content" 
        ref="scroll" 
        :probe-type='3' 
        @scroll="controlScroll" 
        :pull-up-load="true" 
        @pullingUp="loadmode">
<home-swiper :banner="banner" />
<recommend-view :recommend="recommend" />
<feature-view />
<tab-control :titles="['流行','新款','精选']" 
              class="tab-control"
              @tabClick="tabClick"/>
<goods-list :goods="goods[currentType].list" />
</scroll>
<back-top @click.native="backclick"  v-show="isshow"  />
</div>
  
</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import { getHomeMultidata ,getHomeGoods } from "network/home";
import HomeSwiper from './childComps/HomeSwiper.vue';
import RecommendView from './childComps/RecommendView.vue';
import FeatureView from './childComps/FeatureView.vue';
import TabControl from 'components/content/tabcontrol/TabControl.vue';
import GoodsList from 'components/content/goods/GoodsList.vue';
import Scroll from 'components/common/scroll/Scroll.vue';
import BackTop from 'components/content/backTop/BackTop.vue';



export default {
    name:'Home',
    components: { 
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop       
        },
    data () {
        return {
            banner:[],
            recommend:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]},
            },
            currentType:'pop',
            isshow:false
        }
    },
    created () {
        this.getHomeMultidata()
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    methods: {
        tabClick(index){
            switch(index){
                case 0:
                this.currentType='pop'
                break
                case 1:
                this.currentType='new'
                break
                case 2:
                this.currentType='sell'
                break
            }
           
        },
         backclick(){
            //  console.log('sasdasd');
            this.$refs.scroll.scroll.scrollTo(0,0,500)
         },
         controlScroll(position){
             this.isshow = (-position.y) > 1000
            // console.log(position);
         },
         loadmode(){
             console.log("商家加载更多");
             this.getHomeGoods(this.currentType)
             this.$refs.scroll.scroll.refresh()
         },
        // -----------------网络请求相关操作----------------------------------
        getHomeMultidata(){
            getHomeMultidata().then(res=>{
            this.banner=res.data.banner.list
            this.recommend=res.data.recommend.list
        })
        },
        getHomeGoods(type){
            const page=this.goods[type].page+1
            getHomeGoods(type,page).then(res=>{
                // console.log(res);
                this.goods[type].list.push(...res.data.list)
                this.goods[type].page+=1
                 this.$refs.scroll.scroll.finishPullUp()
            })
           
        }
    }
}
</script>
<style scoped>
    #home{
       padding-top: 44px; 
       position: relative;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9;
    }
    .tab-control{
        position: sticky;
        top: 40px;
        z-index: 9;
    }
    .content{
        overflow: hidden; 
        position: absolute;
        position: fixed;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>