<template>
<div id="home">
<nav-bar class="home-nav"><div slot='center'>购物车</div></nav-bar>  
<tab-control :titles="['流行','新款','精选']" 
              @tabClick="tabClick"
              ref="tabcontrol1"
              class="tab-control"
              v-show="isfixed"/>
<scroll class="content" 
        ref="scroll" 
        :probe-type='3' 
        @scroll="controlScroll" 
        :pull-up-load="true" 
        @pullingUp="loadmode">
<home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad" />
<recommend-view :recommend="recommend" />
<feature-view />
<tab-control :titles="['流行','新款','精选']" 
              @tabClick="tabClick"
              ref="tabcontrol2"
              :class="{fixed:isfixed}"
              />
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
            isshow:false,
            tabOffsetTop:0,
            istabshow:false,
            isfixed:false,
            saveY:0
        }
    },
    created () {
        this.getHomeMultidata()
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    mounted () {
        // this.tabOffsetTop=this.$refs.tabcontrol2.$el.offsetTop
        
    },
    activated () {
        this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
        this.$refs.scroll.scroll.refresh()
        // console.log('123');
    },
    deactivated () {
        this.saveY = this.$refs.scroll.scroll.y
        // console.log(this.saveY);
        // this.saveY=-1000
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
           this.$refs.tabcontrol1.currentIndex=index
           this.$refs.tabcontrol2.currentIndex=index
           console.log(this.$refs.tabcontrol1.currentType+"  "+this.$refs.tabcontrol2.currentType);
        },
         backclick(){
            //  console.log('sasdasd');
            this.$refs.scroll.scroll.scrollTo(0,0,500)
         },
         controlScroll(position){
             this.isshow = (-position.y) > 1000
             this.isfixed= (-position.y) > this.tabOffsetTop
            //  this.istabshow= (-position.y) > this.$refs.tabcontrol2.$el.offsetTop
            //  console.log(this.istabshow);
            // console.log(position);
            // if ((-position.y) > this.$refs.tabcontrol2.$el.offsetTop) {
            //     this.istabshow=true
            //     console.log(this.istabshow+"  "+-position.y+"  "+this.$refs.tabcontrol2.$el.offsetTop);
            // }else if((-position.y) < this.$refs.tabcontrol2.$el.offsetTop){
            //     this.istabshow=false
            //     console.log(this.istabshow +"  "+-position.y+"  "+this.$refs.tabcontrol2.$el.offsetTop);
            // }
         },
         loadmode(){
             console.log("商家加载更多");
             this.getHomeGoods(this.currentType)
             this.$refs.scroll.scroll.refresh()
         },
         swiperImageLoad(){
            //  console.log(this.$refs.tabcontrol2.$el.offsetTop);
            this.tabOffsetTop=this.$refs.tabcontrol2.$el.offsetTop
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
       /* padding-top: 44px;  */
       position: relative;
    }
    .home-nav{
        background-color: var(--color-tint);
        color: #fff;
        /* position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 9; */
    }
    .tab-control{
        /* position: sticky;
        top: 40px; */
        position: relative;
        z-index: 9;
    }
    .fixed{
        position: fixed;
        left: 0;
        right: 0;
        top: 44px;
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