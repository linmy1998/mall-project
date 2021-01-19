<template>
<div>
  <swiper class="detail-swiper" v-if="topimage.length">
      <swiper-item class="item" v-for="(item, index) in topimage" :key="index">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
    name:'DetailSwiper',
    components: {
        Swiper,
        SwiperItem
    },
    props: {
        topimage:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scope>
    .detail-swiper{
        height: 300px;
        /* overflow: hidden; */
    }
</style>