<template>
 <div id="Detail">
     <nav-bar class="detail-nav">
         <div slot="left" 
              class="back" 
              @click="backclickhome">
             <img src="~assets/img/common/back.svg" alt=""></div>
         <div slot="center" class="title">
         <div v-for="(item ,index) in titles" 
              class="title-item"
              :class="{active: index=== currentindex}"
              @click="Itemclick(index)">
              {{item}}</div>
         </div>
         </nav-bar>
        
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
    <detail-swiper :topimage="topimage" ref="base" />
    <detail-base-info :goods="goods" /> 
    <detail-shop-info :shop="shop"/>
    <detiail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
    <detail-param-info :paramInfo="paramInfo" ref="param"/>
    <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
    <goods-list :goods="detailrecommend" ref="recommend"/>
    </scroll>
    <back-top @click.native="backclick"  v-show="isshow"  />
    <detail-bottom-bar @addToCart="addToCart" />
    <toast :message="message" :isShow="show" />
 </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';
import Scroll from 'components/common/scroll/Scroll.vue';
import GoodsList from 'components/content/goods/GoodsList.vue';
import BackTop from 'components/content/backTop/BackTop.vue';

import DetiailGoodsInfo from './childComps/DetiailGoodsInfo.vue';
import DetailParamInfo from './childComps/DetailParamInfo.vue';
import DetailCommentInfo from './childComps/DetailCommentInfo.vue';
import DetailSwiper from './childComps/DetailSwiper.vue';
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo.vue';
import DetailBottomBar from './childComps/DetailBottomBar.vue';

import { debouce } from "common/utils";
import { backTopMixin } from "common/mixin";
import { getDetail , Goods , Shop , GoodsParam ,getrecommend} from "network/detail";
import Toast from 'components/common/toast/Toast.vue';




export default {
    name:'Detail',
    components:{
        NavBar,
        Scroll,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo, 
        DetiailGoodsInfo, 
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        BackTop,
        Toast    
    },

          
        
    data () {
        return {
            iid:null,
            titles:['商品','参数','评论','推荐'],
            currentindex:0,
            topimage:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            detailrecommend:[],
            themeTops: [],
            getThemeTopY:null,
            isshow:false,
            message:'',
            show:false
        }
    },
   
    methods: {
        Itemclick(index){
            this.currentindex=index
            this.$refs.scroll.scroll.scrollTo(0, -this.themeTops[index], 100)
        },
        backclickhome(){
            this.$router.back()
        },
        imageLoad(){
           this.$refs.scroll.scroll.refresh()
           this.getThemeTopY()
        },
        contentScroll(position){
            // console.log(position);
            const positionY=-position.y
            const len=this.themeTops.length
            for (let i = 0; i < len; i++) {
                if ((this.currentindex !== i)&&((i<len && positionY >=  this.themeTops[i] && positionY < this.themeTops[i+1]) || 
                ( i === len-1 && positionY >= this.themeTops[i] ) )) {
                    this.currentindex = i
                    // console.log(i);
                }
                
            }
            this.isshow = (-position.y) > 1000
        },
        backclick(){
            //  console.log('sasdasd');
            this.$refs.scroll.scroll.scrollTo(0,0,500)
        },
        addToCart(){
            // console.log('加入购物车');
            const product={}
            product.image=this.topimage[0]
            product.title=this.goods.title
            product.desc=this.goods.desc
            product.price=this.goods.nowPrice
            product.iid=this.iid
            this.$store.dispatch('addCart',product).then(res=>{
                // console.log(this.$toast);
                // this.$toast.show(res,2000)
                // console.log('---');
                // console.log(res);
                this.message=res
                this.show=true
                
                setTimeout(() => {
                this.message=''
                this.show=false
                }, 1500);

            })
            // this.$store.commit('addCart',product)
        }
    },
    created () {
        this.iid = this.$route.params.iid
        // console.log(this.$route.params.iid);
        getDetail(this.iid).then(res=>{      
            console.log(res);
            const data=res.result     
            this.topimage=data.itemInfo.topImages
            // console.log(this.topimage);
            
            this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            this.shop=new Shop(data.shopInfo)
            this.detailInfo=data.detailInfo
            this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)
            if(data.rate.cRate !=0){
                this.commentInfo=data.rate.list[0]
            }
        })
        getrecommend().then(res=>{
            
            this.detailrecommend=res.data.list
        })

        this.getThemeTopY=debouce(()=>{
            	    this.themeTops = []
        this.themeTops.push(this.$refs.base.$el.offsetTop)
        this.themeTops.push(this.$refs.param.$el.offsetTop)
        this.themeTops.push(this.$refs.comment.$el.offsetTop)
        this.themeTops.push(this.$refs.recommend.$el.offsetTop)
        
        },100)
    },
   
}
</script>

<style scoped>
    #Detail{
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }
    .content{
        height: calc(100% - 102px);
    }
    .detail-nav{
        position: relative;
        z-index: 9;
        background-color: #fff;
    }
    .title{
        display:flex;
        font-size: 15px;
        text-align: center;
        color: var(--color-text);
    }
    .title-item{
        flex: 1;
    }
    .active{
        color: var(--color-high-text);
    }
    .back img{
        margin-top: 11px;
    }
</style>