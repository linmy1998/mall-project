<template>
  <swiper>
    <swiper-item v-for="item in banner" >
        <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad">
        </a>
    </swiper-item>
</swiper>  
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
    name:'HomeSwiper',
    components: {
         Swiper,
        SwiperItem
    },
    data () {
        return {
            isload:false
        }
    },
    props: {
        banner:{
            type:Array,
            default(){
               return []
            }
        }
    },
    methods: {
        imageLoad(){
            if(!this.isload){
                 this.$emit("swiperImageLoad")
                 this.isload=true
            }
           
        }
    }
}
</script>
<style scoped>

</style>